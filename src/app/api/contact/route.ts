import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { readJson, RequestError, validateContact } from '@/lib/api-validation';
import { limitRequest } from '@/lib/rate-limit';

function escapeHtml(str: string) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
    const limited = limitRequest(req, 'contact');
    if (limited) return limited;
    try {
        const { name, email, subject, message } = validateContact(await readJson(req, 24_000));
        const emailUser = (process.env.EMAIL_USER || '').trim();
        const rawPass = (process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD || '').trim();

        if (!emailUser || !rawPass) {
            return NextResponse.json({ error: 'Contact delivery is temporarily unavailable.' }, { status: 503 });
        }

        // Determine SMTP host, port, and security
        let host = process.env.EMAIL_HOST?.trim();
        let port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT.trim(), 10) : undefined;
        let secure = process.env.EMAIL_SECURE !== undefined ? process.env.EMAIL_SECURE.trim() === 'true' : undefined;

        if (!host) {
            if (emailUser.toLowerCase().endsWith('@galileoandduke.com')) {
                // GoDaddy outgoing mail server for galileoandduke.com domain
                host = 'smtpout.secureserver.net';
                port = port ?? 465;
                secure = secure ?? true;
            } else {
                // Default to Gmail
                host = 'smtp.gmail.com';
                port = port ?? 465;
                secure = secure ?? true;
            }
        } else {
            port = port ?? (secure === false ? 587 : 465);
            secure = secure ?? (port === 465);
        }

        // For Gmail, strip any spaces (Google formats app passwords with spaces like "abcd efgh ijkl mnop")
        const pass = host === 'smtp.gmail.com' ? rawPass.replace(/\s+/g, '') : rawPass;

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            connectionTimeout: 15000,
            greetingTimeout: 15000,
            socketTimeout: 20000,
            auth: {
                user: emailUser,
                pass,
            },
        });

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeSubject = escapeHtml(subject || 'No Subject');
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

        // Email options
        const recipient = process.env.CONTACT_EMAIL || 'studio@galileoandduke.com';
        const mailOptions = {
            from: `"${safeName} via Galileo & Duke" <${emailUser}>`,
            to: recipient,
            replyTo: email,
            subject: `[Galileo & Duke] ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                    <h3 style="color: #333;">You have a new message from your website!</h3>
                    <p><strong>Name: </strong> ${safeName}</p>
                    <p><strong>Email: </strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
                    <p><strong>Subject: </strong> ${safeSubject}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap; color: #555;">${safeMessage}</p>
                </div>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } catch (error: any) {
        if (error instanceof RequestError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }
        console.error('Error sending email:', error);

        let clientMessage = 'Unable to send your message. Please try again later.';
        if (error?.code === 'EAUTH' || error?.responseCode === 535) {
            clientMessage = 'Email authentication failed. Please check your credentials in settings.';
        } else if (error?.code === 'ETIMEDOUT' || error?.command === 'CONN') {
            clientMessage = 'Connection to mail server timed out. Please try again shortly.';
        }

        return NextResponse.json({ error: clientMessage }, { status: 500 });
    }
}
