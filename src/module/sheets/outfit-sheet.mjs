import { GET_HBS_ITEM_TEMPLATE_PATH } from '@constants'
import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '@effects'
import {
  appendSystemConstants,
  systemLog
} from '@utils'

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class OutfitSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['gibbitz-interlock-cp2020', 'sheet', 'item'],
      width: 520,
      height: 480,
      tabs: [
        {
          navSelector: '[data-selector="primary-tabs"]',
          contentSelector: '[data-selector="primary-tab-body"]',
          initial: 'description',
        },
      ],
    });
  }

  /** @override */
  get template() {
    systemLog(' Loading template for : ', this.item.type)
    return GET_HBS_ITEM_TEMPLATE_PATH(this.item.type)
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve base data structure.
    const context = super.getData();

    const { data: { system, flags } = {} } = context;

    // Retrieve the roll data for TinyMCE editors.
    const rollData = this.item.getRollData();


    // Prepare active effects for easier access
    const effects = prepareActiveEffectCategories(this.item.effects);

    return appendSystemConstants({
      ...context,
      rollData,
      system,
      flags,
      effects
    }, game.i18n)
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.

    // Active Effect management
    html.on('click', '.effect-control', (ev) =>
      onManageActiveEffect(ev, this.item)
    );
  }
}
