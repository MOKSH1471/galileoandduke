export class RequestError extends Error {
    constructor(message: string, public status = 400) {
        super(message);
    }
}

export async function readJson(req: Request, maxBytes: number): Promise<unknown> {
    if (req.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
        throw new RequestError('Content-Type must be application/json.', 415);
    }
    if (Number(req.headers.get('content-length')) > maxBytes) {
        throw new RequestError('Request is too large.', 413);
    }
    const reader = req.body?.getReader();
    if (!reader) throw new RequestError('A JSON body is required.');
    const decoder = new TextDecoder();
    let size = 0;
    let text = '';
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > maxBytes) {
                await reader.cancel();
                throw new RequestError('Request is too large.', 413);
            }
            text += decoder.decode(value, { stream: true });
        }
        text += decoder.decode();
    } finally {
        reader.releaseLock();
    }
    try {
        return JSON.parse(text);
    } catch {
        throw new RequestError('Invalid JSON.');
    }
}

function record(value: unknown): Record<string, unknown> {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new RequestError('Expected an object.');
    }
    return value as Record<string, unknown>;
}

function textField(value: unknown, name: string, max: number): string {
    if (typeof value !== 'string' || !value.trim() || value.length > max) {
        throw new RequestError(`${name} must be a non-empty string of at most ${max} characters.`);
    }
    return value.trim();
}

export function validateContact(value: unknown) {
    const body = record(value);
    const name = textField(body.name, 'Name', 100);
    const email = textField(body.email, 'Email', 254);
    const subject = body.subject === undefined || body.subject === ''
        ? 'No Subject' : textField(body.subject, 'Subject', 200);
    const message = textField(body.message, 'Message', 5000);
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\r\n]/.test(subject)) {
        throw new RequestError('Enter a valid email and a single-line subject.');
    }
    return { name, email, subject, message };
}
