import { HIT_LOCATIONS, WOUND_TYPES } from "../../constants";

export class EdgeRunnerData extends foundry.abstract.DataModel {
  static defineSchema() {
    const {
      HTMLField,
      SchemaField,
      NumberField,
      ArrayField,
      StringField
    } = foundry.data.fields;
    const statNaturalNumberFieldOptions = {
      required: true,
      initial: 2, // minimum stat value is 2 in my homebrew
      integer: true
    }
    const statOpenNumberFieldOptions = {
      required: false,
      initial: 0, // minimum stat value is 2 in my homebrew
      integer: true
    }
    const statFields = (fullStatName, abbrStatName) => ({
      name: new StringField({ initial: fullStatName, readonly: true }),
      abbr: new StringField({ initial: abbrStatName, readonly: true }),
      natural: new NumberField(statNaturalNumberFieldOptions),
      modifier: new NumberField(statOpenNumberFieldOptions),
      total: new NumberField(statOpenNumberFieldOptions)
    })
    const lifeEventFields = {
      year: new StringField(),
      event: new HTMLField(),
    }

    const familyFields = {
      ethnicity: new StringField(),
      language: new StringField(),
      parents: new StringField(),
      siblingCount: new NumberField(statOpenNumberFieldOptions),
      ranking: new StringField(),
      status: new StringField(),
      childhood: new StringField()
    }

    const siblingFields = {
      name: new StringField(),
      handle: new StringField(),
      gender: new StringField(),
      relativeAge: new StringField(), // TODO: drop-down younger|older|twin
      relationshipNotes: new HTMLField(),
    }

    const woundSchema = {
        location: new StringField(HIT_LOCATIONS),
        type: new StringField(WOUND_TYPES)
      }

    return {
      stats: new SchemaField({
        int: new SchemaField(
          statFields(
            game.i18n.localize('cp2020.stats.INT.long'),
            game.i18n.localize('cp2020.stats.INT.short')
          )
        ),
        ref: new SchemaField(
          statFields(
            game.i18n.localize('cp2020.stats.REF.long'),
            game.i18n.localize('cp2020.stats.REF.short')
          )
        ),
        cl: new SchemaField(
          statFields(
            game.i18n.localize('cp2020.stats.CL.long'),
            game.i18n.localize('cp2020.stats.CL.short')
          )
        ),
        ma: new SchemaField(
          statFields(
            game.i18n.localize('cp2020.stats.MA.long'),
            game.i18n.localize('cp2020.stats.MA.short')
          )
        ),
        body: new SchemaField(
          statFields(
            game.i18n.localize('cp2020.stats.BODY.long'),
            game.i18n.localize('cp2020.stats.BODY.short')
          )
        ),
        emp: new SchemaField(
          statFields(
            game.i18n.localize('cp2020.stats.EMP.long'),
            game.i18n.localize('cp2020.stats.EMP.short')
          )
        ),
        tech: new SchemaField(
          statFields(
            game.i18n.localize('cp2020.stats.TECH.long'),
            game.i18n.localize('cp2020.stats.TECH.short')
          )
        ),
      }),
      bio: new SchemaField({
        lifepath: new ArrayField(new SchemaField(lifeEventFields)),
        family: new SchemaField(familyFields),
        siblings: new ArrayField(new SchemaField(siblingFields))
      }),
      identity: new SchemaField({
        handle: new StringField(),
        givenName: new StringField(),
        role: new StringField(),
        age: new NumberField(),
        gender: new StringField(),
        sexualPreference: new StringField(),
        image: new StringField(),
        token: new StringField(),
        Style: new SchemaField({
          clothes: new StringField(),
          hair: new StringField(),
          affectations: new StringField()
        }),
        Motivations: new SchemaField({
          personalityTraits: new StringField(),
          feelAboutPeople: new StringField(),
          values: new SchemaField({
            person: new StringField(),
            possession: new StringField(),
            ideals: new StringField()
          })
        })
      }),
      // const damageNumberFieldOptions = {
      //   required: false,
      //   initial: 0,
      //   integer: true,
      //   readonly
      // }
      // const woundFields = {
      //   location: new StringField(), // locationField??
      //   damage: new StringField(damageNumberFieldOptions)
      // }
      // const healthFields = {
      //   damage: new NumberField(damageNumberFieldOptions),
      //   wounds: new ArrayField(new SchemaField(woundFields)),
      //   btm: new NumberField(damageNumberFieldOptions),
      //   stunSave: new NumberField(damageNumberFieldOptions),
      //   deathSave: new NumberField(damageNumberFieldOptions),
      // }
      // TODO: determine value schemas
      health: new SchemaField({
        stunSave: new NumberField(),
        deathSave: new NumberField(),
        damage: new ArrayField(new SchemaField(woundSchema), {
          initial: () => new Array(40)
            .fill()
            .map(() => ({ location: '', type: '' }))
        })
      })
        //   health: new SchemaField(healthFields)
    };
    // return {
    //   test: new StringField()
    // }
  }

  static migrateData(source) {
    return super.migrateData(source);
  }
}