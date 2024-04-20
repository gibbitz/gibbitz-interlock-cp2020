import { updateCoreCompendium } from "./updateCoreCompendium"
import {
  ARMOR_COMPENDIUM_PACK_NAME,
  ARMOR_COMPENDIUM_DATA_PATH
} from '../../constants'

export const importArmor = () => {
  updateCoreCompendium({
    path:  ARMOR_COMPENDIUM_DATA_PATH,
    name: ARMOR_COMPENDIUM_PACK_NAME
  })
}
