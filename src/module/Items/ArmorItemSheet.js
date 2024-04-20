import { generateSheetPath } from '../../utils'

import { appendSystemConstants } from '../../utils/appendSystemConstants'

export class ArmorItemSheet extends ItemSheet {
  get template() {
    return generateSheetPath('armor', 'Items')
  }

  async getData() {
    const armorData = super.getData()

    const gender = Math.round(Math.random()) ? 'male' : 'female'
    const svgData = await fetch(`/systems/cp2020/assets/${gender}.svg`)
    const graphic = await svgData.text()
    const locationClasses = armorData.item.system.locations.map(item => item.replace('.', '-')).join(' ')
    return appendSystemConstants({
      graphic,
      locationClasses,
      ...armorData
    }, game.i18n)
  }
}