import nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';

interface IEmailOpts {
    email: string,
    subject: string,
    message: string
};

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    SMTP_NAME
} = process.env;

const Transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
    }
});

export const sendEmail = async (content: IEmailOpts) => {
    const message: Options = {
        from: `${SMTP_NAME}<${SMTP_FROM}>`,
        to: content.email,
        subject: content.subject,
        html: content.message
    };
    return await Transport.sendMail(message);
};