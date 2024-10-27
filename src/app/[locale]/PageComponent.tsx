'use client'
import {useRouter} from "next/navigation";
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import {useState,useEffect,useRef,useCallback} from "react";
import {randomVideo} from "~/data/openaiVideo";
import { languages,getLanguageByLang,getEditorLocale} from "~/config";
import type { Content, OnChangeStatus } from 'vanilla-jsoneditor';
import dynamic from 'next/dynamic';
import HeadInfo from "~/components/HeadInfo";
import {useCommonContext} from "~/context/common-context";
import {useInterval} from "ahooks";
import Link from "next/link";
import Script from 'next/script'
import * as monaco from 'monaco-editor';
import {Editor,loader,useMonaco} from "@monaco-editor/react";
import { Stack, IStackStyles } from "@fluentui/react";
import { ErrorMessageBar } from "~/components/error-message-bar";
import { TitleBar } from "~/components/title-bar";
import { ToolBar } from "~/components/tool-bar";
import { BorderLine } from "~/components/styles";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { useToggle } from "~/hooks";

import {
  downloadJsonFile,
  minifyJsonString,
  prettifyJsonString,
  parseJsonSchemaString,
} from "~/utils";

initializeIcons();
const stackStyles: IStackStyles = {
  root: {
    height: "inherit",
    borderTop: BorderLine,
    borderBottom: BorderLine,
  },
};

loader.config({ paths: { vs: "/vs" } });

const JSONEditorReact = dynamic(() => import('~/components/JSONEditorReact'), { ssr: false })
const initialContent = {
  hello: 'world',
  count: 1,
  foo: ['bar', 'car']
}

const PageComponent = ({
                         locale = '',
                         indexLanguageText,
                         footerLanguageText,
                         initVideoList = [],
                         questionText,
                         jsonEditorText
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
  const editorRef = useRef(null);
    const demoEditorRef = useRef(null);
    const editorLocale = getEditorLocale(locale);
    console.log('editor mount locale:'+{locale}+'->'+editorLocale);
    const [isValidJson, setIsValidJson] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [isAutoPrettifyOn, toggleAutoPrettifyOn] = useToggle(false);
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }
    function handleExampleEditorDidMount(editor, monaco) {
      console.log('handleEditorDidMount');
      const handler = editor.onDidChangeModelDecorations(_ => {
        handler.dispose();
        editor.getAction("editor.action.formatDocument").run();
      });
    }
    function format() {
      editorRef.current.trigger('', 'editor.action.formatDocument');
    }
    function minify() {
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
    const handleEditorValidation= useCallback((markers) => {
        const errorMessage = markers.map(
          ({ startLineNumber, message }) => `line ${startLineNumber}: ${message}`
        );
        const hasContent = editorRef.current?.getValue();
        const hasError: boolean = errorMessage.length > 0;
        setIsValidJson(!!hasContent && !hasError);
        setErrors(errorMessage);
     }, []);
     const handleExampleEditorValidation= useCallback((markers) => {
        console.log('example validate');
        demoEditorRef.current.trigger('', 'editor.action.formatDocument');
      }, []);
      const handleDownloadClick = () => {
      const value = editorRef.current?.getValue();
      value && downloadJsonFile(value);
      };
     const handleCompareClick = () => {
         //locale
         let hrefValue = `/${locale}/json-compare`;
         const  url= '/'+`{locale}`+'/json-compare';
         window.open(hrefValue, '_blank');
     };
     const handleEditorChange = useCallback(
         (value: string | undefined) => {
           if (isAutoPrettifyOn) {
              editorRef.current.trigger('', 'editor.action.formatDocument');
           }
           console.log(editorRef.current?.getValue());
         },
         [isAutoPrettifyOn]
    );
    const handleUploadClick = (file: File) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const result = fileReader.result as string;
          handleEditorUpdateValue(result);
        };
        fileReader.readAsText(file);
     };
    const handleEditorUpdateValue = useCallback((value?: string) => {
        const editor = editorRef.current;
        if (!editor) return;
        editor.setValue(value || "");
        value && editor?.getAction("editor.action.formatDocument")?.run();
      }, []);
    const handleClearClick = () => editorRef.current?.setValue("");
  return (
    <>
    <HeadInfo
        title={indexLanguageText.title}
        description={indexLanguageText.description}
        keywords={indexLanguageText.keywords}
        locale={locale}
        page={""}
    />
    <Header locale={locale} indexLanguageText={indexLanguageText}/>
    <p className="text-black text-center text-xl mb-3 mt-10">{jsonEditorText.title}</p>
   <div className="mx-auto w-[80%] h-[100%] border-blue-200 border-2 mb-2 mt-3">
     <Stack styles={stackStyles}>
        <Stack.Item>
           <ToolBar
             isAutoPrettifyOn={isAutoPrettifyOn}
             onAutoPrettifyChange={toggleAutoPrettifyOn}
             onClearClick={handleClearClick}
             onDownloadClick={handleDownloadClick}
             onMinifyClick={minify}
             onPrettifyClick={format}
             onCompareClick={handleCompareClick}
             onUploadClick={handleUploadClick}
             toolTexts={jsonEditorText} />
        </Stack.Item>
        <Stack styles={stackStyles}>
            <Stack.Item
                      grow
                      align="stretch"
                      style={{
                        height: `calc(100% - 20vh)`,
                      }}
                    >
             <Editor
                          height="calc(60vh)"
                          language="json"
                          defaultValue=''
                          onMount={handleEditorDidMount}
                          onChange={handleEditorChange}
                          onValidate={handleEditorValidation}
                        />
             </Stack.Item>
             <Stack.Item
               style={{
                 height: `15vh`,
               }}
             >
               <ErrorMessageBar errors={errors} toolTexts={jsonEditorText} />
             </Stack.Item>
         </Stack>
     </Stack>
   </div>
   <section >
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="max-w-screen-md mb-2 lg:mb-5">
                <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{jsonEditorText.h1}</h1>
                <p className="text-gray-500 sm:text-xl dark:text-gray-400">{jsonEditorText.h1_desc}</p>
            </div>
            <div className="space-y-8 ">
                <div>
                    <h2 className="mb-2 text-xl font-bold dark:text-white">{jsonEditorText.h2}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{jsonEditorText.h2_desc}</p>
                    <h3 className="font-inter mt-4 font-bold text-base dark:text-white ml-5">{jsonEditorText.h2_h3}</h3>
                    <ul className="list-inside list-disc ">
                         <li className="font-inter text-base font-light text-gray-500 ml-10">{jsonEditorText.h2_h3_l1}</li>
                         <li className="font-inter text-base font-light text-gray-500 ml-10">{jsonEditorText.h2_h3_l2}</li>
                         <li className="font-inter text-base font-light text-gray-500 ml-10">{jsonEditorText.h2_h3_l3}</li>
                         <li className="font-inter text-base font-light text-gray-500 ml-10">{jsonEditorText.h2_h3_l4}</li>
                         <li className="font-inter text-base font-light text-gray-500 ml-10">{jsonEditorText.h2_h3_l5}</li>
                    </ul>
                     <h3 className="mb-2 text-base font-bold dark:text-white mt-2 ml-5">{jsonEditorText.h2_h3_1}</h3>
                     <ul className="list-inside list-disc">
                       <li className="font-inter text-base font-light text-gray-500 ml-10">{jsonEditorText.h2_h3_1_l1}</li>
                       <li className="font-inter text-base font-light text-gray-500 ml-10">{jsonEditorText.h2_h3_1_l2} <b className="font-bold">{jsonEditorText.h2_h3_1_l2_1}</b>{jsonEditorText.h2_h3_1_l2_2} </li>
                       <li className="font-inter text-base font-light text-gray-500 ml-10">{jsonEditorText.h2_h3_1_l3}</li>
                    </ul>
                    <h3 className="mb-2 text-base font-bold dark:text-white mt-2 ml-5">{jsonEditorText.h2_h3_2}</h3>
                    <Editor height='100px' language="json"  defaultValue='{"name": "John Doe", "age": 30, "occupation": "Software engineer"}'
                            onMount={handleExampleEditorDidMount}
                    />
                </div>
                <div>
                    <h2 className="mb-2 text-xl font-bold dark:text-white">{jsonEditorText.h2_1}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{jsonEditorText.h2_1_desc}</p>
                    <p className="font-inter mt-4 text-base font-bold   ml-5">{jsonEditorText.h2_1_h3}</p>
                     <ul className="list-inside list-disc ">
                          <li className="font-inter text-base font-light text-gray-500 ml-10">{jsonEditorText.h2_1_h3_l1}</li>
                          <li className="font-inter text-base font-light text-gray-500 ml-10">{jsonEditorText.h2_1_h3_l2}</li>
                          <li className="font-inter text-base font-light text-gray-500 ml-10">{jsonEditorText.h2_1_h3_l3}</li>
                          <li className="font-inter text-base font-light text-gray-500 ml-10">{jsonEditorText.h2_1_h3_l4}</li>
                     </ul>
                </div>
                <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center">
                                 <h2 className="mx-auto text-center font-bold text-black text-xl"> {questionText.h2_0} </h2>
                                 <div className="mt-10 flex w-full flex-col space-y-4">
                                     <div className="collapse collapse-arrow bg-base-200">
                                         <input type="radio" name="my-accordion-2" defaultChecked/>
                                         <div className="collapse-title text-xl font-medium">
                                             <h3 className="font-bold text-black text-xl">{questionText.h2_1}</h3>
                                         </div>
                                         <div className="collapse-content">
                                             <p className="font-inter text-base font-light text-gray-500">
                                                {questionText.h2_1_p1}
                                             </p>
                                         </div>
                                     </div>
                                     <div className="collapse collapse-arrow bg-base-200">
                                         <input type="radio" name="my-accordion-2"  />
                                         <div className="collapse-title text-xl font-medium">
                                             <h3 className="font-bold text-black text-xl">{questionText.h2_2}</h3>
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
            </div>
        </div>
    </section>
    <Footer
        locale={locale}
        description={indexLanguageText.description}
        footerText={footerLanguageText}
    />
    </>
  )
}
export default PageComponent
