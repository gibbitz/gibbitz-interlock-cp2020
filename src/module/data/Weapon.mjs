import { weaponSchema, rangedSchema, explosiveSchema } from "./oufitSchema.mjs";
import { Outfit } from "./Outfit.mjs";

export class Weapon extends Outfit {

  static defineSchema() {
    const { StringField } = foundry.data.fields;
    const schema = super.defineSchema();
    return {
      ...schema,
      ...weaponSchema(),
      ...rangedSchema(),
      ...explosiveSchema(),
      // devived values
      damageRoll: new StringField({ blank: true }),
      hitRoll: new StringField({ blank: true })
    }
  }

  prepareDerivedData() {
    // Build the formula dynamically using string interpolation
    const { skill, damage, accuracy } = this;
    // TODO: determine if weapon is melee and add damage bonus roll string if so
    const strBonus = 0
    this.damageRoll = `${damage}+${strBonus}`
    this.hitRoll = `1d10+@skills.get(${skill}).total+${accuracy}`
  }
}