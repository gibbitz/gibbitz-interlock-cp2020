import { upgradeSchema } from "./oufitSchema.mjs";
import { Outfit } from "./Outfit.mjs";

export class Upgrade extends Outfit {

  static defineSchema() {
    const schema = super.defineSchema();
    return {
      ...schema,
      ...upgradeSchema()
    }
  }

  prepareDerivedData() {
    return super.prepareDerivedData()
  }
}