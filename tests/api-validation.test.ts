import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readJson, RequestError, validateContact } from '../src/lib/api-validation';
import { createRateLimiter } from '../src/lib/rate-limit';

const validContact = { name: ' Alex ', email: 'alex@example.com', subject: 'A project', message: 'Hello there' };
const request = (body: string) => new Request('http://localhost/api/contact', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body,
});

test('contact accepts normal submissions and preserves multiline message text', () => {
    const result = validateContact({ ...validContact, message: 'One\nTwo' });
    assert.equal(result.name, 'Alex');
    assert.equal(result.message, 'One\nTwo');
    assert.equal(validateContact({ ...validContact, subject: undefined }).subject, 'No Subject');
});

test('contact rejects non-string fields, invalid email, header injection, and excessive input', () => {
    for (const body of [null, [], { ...validContact, name: {} }, { ...validContact, email: 'bad' },
        { ...validContact, email: 'a@b.com\r\nBcc:x@y.com' }, { ...validContact, subject: 'Hi\r\nBcc: x@y.com' },
        { ...validContact, message: 'x'.repeat(5001) }, { ...validContact, name: '   ' }]) {
        assert.throws(() => validateContact(body), RequestError);
    }
});

test('JSON reader rejects malformed JSON and incorrect content types', async () => {
    await assert.rejects(readJson(request('{'), 100), { status: 400 });
    await assert.rejects(readJson(new Request('http://localhost', { method: 'POST', body: '{}' }), 100), { status: 415 });
    assert.deepEqual(await readJson(request('{"ok":true}'), 100), { ok: true });
});

test('JSON limit checks actual UTF-8 bytes, including requests without content-length', async () => {
    await assert.rejects(readJson(request(JSON.stringify('😀'.repeat(10))), 30), { status: 413 });
    const large = request('{}');
    large.headers.set('content-length', '999');
    await assert.rejects(readJson(large, 100), { status: 413 });
});

test('JSON reader handles multibyte characters split across streamed chunks', async () => {
    const bytes = new TextEncoder().encode(JSON.stringify({ text: '😀' }));
    const body = new ReadableStream({ start(controller) {
        for (const byte of bytes) controller.enqueue(Uint8Array.of(byte));
        controller.close();
    } });
    const req = new Request('http://localhost', {
        method: 'POST', headers: { 'content-type': 'application/json' }, body, duplex: 'half',
    } as RequestInit);
    assert.deepEqual(await readJson(req, 100), { text: '😀' });
});


test('rate limiter isolates callers, resets expired windows, and supplies retry timing', () => {
    const limit = createRateLimiter();
    assert.equal(limit('alice', 2, 1000, 0).allowed, true);
    assert.equal(limit('alice', 2, 1000, 0).allowed, true);
    assert.deepEqual(limit('alice', 2, 1000, 500), { allowed: false, retryAfter: 1 });
    assert.equal(limit('bob', 2, 1000, 500).allowed, true);
    assert.equal(limit('alice', 2, 1000, 1000).allowed, true);
});

test('rate limiter bounds memory without evicting active limits', () => {
    const limit = createRateLimiter(1);
    assert.equal(limit('alice', 1, 1000, 0).allowed, true);
    assert.equal(limit('bob', 1, 1000, 0).allowed, false);
    assert.equal(limit('alice', 1, 1000, 0).allowed, false);
    assert.equal(limit('bob', 1, 1000, 1000).allowed, true);
});
