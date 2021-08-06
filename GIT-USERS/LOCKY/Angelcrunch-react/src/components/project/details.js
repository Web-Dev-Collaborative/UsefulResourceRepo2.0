import React from 'react';
import Router from 'react-router';
import Mixin from 'react-mixin';
import connectToStores from 'alt/utils/connectToStores';
import $ from 'jquery'

import AjaxMapping from 'utils/ajaxMapping';
import CookieHelper from 'utils/cookieHelper';
import {txt2html , confirmDialogue} from 'utils/tools';
import ProjectInfoStore from 'stores/project/projectInfoStore';
import ProjectInfoAction from 'actions/project/projectInfoActions';

const Link = Router.Link;

@connectToStores
@Mixin.decorate(Router.State)
export class Articles extends React.Component {
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

    componentDidMount() {
        var  url = AjaxMapping.project_details.url,
            type = AjaxMapping.defaultType,
      cookieName = CookieHelper.cookieName,
           _data = {
                com_id: this.getParams().id,
                [cookieName.userId]: CookieHelper.property(cookieName.userId),
                [cookieName.token]: CookieHelper.property(cookieName.token)
           };
        $.post(url, _data, function (data) {
            ProjectInfoAction.updateDetailInfoVsHash({info: data,
                                                        hash: _data.com_id});
        }.bind(this), type);
    }

    render() {
        var com_id = this.getParams().id;
        var projectData = this.props.projectData[com_id],
            data = projectData && projectData.detailInfo ?
                                                projectData.detailInfo 
                                                : {};
        if(!$.isEmptyObject(data)){
            var intro = !$.isEmptyObject(data.descriptions) ?
                (
                    <article className="intro">
                        <h1>项目描述</h1>
                        {
                            data.descriptions.user_case ?
                            (<i>
                                <p className="silver">用户场景</p>
                                <p dangerouslySetInnerHTML={{__html: txt2html(data.descriptions.user_case)}}></p>
                            </i>):null
                        }
                        {
                            data.descriptions.market_research ?
                            (<div className="item">
                                <p className="silver">市场调研</p>
                                <p dangerouslySetInnerHTML={{__html: txt2html(data.descriptions.market_research)}}></p>
                            </div>):null
                        }
                        {
                            data.descriptions.advantage ?
                            (<div className="item">
                                <p className="silver">项目优势</p>
                                <p dangerouslySetInnerHTML={{__html: txt2html(data.descriptions.advantage)}}></p>
                            </div>):null
                        }
                        {
                            data.descriptions.pattern ?
                            (<div className="item">
                                <p className="silver">商业模式</p>
                                <p dangerouslySetInnerHTML={{__html: txt2html(data.descriptions.pattern)}}></p>
                            </div>):null
                        }
                        {
                            data.descriptions.plan ?
                            (<div className="item">
                                <p className="silver">发展规划</p>
                                <p dangerouslySetInnerHTML={{__html: txt2html(data.descriptions.plan)}}></p>
                            </div>):null
                        }
                    </article>
                ): null;
        var team = data.team.length ?
                (
                    <article className="team">
                        <h1>团队成员</h1>
                        {
                            (()=>{
                                var arr = [];
                                for (var K in data.team) {
                                    var item = data.team[K];
                                    if(!item._key) item._key = item.avatar + K.toString();
                                    arr.push(
                                        <div key={item._key} className="item">
                                            <h3>{item.name}</h3>
                                            <p className="avatar"><img src={item.avatar||''} /></p>
                                            <p className="experience">{item.firmname + " · " + (item.title || '')}</p>
                                            <p dangerouslySetInnerHTML={{__html: txt2html(item.summary)}} className="gray"></p>
                                        </div>
                                    )
                                };
                                return arr;
                            })()
                        }
                    </article>
                ): null;
        var milestone = data.milestone.length ?
                (
                    <article className="milestone">
                        <h1>项目大事记</h1>
                        {
                            (()=>{
                                var arr = [];
                                for (var K in data.milestone) {
                                    var item = data.milestone[K];
                                    if(!item._key) item._key = item.M_dd + K.toString();
                                    arr.push(
                                        <div key={item._key} className="item">
                                            <p className="date">
                                                <i>{item.M_dd}</i><em>{item.yyyy}</em>
                                            </p>
                                            <p className="gray">{item.content}</p>
                                        </div>
                                    );
                                };
                                return arr;
                            })()
                        }
                    </article>
                ): null;
        var growthdata = data.growthdata.length ?
                (
                    <article className="growing-up">
                        <h1>成长数据</h1>
                        {
                            (()=>{
                                var arr = [];
                                for (var K in data.growthdata) {
                                    var item = data.growthdata[K];
                                    if(!item._key) item._key = item.yyyy + K.toString();
                                    arr.push(
                                        <div key={item._key} className="item">
                                            <p className="date">
                                                <i>{item.M}</i><em>{item.yyyy}</em>
                                            </p>
                                            <p className="gray">{item.name + item.quantity}</p>
                                        </div>
                                    )
                                };
                                return arr;
                            })()
                        }
                    </article>
                ): null;
        var news = data.news.length ?
                (
                    <article className="news">
                        <h1>新闻</h1>
                        {
                            (()=>{
                                var arr = [];
                                for (var K in data.growthdata) {
                                    var item = data.growthdata[K];
                                    if(!item._key) item._key = item.title + K.toString();
                                    arr.push(
                                        <i key={item._key}>
                                            <p className="date">
                                                <i>{item.M_dd}</i><em>{item.yyyy}</em>
                                            </p>
                                            <div className="item">
                                                <p>{item.title}</p>
                                                <p className="gray">{item.content > 53 ? item.content + '...' : item.content}</p>
                                            </div>
                                        </i>
                                        )
                                    };
                                return arr;
                            })()
                        }
                    </article>
                ): null;
        return (
            <div className="article-list">
                {intro}
                {team}
                {milestone}
                {growthdata}
                {news}
            </div>
        );
        }
        else return null;
    }
};

@connectToStores
@Mixin.decorate(Router.State)
export class Invest extends React.Component {
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

    componentDidMount() {
        var  url = AjaxMapping.project_financeInfo.url,
            type = AjaxMapping.defaultType,
      cookieName = CookieHelper.cookieName,
           _data = {
                com_id: this.getParams().id,
                [cookieName.userId]: CookieHelper.property(cookieName.userId),
                [cookieName.token]: CookieHelper.property(cookieName.token)
           };
        $.post(url, _data, function (data) {
            ProjectInfoAction.updateFinanceInfoVsHash({info: data,
                                                         hash: _data.com_id});
        }.bind(this), type);
    }

    render() {
        var com_id = this.getParams().id;
        var projectData = this.props.projectData[com_id],
            data = projectData && projectData.financeInfo ?
                                                projectData.financeInfo 
                                                : {};

        var qa_list = data.qa_list && data.qa_list.length ?
                    (<article className="questions-answers">
                        <h1>Q&A</h1>
                            {(()=>{
                                var arr = [];
                                for (var K in data.qa_list) {
                                    var item = data.qa_list[K];
                                    if(!item._key) item._key = item.q + K.toString();
                                    arr.push(
                                        <div key={item._key} className="group">
                                            <div className="item">
                                                <p className="title-container"><i>Q</i><em>{item.name + "·" + item.title}</em></p>
                                                <p>{item.q}</p>
                                            </div>
                                            <div className="item">
                                                <p className="title-container"><i>A</i><em>{item.a_name + '·项目创始人'}</em></p>
                                                <p>{item.a}</p>
                                            </div>
                                        </div>
                                    )
                                };
                                return arr;
                            })()}
                        </article>
                    ):null,
            purpose = data.purpose ?
                     (
                        <article className="funds">
                            <h1>资金用途</h1>
                            <i dangerouslySetInnerHTML={{__html: txt2html(data.purpose)}}></i>
                        </article>
                        )
                     :null,
            vc_list = data.vc_list && data.vc_list.length ?
                    (<article className="invester">
                        <h1>本轮投资意向<i>{data.vc_list.length || 0}</i></h1>
                        <div id="invester" className="slider-container">
                            <ul>
                                {(()=>{
                                    var arr = [];
                                    for (var K in data.vc_list) {
                                        var item = data.vc_list[K];
                                        if(!item._key) item._key = item.avatar + K.toString();
                                        arr.push(
                                            <li key={item._key}
                                                className={data.vc_list.length>3 ? ''
                                                                :(data.vc_list.length == 1 ? 
                                                                                    'single' :
                                                                                    'double')}>
                                                <p className="avatar"><img src={item.avatar || ''} /></p>
                                                <p><i>{item.name}</i><em>{item.firmname + item.title}</em></p>
                                                <div className="investment">{item.amount + 'W'}</div>
                                            </li>
                                        )
                                    };
                                    return arr;
                                    })()}
                            </ul>
                        </div>
                    </article>
                    ):null;
        return (
            <div>
                <article className="needs">
                    <div className="info-table">
                        <ul>
                            <li className="hourglass"><aside><i>{data.hope_amount || 0}</i><i>W</i><em>预计融资</em></aside></li>
                            <li className="pie-chat"><aside><i>{data.stock_sale || 0}</i><i>%</i><em>出让股权比例</em></aside></li>
                        </ul>
                        <ul>
                            <li className="money"><aside><i>{data.min_quota || 0}</i><i>W</i><em>最低投资额</em></aside></li>
                            <li className="bar-chat"><aside><i>{data.price || 0}</i><i>W</i><em>融资前估值</em></aside></li>
                        </ul>
                    </div>
                    { data.txt ?
                             <p><i>优先考虑的投资人：</i><em>{data.txt}</em></p>
                             :null 
                     }
                </article>
                {vc_list}
                {purpose}
                {qa_list}
            </div>
        );
    }
};

@connectToStores
@Mixin.decorate(Router.State)
export class BusinessPlan extends React.Component {
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

    componentDidMount() {
        var  url = AjaxMapping.business_plan_files.url,
            type = AjaxMapping.defaultType,
      cookieName = CookieHelper.cookieName,
           _data = {
                com_id: this.getParams().id,
                [cookieName.userId]: CookieHelper.property(cookieName.userId),
                [cookieName.token]: CookieHelper.property(cookieName.token)
           };
        $.post(url, _data, function (data) {
            ProjectInfoAction.updatePlanFileInfoVsHash({info: data,
                                                          hash: _data.com_id});
        }.bind(this), type);
    }

    render() {
        var com_id = this.getParams().id;
        var projectData = this.props.projectData[com_id],
            data = projectData && projectData.planFile ?
                                                projectData.planFile 
                                                : {};
        return (
            <article className="extra-files">
                <h1>商业企划书</h1>
                <div className="file PDF"><a data-confirm-dialogue="确定要下载商业计划书吗？" href={data.pb}>下载商业计划书 [6.5M]</a></div>
            </article>
        );
    }
}


@connectToStores
@Mixin.decorate(Router.State)
export class projectDetails extends React.Component {
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
    if(!CookieHelper.isLogin())
        return(
            <div>
                <div className="login-options">
                    <p className="declare">详细信息只对<i>天使汇认证投资人</i>可见，请选择您的身份:</p>
                    <p className="declare can-not-view-marked">想查看项目详细信息、成长数据、商业计划书等重要信息，你需要在电脑上打开天使汇网站申请投资人身份。</p>
                    <div className="control-module">
                        <em><i></i>天使汇认证投资人</em>
                        <Link to='login' query={{source: location.pathname}}>
                            <button className="btn btn-small login-btn" data-href="">登录</button>
                        </Link>
                    </div>
                </div>
                <div className="banner-footer">
                    <p>AngelCrunch.com</p>
                    <p>天使汇 - 让靠谱的项目找到靠谱的钱</p>
                </div>
            </div>
        )
    else{
        return (
            <div>
                <Articles />
                <div className="invest-info">
                    <Invest />
                    <BusinessPlan />
                </div>
                <div className="page-action">
                    <div className="btn-group">
                        <button onClick={confirmDialogue('Not yet enabled.')} className="btn btn-small white-border" data-btn-reverse-text="已关注">关注</button>
                        <button onClick={confirmDialogue('Not yet enabled.')} className="btn btn-small orange" data-target="_self">发送投资意向</button>
                    </div>
                </div>
            </div>
        );
        }
    }
};

export default projectDetails;