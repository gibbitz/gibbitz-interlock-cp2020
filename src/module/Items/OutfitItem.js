import { systemLog } from "../../utils"
import { cyberwearItemRoll } from "./item-rolls/cyberwearItemRoll"
import { displayItemRoll } from "./item-rolls/displayItemRoll"
import { programItemRoll } from "./item-rolls/programItemRoll"
import { skillItemRoll } from "./item-rolls/skillItemRoll"
import { vehicleItemRoll } from "./item-rolls/vehicleItemRoll"

export class OutfitItem extends Item {
  prepareData() {
    systemLog('OUTFIT ITEM | ', this)
    super.prepareData()
  }


  // TODO: pass target or other items here that macro may have access to?
  roll() {
    // macro calls here
    const {
      actor,
      name,
      system,
      type
    } = this

    switch (type) {
      case 'skill':
        skillItemRoll({actor, name, system, type})
        break
      case 'cyberwear':
        cyberwearItemRoll({ actor, name, system, type })
        break
      case 'program':
        programItemRoll({ actor, name, system, type })
        break
      case 'weapon':
        weaponItemRoll({ actor, name, system, type })
        break
      case 'vehicle':
        vehicleItemRoll({ actor, name, system, type })
        break
      default:
        displayItemRoll(this)
        break
    }
  }
}