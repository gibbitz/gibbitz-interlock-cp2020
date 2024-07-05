import { systemLog } from '../../utils/log'
import { HBS_TEMPLATE_HELPER_PARAMS } from '../../constants/handlebars'

/**
 * registers a handlebars helper function from a partial given the helper name and the complete path to the partial file
 * @param {string} partialName the helper name to register -- this is generally the partial filename minus `-partial.hbs`
 * @param {string} partialPath the path to the partial file
 * @returns null
 */
const registerHelperFromPartialPath = (partialName, partialPath) =>
  systemLog(`registering helper: ${partialName} from: ${partialPath}`) ||
  Handlebars.registerHelper(
    partialName,
    (context, options) => new Handlebars.SafeString(
      Handlebars.partials[partialPath](context?.hash || context)
    )
  )

/**
 * registers handlebars helpers for the system
 */
export const registerHandlebarsHelpers = () => {
  // allows access to logging in the template files
  Handlebars.registerHelper('systemLog', systemLog)
  // registers all the preloaded handlebars templates as helper functions
  HBS_TEMPLATE_HELPER_PARAMS.forEach(
    (paramArray) => registerHelperFromPartialPath(...paramArray)
  )
}