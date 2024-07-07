// system document types
export const ACTOR_DOCUMENT_TYPES = {
  EDGERUNNER: 'Edgerunner',
  NPC: 'NPC',
}
export const ITEM_DOCUMENT_TYPES = {
  ARMOR: 'Armor',
  OUTFIT: 'Outfit',
  PROGRAM: 'Program',
  SKILL: 'Skill',
  CYBERWARE: 'Cyberware',
  VEHICLE: 'Vehicle',
  WEAPON: 'Weapon',
  MAGAZINE: 'Magazine',
  CYBERDECK: 'Cyberdeck',
}
export const DOCUMENT_TYPES = {
  ...ACTOR_DOCUMENT_TYPES,
  ...ITEM_DOCUMENT_TYPES
}