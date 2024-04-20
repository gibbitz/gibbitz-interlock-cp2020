import { SYSTEM_NAME } from "../../constants"
import { systemLog } from "../../utils"

const getOwnedMacroObjectData = async (dropData) => {
  // using switch to support macros for saves and stat rolls ITF
  let fromDropData
  switch (dropData.type) {
    case 'ActiveEffect':
      fromDropData = ActiveEffect.implementation.fromDropData
      break;
    case 'Item':
    default:
      fromDropData = Item.implementation.fromDropData
      break
  }
  const macroObjectData = await fromUuid(dropData.uuid);
  // const macroObjectData = fromDropData && await fromDropData(dropData)

  if (!macroObjectData) {
    ui.notifications.warn('cp2020.macro.unownedWarn', { locatize: true })
  }
  return macroObjectData
}

/**
 * handler for hotBarDrop hook
 * @param {Hotbar} _bar Hotbar instance (reference to the macro shortcut bar)
 * @param {Object} dropData Object should at least contain the UUID of the item
 * @param {Number} slot the index of the slot in the hotbar where the macro is dropped
 * @returns
 */
export const handleCp2020HotbarDrop = async (_bar, dropData, slot) => {

  systemLog(' DROP DATA | ', dropData)
  const macroObjectData = await getOwnedMacroObjectData(dropData)
  systemLog(' MACRO OBJECT DATA | ', macroObjectData)

  const baseMacroData = {
    type: "script",
    scope: "actor",
  }

  let macroData

  switch (dropData.type) {
    case 'ActiveEffect':
      macroData = {
        ...baseMacroData,
        name: macroObjectData.label,
        img: macroObjectData.icon,
        command: `${SYSTEM_NAME}.toggleEffect("${macroObjectData.name}")`,
        flags: { [`${SYSTEM_NAME}.effectMacro`]: true }
      }
      break;
    case 'Item':
    default:
      macroData = {
        ...baseMacroData,
        name: macroObjectData.name,
        img: macroObjectData.img,
        // command is just evaled JS...
        command: `${SYSTEM_NAME}.rollItem("${macroObjectData.name}")`,
        flags: { [`${SYSTEM_NAME}.itemMacro`]: true }
      }
      break
  }

  systemLog(' MACRO OBJECT | ', macroData)

  // Assign the macro to the hotbar
  const macro =
    // find existing macro
    game.macros.find(
      m => (m.name === macroData.name)
        && (m.command === macroData.command)
        && m.isAuthor
    )
    // failing that, create new one
    || await Macro.create(macroData)
  game.user.assignHotbarMacro(macro, slot)
  return false
}
