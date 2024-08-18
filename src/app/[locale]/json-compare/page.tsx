import PageComponent from "./PageComponent";
import {unstable_setRequestLocale} from 'next-intl/server';
import {getIndexLanguageText, getJsonComparePageLanguageText} from "~/configs/languageText";

export default async function IndexPage({params: {locale = ''}}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
  const jsonCompareText = await getJsonComparePageLanguageText();


  return (
    <PageComponent
      locale={locale}
      indexLanguageText={indexLanguageText}
      jsonCompareText={jsonCompareText}
    >

    </PageComponent>
  )
}
