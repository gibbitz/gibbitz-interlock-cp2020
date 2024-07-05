import { translateObjectValuesFromKeys } from "../utils/translateObjectValuesFromKeys"
import { SYSTEM_NAME } from './system'

const INT = 'INT'
const REF = 'REF'
const TECH = 'TECH'
const CL = 'CL'
const ATTR = 'ATTR'
const LUCK = 'LUCK'
const MA = 'MA'
const BODY = 'BODY'
const EMP = 'EMP'
const REP = 'REP'
const HUM = 'HUM'
const HL = 'HL'
const RUN = 'RUN'
const LEAP = 'LEAP'
const CA = 'CA'
const LIFT = 'LIFT'
const THRO = 'THRO'
const BTM = 'BTM'
const DAM = 'DAM'

export const STATS_I18N_BASE = `${SYSTEM_NAME}.stats`

export const CORE_STATS = [
  INT,
  REF,
  TECH,
  CL,
  ATTR,
  LUCK,
  MA,
  BODY,
  EMP
]
export const SIMPLE_STATS = [
  REP,
  HL
]
export const DERIVED_STATS = [
  HUM,
  RUN,
  LEAP,
  CA,
  LIFT,
  THRO,
  BTM,
  DAM
]
export const ALL_STATS = [
  ...CORE_STATS,
  ...SIMPLE_STATS,
  ...DERIVED_STATS
]
/**
 * builds key value pairs of the localized Core Stat name and the internal Stat abbreviation
 * for use as select <option/>s
 * @param {Object} i18n the internationalization class from Foundry that provides the localize function
 * @returns {Object} key -> value pairs of name and abbreviation
 */
export const buildStatSelectOptions = (i18n) =>
  translateObjectValuesFromKeys(
    i18n,
    CORE_STATS,
    (val) => `${STATS_I18N_BASE}.${val}.long`
  )

export const BTM_VALUES = [
  0,
  0,
  0,
  -1,
  -1,
  -2,
  -2,
  -2,
  -3,
  -3,
  -4
]

export const DAMAGE_MODIFIER = [
  -2,
  -2,
  -2,
  -1,
  -1,
  0,
  0,
  0,
  1,
  1,
  2,
  4,
  4,
  6,
  6,
]