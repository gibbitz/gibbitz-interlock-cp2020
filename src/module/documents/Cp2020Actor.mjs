import { ACTOR_DOCUMENT_TYPES } from '@constants';
import { Edgerunner } from './actor';

/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class Cp2020Actor extends Actor {
  /** @override */
  constructor(...args) {
    const [{ type }] = args
    switch (type) {
      case ACTOR_DOCUMENT_TYPES.NPC:
        return new Edgerunner(...args)
        break
      case ACTOR_DOCUMENT_TYPES.EDGERUNNER:
      default:
        return new Edgerunner(...args)
        break
    }
  }
}