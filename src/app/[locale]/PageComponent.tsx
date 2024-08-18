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
    <h1 className="text-black text-center text-xl mb-3 mt-5">{indexLanguageText.h1}</h1>
    <JSONEditorReact  onChange={handler} onRenderMenu={menu} />
    <section>
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-5 py-16 md:px-10 md:py-24 lg:py-32">
            <h2 className="mx-auto text-center font-bold text-black text-3xl lg:text-5xl"> {questionText.h2_0} </h2>
            <div className="mt-10 flex w-full max-w-[900px] flex-col space-y-4">
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        <h2 className="font-bold text-black text-xl">{questionText.h2_1}</h2>
                    </div>
                    <div className="collapse-content">
                        <p className="font-inter text-base font-light text-gray-500">
                           {questionText.h2_1_p1}
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium">
                        <h2 className="font-bold text-black text-xl">{questionText.h2_2}</h2>
                    </div>
                    <div className="collapse-content">
                        <p className="font-inter text-base font-light text-gray-500">
                            {questionText.h2_2_p1}
                        </p>
                        <p className="font-inter mt-4 text-base font-light text-gray-500">{questionText.h2_2_p2}</p>
                        <ul className="list-inside list-disc">
                            <li className="font-inter text-base font-light text-gray-500">{questionText.h2_2_p3a}</li>
                            <li className="font-inter text-base font-light text-gray-500">{questionText.h2_2_p3b}</li>
                            <li className="font-inter text-base font-light text-gray-500">{questionText.h2_2_p3c}</li>
                            <li className="font-inter text-base font-light text-gray-500">{questionText.h2_2_p3d}</li>
                            <li className="font-inter text-base font-light text-gray-500">{questionText.h2_2_p3e}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer
        locale={locale}
        description={indexLanguageText.description}
    />
    </>
  )
}
export default PageComponent
