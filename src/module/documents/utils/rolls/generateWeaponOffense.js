import {
  systemLog,
  notify,
  measureWorldDistanceBetweenTokens,
  getUserIdFromTokenId
 } from '@utils'

import { createOffenseDialog } from '@sheets/dialogs/offense/createOffenseDialog'

import {
  emitAttack,
} from '@utils/sockets/emitters'

import { MELEE } from '@constants'

import { evaluateRoll } from './evaluateRoll'

// TODO: export Target util?
const collectTargetInfo = (targets) => {
  return targets.reduce(
    (col, { id: tokenId, document: { actorId, name }, x, y }) => {
      const range = measureWorldDistanceBetweenTokens(
        game.combat.combatant.token,
        { x, y }
      )
      const userId = getUserIdFromTokenId(tokenId)
      return ({ ...col, [actorId]: { name, tokenId, range, userId } })
    },
    {}
  )
}
const generateTargetOptions = (targets) =>
  targets.reduce(
    (col, { document: { actorId, name } }) => ({ ...col, [name]: actorId }),
    {}
  )
const determineTargetData = () => {
  const { targets } = game.user
  if (!targets?.size) {
    // TODO: allow shooting warning shots
    notify('Pick a target, Punk.')
    return false
  }
  const targetOptions = generateTargetOptions(targets)
  const multipleTargets = targets.size > 1
  return {
    targetInfo: collectTargetInfo(targets),
    targetActorId: !multipleTargets
      ? targetOptions[Object.keys(targetOptions)[0]]
      : undefined,
    targetOptions,
    multipleTargets
  }
}



export const generateWeaponOffense = async (item) => {
  // target calculations
  const { targetInfo, targetActorId, targetOptions, multipleTargets } = determineTargetData()

  // attack type
  const { type: weaponType } = item?.system || {}
  const isMelee = weaponType.toLowerCase() === MELEE
  // rolldata
  const rollData = item.getRollData()

  // collect attack options
  const options = await createOffenseDialog({
    ...rollData,
    multipleTargets,
    targetOptions,
    targetActorId,
    isMelee
  })
  // set dialog recipient based on inputs
  const recipient = targetInfo[options.targetActorId]?.userId

  // Invoke the roll and submit it to chat.
  const { isFumble, IP, rollInfo } = await evaluateRoll(rollData)

  //TODO determine data needed to annotate the roll
  // stat, skill, accuracy, other bonuses, roll, exploded, fumbled

  // when you fumble, you fumble alone
  if (!isFumble) {
    emitAttack({ attack: { ...options, rollData, rollInfo, IP }, recipient })
  } else {
    // TODO; Chat the fumble
  }
  return rollInfo
}