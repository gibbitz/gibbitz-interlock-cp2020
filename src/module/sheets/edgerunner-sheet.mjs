import { HBS_ACTOR_TEMPLATE_PATH } from '../constants';
import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';
import { appendSystemConstants } from '../utils/appendSystemConstants';
import { systemLog } from '../utils/log';

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class EdgerunnerSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['gibbitz-interlock-cp2020', 'sheet', 'actor'],
      width: 600,
      height: 600,
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
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    // Add the actor's data to context.data for easier access, as well as flags.
    const { data: { system, flags } = {} } = context;

    this._prepareItems(context);
    this._prepareCharacterData(context);

    // Add roll data for TinyMCE editors.
    const rollData = context.actor.getRollData();

    // Prepare active effects
    const effects = prepareActiveEffectCategories(
      // A generator that returns all effects stored on the actor
      // as well as any items
      this.actor.allApplicableEffects()
    );
    return appendSystemConstants({
      ...context,
      system,
      flags,
      rollData,
      effects
    }, game.i18n)
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterData(context) {
    // Handle ability scores.
    // for (let [k, v] of Object.entries(context.system.abilities)) {
    //   v.label = game.i18n.localize(CONFIG.CP_2020.abilities[k]) ?? k;
    // }
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareItems(context) {
    // create something like itemTypes or something?

  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.on()

    // // Render the item sheet for viewing/editing prior to the editable check.
    // html.on('click', '.item-edit', (ev) => {
    //   const li = $(ev.currentTarget).parents('.item');
    //   const item = this.actor.items.get(li.data('itemId'));
    //   item.sheet.render(true);
    // });

    // // -------------------------------------------------------------
    // // Everything below here is only needed if the sheet is editable
    // if (!this.isEditable) return;

    // // Add Inventory Item
    // html.on('click', '.item-create', this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.on('click', '[data-selector="item-delete"]', (event) => {
      // TODO: prompt user before deletion
      let item
      document.querySelectorAll('[data-item-id]')
        .forEach((itemRow) => {
          item = itemRow.contains(event.currentTarget)
            ? this.actor.items.get(itemRow.dataset.itemId) : item
        })
      item?.delete()
      // parentRow.addEventListener('animationend', () => {
        this.render(false)
      // })
    });

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

    // handle inline item editing
    html.find('[data-selector="actor.item"]').change(async (_evt) => {
      const { uuid, key, render } = _evt.target.dataset
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
      // TODO: Figure out how to update without focus loss
      const updateItemValues = async (_evt) => {
        const item = this.actor.items.get(uuid)
        await item.update({ [key]: value }, { render })
        _evt.target.removeEventListener('blur', updateItemValues)
        systemLog(`updateItemValues: ${key}(${uuid})`)
      }
      _evt.target.addEventListener('blur', updateItemValues)
    })

    // handle inline item rolling

    html.find('[data-roll]').on('click', ({ target }) => {
      const flavorFallback = 'Rolls the dice...'
      const {
        roll: rollFormula,
        flavor = flavorFallback
      } = target.dataset
      const roll = new Roll(rollFormula, this.actor.getRollData());
      roll.toMessage({
        speaker: {
          ...ChatMessage.getSpeaker({ actor: this.actor }),
          // polyfill for Token rolling
          alias: this.actor.name
        },
        flavor,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    })

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
    if (this.actor.isOwner) {
      let handler = (ev) => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains('inventory-header')) return;
        li.setAttribute('draggable', true);
        li.addEventListener('dragstart', handler, false);
      });
    }
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  // async _onItemCreate(event) {
  //   event.preventDefault();
  //   const header = event.currentTarget;
  //   // Get the type of item to create.
  //   const type = header.dataset.type;
  //   // Grab any data associated with this control.
  //   const data = duplicate(header.dataset);
  //   // Initialize a default name.
  //   const name = `New ${type.capitalize()}`;
  //   // Prepare the item object.
  //   const itemData = {
  //     name: name,
  //     type: type,
  //     system: data,
  //   };
  //   // Remove the type from the dataset since it's in the itemData.type prop.
  //   delete itemData.system['type'];

  //   // Finally, create the item!
  //   return await Item.create(itemData, { parent: this.actor });
  // }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    // data-roll="1d10+@stats.int+@skills.accounting"
    if (dataset.roll) {
      let label = dataset.label ? `[ability] ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }
}
