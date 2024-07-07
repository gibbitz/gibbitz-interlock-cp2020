import { systemLog } from '@utils';
import { Cp2020BaseItem } from './Cp2020BaseItem.mjs';

/**
 * Extend the Cp2020BaseItem document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Cp2020BaseItem}
 */
export class Weapon extends Cp2020BaseItem {
  /** @override */
  prepareData() {
    systemLog('WEAPON DOCUMENT PREPARE_DATA | ', this)
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the weapon source data with additional dynamic data that isn't
   * handled by the DataModel. Data calculated in this step should be
   * available both inside and outside of sheets
   */
  prepareDerivedData() {
    const actorData = this.parent;
    const flags = actorData?.flags?.gibbitzinterlockcp2020 || {};
  }
}