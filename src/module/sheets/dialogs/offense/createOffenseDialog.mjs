import { OFFENSE_DIALOG_PATH } from '@constants/handlebars'
import { createFormDialog, systemLog } from '@utils'

export const createOffenseDialog = (context) => createFormDialog({
  context,
  template: OFFENSE_DIALOG_PATH,
  // TODO: i18n!!!
  title: 'Arm yourself',
  label: 'submit', // Dynamically determine dodge/pary/defend?
  onSubmit: (data) => (systemLog('offense submission |', data) || data),
  render: (html) => systemLog('offense submission |', html)
})