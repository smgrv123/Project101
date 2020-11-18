import { observable } from 'mobx'

class Store {
  @observable email = ''
  @observable title = ''
  @observable desc = ''
}
export default new Store;