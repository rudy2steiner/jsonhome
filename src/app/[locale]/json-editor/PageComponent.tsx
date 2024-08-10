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
import {Editor,loader,useMonaco} from "@monaco-editor/react";

const PageComponent = ({
                         locale = '',
                         indexLanguageText,
                         playgroundText
                       }) => {
  const editorRef = useRef(null);
  function handleEditorDidMount(editor, monaco) {
      editorRef.current = editor;
  }
  function pretty(e) {
    e.preventDefault()
    editorRef.current.trigger('', 'editor.action.formatDocument');
  }
  function minify(e) {
      e.preventDefault()
      if (editorRef.current.getValue() == undefined || editorRef.current.getValue().length==0) {
           console.log("empty")
           return
        }
        console.log(editorRef.current.getValue())
        const lines = editorRef.current.getValue().split("\n");
        const trimmedLines = lines.map((line) => line.trim());
        const filteredLines = trimmedLines.filter((line) => line !== "");
        const finalJson = filteredLines.join("");
        editorRef.current.getModel().setValue(finalJson);
  }
  return (
    <>
      <HeadInfo
        title={indexLanguageText.title}
        description={indexLanguageText.description}
        locale={locale}
        page={"/json-editor"}
      />
    <Header locale={locale} page={"json-editor"} indexLanguageText={indexLanguageText}/>
    <p className="text-black text-center text-xl mb-3 mt-5">{indexLanguageText.soraVideoExample}</p>
    <div className="mx-auto w-[80%] h-[100%] border-blue-200 border-2 mb-2">
      <div className="">
        <Editor
          height="calc(60vh)"
          language="json"
          defaultValue=''
          onMount={handleEditorDidMount}
        />
      </div>
      <div className="flex justify-between pt-2">
        <div className="flex-shrink-0 ">
          <button  onClick={pretty} className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-1 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 ml-2 mb-2">
            format
          </button>
          <button onClick={minify} className="inline-block rounded border border-indigo-600 px-5 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500 ml-2 mb-2 ">
           compact
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
