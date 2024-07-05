import { vehicleSchema } from "./oufitSchema.mjs";
import { Outfit } from "./Outfit.mjs";

export class Vehicle extends Outfit{

  static defineSchema() {
    const schema = super.defineSchema();
    return {
      ...schema,
      ...vehicleSchema(),
      // devived values
    }
  }

  prepareDerivedData() {
    // TODO: Build the roll formula dynamically using string interpolation
  }
}