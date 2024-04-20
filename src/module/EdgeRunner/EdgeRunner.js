/**
 * Extend the base Actor to define the EdgeRunner.
 * @extends {Actor}
 */
export class EdgeRunner extends Actor {
  /** @override */
  async _onCreate(data, options={}) {
    // TODO: Can this trigger generation of character/npc?
  }

  /**
   * Update EdgeRunner data with additional dynamic data
   * BTM, DamageModifier, Throw, Carry, Run, Leap etc.
   * Roll through skills, cyberwear, weapons etc. and calculate roll values or modifiers
  */
  prepareData() {
    // prep Skills
    this.itemTypes.skill.forEach(skill => {
      const { ipMultiplier = 1, ip, level } = skill.system
      skill.system.levelUp = ((10 * (level + 1)) * ipMultiplier) - ip
    })
  }

  /**
   * retrieve skill value by name or ID
   */
  _getSkill() {}

  /**
  * roll skill check
  */
  skillCheck() {}

  /**
   * roll against naked stat
   */
  statCheck() {}

  /**
   * save against stat
   */
  statSave() {}

  /**
   * stunSave
   */
  stunSave() {}

  /**
   * deathSave
   */
  deathSave() {}

  async addLifeEvent (event) {
    // debugger
    await this.system.updateSource({
      bio: {
        lifepath: [event, ...this.system.bio.lifepath]
      }
    })
  }

  async addSibling (sibling) {
    // debugger
    await this.system.updateSource({
      bio: {
        family: {
          siblingCount: this.system.bio.siblings.length + 1
        },
        siblings: [sibling, ...this.system.bio.siblings]
      }
    })
  }
}