import { generateSheetPath } from '../../utils'
import { appendSystemConstants } from '../../utils/appendSystemConstants'

export class OutfitItemSheet extends ItemSheet {
  /** @override */
  get template() {
    return generateSheetPath('outfit', 'Items')
  }

  getData() {
    const outfitData = super.getData()

    return appendSystemConstants(outfitData, game.i18n)
  }
}
