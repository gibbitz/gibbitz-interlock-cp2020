import sidebarTemplate from '../../templates/importSidebar.hbs'
import { importArmor } from './importArmor'
import { importSkills } from './importSkills'

export const renderSidebarTab = ({ tabName, _element }) => {
  if (tabName === 'settings') {
    const context = {
      importers: {
        'import-skills': {
          name: 'cp2020.sidebar.imports.skills',
          callback: importSkills
        },
        'import-armor': {
          name: 'cp2020.sidebar.imports.armor',
          callback: importArmor
        }
      }
    }
    const tabContent = Handlebars.compile(sidebarTemplate)
    const template = document.createElement('template')
    template.innerHTML = tabContent(context)
    const importSection = template.content.childNodes[0]
    importSection.addEventListener('click', (event) => {
      const dataSelector = event.target.getAttribute('data-selector')
      if (dataSelector) {
        context.importers[dataSelector].callback()
      }
    })
    _element[0].appendChild(importSection)
  }
}