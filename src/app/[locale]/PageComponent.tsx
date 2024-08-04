'use client'
import {useRouter} from "next/navigation";
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import {useState} from "react";
import {randomVideo} from "~/data/openaiVideo";
import HeadInfo from "~/components/HeadInfo";
import {useCommonContext} from "~/context/common-context";
import Link from "next/link";

const PageComponent = ({
                         locale = '',
                         indexLanguageText,
                         initVideoList = [],
                         questionText
                       }) => {
  const router = useRouter();

  const [textStr, setTextStr] = useState('');
  const {setShowGeneratingModal, setShowLoadingModal} = useCommonContext();


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setChooseAPI('FakeSora');
    if (!textStr) {
      setVideoList(randomVideo(2));
      return;
    }
    setShowGeneratingModal(true);
    const body = {
      prompt: textStr
    };
    const response = await fetch(`/${locale}/api/generate`, {
      method: 'POST',
      body: JSON.stringify(body)
    })
    const result = await response.json();
    setShowGeneratingModal(false);
    if (result.data) {
      if (!result.data[0].revised_prompt) {
        return
      }
      const video = {
        revised_prompt: result.data[0].revised_prompt,
        url: result.data[0].url
      }

      // add storage
      const videoHistoryListStr = localStorage.getItem('videoHistoryList');
      if (!videoHistoryListStr) {
        const videoHistoryList = [];
        videoHistoryList.unshift(video);
        localStorage.setItem('videoHistoryList', JSON.stringify(videoHistoryList));
      } else {
        const videoHistoryList = JSON.parse(videoHistoryListStr);
        // check exist
        let exist = false;
        for (let i = 0; i < videoHistoryList.length; i++) {
          const videoHistory = videoHistoryList[i];
          if (videoHistory.revised_prompt == video.revised_prompt) {
            exist = true;
            localStorage.setItem('video', JSON.stringify(video));
            router.push(`/${locale}/playground`)
            return;
          }
        }
        if (!exist) {
          videoHistoryList.unshift(video);
          // const newList = videoHistoryList.slice(0, 3);
          localStorage.setItem('videoHistoryList', JSON.stringify(videoHistoryList));
        }
      }
      localStorage.setItem('video', JSON.stringify(video));
      router.push(`/${locale}/playground`)
    }
  }

  const [videoList, setVideoList] = useState(initVideoList);

  const handleMouseEnter = (event) => {
    event.target.play();
  };

  const handleMouseLeave = (event) => {
    event.target.pause();
  };

  const [chooseAPI, setChooseAPI] = useState('FakeSora');

  return (
    <>
      <HeadInfo
        title={indexLanguageText.title}
        description={indexLanguageText.description}
        locale={locale}
        page={""}
      />
      <Header locale={locale} indexLanguageText={indexLanguageText}/>
      <div>
        <div className="block overflow-hidden bg-[#020d24] bg-cover bg-center text-white"
             style={{backgroundImage: 'https://assets.website-files.com/6502af467b2a8c4ee8159a5b/6502af467b2a8c4ee8159a77_Group%2047929.svg'}}>
          <div className="mx-auto w-full max-w-7xl px-5 mb-5">
            <div
              className="mx-auto flex max-w-4xl flex-col items-center text-center py-10">
              <h1 className="mb-4 text-4xl font-bold md:text-6xl">{indexLanguageText.h1Text}</h1>
              <div className="mb-5  lg:mb-8">
                <p className="text-[#7c8aaa] text-xl">{indexLanguageText.pDescription}</p>
              </div>
               <Link href={`/${locale}/json-editor`}
                  className={"flex justify-center items-center text-xl text-blue-400 hover:text-blue-600"}>
               Get Started {'>>'}
              </Link>
            </div>


            <div className={"border-[14px] border-[#ffffff1f] object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto bg-white"}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{indexLanguageText.soraVideoExample}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-4">
                  {videoList.map((file) => (
                    <div key={file.prompt}>
                      <div
                        className="rounded-xl flex justify-center items-start">
                        <video
                          src={file.videoUrl}
                          controls={true}
                          autoPlay={false}
                          playsInline={true}
                          preload={"metadata"}
                          controlsList={"nodownload"}
                          onMouseOver={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          style={{width: '90%', height: '270px'}}
                        />
                      </div>
                      <div className={"flex justify-center items-center"}>
                        <p
                          className="pointer-events-none mt-2 block text-sm font-medium text-gray-500 w-[90%]">{indexLanguageText.prompt}: {file.prompt}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div key={"more"} className={"px-6 py-4"}>
                  <Link href={`/${locale}/videos`}
                        className={"flex justify-center items-center text-xl text-red-400 hover:text-blue-600"}>
                    {indexLanguageText.moreExample} {'>>'}
                  </Link>
                </div>
              </div>
            </div>

            <div className={"border-[14px] border-[#ffffff1f] object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto bg-white py-8"}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{questionText.h2_1}</h2>
                </div>
                <div className={"w-[96%] text-gray-700 prose mx-auto mt-4"}>
                  <p>
                    {questionText.h2_1_p1}
                  </p>
                  <p>
                    {questionText.h2_1_p2}
                  </p>
                  <p>
                    {questionText.h2_1_p3}
                  </p>
                  <p>{questionText.h2_1_p4}<Link
                    href={"https://openai.com/sora"} className={"text-blue-500"}>https://openai.com/sora</Link>.</p>
                </div>
              </div>
            </div>

            <div className={"border-[14px] border-[#ffffff1f] object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto bg-white py-8"}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{questionText.h2_2}</h2>
                </div>
                <div className={"w-[96%] text-gray-700 prose mx-auto mt-4"}>
                  <p>
                    {questionText.h2_2_p1}
                  </p>
                  <p>
                    {questionText.h2_2_p2}
                  </p>
                  <p>
                    {questionText.h2_2_p3}
                  </p>
                  <p>
                    {questionText.h2_2_p4a}<Link href={"https://sorawebui.com/"}
                                                 className={"text-blue-500"}>https://sorawebui.com/</Link>{questionText.h2_2_p4b}<Link
                    href={"https://github.com/SoraWebui/SoraWebui"}
                    className={"text-blue-500"}>https://github.com/SoraWebui/SoraWebui</Link>.
                  </p>
                </div>
              </div>
            </div>

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
