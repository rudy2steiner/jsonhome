'use client'
import {useRouter} from "next/navigation";
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import {useState,useEffect,useRef,useCallback} from "react";
import {randomVideo} from "~/data/openaiVideo";
import HeadInfo from "~/components/HeadInfo";
import {useCommonContext} from "~/context/common-context";
import Link from "next/link";
import { languages,getLanguageByLang,getEditorLocale} from "~/config";
import type { Content, OnChangeStatus } from 'vanilla-jsoneditor'
import dynamic from 'next/dynamic'

const JSONEditorReact = dynamic(() => import('~/components/JSONEditorReact'), { ssr: false })
const initialContent = {
  hello: 'world',
  count: 1,
  foo: ['bar', 'car']
}

const PageComponent = ({
                         locale = '',
                         indexLanguageText,
                         initVideoList = [],
                         questionText
                       }) => {
  const router = useRouter();
  const lang = getEditorLocale(locale);
  const [jsonContent, setJsonContent] = useState<Content>({ json: initialContent })
  const handler = useCallback(
      (content: Content, previousContent: Content, status: OnChangeStatus) => {
        setJsonContent(content)
      },
      [jsonContent]
  )
  function menu(items, context){
      return items.filter(v => v.text !== "table" && v.text !== "text" && v.text !== "tree" && v.type === "button");
  }
  const props={
     mainMenuBar: false,
     askToFormat: false
  }
  return (
    <>
      <HeadInfo
        title={indexLanguageText.title}
        description={indexLanguageText.description}
        locale={locale}
        page={""}
      />
      <Header locale={locale} indexLanguageText={indexLanguageText}/>
      <p className="text-black text-center text-xl mb-3 mt-5">{indexLanguageText.pDescription}</p>
      <JSONEditorReact onChange={handler} onRenderMenu={menu} />
      <Footer
        locale={locale}
        description={indexLanguageText.description}
      />
    </>
  )
}
export default PageComponent
