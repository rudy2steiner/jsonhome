'use client'
import {useRouter} from "next/navigation";
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import {useState,useEffect,useCallback,useRef,useMemo} from "react";
import HeadInfo from "~/components/HeadInfo";
import {useCommonContext} from "~/context/common-context";
import {useInterval} from "ahooks";
import Link from "next/link";
import Script from 'next/script'
import { languages,getLanguageByLang,getEditorLocale} from "~/config";
import {Editor,loader,useMonaco} from "@monaco-editor/react";
import Datepicker from '~/components/time/Datepicker.jsx';
import Results from '~/components/time/Results.jsx';
import { Form, Formik, FormikProps } from 'formik';
import { fromUnixTime, format, getUnixTime } from 'date-fns';
import { FaClock } from 'react-icons/fa';
import { FiRepeat } from 'react-icons/fi';
import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image'
import Input from '~/components/Input';
import Button from '~/components/Button';
import {DatePicker} from "@nextui-org/react";
import moment,{ Moment }  from 'moment';
import Picker from 'rc-picker';
import momentGenerateConfig from "rc-picker/lib/generate/moment";
import React from 'react';
import zhCN from 'rc-picker/lib/locale/zh_CN';
import en_US from 'rc-picker/lib/locale/en_US';
import "rc-picker/assets/index.css";
import { Container } from './styles';


interface FormValues {
  timestamp: string;
}

const PageComponent = ({
                         locale = '',
                         timestampLanguageText,
                         indexLanguageText
                       }) => {
    const editorRef = useRef(null);
    const [date, setDate] = useState<string>();
    const [dateTime, setDateTime] = useState({});
    useEffect(() => {
        const date = new Date();
        setDateTime(date);
    }, [])
    const initialValues: FormValues = useMemo(
      () => ({
        timestamp: String(getUnixTime(new Date())),
      }),
      [],
    );
    const gotATime = dateTime => {
        setDateTime(dateTime);
    }

    const handleFormOnSubmit = (values: FormValues): void => {
      console.log('timestamp:'+values.timestamp)
      const unit= (document.getElementById("timestamp_unit") as HTMLInputElement).value;
      if (unit == 'ms') {
         const parsedDate = fromUnixTime(+values.timestamp/1000);
         setDate(format(parsedDate, 'yyyy-MM-dd HH:mm:ss'));
      } else {
          const parsedDate = fromUnixTime(+values.timestamp);
          setDate(format(parsedDate, 'yyyy-MM-dd HH:mm:ss'));
      }
    };
  function handleTimeStampChange(){
        const unit= (document.getElementById("timestamp_unit") as HTMLInputElement).value;
        const timestamp= (document.getElementById("timestamp") as HTMLInputElement).value;
        console.log('timestamp:'+timestamp);
        console.log('timestamp unit:'+unit);
        if (unit=='ms') {
           const parsedDate = fromUnixTime(Number(timestamp)/1000);
           setDate(format(parsedDate, 'yyyy-MM-dd HH:mm:ss'));
        } else {
           const parsedDate = fromUnixTime(Number(timestamp));
           setDate(format(parsedDate, 'yyyy-MM-dd HH:mm:ss'));
        }
   }
   const defaultValue = moment();
   const [value, setValue] = React.useState<Moment | null>(defaultValue);
   const onSelect = (newValue: Moment) => {
      console.log('Select:', newValue);
    };
    const onChange = (newValue: Moment | null, formatString?: string) => {
      console.log('Change:', newValue, formatString);
      console.log('Change timestamp:', newValue.toDate().getTime(), formatString);
      setValue(newValue);
      setDateTime(newValue.toDate());
    };
  const sharedProps = {
      generateConfig: momentGenerateConfig,
      value,
      onSelect,
      onChange,
    };
  return (
    <>
      <HeadInfo
        title={timestampLanguageText.title}
        description={timestampLanguageText.description}
        locale={locale}
        page={"/timestamp"}
      />
    <Header locale={locale} page={"timestamp"} indexLanguageText={indexLanguageText}/>
    <Container>
          <header className="mt-10">
            <FiRepeat size={40} color="#F97316" />
            <div>
              <h1>{timestampLanguageText.h1}</h1>
              <h2 className="text-xs">{timestampLanguageText.h2_1}</h2>
            </div>
          </header>
          <Formik initialValues={initialValues} onSubmit={handleFormOnSubmit}>
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
            }: FormikProps<FormValues>) => (
              <Form onSubmit={handleSubmit}>
              <div className="flex justify-between ">
                <Input
                  icon={FaClock}
                  name="timestamp"
                  id="timestamp"
                  placeholder="Timestamp"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.timestamp}
                />
                <select
                       name="unit"
                       id="timestamp_unit"
                       className=" ml-2 border-2 border-orange-300 text-gray-700 sm:text-sm"
                       onChange={handleTimeStampChange}
                     >
                       <option value="s">s</option>
                       <option value="ms">ms</option>
                  </select>
                  <Button type="submit" className="ml-5">
                    {timestampLanguageText.convert}
                  </Button>
               </div>
                {date && (
                  <>
                    <hr />
                    <div className="mx-auto">
                        <span>Timestamp date:</span>
                        <span className="ml-2">{date}</span>
                    </div>
                  </>
                )}
              </Form>
            )}
          </Formik>
     </Container>
     <ScWrapper>
            <ScInner>
              <ScMain >
                <h2 className="mb-5 mx-auto mt-10 font-bold">{timestampLanguageText.h2_2}</h2>
                <ScSelectWrapper >
                  <ScAction className="text-center">{timestampLanguageText.pick_date}</ScAction>
                  <div className="flex justify-between ml-2">
                  <Picker<Moment>
                    {...sharedProps}
                    locale={en_US}
                    defaultPickerValue={defaultValue.clone()}
                    showTime={{
                      showHour:true,
                      showMinute:true,
                      showSecond: true,
                      defaultValue: moment('11:28:39', 'HH:mm:ss'),
                    }}
                    disabledTime={date => {
                      if (date && date.isSame(defaultValue, 'date')) {
                        return {
                          disabledHours: () => [1, 3, 5, 7, 9, 11],
                        };
                      }
                      return {};
                    }}
                  className="border-2 border-orange-300" />
                  </div>
                </ScSelectWrapper>
                <Results dateTime={dateTime} />
              </ScMain>
            </ScInner>
    </ScWrapper>
    <Footer
        locale={locale}
        description={indexLanguageText.description}
    />
    </>
  )

}

const ScWrapper = styled.div`
  display: flex;
  position: relative;
  height: 70vh;
`;

const ScInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ScMain = styled.main`
  width: 640px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const ScTitle = styled.h1`
  font-size: 32px;
  font-weight: 200;
  text-align: center;
  margin-bottom: 8px;
`;

const ScDescription = styled.p`
  text-align: center;
  margin-top: 0;
`;

const ScAction = styled.p`
  font-size: 16px;
  text-align: center;
  margin: 0;
`;

const ScSelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 24px;
`;

const ScCopyright = styled.small`
  text-align:center;
  margin-top: 24px;
  font-size: 14px;

  a {
    color: var(--color-text);
    text-decoration: none;
  }
`;

const ScSponsor = styled.div`
  display:flex;
  justify-content: center;
  margin-top: 8px;
  gap: 16px;

  img {
    cursor: pointer;
  }
`;


const ScCardContainer = styled.div`
  display: flex;
  padding: 16px 16px 0;
  gap: 16px;
  width: 100%;
  justify-content: end;
  box-sizing: border-box;

@media (max-width: 812px) {
  flex-direction: column;
  }

`;

const ScCard = styled.a`
  background: var(--color-card);
  color: var(--color-text);
  border-radius: 12px;

  &:hover {
    color: var(--color-text);
    background: var(--color-card-hover);
  }

  &:visited, &:focused {
    color: var(--color-text);
  }
`;

const ScCardInner = styled.div`
  display: inline-flex;
  gap: 16px;
  align-items: center;
  padding: 8px;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`;

const ScImageWrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 8px;
  overflow: hidden;
`;

const ScCardTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;

const ScCardDescription = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: var(--color-muted);
`;

const ScCardText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ScCardInnerWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export default PageComponent
