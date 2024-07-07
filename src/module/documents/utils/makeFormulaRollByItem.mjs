import { initializeChatDataByItem } from './initializeChatDataByItem.mjs'
/**
 * Util function to generate Roll from rollFormula.
 * Creates chat message if formula is missing
 * @param {Item} item game item with rollFormula and flavor
 * @returns {Roll} roll object or undefined
 * */
export const makeFormulaRollByItem = (item) => {
  const {
    system: {
      description
    }
  } = item;
  // Retrieve roll data.
  const { rollFormula, actor } = item.getRollData()

  const chatData = initializeChatDataByItem(item)

  // If there's no roll data, send a chat message.
  if (!rollFormula) {
    ChatMessage.create({
      ...chatData,
      content: description || '',
    })
    return
  }
  // Otherwise...
  // Invoke the roll and submit it to chat.
  const roll = new Roll(rollFormula, actor);
  // If you need to store the value first, make this function async
  // & uncomment the next line.
  // const result = await roll.evaluate();
  roll.toMessage(chatData);
  return roll;
}