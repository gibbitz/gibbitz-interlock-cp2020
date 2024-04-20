import { generateSheetPath } from '../../utils'
import { CORE_STATS } from '../../constants'
import { appendSystemConstants } from '../../utils/appendSystemConstants'
export class SkillItemSheet extends ItemSheet {
  get template() {
    return generateSheetPath('skill', 'Items')
  }

  async getData() {
    // inheritance in JS is fake super is undefined when returned from compendia
    const data = super.getData()
    const {
      item: {
        system: {
          level,
          stat,
          chipLevel,
          ipMultiplier,
          ip
        }
      }
    } = data
    data.item.system.levelUp = ((level + 1) * ipMultiplier * 10) - ip
    data.item.system.isChipped = chipLevel > 0
    // TODO: calculate total using stat

    return appendSystemConstants(data, game.i18n)
  }
}