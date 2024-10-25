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

loader.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs' } });

const PageComponent = ({
                         locale = '',
                         indexLanguageText,
                         jsonEditorText
                       }) => {
  const editorRef = useRef(null);
  const editorLocale = getEditorLocale(locale)
  console.log('editor mount locale:'+{locale}+'->'+editorLocale);
  function handleEditorDidMount(editor, monaco) {
      editorRef.current = editor;
  }
  function format(e) {
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
        title={jsonEditorText.title}
        description={jsonEditorText.description}
        keywords={jsonEditorText.keywords}
        locale={locale}
        page={"/json-editor"}
      />
    <Header locale={locale} page={"json-editor"} indexLanguageText={indexLanguageText}/>
    <p className="text-black text-center text-xl mb-3 mt-5">{jsonEditorText.h1}</p>
    <div className="mx-auto w-[80%] h-[100%] border-blue-200 border-2 mb-2">
      <div className="flex justify-between pt-2 pb-2">
          <div className="flex-shrink-0 ">
            <button  onClick={format} className="btn btn-outline btn-sm btn-primary ml-5">
              {jsonEditorText.format}
            </button>
            <button onClick={minify} className="btn btn-outline btn-sm  ml-2">
              {jsonEditorText.compact}
            </button>
          </div>
      </div>
      <div className="">
        <Editor
          height="calc(60vh)"
          language="json"
          defaultValue=''
          onMount={handleEditorDidMount}
        />
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
