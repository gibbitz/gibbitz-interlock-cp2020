import { OFFENSE_DIALOG_PATH } from '@constants/handlebars'
import {
  createFormDialog,
  systemLog,
  replaceStringTokens
} from '@utils'

export const createOffenseDialog = async (context) => {
  const title = replaceStringTokens(
    game.i18n.localize('cp2020.dialogs.offense.title'),
    context.actor.name,
    Object.keys(context.targetOptions)[0],
    context.name
  )
  const dialog = await createFormDialog({
    context,
    template: OFFENSE_DIALOG_PATH,
    // TODO: i18n!!!
    title,
    label: 'submit', // Dynamically determine dodge/pary/defend?
    onSubmit: (data) => (systemLog('offense submission |', data) || data),
    render: (_dialog, html) => {
      systemLog('offense render |', context, html)
      const firezoneSelector = html
        .querySelector('[data-selector="fireZone"]')
      html
        .querySelector('[data-selector="autoFireType"]')
        .addEventListener('change', (event) => {
          Array.from(
            html.querySelectorAll('.field-box')
          )
            .filter(node => node.contains(firezoneSelector))[0]
            .classList.toggle('cp2020-hidden')
        })
    },
    resizeable: true
  })
  return dialog
}