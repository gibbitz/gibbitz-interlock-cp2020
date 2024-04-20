export const updateCoreCompendium = async ({ path, name }) => {
  const compendiumRequest = await fetch(path)
  const compendiumData = await compendiumRequest.json()
  const collection = game.packs.get(name)
  // UPDATE each item in collectionDocuments -- tedious
  const collectionDocuments = await collection.getDocuments()
  collection.configure({ locked: false })
  // create a map of names -> IDs for lookup
  const collectionMap = collectionDocuments?.reduce(
    (map, document) =>
      ({ ...map, [document.name]: document.id }),
    {}
  )
  const collectionIsPopulated = Object.keys(collectionMap).length
  // create cache for non-existing documents
  let newDocumentConfigs = collectionIsPopulated ? [] : compendiumData
  if (collectionIsPopulated) {
    // loop fetched configuration JSON data to update existing data
    compendiumData?.forEach(async (documentConfig) => {
      // get document by name
      const existing = await collection?.getDocument(collectionMap[documentConfig.name])
      // existing documents get updates
      if (existing) {
        existing.update(documentConfig)
      } else {
        // non existant documents get cached  (for later creation)
        newDocumentConfigs.push(documentConfig)
      }
    })
  }
  await Item.createDocuments(newDocumentConfigs, { pack: name })

  collection.configure({ locked: true })
}