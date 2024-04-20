import { generateSheetPath } from '../../utils'
import { appendSystemConstants } from '../../utils/appendSystemConstants'

export class VehicleItemSheet extends ItemSheet {
  /** @override */
  get template() {
    return generateSheetPath('vehicle', 'Items')
  }

  getData() {
    const outfitData = super.getData()

    return appendSystemConstants(outfitData, game.i18n)
  }
}
