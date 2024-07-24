import {
  SYSTEM_PROJECT_NAME,
  EMIT_ATTACK,
  EMIT_CHECK
} from '@constants'
import { createDefenseDialog } from '@sheets/dialogs/defense/createDefenseDialog.mjs'
import { emitDefense } from './emitters.mjs'
import { registerSocketResponseHandler } from './registerSocketResponseHandler.mjs'
import { systemLog } from '../log'



export const registerSocketHandlers = () => {

  // display opposed attack roll defense dialog
  registerSocketResponseHandler(
    EMIT_ATTACK,
    async (payload) => {
      const response = await createDefenseDialog(payload)
      emitDefense({
        ...payload,
        response
      })
    }
  )

  // display opposed skill roll defense dialog
  registerSocketResponseHandler(
    EMIT_CHECK,
    async (payload) => {
      systemLog('OPPOSED SKILL |', payload)
    }
  )

}