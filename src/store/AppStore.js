import { types } from 'mobx-state-tree'

const AppStore = types.model('AppStore', {
  
  project: types.maybe(types.frozen()),
  user: types.maybe(types.frozen()),
  
}).actions(self => {
  return {

    setProject (val) {
      self.project = val
    },

    setUser (val) {
      self.user = val
    },

  }
})

export default AppStore