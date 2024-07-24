/**
 * @typedef {ItemEditClickHandler}
 * @param {Event} event DOM event
 * @description handler for clicking Edit buttons
 * @returns undefined
*/

/**
 * Factory to generate Edit Button Click handlers
 *
 * @param {DocumentSheet} edgerunnerSheet sheet to add Edit handlers to
 * @returns {ItemEditClickHandler}
 */
export const registerItemEditClick = (edgerunnerSheet) => (event) =>{
  const { uuid } = event.target.dataset
  const item = edgerunnerSheet.actor.items.get(uuid)
  item.sheet.render(true)
}