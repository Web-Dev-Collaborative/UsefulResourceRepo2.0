import flux from 'control';  
import {createStore, bind} from 'alt/utils/decorators';  
import actions from 'actions/project/projectInfoActions';

@createStore(flux)
class ProjectInfoStore {  
  projectData = {};

  @bind(actions.updateBaseInfoVsHash)
  updateBaseInfoVsHash(data) {
    if(!data.hash) throw new Error('Missing required argument.');
    this.projectData[data.hash] = this.projectData[data.hash] || {};
    this.projectData[data.hash].baseInfo = data.info;
  }

  @bind(actions.updateDetailInfoVsHash)
  updateDetailInfoVsHash(data) {
    if(!data.hash) throw new Error('Missing required argument.');
    this.projectData[data.hash] = this.projectData[data.hash] || {};
    this.projectData[data.hash].detailInfo = data.info;
  }

  @bind(actions.updateFinanceInfoVsHash)
  updateFinanceInfoVsHash(data) {
    if(!data.hash) throw new Error('Missing required argument.');
    this.projectData[data.hash] = this.projectData[data.hash] || {};
    this.projectData[data.hash].financeInfo = data.info;
  }

  @bind(actions.updatePlanFileInfoVsHash)
  updatePlanFileInfoVsHash(data) {
    if(!data.hash) throw new Error('Missing required argument.');
    this.projectData[data.hash] = this.projectData[data.hash] || {};
    this.projectData[data.hash].planFile = data.info;
  }
}

export default ProjectInfoStore;