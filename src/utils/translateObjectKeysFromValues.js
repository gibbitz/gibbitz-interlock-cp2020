export const translateObjectKeysFromValues = (i18n, valueArray, buildLanguagePath = (val) => val) =>
  valueArray.reduce((outputValues, value) => ({
    [i18n.localize(buildLanguagePath(value))]: value,
    ...outputValues
  }), {})
