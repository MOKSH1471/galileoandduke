import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export default getRequestConfig(async () => {
    return {
        locale: 'en',
        messages: (await import(`../../messages/en.json`)).default,
        timeZone: 'Asia/Kolkata'
    };
});
