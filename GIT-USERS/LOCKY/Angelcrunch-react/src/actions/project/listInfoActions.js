import flux from 'control';  
import {createActions} from 'alt/utils/decorators';

@createActions(flux)
class ListInfoAction {  
  constructor() {
    this.generateActions('updateListInfoVsPageNum');
  }
}

export default ListInfoAction;