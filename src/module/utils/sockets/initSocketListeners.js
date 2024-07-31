import {
  EMIT_ATTACK,
  EMIT_DEFENSE,
  EMIT_CHECK
} from '@constants'
import { addSocketListener } from './addSocketListener'
import { systemLog } from '../log'
import {
  calculateOpposedRoll,
  generateWeaponDefense
} from '@documents/utils/rolls'

export const initSocketListeners = () => {

  // display opposed attack roll defense dialog
  addSocketListener(
    EMIT_ATTACK,
    async (payload) => {
      await generateWeaponDefense(payload)
    }
  )
  // display opposed attack roll defense dialog
  addSocketListener(
    EMIT_DEFENSE,
    async (payload) => {
      calculateOpposedRoll(payload)
    }
  )

  // display opposed skill roll defense dialog
  addSocketListener(
    EMIT_CHECK,
    async (payload) => {
      systemLog('OPPOSED SKILL |', payload)
    }
  )

}