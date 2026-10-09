import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, Locale } from './settings';
import { cookies, headers } from 'next/headers';

export default getRequestConfig(async () => {
    const cookieStore = await cookies();
    const headerStore = await headers();

    let locale: Locale = defaultLocale;

    const cookieLocale = cookieStore.get('locale')?.value;
    if (cookieLocale && locales.includes(cookieLocale as Locale)) {
        locale = cookieLocale as Locale;
    } else {
        const acceptLanguage = headerStore.get('accept-language');
        if (acceptLanguage) {
            const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];
            if (locales.includes(preferredLocale as Locale)) {
                locale = preferredLocale as Locale;
            }
        }
    }

    return {
        locale: 'en',
        messages: (await import(`../../messages/en.json`)).default,
        timeZone: 'Asia/Kolkata'
    };
});
