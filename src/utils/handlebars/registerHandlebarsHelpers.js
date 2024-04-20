import cp2020Log from './cp2020Log'
import { HBS_TEMPLATES } from '../../constants/handlebars'
import {
  registerHelperFromPartialPaths
} from './registerHelperFromPartial'

/**
 * registers handlebars helpers for the system
 */
export const registerHandlebarsHelpers = () => {
  // allows access to logging in the template files
  Handlebars.registerHelper('cp2020Log', cp2020Log)
  // registers all the preloaded handlebars templates as helper functions
  registerHelperFromPartialPaths(HBS_TEMPLATES)
}