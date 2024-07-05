import { translateObjectKeysFromValues } from '../utils/translateObjectKeysFromValues'

export const SIBLING_I18N_BASE = 'cp2020.siblings'
export const RELATIVE_AGE_I18N_BASE = `${SIBLING_I18N_BASE}.ages`

const RELATIVE_AGE_VALUES = [-1, 0, 1]
const RELATIVE_AGE_KEYS = ['younger', 'twin', 'older']
export const buildRelativeAgeSelectOptions = (i18n) =>
  translateObjectKeysFromValues(
    i18n,
    RELATIVE_AGE_VALUES,
    (_val, index) => `${RELATIVE_AGE_I18N_BASE}.${RELATIVE_AGE_KEYS[index]}`
  )
