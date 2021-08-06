import flux from 'control';  
import {createStore, bind} from 'alt/utils/decorators';  
import actions from 'actions/project/listInfoActions';

@createStore(flux)
class ListInfoStore {  
  listData = {};

  @bind(actions.updateListInfoVsPageNum)
  updateListInfoVsPageNum(data) {
    if(!data.hash) throw new Error('Missing required argument.');
    this.listData[data.hash] = this.listData[data.hash] || {};
    this.listData[data.hash] = data.info;
  }
}

export default ListInfoStore;