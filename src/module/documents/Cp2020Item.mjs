import { ITEM_DOCUMENT_TYPES } from '@constants';
import {
  Outfit,
  Weapon,
  Skill
} from './item'

/**
 * Override the basic Item constructor to return specific Document Types.
 * @extends {Item}
 */
export class Cp2020Item extends Item {
  /** @override */
  constructor(...args) {
    const [{ type }] = args
    switch (type) {
      case ITEM_DOCUMENT_TYPES.SKILL:
        return new Skill(...args)
        break
      case ITEM_DOCUMENT_TYPES.WEAPON:
        return new Weapon(...args)
        break
      case ITEM_DOCUMENT_TYPES.OUTFIT:
      default:
        return new Outfit(...args)
        break
    }
  }
}
