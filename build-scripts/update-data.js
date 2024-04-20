/* This script is used by the build system 
* to convert CSV files created in a spreadsheet application to Packs
*/
import { PACK_OUTPUT_PATH } from './data/constants/index.js'
import sheetManifest from './data/data-manifest.js'
import fetchSheets from './data/fetchSheets.js'
import writeFiles from './data/write-file.js'

fetchSheets(sheetManifest, writeFiles(PACK_OUTPUT_PATH), false)
