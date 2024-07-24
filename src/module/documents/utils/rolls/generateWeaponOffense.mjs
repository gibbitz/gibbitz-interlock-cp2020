import { systemLog, measureWorldDistanceBetweenTokens } from '@utils'

import { createOffenseDialog } from '@sheets/dialogs/offense/createOffenseDialog'

import {
  emitAttackCollection,
  registerSocketResponseHandler
} from '@utils/sockets'

import {
  EMIT_DEFENSE
} from '@constants'
import { notify, getUserIdFromTokenId } from '@utils'

export const generateWeaponOffense = async (item) => {
  const { targets } = game.user
  if (!targets?.size) {
    // TODO: allow shooting warning shots
    notify('Pick a target, Punk.')
    return false
  }
  const simpleTargets = targets.reduce(
    (col, { id: tokenId, document: { actorId, name }, x, y }) => {
      const range = measureWorldDistanceBetweenTokens(
        game.combat.combatant.token,
        {x, y}
      )
      const userId = getUserIdFromTokenId(tokenId)
      return ({ ...col, [actorId]: { name, tokenId, range, userId } })
    },
    {}
  )
  const targetOptions = targets.reduce((col, { document: { actorId, name } }) => ({ ...col, [name]: actorId }), {})
  const targetActor = Object.keys(targetOptions).length === 1
    ? targetOptions[Object.keys(targetOptions)[0]]
    : undefined
  const rollData = item.getRollData()
  const { rollFormula, rollDataActor } = rollData
  // collect attack options
  const options = await createOffenseDialog({ ...rollData, targetOptions, targetActor })
  // Invoke the roll and submit it to chat.
  const roll = new Roll(rollFormula, rollDataActor)
  const rollInfo = await roll.evaluate()
  systemLog(' ATTACK ROLL DATA |', rollInfo.dice[0].results)

  const isFumble = rollInfo.dice[0].results[0].result === 1
  // TODO roll on the fumble table & hold value for IP

  const isCrit = rollInfo.dice[0].results
    .filter(({ exploded }) => exploded).length > 0
  // use total to determine DV difference for IP

  //TODO determine data needed to annotate the roll
  // stat, skill, accuracy, other bonuses, roll, exploded, fumbled
  systemLog(' ATTACK ROLL FUMBLED? | ', isFumble)
  // when you fumble, you fumble alone
  if (!isFumble) {
    systemLog(' ATTACK ROLL EXPLODED? |', isCrit)
    registerSocketResponseHandler(
      EMIT_DEFENSE,
      (response) => {
        systemLog('DEFENSE DATA | ', response)
        // send result to chat
      }
    )
    // set targets
    const recipient = simpleTargets[options.target]?.userId
    emitAttackCollection({ roll, options, recipient })
  }
  return roll
}