import { SYSTEM_NAME } from '../constants'
import { systemLog } from "../utils";
import {
  preloadHandlebarsTemplates,
  registerHandlebarsHelpers
} from '../utils/handlebars'
import {
  SkillItemSheet,
  OutfitItemSheet,
  CyberdeckItemSheet,
  CyberwearItemSheet,
  WeaponItemSheet,
  ArmorItemSheet,
  ProgramItemSheet,
  VehicleItemSheet
} from './Items'
import { EdgeRunnerSheet, EdgeRunnerData, EdgeRunner } from './EdgeRunner'
import { OutfitItem } from './Items'
import { handleCp2020HotbarDrop } from './macros/handleCp2020HotbarDrop'
import { rollItem } from './macros/rollItemMacro'
import { toggleEffect } from './macros/toggleEffectMacro'
import { renderSidebarTab } from './sidebar/settingsTabCoreDataImport'

// globals namespaced under system name
window[SYSTEM_NAME] = {
  // macros
  rollItem,
  toggleEffect
}

// init hook
Hooks.once('init', () => {
  systemLog('> Initializing system')

  // set DocumentClasses
  CONFIG.Actor.documentClass = EdgeRunner
  CONFIG.Item.documentClass = OutfitItem

  // set DataModels
  CONFIG.Actor.dataModels.edgerunner = EdgeRunnerData
  CONFIG.Actor.dataModels.npc_01 = EdgeRunnerData
  CONFIG.Actor.dataModels.npc_02 = EdgeRunnerData
  CONFIG.Actor.dataModels.npc_03 = EdgeRunnerData

  // register EdgeRunner (Actor) Sheet
  Actors.unregisterSheet('core', ActorSheet)
  Actors.registerSheet(
    SYSTEM_NAME,
    EdgeRunnerSheet,
    { types: [
      'edgerunner','npc_01', 'npc_02', 'npc_03'
    ] })

  // register Item Sheets
  Items.unregisterSheet('core', ItemSheet)
  Items.registerSheet(SYSTEM_NAME, ArmorItemSheet, { types: ['armor'] })
  Items.registerSheet(SYSTEM_NAME, SkillItemSheet, { types: ['skill'] })
  Items.registerSheet(SYSTEM_NAME, CyberdeckItemSheet, { types: ['cyberdeck'] })
  Items.registerSheet(SYSTEM_NAME, CyberwearItemSheet, { types: ['cyberwear'] })
  Items.registerSheet(SYSTEM_NAME, WeaponItemSheet, { types: ['weapon'] })
  Items.registerSheet(SYSTEM_NAME, OutfitItemSheet, { types: ['outfit'] })
  Items.registerSheet(SYSTEM_NAME, VehicleItemSheet, { types: ['vehicle'] })
  Items.registerSheet(SYSTEM_NAME, ProgramItemSheet, { types: ['program'] })

  // handlebars config
  preloadHandlebarsTemplates()
  registerHandlebarsHelpers()

})

// ready hook
Hooks.once('ready', () => {
  Hooks.on('hotbarDrop', handleCp2020HotbarDrop)
})

Hooks.on('changeSidebarTab', renderSidebarTab)
