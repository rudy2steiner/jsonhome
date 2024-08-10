'use client'
import {useRouter} from "next/navigation";
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import {useState,useEffect,useRef} from "react";
import {randomVideo} from "~/data/openaiVideo";
import HeadInfo from "~/components/HeadInfo";
import {useCommonContext} from "~/context/common-context";
import Link from "next/link";
import { languages,getLanguageByLang,getEditorLocale} from "~/config";

const PageComponent = ({
                         locale = '',
                         indexLanguageText,
                         initVideoList = [],
                         questionText
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
        page={""}
      />
      <Header locale={locale} indexLanguageText={indexLanguageText}/>
      <p className="text-black text-center text-xl mb-3 mt-5">{indexLanguageText.pDescription}</p>
      <div className={"w-[80%] h-[100%] mx-auto mb-2"} id="left"></div>
      <Footer
        locale={locale}
        description={indexLanguageText.description}
      />
    </>
  )
}
export default PageComponent
