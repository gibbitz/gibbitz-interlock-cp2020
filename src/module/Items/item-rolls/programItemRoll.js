import { systemLog } from "../../../utils"
// TODO: get relevant stat from Item props
// get actor
// lookup actor add total stat
// loop actor's cyberwear for mods on equiped cyberwear
// loop actor's cyberdeck for mods on equiped deck
// throw dialog for opposed or unapposed programming or interface
// loop actor's skills for total on interface or programming
// determine if opposed roll (is target selected)
// if opposed prompt GM for relevant skill on target
// prompt both GM and Player for modifier
export const programItemRoll = (...args) => {
  systemLog('PROGRAM ITEM ROLL | ', ...args)
}