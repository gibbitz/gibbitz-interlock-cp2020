import { cyberDeckSchema } from "./oufitSchema.mjs";
import { Outfit } from "./Outfit.mjs";

export class Cyberdeck extends Outfit {

  static defineSchema() {
    const schema = super.defineSchema();
    return {
      // ...schema,
      ...cyberDeckSchema(),
      // derived values
    }
  }

  prepareDerivedData() {
    // TODO: Build the roll formulas dynamically using string interpolation
  }
}