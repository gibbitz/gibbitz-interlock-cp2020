import {
  SYSTEM_NAME
} from "@constants"
import {
  buildAvailabilitiesSelectOptions,
  buildConcealabilitySelectOptions,
  buildCyberwearModifierOptions,
  buildLocationOptions,
  buildRelativeAgeSelectOptions,
  buildStatSelectOptions,
  buildWeaponTypeSelectOptions
} from '@utils/buildSelectOptions'


/**
 * Appends the system constants to the context passed to the function,
 * localizes the select options and returns the merged Object
 *
 * for use as the data passed from `getData()` in documents
 * to provide these constants to handlebars
 * @param {Object} context context to be extended with the system constants
 * @param {Localization} i18n the i18n class that provides the localize function
 * @returns {Object}
 */
export const appendSystemConstants = (context, i18n) => ({
  ...context,
  SYSTEM_NAME,
  ITEM_AVAILABILITIES_SELECT_OPTIONS: buildAvailabilitiesSelectOptions(i18n),
  WEAPON_CONCEALABILITY_SELECT_OPTIONS: buildConcealabilitySelectOptions(i18n),
  WEAPON_TYPE_SELECT_OPTIONS: buildWeaponTypeSelectOptions(i18n),
  CYBERWEAR_MODIFIER_TYPE_SELECT_OPTIONS: buildCyberwearModifierOptions(i18n),
  LOCATION_SELECT_OPTIONS: buildLocationOptions(i18n),
  STAT_SELECT_OPTIONS: buildStatSelectOptions(i18n),
  RELATIVE_AGE_SELECT_OPTIONS: buildRelativeAgeSelectOptions(i18n)
})
