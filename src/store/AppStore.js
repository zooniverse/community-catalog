import { types } from 'mobx-state-tree'

const AppStore = types.model('AppStore', {
  
  project: types.maybe(types.frozen()),  // Selected Zooniverse project config. See projects.json
  user: types.maybe(types.frozen()),  // Logged in user. It's a Panoptes resource.
  showingSensitiveImages: types.optional(types.boolean, false)  // If enabled, show sensitive images.
  
}).actions(self => {
  return {

    setProject (val) {
      self.project = val
    },

    setUser (val) {
      self.user = val
    },

    setShowingSensitiveImages (val) {
      self.showingSensitiveImages = val
    }

  }
})

export default AppStore