import { generateSheetPath } from '../../utils'
import { appendSystemConstants } from '../../utils/appendSystemConstants'

export class CyberwearItemSheet extends ItemSheet {
  get template() {
    return generateSheetPath('cyberwear', 'Items')
  }

  getData() {
    const chromeData = super.getData()

    return appendSystemConstants(chromeData, game.i18n)
  }
}