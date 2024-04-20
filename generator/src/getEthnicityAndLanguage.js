import getRandomValue from './utils/getRandomValue'

const MULTIPLE = 'Multiple'

const getEthnoData = async (languageFilter) => {
  const {
    ethnicity,
    language
  } = await getRandomValue('data/ethnicity.json', languageFilter)

  if (ethnicity !== MULTIPLE) {
    return { ethnicity, primaryLanguage: language }
  // multi-ethnic logic
  } else {
    let {
      ethnicity,
      primaryLanguage,
      motherEthnicity,
      motherLanguage
    } = await getEthnoData(languageFilter)
    if (!motherEthnicity || motherEthnicity === ethnicity) {
      const motherEthnoData = await getEthnoData(languageFilter)
      motherEthnicity = motherEthnoData.ethnicity
      motherLanguage = motherEthnoData.primaryLanguage
    }
    return { ethnicity, primaryLanguage, motherEthnicity, motherLanguage }
  }
}

// get Ethnicity & language
export const getEthnicityAndLanguage = async (lang) => {
  const languageFilter = lang && { language: lang }

  let {
    ethnicity,
    primaryLanguage,
    motherEthnicity,
    motherLanguage
  } = await getEthnoData(languageFilter)

  ethnicity = motherEthnicity
    ? `${ethnicity}/${motherEthnicity}`
    : ethnicity

  const language = motherLanguage
    ? `${primaryLanguage}, ${motherLanguage}`
    : primaryLanguage

  return {
    ethnicity,
    language,
    primaryLanguage,
    motherLanguage
  }
}