import {getRequestConfig} from 'next-intl/server';
import {locales} from '~/config';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as any)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (
      await (locale === 'en'
        ? // When using Turbopack, this will enable HMR for `default`
          import('../messages/en.json')
        : import(`../messages/${locale}.json`))
    ).default
  };
});
