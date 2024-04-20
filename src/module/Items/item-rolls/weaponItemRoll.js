import { systemLog } from "../../../utils"
// TODO: get relevant stat from Item props
// get actor
// throw dialog for opposed/difficulty & modifier
// determine if opposed roll (is target selected)
// loop actor's cyberwear for mods on equiped cyberwear
// loop actor's skills relevant combat skill get total
// add accuracy
// if opposed, prompt GM for relevant skill on target
// Active Effects?
export const weaponItemRoll = (...args) => {
  systemLog('WEAPON ITEM ROLL | ', ...args)
  // if hit, determine all hit locations and damamge
  // then display in chat window
}