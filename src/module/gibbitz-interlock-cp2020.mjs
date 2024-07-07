// system constants
import { SYSTEM_PROJECT_NAME, SYSTEM_NAME, CP_2020 } from '@constants'

// document classes
import { Cp2020Actor, Cp2020Item } from '@documents';

// data model classes
import {
  Edgerunner,
  Cyberdeck,
  Cyberware,
  Outfit,
  Program,
  Skill,
  Vehicle,
  Weapon,
  Upgrade
} from '@models';

// sheet classes.
import {
  CyberwareSheet,
  EdgerunnerSheet,
  OutfitSheet,
  WeaponSheet
} from '@sheets';

// helpers/utilities
import {
  createHotbarMacro,
  createItemRollMacro,
  createChatRollMacro,
  preloadHandlebarsTemplates ,
  registerHandlebarsHelpers,
  systemLog
} from '@utils';

registerHandlebarsHelpers()

Hooks.on('init', function () {
  systemLog(`> Initializing ${SYSTEM_PROJECT_NAME}`)
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.gibbitzinterlockcp2020 = {
    Cp2020Actor,
    Cp2020Item,
    createItemRollMacro,
    createChatRollMacro
  };

  // Add custom constants for configuration.
  CONFIG.CP_2020 = CP_2020;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '1d10x + @stats.ref.total',
    decimals: 2,
  };

  // Define custom Document and DataModel classes
  CONFIG.Actor.documentClass = Cp2020Actor;

  // Note that you don't need to declare a DataModel
  // for the base actor/item classes - they are included
  // with the Character/NPC as part of super.defineSchema()
  CONFIG.Actor.dataModels = {
    Edgerunner
  }
  CONFIG.Item.documentClass = Cp2020Item;
  CONFIG.Item.dataModels = {
    Cyberdeck,
    Cyberware,
    Outfit,
    Program,
    Skill,
    Upgrade,
    Vehicle,
    Weapon,
  }

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet(SYSTEM_PROJECT_NAME, EdgerunnerSheet, {
    makeDefault: true,
    label: `${SYSTEM_NAME}.SheetLabels.Actor`,
  });
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet(SYSTEM_PROJECT_NAME, WeaponSheet, {
    types: ['Weapon'],
    label: `${SYSTEM_NAME}.SheetLabels.Weapon`,
  });
  Items.registerSheet(SYSTEM_PROJECT_NAME, CyberwareSheet, {
    types: ['Cyberware'],
    label: `${SYSTEM_NAME}.SheetLabels.Cyberware`,
  });
  Items.registerSheet(SYSTEM_PROJECT_NAME, OutfitSheet, {
    types: [
      'Armor',
      'Cyberdeck',
      'Outfit',
      'Program',
      'Skill',
      'Vehicle',
      'Upgrade'
    ],
    label: `${SYSTEM_NAME}.SheetLabels.Item`,
  });

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', function () {
  // Wait to register hotbar drop hook on ready
  Hooks.on('hotbarDrop', (_bar, data, slot) => createHotbarMacro(data, slot));
});
