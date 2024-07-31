import {
  SYSTEM_PROJECT_NAME,
  EMIT_ATTACK,
  EMIT_DEFENSE,
  EMIT_CHECK
} from '@constants'

const emit= (type, payload) =>
  game.socket.emit(
    `system.${SYSTEM_PROJECT_NAME}`,
    {
      type,
      payload: {
        ...payload,
        sender: game.userId
      }
    }
  )

const makeResponse = (payload) => ({
  ...payload,
  recipient: payload.sender
})

export const emitAttack = async (payload) =>
  emit(EMIT_ATTACK, payload)

export const emitDefend = async (payload) =>
  emit(EMIT_DEFENSE, makeResponse(payload))

export const emitSkillChallenge = async (payload) =>
  emit(EMIT_CHECK, payload)

export const emitSkillCounter = async (payload) =>
  emit(EMIT_DV, makeResponse(payload))