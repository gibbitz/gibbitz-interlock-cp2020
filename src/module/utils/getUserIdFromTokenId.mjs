/**
 * util to get userId of owner from tokenId
 *
 * @param {string} tokenId Id of target token to determine ownership
 * @returns {string} userId
 */
export const getUserIdFromTokenId = (tokenId) => {
  const DEFAULT = 'default'
  const { isGM, id: userId } = game.user
  const { actor } = game.canvas.tokens.get(tokenId)
  const { ownership, hasPlayerOwner, isOwner } = actor
  if ((!hasPlayerOwner && isGM) || (hasPlayerOwner && isOwner && !isGM)) {
    return userId
  }
  return Object.keys(ownership)
    .filter((id) => (id !== userId && id !== DEFAULT))[0]
}