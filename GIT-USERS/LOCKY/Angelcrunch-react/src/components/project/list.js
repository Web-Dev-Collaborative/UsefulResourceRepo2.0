import React from 'react';
import $ from 'jquery';
import Router from 'react-router';
import Mixin from 'react-mixin';
import connectToStores from 'alt/utils/connectToStores';

import AjaxMapping from 'utils/ajaxMapping';
import TitleHelper from 'utils/titleHelper';
import CookieHelper from 'utils/cookieHelper';
import {shallowEqual} from 'utils/tools';
import ListInfoStore from 'stores/project/listInfoStore';
import ListInfoAction from 'actions/project/listInfoActions';

const Link = Router.Link;
const pageSize = 15;

@connectToStores
@Mixin.decorate(Router.State)
export class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            pageSum: 0,
            prevPage: 1,
            nextPage: 1,
            itemAmount: 0,
            currentPage: 0
        };
        this.AjaxHandle = this.AjaxHandle.bind(this);
        this.countPageInfo = this.countPageInfo.bind(this);
        this.ParsingListData = this.parsingListData.bind(this);
    }

    static getStores(props) {
        return [ListInfoStore];
    }

    static getPropsFromStores(props) {
        return ListInfoStore.getState();
    }

    countPageInfo(data){
        var amount = data.total;
        if(!amount) return 0;
        var pageNum = parseInt(this.getParams().pageNum) || 1,
            pageSum = Math.round(parseInt(parseInt(amount) / pageSize) + 0.5),
        currentPage = pageNum < 0 ? 1 :
                        (pageNum > pageSum ? pageSum : pageNum);
        this.setState({
            pageNum: pageNum,
            pageSum: pageSum,
            prevPage: (currentPage - 1) || 1,
            nextPage: (currentPage + 1) > pageSum
                        ? pageSum : (currentPage + 1),
            currentPage: currentPage
        });
    }

    AjaxHandle(pageindex){
        var  url = AjaxMapping.item_list.url,
            type = AjaxMapping.defaultType,
      cookieName = CookieHelper.cookieName,
         pageNum = parseInt(this.getParams().pageNum || 1);
    
        pageNum = pageNum < 0 ? 1 : pageNum;
        var _data = {
                pagesize: pageSize,
                pageindex: pageindex || pageNum,
                [cookieName.userId]: CookieHelper.property(cookieName.userId),
                [cookieName.token]: CookieHelper.property(cookieName.token)
           };
        var p_prop=this.props;
        $.post(url, _data, function (data) {
            ListInfoAction.updateListInfoVsPageNum({info: data,
                                                    hash: _data.pageindex});
        }.bind(this), type);
    }

    parsingListData(){
        var pageNum = this.getParams().pageNum || 1;
        return this.props.listData[pageNum] ?
                            this.props.listData[pageNum]
                            : {};
    }

    componentDidMount() {
        this.AjaxHandle();        
    }

    componentWillReceiveProps(nextProps) {
        var data = this.parsingListData();
        this.countPageInfo(data);
    }

    render() {
        var pageNum = this.getParams().pageNum || 1;
        var data = this.parsingListData();
        TitleHelper.changeTitle(TitleHelper.projectList);
        return (
            <div className='list-root'>
                <div className='section-list'>
                    {
                        !data.list ?
                        (<div className="loading-container">
                            <div className="loading"></div>
                        </div>) : null
                    }
                    {
                        data.list ?
                        (() => {
                            var arr = [],
                                item;
                            for(var K in data.list){
                                var item = data.list[K];
                                arr.push(<Link key={item.id} to='projectDetails' params={{id:item.id}}>
                                        <section>
                                            <div className='logo'><img src={item.logo || ''} /></div>
                                            <div className='summary'>
                                                <h3>{item.name}</h3>
                                                <p>{item.concept}</p>
                                                <ul className='item-state'>
                                                    <li title='收藏数'>
                                                        <i className="vector-icons liked"></i>
                                                        <span>{item.remaind_count || 0}</span>
                                                    </li>
                                                    <li title='约谈数'>
                                                        <i className="vector-icons chat"></i>
                                                        <span>{item.is_meet || 0}</span>
                                                    </li>
                                                    <li title='浏览数'>
                                                        <i className="vector-icons eye"></i>
                                                        <span>{item.coinveststatus || 0}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            {
                                                item.process_bar ?
                                                (<div className='progress-container'>
                                                    <div className='progress'>
                                                        <div className='progress-bar progress-bar-success progress-bar-striped active reverse'
                                                             role='progressbar' aria-valuenow='45' aria-valuemin='0' aria-valuemax='100'
                                                             style={{width: '45%'}}>
                                                            <span className='sr-only'>45% Complete</span>
                                                        </div>
                                                    </div>
                                                    <p><em>投资意向: 65万（预融资100万）</em><em className='right'>剩余21天</em></p>
                                                </div>) : null
                                            }
                                        </section>
                                        </Link>)
                            }
                            return arr;
                        })() : null
                    }
                </div>
                <div className='page-turn'>
                    <Link onClick={this.AjaxHandle
                                                .bind(this, this.state.prevPage)} 
                                                to='projectListVsNum' params={{pageNum:this.state.prevPage}}
                        className='btn prev-page'>上一页</Link>
                    <p><i className='current-page'>{this.state.currentPage}</i>/
                    <i className='total-page'>{this.state.pageSum}</i></p>
                    <Link onClick={this.AjaxHandle
                                                .bind(this, this.state.nextPage)} 
                                                to='projectListVsNum' params={{pageNum:this.state.nextPage}}
                    className='btn next-page'>下一页</Link>
                </div>
            </div>
        );
    }
}

export default List;