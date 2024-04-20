import { translateObjectKeysFromValues } from "../utils/translateObjectKeysFromValues"

const INT = 'INT'
const REF = 'REF'
const TECH = 'TECH'
const CL = 'CL'
const ATT = 'ATT'
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

export const STATS_I18N_BASE = 'cp2020.stats'

export const CORE_STATS = [
  INT,
  REF,
  TECH,
  CL,
  ATT,
  LUCK,
  MA,
  BODY,
  EMP
]
export const ALL_STATS = [
  INT,
  REF,
  TECH,
  CL,
  ATT,
  LUCK,
  MA,
  BODY,
  EMP,
  REP,
  HUM,
  HL,
  RUN,
  LEAP,
  CA,
  LIFT
]
/**
 * builds key value pairs of the localized Core Stat name and the internal Stat abbreviation
 * for use as select <option/>s
 * @param {Object} i18n the internationalization class from Foundry that provides the localize function
 * @returns {Object} key -> value pairs of name and abbreviation
 */
export const buildStatSelectOptions = (i18n) =>
  translateObjectKeysFromValues(
    i18n,
    CORE_STATS,
    (val) => `${STATS_I18N_BASE}.${val}.long`
  )