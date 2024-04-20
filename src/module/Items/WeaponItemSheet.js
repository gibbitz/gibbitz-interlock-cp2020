import { generateSheetPath } from '../../utils'
import { appendSystemConstants } from '../../utils/appendSystemConstants'

/**
 * Class to manage the data passed to handlebars templates for Items designated as "weapons"
 */
export class WeaponItemSheet extends ItemSheet {
  get template() {
    return generateSheetPath('weapon', 'Items')
  }

  getData() {
    const heatData = super.getData()
    // generate dynamic stat values here

    // setup for handlebars

    return appendSystemConstants(heatData, game.i18n)
  }
}