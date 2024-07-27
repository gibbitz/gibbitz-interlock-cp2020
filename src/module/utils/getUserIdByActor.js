/**
 * utility to get the player associated with an actor
 *
 * @param {Actor} actor the actor to find the player associated with
 * @returns {string} the associated player ID or the GM ID
 */
export const getUserIdByActor = (actor) => {
  const DEFAULT = 'default'
  const { isGM, id: userId } = game.user
  const { ownership, hasPlayerOwner, isOwner } = actor
  // self harm or NPC on NPC violence
  if ((!hasPlayerOwner && isGM) || (hasPlayerOwner && isOwner && !isGM)) {
    return userId
  }
  return Object.keys(ownership)
    .filter((id) => {
      const isGmId = game.users.get(id)?.isGM
      if (hasPlayerOwner) {
        // not default or self (should be other player)
        return id !== userId && id !== DEFAULT && !isGmId
      }else{
        // defender is NPC
        return isGmId
      }
    })[0]
}