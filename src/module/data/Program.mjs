import { metaSchema, econSchema, programSchema } from './oufitSchema.mjs'
export class Program extends foundry.abstract.TypeDataModel {

  static defineSchema() {
    return {
      ...metaSchema(),
      ...econSchema(),
      ...programSchema()
    };
  }
  prepareDerivedData() {
    // TODO: determine roll string for attack/defense
  }
}