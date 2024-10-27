import PageComponent from "./PageComponent";
import {unstable_setRequestLocale} from 'next-intl/server';
import {getIndexLanguageText,getFooterLanguageText, getTimestampPageLanguageText} from "~/configs/languageText";

export default async function Videos({params: {locale = ''}}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
  const timestampLanguageText = await getTimestampPageLanguageText();
  const footerLanguageText = await getFooterLanguageText();
  return (
    <PageComponent
      locale={locale}
      timestampLanguageText={timestampLanguageText}
      indexLanguageText={indexLanguageText}
      footerLanguageText={footerLanguageText}
    />
  )
}
