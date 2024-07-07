import { ITEM_DOCUMENT_TYPES } from '@constants';
import {
  Outfit,
  Weapon,
  Skill,
  Cp2020BaseItem
} from './item'

/**
 * Hacks the single Item Document limitation of Foundry through composition
 * Whenever new methods are added to any child classes they will need to be added here as well
 * @extends {Item}
 */
export class Cp2020Item extends Item {
  /** @override */
  constructor(...args) {
    super(...args)
    const [{ type }] = args
    switch (type) {
      case ITEM_DOCUMENT_TYPES.SKILL:
        this._subItem = new Skill(...args)
        break
      case ITEM_DOCUMENT_TYPES.WEAPON:
        this._subItem = new Weapon(...args)
        break
      case ITEM_DOCUMENT_TYPES.OUTFIT:
      default:
        this._subItem = new Outfit(...args)
        break
    }
  }
  prepareData(){
    this._subItem?.prepareData()
  }
  getRollData(){
    return this._subItem.getRollData()
  }
  roll(){
    return this._subItem?.roll()
  }
}
