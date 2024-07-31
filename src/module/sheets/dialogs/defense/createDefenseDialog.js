import { DEFENSE_DIALOG_PATH } from '@constants/handlebars'
import { createFormDialog, systemLog } from '@utils'

export const createDefenseDialog = (context) => createFormDialog ({
  context,
  template: DEFENSE_DIALOG_PATH,
  // TODO: i18n!!!
  title: 'Defend yourself',
  label: 'submit', // Dynamically determine dodge/pary/defend?
  onSubmit: (data) => (systemLog('defense submission |', data) || data),
  render: (html) => systemLog('defense submission |', html)
})