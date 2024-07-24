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
  /** @override */
  getRollData() {
    const context = super.getRollData()
    const { skill, accuracy, actor: { Skill: skills, stats } } = context
    // determine hit roll
    const weaponSkill = skills.filter(skillItem => skillItem.name === skill)[0]
    // TODO: make dynamic -- lookup type and get related skill then lookup stat
    const skillStat = 'ref'
    const skillRoll = weaponSkill?.rollFormula
    const rollFormula = skillRoll
      ? `${skillRoll} + ${accuracy}`
      : `1d10x + @stats.${skillStat}.total + ${accuracy}`
    return {
      ...context,
      rollFormula
    }
  }

  /**
   * @override
   * Augment the weapon source data with additional dynamic data that isn't
   * handled by the DataModel. Data calculated in this step should be
   * available both inside and outside of sheets
   */
  prepareDerivedData() {
    systemLog('WEAPON DOC PREPARE DERIVED DATA | ', this)
    const actorData = this.parent;
    const flags = actorData?.flags?.gibbitzinterlockcp2020 || {};
  }
}