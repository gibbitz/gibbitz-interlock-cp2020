/**
 * Internal function used by rollItem to identify the item to roll against
 * and validate it's use
 * -- lifted largely from DND5E repo due to lacking documentation
 * @param {String} name name of the item for lookup for the macro
 * @param {String} [itemType] CP2020 specific item type
 * @returns
 */
const getTargetRollItem = (name, itemType) => {
  const speaker = ChatMessage.getSpeaker()
  let actor = speaker.token && game.actors.tokens[speaker.token]
  actor ??= game.actors.get(speaker.actor)
  if (!actor) {
    ui.notifications.warn(
      "cp2020.macro.noActorSelected",
      { localize: true }
    )
    return
  }

  // 5e uses code here to differentiate between items and effects
  // if both Items and Effects have a .roll() method this won't be needed

  const collection = actor.items
  const nameKeyPath = "name"

  // Find item in collection
  // TODO: look into using the UUID for this -- it should be faster and more efficient
  const outfit = collection.filter(
    item => foundry.utils.getProperty(item, nameKeyPath) === name
  )

  // notify if nothing is found...
  const type = game.i18n.localize(`cp2020.items.${outfit[0].type}.label`)

  if (outfit.length === 0) {
    ui.notifications.warn(
      game.i18n.format("cp2020.macro.missingItemWarn",
      { actor: actor.name, type, name })
    );
    return
  }
  // or multiple items are found
  if (outfit.length > 1) {
    ui.notifications.warn(
      game.i18n.format("cp2020.macro.multipleItemsWarn",
      { actor: actor.name, type, name })
    );
  }

  return outfit[0]
}

/**
 * function to lookup and execute the roll() method of an item
 * called from the global namespace
 * leverages the getTargetRollItem validations to return the Item
 * @param {String} item the item name to call the roll() method on
 * @returns
 */
export const rollItem = (item) => getTargetRollItem(item, "Item")?.roll()