import { types } from 'mobx-state-tree'

const AppStore = types.model('AppStore', {
  
  initialised: types.optional(types.boolean, false),
  project: types.maybe(types.frozen()),
  user: types.maybe(types.frozen()),
  
}).actions(self => {
  return {
    
    setInitialised (val) {
      self.initialised = val
    },

    setProject (val) {
      self.project = val
    },

    setUser (val) {
      self.user = val
    },

  }
})

export default AppStore