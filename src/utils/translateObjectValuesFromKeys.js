export const translateObjectValuesFromKeys = (
  i18n,
  keyArray,
  buildLanguagePath = (val) => val
) =>
  keyArray.reduce((outputValues, key) => ({
    [key]: [i18n.localize(buildLanguagePath(key))],
    ...outputValues
  }), {})
