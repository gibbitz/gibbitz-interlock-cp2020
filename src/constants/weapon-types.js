import { translateObjectKeysFromValues } from "../utils/translateObjectKeysFromValues"

export const WEAPON_I18N_BASE = 'cp2020.items.weapon'
export const WEAPON_TYPE_I18N_BASE = `${WEAPON_I18N_BASE}.types`

export const MELEE = "melee"
export const PISTOL = "pistol"
export const SMG = "submachineGun"
export const RIFLE = "rifle"
export const BOW = "bow"
export const HEAVY_WEAPONS = "heavyWeapons"


export const WEAPON_TYPES = [
  HEAVY_WEAPONS,
  BOW,
  RIFLE,
  SMG,
  PISTOL,
  MELEE
]

export const buildWeaponTypeSelectOptions = (i18n) =>
  translateObjectKeysFromValues(
    i18n,
    WEAPON_TYPES,
    (val) => `${WEAPON_TYPE_I18N_BASE}.${val}.long`
  )
