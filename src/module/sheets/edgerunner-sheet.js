import {
  HBS_ACTOR_TEMPLATE_PATH,
  DRAG_SELECTOR
} from '@constants';
import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '@effects';
import {
  appendSystemConstants,
  systemLog
} from '@utils';
import {
  registerItemDeleteClick,
  registerItemEditClick,
  registerAddLifepathRowClick,
  registerAddSiblingClick,
  registerFormFieldChange,
  registerActorOnDrag
} from './listeners/actor';
import {
  registerArrayManipulationClicks
} from './listeners/item/registerArrayManipulationClicks';
import { registerRollFormulaClick } from './listeners/registerRollFormulaClick';
import { registerRollClick } from './listeners/registerRollClick';


/**
 * Chrome out the basic Actor sheet.
 * @extends {ActorSheet}
 */
export class EdgerunnerSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['cp2020', 'sheet', 'edgerunner'],
      width: 600,
      height: 600,
      dragDrop: [{ dragSelector: DRAG_SELECTOR, dropSelector: null }],
      tabs: [
        {
          navSelector: '[data-selector="personal-tabs"]',
          contentSelector: '[data-selector="personal-tab-body"]',
          initial: 'style',
        },
        {
          navSelector: '[data-selector="primary-tabs"]',
          contentSelector: '[data-selector="primary-tab-body"]',
          initial: 'skills',
        },
      ],
    });
  }

  /** @override */
  get template() {
    return HBS_ACTOR_TEMPLATE_PATH
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const context = super.getData();

    // Add the actor's data to context.data for easier access, as well as flags.
    const { data: { system, flags } = {} } = context;

    // Add roll data for TinyMCE editors.
    const rollData = context.actor.getRollData();

    // TODO: deal with active effects
    // Prepare active effects
    const effects = prepareActiveEffectCategories(
      // A generator that returns all effects & items stored on the actor
      this.actor.allApplicableEffects()
    );
    // TODO: Determine if this is better than the document for derived stats
    const sheetData = appendSystemConstants({
      ...context,
      system,
      flags,
      rollData,
      effects
    }, game.i18n)
    systemLog(' EDGERUNNER SHEET: getData ', sheetData)
    return sheetData
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html)
    const { registerDraggableElement } = registerActorOnDrag(this, super._onDragStart)

    // Delete Inventory Item
    html.find('[data-selector="item-delete"]')
      .click(
        registerItemDeleteClick(this)
      )

    // Render the detailed sheet for non-inline viewing/editing.
    html.find('[data-selector="item-edit"]')
      .click(
        registerItemEditClick(this)
      )

    // Add lifepath events
    html.find('[data-action="add-lifepath-row"]')
      .click(
        registerAddLifepathRowClick(this)
      )

    // Add siblings
    html.find('[data-action="add-sibling"]')
      .click(
        registerAddSiblingClick(this)
      )

    // manage array fields
    const { add, remove } = registerArrayManipulationClicks(this, html)
    html.find('[data-action="add-row"]').click(add)
    html.find('[data-action="delete-row"]').click(remove)

    // handle inline item editing
    html.find('[data-selector="actor.item"]')
      .change(
        registerFormFieldChange(this)
      )

    // handle inline item rolling
    html.find('[data-roll-formula]')
      .click(
        registerRollFormulaClick(this)
      )

    html.find('[data-roll]')
      .click(
        registerRollClick(this)
      )

    // TODO: deal with this....

    // Active Effect management
    html.on('click', '.effect-control', (ev) => {
      const row = ev.currentTarget.closest('li');
      const document =
        row.dataset.parentId === this.actor.id
          ? this.actor
          : this.actor.items.get(row.dataset.parentId);
      onManageActiveEffect(ev, document);
    });

    // Drag events for macros.
    if (this.actor.isOwner || game.user.isGM) {
      html.find('li.item:not(.inventory-header)')
        .each((_i, li) => registerDraggableElement(li))
      html.find('[data-selector="stat-roll"]')
        .each((_i, stat) => registerDraggableElement(stat))
    }
  }

  /**
   * Handle Drag-n-drop start.
   * @param {Event} event   The originating drag event
   * @override
   */
  _onDragStart(event) {
    const { dragStart } = registerActorOnDrag(this, super._onDragStart)
    dragStart(event)
  }
}
