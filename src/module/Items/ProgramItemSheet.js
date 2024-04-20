import { generateSheetPath } from '../../utils'
import { appendSystemConstants } from '../../utils/appendSystemConstants'

export class ProgramItemSheet extends ItemSheet {
  /** @override */
  get template() {
    return generateSheetPath('program', 'Items')
  }

  getData() {
    const softData = super.getData()

    return appendSystemConstants(softData, game.i18n)
  }
}
