export const SKILL_DV = {
  'cp2020.selects.skillDifficulties.easy': 10,
  'cp2020.selects.skillDifficulties.average': 15,
  'cp2020.selects.skillDifficulties.difficult': 20,
  'cp2020.selects.skillDifficulties.veryDifficult': 25,
  'cp2020.selects.skillDifficulties.nearlyImpossible': 30
}
export const TO_HIT_DV = {
  'cp2020.selects.ranges.pointBlank': 10,
  'cp2020.selects.ranges.close': 15,
  'cp2020.selects.ranges.medium': 20,
  'cp2020.selects.ranges.long': 25,
  'cp2020.selects.ranges.extreme': 30,
}
export const RANGE_MULTIPLIERS = [0, 0.25, 0.5, 1, 2]
const BASE_SELECT_TO_HIT_I18N = 'cp2020.selects.modifiers.toHit'
export const TO_HIT_MODIFIERS ={
  [`${BASE_SELECT_TO_HIT_I18N}.immoble`]: 4,
  [`${BASE_SELECT_TO_HIT_I18N}.largeTarget`]: 4,
  [`${BASE_SELECT_TO_HIT_I18N}.smallTarget`]: -4,
  [`${BASE_SELECT_TO_HIT_I18N}.noTurret`]: -4,
  [`${BASE_SELECT_TO_HIT_I18N}.movingTarget10`]: -2,
  [`${BASE_SELECT_TO_HIT_I18N}.movingTarget12`]: -4,
  [`${BASE_SELECT_TO_HIT_I18N}.movingTarget14`]: -5,
  [`${BASE_SELECT_TO_HIT_I18N}.fastDraw`]: -3,
  [`${BASE_SELECT_TO_HIT_I18N}.ambush`]: 5,
  [`${BASE_SELECT_TO_HIT_I18N}.calledShot`]: -4,
  [`${BASE_SELECT_TO_HIT_I18N}.indirectFire`]: -5,
  [`${BASE_SELECT_TO_HIT_I18N}.blinded`]: -3,
  [`${BASE_SELECT_TO_HIT_I18N}.silhouetted`]: 2,
  [`${BASE_SELECT_TO_HIT_I18N}.turning`]: -2,
  [`${BASE_SELECT_TO_HIT_I18N}.akimbo`]: -3,
  [`${BASE_SELECT_TO_HIT_I18N}.running`]: -3,
  [`${BASE_SELECT_TO_HIT_I18N}.oneHanded`]: -2,
  [`${BASE_SELECT_TO_HIT_I18N}.turret`]: 2,
  [`${BASE_SELECT_TO_HIT_I18N}.tinyTarget`]: -6,
  [`${BASE_SELECT_TO_HIT_I18N}.aiming1`]: 1,
  [`${BASE_SELECT_TO_HIT_I18N}.aiming2`]: 2,
  [`${BASE_SELECT_TO_HIT_I18N}.aiming3`]: 3,
  [`${BASE_SELECT_TO_HIT_I18N}.laserSight`]: 1,
  [`${BASE_SELECT_TO_HIT_I18N}.teleSightExt`]: 2,
  [`${BASE_SELECT_TO_HIT_I18N}.teleSightMed`]: 1,
  [`${BASE_SELECT_TO_HIT_I18N}.ironSights`]: 1,
  [`${BASE_SELECT_TO_HIT_I18N}.smartgun`]: 2,
  [`${BASE_SELECT_TO_HIT_I18N}.smartgoggles`]: 2,
  [`${BASE_SELECT_TO_HIT_I18N}.3rndBurst`]: 3,
  [`${BASE_SELECT_TO_HIT_I18N}.fullAutoClose`]: 1,
  [`${BASE_SELECT_TO_HIT_I18N}.fullAutoOther`]: -1
}
export const SKILL_MODIFIERS = {

}
