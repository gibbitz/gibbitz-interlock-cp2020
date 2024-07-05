import { metaSchema, econSchema, encumberanceSchema } from './oufitSchema.mjs'
export class Outfit extends foundry.abstract.TypeDataModel {
// extend ItemEconomics
  static defineSchema() {
    return {
      ...metaSchema(),
      ...econSchema(),
      // add encumberance
      ...encumberanceSchema()
    };
  }

  prepareDerivedData() {
    // TODO: determine weight by quantity
  }
}