import {getTranslations} from "next-intl/server";

export const getIndexLanguageText = async () => {
  const tIndex = await getTranslations('IndexPage');
  return {
    title: tIndex('title'),
    description: tIndex('description'),
    keywords: tIndex('keywords'),
    loadingText: tIndex('loadingText'),
    generateText: tIndex('generateText'),
    buttonText: tIndex('buttonText'),
    placeholderText: tIndex('placeholderText'),
    h1: tIndex('h1'),
    pDescription: tIndex('pDescription'),
    soraVideoExample: tIndex('soraVideoExample'),
    prompt: tIndex('prompt'),
    moreExample: tIndex('moreExample'),
    soraResultTitle: tIndex('soraResultTitle'),
    fakeSoraTip: tIndex('fakeSoraTip'),
    soraTip: tIndex('soraTip'),
  };
}


export const getQuestionLanguageText = async () => {
  const tIndexQuestion = await getTranslations('indexQuestion');
  return {
    h2_0: tIndexQuestion('h2_0'),
    h2_1: tIndexQuestion('h2_1'),
    h2_1_p1: tIndexQuestion('h2_1_p1'),
    h2_1_p2: tIndexQuestion('h2_1_p2'),
    h2_1_p3: tIndexQuestion('h2_1_p3'),
    h2_1_p4: tIndexQuestion('h2_1_p4'),
    h2_2: tIndexQuestion('h2_2'),
    h2_2_p1: tIndexQuestion('h2_2_p1'),
    h2_2_p2: tIndexQuestion('h2_2_p2'),
    h2_2_p3a: tIndexQuestion('h2_2_p3a'),
    h2_2_p3b: tIndexQuestion('h2_2_p3b'),
    h2_2_p3c: tIndexQuestion('h2_2_p3c'),
    h2_2_p3d: tIndexQuestion('h2_2_p3d'),
    h2_2_p3e: tIndexQuestion('h2_2_p3e'),
  }
}


export const getWorksPageLanguageText = async () => {
  const tWorks = await getTranslations('worksPage');
  return {
    title: tWorks('title'),
    description: tWorks('description'),
    format: tWorks('format'),
    compact: tWorks('compact'),
    h1Text: tWorks('h1Text'),
    pDescription: tWorks('pDescription'),
    generateNew: tWorks('generateNew'),
  }
}

export const getJsonEditorPageLanguageText = async () => {
  const tWorks = await getTranslations('jsonEditorPage');
  return {
    title: tWorks('title'),
    description: tWorks('description'),
    keywords: tWorks('keywords'),
    h1: tWorks('h1'),
    format: tWorks('format'),
    compact: tWorks('compact'),
    h1Text: tWorks('h1Text'),
    pDescription: tWorks('pDescription'),
    generateNew: tWorks('generateNew'),
  }
}

export const getVideosPageLanguageText = async () => {
  const tVideosPage = await getTranslations('videosPage');
  return {
    title: tVideosPage('title'),
    description: tVideosPage('description'),
    h1: tVideosPage('h1'),
    h2_1: tVideosPage('h2_1'),
    h2_2: tVideosPage('h2_2'),
    pick_date: tVideosPage('pick_date'),
  }
}

export const getTimestampPageLanguageText = async () => {
  const tVideosPage = await getTranslations('timestampPage');
  return {
    title: tVideosPage('title'),
    description: tVideosPage('description'),
    keywords: tVideosPage('keywords'),
    h1: tVideosPage('h1'),
    h2_1: tVideosPage('h2_1'),
    h2_2: tVideosPage('h2_2'),
    pick_date: tVideosPage('pick_date'),
    convert: tVideosPage('convert'),
  }
}

export const getPrivacyPolicyLanguageText = async () => {
  const tPrivacyPolicy = await getTranslations('privacyPolicy');
  return {
    title: tPrivacyPolicy('title'),
    description: tPrivacyPolicy('description'),
    h1: tPrivacyPolicy('h1'),
    date: tPrivacyPolicy('date'),
    desc: tPrivacyPolicy('desc'),
    h4_1: tPrivacyPolicy('h4_1'),
    h4_1_pa: tPrivacyPolicy('h4_1_pa'),
    h4_1_pb: tPrivacyPolicy('h4_1_pb'),
    h4_2: tPrivacyPolicy('h4_2'),
    h4_2_p: tPrivacyPolicy('h4_2_p'),
    h4_3: tPrivacyPolicy('h4_3'),
    h4_3_p: tPrivacyPolicy('h4_3_p'),
    h4_4: tPrivacyPolicy('h4_4'),
    h4_4_p: tPrivacyPolicy('h4_4_p'),
    h4_5: tPrivacyPolicy('h4_5'),
    h4_5_p: tPrivacyPolicy('h4_5_p'),
    h4_6: tPrivacyPolicy('h4_6'),
    h4_6_p: tPrivacyPolicy('h4_6_p'),
  }
}

export const getTermsOfServiceLanguageText = async () => {
  const tTermsOfService = await getTranslations('termsOfService');
  return {
    title: tTermsOfService('title'),
    description: tTermsOfService('description'),
    h1: tTermsOfService('h1'),
    date: tTermsOfService('date'),
    desc: tTermsOfService('desc'),
    h4_1: tTermsOfService('h4_1'),
    h4_1_p: tTermsOfService('h4_1_p'),
    h4_2: tTermsOfService('h4_2'),
    h4_2_p: tTermsOfService('h4_2_p'),
    h4_3: tTermsOfService('h4_3'),
    h4_3_p: tTermsOfService('h4_3_p'),
    h4_4: tTermsOfService('h4_4'),
    h4_4_p: tTermsOfService('h4_4_p'),
    h4_5: tTermsOfService('h4_5'),
    h4_5_p: tTermsOfService('h4_5_p'),
    h4_6: tTermsOfService('h4_6'),
    h4_6_p: tTermsOfService('h4_6_p'),
    h4_7: tTermsOfService('h4_7'),
    h4_7_p: tTermsOfService('h4_7_p'),
    h4_8: tTermsOfService('h4_8'),
    h4_8_p: tTermsOfService('h4_8_p'),
  }
}

export const getPlaygroundPageLanguageText = async () => {
  const tPlaygroundPage = await getTranslations('playgroundPage');
  return {
    title: tPlaygroundPage('title'),
    format: tPlaygroundPage('format'),
    compact: tPlaygroundPage('compact'),
    description: tPlaygroundPage('description'),
    h1Text: tPlaygroundPage('h1Text'),
    pDescription: tPlaygroundPage('pDescription'),
    moreWorks: tPlaygroundPage('moreWorks'),
  }
}

export const getJsonComparePageLanguageText = async () => {
  const tPlaygroundPage = await getTranslations('jsonComparePage');
  return {
    title: tPlaygroundPage('title'),
    description: tPlaygroundPage('description'),
    keywords: tPlaygroundPage('keywords'),
    format: tPlaygroundPage('format'),
    compact: tPlaygroundPage('compact'),
    h1: tPlaygroundPage('h1'),
    pDescription: tPlaygroundPage('pDescription'),
    moreWorks: tPlaygroundPage('moreWorks'),
  }
}
