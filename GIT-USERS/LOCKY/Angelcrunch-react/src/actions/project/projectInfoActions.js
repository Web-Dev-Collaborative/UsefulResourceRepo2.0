import flux from 'control';  
import {createActions} from 'alt/utils/decorators';

@createActions(flux)
class ProjectInfoAction {  
  constructor() {
    this.generateActions('updateBaseInfoVsHash',
                         'updateDetailInfoVsHash',
                         'updateFinanceInfoVsHash',
                         'updatePlanFileInfoVsHash');
  }
}

export default ProjectInfoAction;