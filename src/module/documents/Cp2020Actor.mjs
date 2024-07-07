import { ACTOR_DOCUMENT_TYPES } from '@constants';
import { Edgerunner } from './actor';

/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class Cp2020Actor extends Actor {
  /** @override */
  constructor(...args) {
    super(...args)
    const [{ type }] = args
    switch (type) {
      case ACTOR_DOCUMENT_TYPES.NPC:
      case ACTOR_DOCUMENT_TYPES.EDGERUNNER:
      default:
        this._subActor = new Edgerunner(...args)
        break
    }
  }
  prepareDerivedData(...args) {
    this._subActor?.prepareDerivedData(...args)
  }
  getRollData(...args) {
    this._subActor.getRollData(...args)
  }
  addLifeEvent(...args) {
    this._subActor.addLifeEvent(...args)
  }
  addSibling(...args) {
    this._subActor.addSibling(...args)
  }
}