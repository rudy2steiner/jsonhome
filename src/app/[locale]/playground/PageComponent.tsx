'use client'
import {useRouter} from "next/navigation";
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import {useState,useEffect,useCallback,useRef} from "react";
import HeadInfo from "~/components/HeadInfo";
import {useCommonContext} from "~/context/common-context";
import {useInterval} from "ahooks";
import Link from "next/link";
import Script from 'next/script'
import { languages,getLanguageByLang,getEditorLocale} from "~/config";
import {Editor,loader,useMonaco,DiffEditor} from "@monaco-editor/react";

const PageComponent = ({
                         locale = '',
                         indexLanguageText,
                         playgroundText
                       }) => {
  const lang = getEditorLocale(locale);
  const diffEditorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
      diffEditorRef.current = editor;
  }
  function format(e) {
      e.preventDefault()
      diffEditorRef.current.getOriginalEditor().trigger('', 'editor.action.formatDocument');
      diffEditorRef.current.getModifiedEditor().trigger('', 'editor.action.formatDocument');
  }
  const options= {
    originalEditable: true
  }
  return (
    <>
      <HeadInfo
        title={indexLanguageText.title}
        description={indexLanguageText.description}
        locale={locale}
        page={"/playground"}
      />
    <Header locale={locale} page={"json-editor"} indexLanguageText={indexLanguageText}/>
    <p className="text-black text-center text-xl mb-3 mt-5">{indexLanguageText.prompt}</p>
    <div className="mx-auto w-[80%]  h-[100%] border-blue-200 border-2 mb-2 ">
      <div className="">
        <DiffEditor
          height="60vh"
          language="json"
          options={options}
          onMount={handleEditorDidMount}
        />
      </div>
      <div className="flex justify-between pt-2">
        <div className="flex-shrink-0">
          <button  onClick={format} className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-1 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 ml-2 mb-2">
            format
          </button>
        </div>
      </div>
    </div>
    <Footer
        locale={locale}
        description={indexLanguageText.description}
    />
    </>
  )


}
export default PageComponent
