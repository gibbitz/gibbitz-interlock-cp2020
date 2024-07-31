import { createDefenseDialog } from '@sheets/dialogs/defense/createDefenseDialog'
import { emitDefend } from '@utils/sockets/emitters'
import { evaluateRoll } from './evaluateRoll'

export const generateWeaponDefense = async (attackPayload) => {
  // create rollData for defense
  const { attack: { targetActorId, rollData: { skill: skillName } } } = attackPayload
  // get defender's actor's RollData
  const defender = targetActorId
    ? game.actors.get(targetActorId)
    : game.user.character
  const rollData = defender.getRollData()
  const { actor } = rollData
  // find associated attacker skill && || stat
  const skill = game.items.filter(({ name }) => name === skillName)[0] || {}
  const { stat = '' } = skill?.system
  // prep data for dialog
  const skillOptions = defender.itemTypes.Skill.reduce(
    (col, skill) => {
      const { name } = skill
      const { rollFormula } = skill.getRollData()
      return ({ ...col, [name]: rollFormula })
    }, {}
  )
  const statOptions = Object.keys(defender.system.stats).reduce(
    (col, stat) => (defender.system.stats[stat].rollFormula
      ? {
          ...col,
          [game.i18n.localize(`cp2020.stats.${stat.toUpperCase()}.long`)]:
            defender.system.stats[stat].rollFormula
        }
      : col
    ),
    {}
  )
  debugger
  // manually collect missing or supplemental data
  const defense = await createDefenseDialog({
    statOptions, skillOptions, attackPayload
  })
  // now generate formula & evaluate
  const baseRollFormula = defense.skill
  // find skill and getRollData for this
    ? defense.skillRollFormula
  // find stat and get roll
    : defense.statRollFormula
  const rollFormula = `${baseRollFormula} + ${defense.modifier || 0}`
  const { isFumble, IP, rollInfo } = await evaluateRoll({ rollFormula, rollData })
  // pass back to attacker for comparison
  emitDefend({
    ...attackPayload,
    defense : {
      ...defense,
      isFumble,
      rollInfo,
      rollData
    }
  })
}