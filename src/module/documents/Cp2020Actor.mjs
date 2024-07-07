import { ACTOR_DOCUMENT_TYPES } from '@constants';
import { Edgerunner } from './actor';

/**
 * Hacks the single Item Document limitation of Foundry through composition
 * Whenever new methods are added to any child classes they will need to be added here as well
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