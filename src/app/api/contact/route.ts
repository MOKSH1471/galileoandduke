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
        if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
            return NextResponse.json({ error: 'Contact delivery is temporarily unavailable.' }, { status: 503 });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 15000,
            auth: {
                user: process.env.EMAIL_USER || '',
                pass: process.env.EMAIL_APP_PASSWORD || ''
            },
        });

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeSubject = escapeHtml(subject || 'No Subject');
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER || '',
            to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Message: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                    <h3 style="color: #333;">You have a new message from your website!</h3>
                    <p><strong>Name: </strong> ${safeName}</p>
                    <p><strong>Email: </strong> ${safeEmail}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap; color: #555;">${safeMessage}</p>
                </div>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } catch (error) {
        if (error instanceof RequestError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Unable to send your message. Please try again later.' }, { status: 500 });
    }
}
