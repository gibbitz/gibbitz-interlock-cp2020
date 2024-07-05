import { systemLog } from '../utils/log';
import { OutfitSheet } from './outfit-sheet.mjs';

/**
 * Extend the basic OutfitSheet with some modifications specific to Weapons
 * @extends {OutfitSheet}
 */
export class WeaponSheet extends OutfitSheet {
  /** @override */
  getData() {
    // Retrieve base data structure.
    const context = super.getData()
    systemLog(' WEAPON SHEET | ', context)
    return context
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
  }
}