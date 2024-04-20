import { generateSheetPath } from '../../utils'
import { appendSystemConstants } from '../../utils/appendSystemConstants'

export class CyberdeckItemSheet extends ItemSheet {
  get template() {
    return generateSheetPath('cyberdeck', 'Items')
  }

  getData() {
    const deckData = super.getData()
    return appendSystemConstants(deckData, game.i18n)
  }
}