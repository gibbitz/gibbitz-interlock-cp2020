import { translateObjectValuesFromKeys } from "../utils/translateObjectValuesFromKeys"

export const EXCELLENT_AVAILABILITY = 'E'
export const COMMON_AVAILABILITY = 'C'
export const POOR_AVAILABILITY = 'P'
export const RARE_AVAILABILITY = 'R'

export const ITEM_AVAILABILITY_I18N_BASE = 'cp2020.items.availabilities'

export const ITEM_AVAILABILITIES = [
  RARE_AVAILABILITY,
  POOR_AVAILABILITY,
  COMMON_AVAILABILITY,
  EXCELLENT_AVAILABILITY
]

export const buildAvailabilitiesSelectOptions = (i18n) =>
  translateObjectValuesFromKeys(
    i18n,
    ITEM_AVAILABILITIES,
    (val) => `${ITEM_AVAILABILITY_I18N_BASE}.${val}.long`
  )

