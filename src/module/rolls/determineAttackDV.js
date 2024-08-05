import { createAttackDvDialog } from '@sheets/dialogs/defense/createAttackDvDialog'
import { emitters } from '@utils/sockets'
import { SKILL_DV } from '@constants'
import { systemLog } from '@utils'

const { emitError, emitDefend } = emitters

export const determineAttackDV = async (attackPayload) => {
  const overrideDvOptions = {
    'cp2020.selects.skillDifficulties.prompt': '',
    ...SKILL_DV
  }
  systemLog('DETERMINE_ATTACK_DV | ', attackPayload, overrideDvOptions)
  createAttackDvDialog({
    attackPayload,
    overrideDvOptions
  }).then((data) => {
    emitDefend({
      ...attackPayload,
      dv: {
        ...data
      }
    })
  }).catch((error) => {
    emitError({ defense: { error: error.message }, attackPayload })
  })
}