import React from 'react';
import $ from 'jquery';
import Router from 'react-router';
import Mixin from 'react-mixin';

import AjaxMapping from 'utils/ajaxMapping';
import CookieHelper from 'utils/cookieHelper';
import Notification from 'components/notification';
import Input from 'components/Forms/textInput';

import loginPic from 'static/images/wapsite/angelcrunchbrandlogoinloginpage.png';


@Mixin.decorate(Router.State)
@Mixin.decorate(Router.Navigation)
export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.checkActive = this.checkActive.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    eleClassName() {
        return {
            // State
            active: 'active'
        }
    }

    checkActive() {
        var $form= $(this.refs.loginFrom.getDOMNode());
        var $USN = $form.find('#account'),
            $PWD = $form.find('#pwd'),
            $btn = $(this.refs.submit.getDOMNode());
        if($USN.val() != ''
            && $PWD.val().trim().length >= 6)
            $btn.addClass(this.eleClassName().active);
        else $btn.removeClass(this.eleClassName().active);
    }

    handleLogin(e){
        this.checkActive();
        var $btn = $(e.target);
        if($btn.hasClass(this.eleClassName().active)){
            var  url = AjaxMapping.login.url,
                 type = AjaxMapping.defaultType;
            var Warning = React.findDOMNode(this.refs.warning),
                Success = React.findDOMNode(this.refs.success);
            var $form= $(this.refs.loginFrom.getDOMNode());
            var $USN = $form.find('#account'),
                $PWD = $form.find('#pwd');
            var _data = {};
                _data[$USN.attr("name")] = $USN.val().trim();
                _data[$PWD.attr("name")] = $PWD.val().trim();
            Notification.notificationToggle(
                                        Notification.Type.Warning,'登录中...');
            $.post(url, _data, function (data) {
                if (data.user) {
                    CookieHelper.setUserKey(data.user);
                    Notification.notificationToggle(
                                                Notification.Type.Success,'登录成功');
                    this.transitionTo(this.getQuery().source
                                        || '/');
                } else if (data.success == false)
                    Notification.notificationToggle(
                                                Notification.Type.Error,'登录名和密码不匹配');
            }.bind(this), type);
            
        }
    }

    componentDidMount() {
        this.checkActive();
    }

    render() {
        var dev_account={
            account: __DEV__ ? 'tonghuashuai@126.com' : '',
            pwd: __DEV__ ? 'angel1234' : ''
        }
        return (
          <div>
            <div className='details'>
                <div className='angelcrunch-brand'>
                    <img src={loginPic} />
                </div>
                <div ref='loginFrom'  className='login-module' onChange={this.checkActive}>
                    <Input labelName='邮箱/手机' id='account' type='text' name='account' defaultValue={dev_account.account} />
                    <Input labelName='密码' id='pwd' type='password' name='password' defaultValue={dev_account.pwd} />
                    <button ref='submit' className='btn submit-btn' onClick={this.handleLogin} ></button>
                </div>
                <div className='banner-footer'>
                    <p>AngelCrunch.com</p>
                    <p>天使汇 - 让靠谱的项目找到靠谱的钱</p>
                </div>
            </div>
          </div>
        );
    }
}

export default Login;