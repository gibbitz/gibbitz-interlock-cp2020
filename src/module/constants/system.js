export const SYSTEM_NAME = 'cp2020'
export const SYSTEM_PROJECT_NAME = `gibbitz-interlock-${SYSTEM_NAME}`

export const DATA_IMPORT_BASE_PATH = `/systems/${SYSTEM_PROJECT_NAME}/data/`

export const SKILLS_COMPENDIUM_PACK_NAME = `${SYSTEM_PROJECT_NAME}.skills`
export const SKILLS_COMPENDIUM_DATA_PATH = `${DATA_IMPORT_BASE_PATH}skills.json`
export const ARMOR_COMPENDIUM_PACK_NAME = `${SYSTEM_PROJECT_NAME}.armor`
export const ARMOR_COMPENDIUM_DATA_PATH = `${DATA_IMPORT_BASE_PATH}armor.json`

// TODO: Avoid using this if possible
// anti-pattern global CONFIG variable injection (see gibbitz-interlock-cp2020.mjs)
export const CP_2020 = {}