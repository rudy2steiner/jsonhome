import PageComponent from "./PageComponent";
import {unstable_setRequestLocale} from 'next-intl/server';
import {randomVideo} from "~/data/openaiVideo";
import {getIndexLanguageText,getFooterLanguageText,getJsonEditorPageLanguageText, getQuestionLanguageText} from "~/configs/languageText";

export default async function IndexPage({params: {locale = ''}}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
  const footerLanguageText = await getFooterLanguageText();
  const questionText = await getQuestionLanguageText();
  const jsonEditorText = await getJsonEditorPageLanguageText();
  const initVideoList = randomVideo(2);
  return (
    <PageComponent
      locale={locale}
      indexLanguageText={indexLanguageText}
      footerLanguageText={footerLanguageText}
      initVideoList={initVideoList}
      questionText={questionText}
      jsonEditorText={jsonEditorText}
    >
    </PageComponent>
  )
}
