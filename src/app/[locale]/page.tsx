import PageComponent from "./PageComponent";
import {setRequestLocale} from 'next-intl/server';
import {randomVideo} from "~/data/openaiVideo";
import {getIndexLanguageText,getFooterLanguageText,getJsonEditorPageLanguageText, getQuestionLanguageText} from "~/configs/languageText";

export default async function IndexPage({params}: {params: Promise<{locale: string}>}) {
  const {locale = ''} = await params;
  // Enable static rendering
  setRequestLocale(locale);
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
