import { updateCoreCompendium } from "./updateCoreCompendium"
import {
  SKILLS_COMPENDIUM_PACK_NAME,
  SKILLS_COMPENDIUM_DATA_PATH
} from '../../constants'

export const importSkills = () => {
  updateCoreCompendium({
    path:  SKILLS_COMPENDIUM_DATA_PATH,
    name: SKILLS_COMPENDIUM_PACK_NAME
  })
}
