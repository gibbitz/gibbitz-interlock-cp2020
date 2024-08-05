import { DV_DIALOG_PATH } from '@constants/handlebars'
import { createFormDialog, replaceStringTokens, systemLog } from '@utils'

export const createAttackDvDialog = async (context) => {
  const attacker = context.attackPayload.attack.rollData.actor.name
  const title = replaceStringTokens(
    game.i18n.localize('cp2020.dialogs.defense.title'),
    attacker
  )
  const label = replaceStringTokens(
    game.i18n.localize('cp2020.dialogs.defense.defend'),
    attacker
  )
  const render = (_dialog, DOM) => (
    systemLog('UNOPPOSED DEFENSE RENDER |', DOM)
  )
  const onSubmit = (data) => (
    systemLog('defense submission |', data) || data
  )
  return createFormDialog ({
    context,
    template: DV_DIALOG_PATH,
    title,
    label,
    onSubmit,
    render
  })
}