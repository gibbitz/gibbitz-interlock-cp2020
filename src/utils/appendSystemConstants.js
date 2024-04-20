import {
  buildAvailabilitiesSelectOptions,
  buildConcealabilitySelectOptions,
  buildCyberwearModifierOptions,
  buildLocationOptions,
  buildStatSelectOptions,
  buildWeaponTypeSelectOptions,
  SYSTEM_NAME
} from "../constants"


/**
 * Appends the system constants a context passed to the function and returns the joint Object
 * for use as the data passed from getData() in documents to provide the constants to handlebars
 * @param {Object} context context to be extended with the system constants
 * @param {Object} i18n the internationalization class from Foundry that provides the localize function
 * @returns {Object}
 */
export const appendSystemConstants = (context, i18n) => {
  const constants = {
    SYSTEM_NAME,
    ITEM_AVAILABILITIES_SELECT_OPTIONS: buildAvailabilitiesSelectOptions(i18n),
    WEAPON_CONCEALABILITY_SELECT_OPTIONS: buildConcealabilitySelectOptions(i18n),
    WEAPON_TYPE_SELECT_OPTIONS: buildWeaponTypeSelectOptions(i18n),
    CYBERWEAR_MODIFIER_TYPE_SELECT_OPTIONS: buildCyberwearModifierOptions(i18n),
    LOCATION_SELECT_OPTIONS: buildLocationOptions(i18n),
    STAT_SELECT_OPTIONS: buildStatSelectOptions(i18n)
  }
  return { ...context, ...constants }
}
