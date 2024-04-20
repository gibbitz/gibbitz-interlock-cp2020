import { generateSheetPath } from '../../utils'
import cp2020Log from '../../utils/handlebars/cp2020Log'

export const categorizeItems = (items) => {
  const output = {
    armor: [],
    cyberdecks: [],
    cyberwear: [],
    outfit: [],
    programs: [],
    skills: [],
    vehicles: [],
    weapons: []
  }
  items.forEach((item) => {
    switch (item.type) {
      case 'armor':
        output.armor.push(item)
        break
      case 'cyberdeck':
        output.cyberdecks.push(item)
        break
      case 'cyberwear':
        output.cyberwear.push(item)
        break
      case 'outfit':
        output.outfit.push(item)
        break
      case 'program':
        output.programs.push(item)
        break
      case 'skill':
        output.skills.push(item)
        break
      case 'vehicle':
        output.vehicles.push(item)
        break
      case 'weapon':
        output.weapons.push(item)
        break
      default:
        output.outfit.push(item)
        break
    }
  })
  return output
}
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class EdgeRunnerSheet extends ActorSheet {
  get template() {
    return generateSheetPath('edge-runner', 'EdgeRunner')
  }
  // /** @override */
  // static get defaultOptions() {
  //   return mergeObject(super.defaultOptions, {
  //     // Css classes
  //     classes: ["cyberpunk", "sheet", "actor", "edge-runner"],
  //     template: generateSheetPath('edge-runner', 'EdgeRunner'),
  //     // Default window dimensions
  //     // TODO: -- can this be css controlled or is this a popup?
  //     width: 590,
  //     height: 600,
  //     tabs: [{
  //       // TODO: Data-refs or IDs plz -- use CONSTs
  //       navSelector: ".sheet-tabs",
  //       contentSelector: ".sheet-body",
  //       initial: "skills"
  //     }]
  //   });
  // }
  /** @override */
  async _onDropItem(...args) {
    console.log('Drag....', ...args)
    return super._onDropItem(...args)
  }
  _onSortItem(...args) {
    console.log('DnD....', ...args)
    return super._onSortItem(...args)
  }

  getData() {
    // the data THIS returns is only available in this class and the template
    const sheetData = super.getData();
    const {
      actor: {
        system: {
          stats
        },
        items
      }
    } = sheetData;

    // Prepare items.
    const {
      armor,
      cyberdecks,
      cyberwear,
      outfit,
      programs,
      skills,
      vehicles,
      weapons
    } = categorizeItems(items)
    // ineligant -- abstract DataModel is not iterable
    sheetData.actor.system.armor = armor
    sheetData.actor.system.cyberdecks = cyberdecks
    sheetData.actor.system.cyberwear = cyberwear
    sheetData.actor.system.outfit = outfit
    sheetData.actor.system.programs = programs
    sheetData.actor.system.skills = skills
    sheetData.actor.system.vehicles = vehicles
    sheetData.actor.system.weapons = weapons

    sheetData.actor.system.bio.constants = {
      SIBLINGS: {
        RELATIVE_AGES: {
          [game.i18n.localize(`cp2020.siblings.ages.younger`)]: -1,
          [game.i18n.localize(`cp2020.siblings.ages.twin`)]: 0,
          [game.i18n.localize(`cp2020.siblings.ages.older`)]: 1
        }
      }
    }

    // prep dynamic stats
    Object.keys(stats).forEach((key) => {
      // TODO: factor in damage!
      sheetData.actor.system.stats[key].total = stats[key].natural + stats[key].modifier
    })
    // prep UI state management (filtering/sorting)
    // prep health

    return sheetData;
  }

  activateListeners(html){
    // html.find(selector).eventName(callback.bind(this))
    // html.find('item-create').click(this._onItemCreate.bind(this))

    // add lifepath event
    html.find('[data-action="add-lifepath-row"]').click(async (_evt) => {
      await this.actor.addLifeEvent({
        year: '',
        event: ''
      })
      this.render(true)
    })

    // add sibling
    html.find('[data-action="add-sibling"]').click(async (_evt) => {
      await this.actor.addSibling({
        name: '',
        handle: '',
        gender: '',
        relativeAge: '',
        relationshipNotes: ''
      })
      this.render(true)
    })

    html.find('[data-selector="actor.item"]').change(async (_evt) => {
      const { id, key, render } = _evt.target.dataset
      let value
      switch (_evt.target.type) {
        case 'number':
          value = _evt.target.valueAsNumber
          break
        case 'checkbox':
          value = _evt.target.checked
          break
          default:
          value = _evt.target.value
          break
      }
      const item = this.actor.items.get(id)
      await item.update({ [key]: value }, { render })
    })

    super.activateListeners(html)
  }
}