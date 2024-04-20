import { systemLog } from "../../../utils"
// TODO: get relevant stat from Item props
// get actor
// throw dialog for opposed/difficulty & modifier
// determine if opposed roll (is target selected)
// loop actor's cyberwear for mods on equiped cyberwear
// loop actor's vehicle for handling on equiped vehicle
// loop actor's skills relevant combat skill get total
// if opposed, prompt GM for relevant skill on target
// Active Effects?
export const vehicleItemRoll = (...args) => {
  systemLog('VEHICLE ITEM ROLL | ', ...args)
  // if hit, determine all hit locations and damamge
  // then display in chat window
}