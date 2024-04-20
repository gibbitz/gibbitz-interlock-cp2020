import { translateObjectKeysFromValues } from "../utils/translateObjectKeysFromValues"

export const CYBERWEAR_I18N_BASE = 'cp2020.items.cyberwear'
export const CYBERWEAR_MODIFIER_TYPE_I18N_BASE = `${CYBERWEAR_I18N_BASE}.modifierTypes`

export const SKILL_MODIFIER_TYPE = "skill"
export const STAT_MODIFIER_TYPE = "stat"

export const MODIFIER_TYPES = [
  SKILL_MODIFIER_TYPE,
  STAT_MODIFIER_TYPE
]
/**
 * builds key value pairs of the localized modifyer type name and the internal name
 * for use as select <option/>s
 * @param {Object} i18n the internationalization class from Foundry that provides the localize function
 * @returns {Object} key -> value pairs of localized name and internal name
 */
export const buildCyberwearModifierOptions = (i18n) =>
  translateObjectKeysFromValues(
    i18n,
    MODIFIER_TYPES,
    (val) => `${CYBERWEAR_MODIFIER_TYPE_I18N_BASE}.${val}`
  )