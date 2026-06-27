import PageComponent from "./PageComponent";
import {setRequestLocale} from 'next-intl/server';
import {getIndexLanguageText,getFooterLanguageText, getJsonComparePageLanguageText} from "~/configs/languageText";

export default async function IndexPage({params}: {params: Promise<{locale: string}>}) {
  const {locale = ''} = await params;
  // Enable static rendering
  setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
  const jsonCompareText = await getJsonComparePageLanguageText();
  const footerLanguageText = await getFooterLanguageText();

  return (
    <PageComponent
      locale={locale}
      indexLanguageText={indexLanguageText}
      footerLanguageText={footerLanguageText}
      jsonCompareText={jsonCompareText}

    >

    </PageComponent>
  )
}
