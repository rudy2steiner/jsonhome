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

const PageComponent = ({
                         locale = '',
                         indexLanguageText,
                         playgroundText
                       }) => {
  const router = useRouter();
  const lang = getEditorLocale(locale);
  const editor = useRef<JSONEditor | null>(null);
  useEffect(() => {
       const container = document.getElementById("left")
       const options = {
           language: lang,
           mode: 'code',
           modes: ['code', 'form', 'text', 'tree', 'view', 'preview'], // allowed modes
           onChangeText: function (jsonString) {
               console.log('onChangeText', jsonString);
            }
       }
       editor.current = new JSONEditor(container, options)
       editor.current.set()
       return () => {
         editor.current?.destroy();
       };
    }, []);
  return (
    <>
      <HeadInfo
        title={indexLanguageText.title}
        description={indexLanguageText.description}
        locale={locale}
        page={"/json-editor"}
      />
    <Header locale={locale} page={"json-editor"} indexLanguageText={indexLanguageText}/>
    <div className={"mb-5"}>
    <h2  className={"text-black pt-4 text-1xl flex justify-center items-center"}>Fast edit,format and compress json</h2>
    </div>
    <div className={"w-[80%] h-[100%] mx-auto mb-5"} id="left"></div>
    <Footer
        locale={locale}
        description={indexLanguageText.description}
    />
    </>
  )


}
export default PageComponent
