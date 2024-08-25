import PageComponent from "./PageComponent";
import {unstable_setRequestLocale} from 'next-intl/server';
import {getIndexLanguageText, getTimestampPageLanguageText} from "~/configs/languageText";

export default async function Videos({params: {locale = ''}}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
  const timestampLanguageText = await getTimestampPageLanguageText();

  return (
    <PageComponent
      locale={locale}
      timestampLanguageText={timestampLanguageText}
      indexLanguageText={indexLanguageText}
    />
  )
}
