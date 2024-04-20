import { systemLog } from "../../../utils"
// TODO: get relevant stat from Item props
// get actor
// throw dialog for opposed/difficulty skill/attack/stat
// lookup actor add total stat
// loop actor's cyberwear for mods on equiped cyberwear
// loop actor's skills for total on interface or programming
// determine if opposed roll (is target selected)
// if opposed prompt GM for relevant skill on target
// prompt both GM and Player for modifier
// Active Effects?
export const cyberwearItemRoll = (...args) => {
  systemLog('CYBERWEAR ITEM ROLL | ', ...args)
}