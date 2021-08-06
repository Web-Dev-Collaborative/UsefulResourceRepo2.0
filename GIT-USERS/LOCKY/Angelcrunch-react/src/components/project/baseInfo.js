import React from 'react';
import $ from 'jquery';
import Router from 'react-router';
import Mixin from 'react-mixin';
import connectToStores from 'alt/utils/connectToStores';

import AjaxMapping from 'utils/ajaxMapping';
import TitleHelper from 'utils/titleHelper';
import ProjectInfoStore from 'stores/project/projectInfoStore';
import ProjectInfoAction from 'actions/project/projectInfoActions';

@connectToStores
@Mixin.decorate(Router.State)
export class BrandingHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getStores(props) {
        return [ProjectInfoStore];
    }

    static getPropsFromStores(props) {
        return ProjectInfoStore.getState();
    }

    render() {
        var com_id = this.getParams().id;
        var projectData = this.props.projectData[com_id],
            data = projectData && projectData.baseInfo ?
                                                projectData.baseInfo 
                                                : {},
            percent = !$.isEmptyObject(data) ?
                                         (data.finance_percent > 100 ? 100 : data.finance_percent) + '%'
                                         : 0;
        var progressStyle={
            width: percent
        };
        return (
          <div className="branding-head">
                <div className="icon"><img src={data.logo} /></div>
                <div className="brand-info">
                    <h1>{data.name}</h1>
                    <p>{data.concept}</p>
                    <p className="extra">{data.industry}</p>
                </div>
                <div className="progress-container">
                    <div className="progress">
                        <div className="progress-bar progress-bar-success progress-bar-striped active reverse" 
                             role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" 
                             style={progressStyle}>
                            <span className="sr-only"><i>{percent}</i><i> Complete</i></span>
                        </div>
                    </div>
                    <p>
                        <em>投资意向: {data.amount||0}万（预融资{data.hope_amount||0}万）</em>
                        <em className="right">剩余{data.day||0}天</em>
                    </p>
                </div>
          </div>
        );
  }
};

@connectToStores
@Mixin.decorate(Router.State)
export class Album extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static getStores(props) {
        return [ProjectInfoStore];
    }

    static getPropsFromStores(props) {
        return ProjectInfoStore.getState();
    }

    render() {
        var com_id = this.getParams().id;
        var projectData = this.props.projectData[com_id],
            data = projectData && projectData.baseInfo ?
                                                projectData.baseInfo 
                                                : {};
        if(data.pics)
            var album = data.pics.map(function(group, index){
                return(
                        <li key={group.small} ><img src={group.small} /></li>
                    );
            });
        return (
            <div id="album" className="slider-container">
              <ul>
                  {album}
              </ul>
            </div>
        );
    }
}

@connectToStores
@Mixin.decorate(Router.State)
export class BaseInfoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static getStores(props) {
        return [ProjectInfoStore];
    }

    static getPropsFromStores(props) {
        return ProjectInfoStore.getState();
    }

    componentDidMount() {
        var  url = AjaxMapping.project_baseInfo.url,
            type = AjaxMapping.defaultType,
           _data = {
              com_id: this.getParams().id
           };
        $.post(url, _data, function (data) {
            ProjectInfoAction.updateBaseInfoVsHash({info: data,
                                                      hash: _data.com_id});
        }.bind(this), type);
    }

    render() {
        var com_id = this.getParams().id;
        var projectData = this.props.projectData[com_id],
            data = projectData && projectData.baseInfo ?
                                                projectData.baseInfo 
                                                : {},
            titleStr = (data.name || "") + (data.concept ? (" - " + data.concept) : "");
        TitleHelper.changeTitle(titleStr, TitleHelper.projectDetails);
        return (
            <div>
                <BrandingHead />
                <Album />
            </div>
        );
    }
}

export default BaseInfoComponent;