import React from 'react';
import $ from 'jquery';

export class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.WarningTimeHandle = 0;
        this.SuccessTimeHandle = 0;
    }

    static TimeHandle = 0;

    static Type = {
        Error  : '.red',
        Success: '.green',
        Warning: '.orange'
    }

    static notificationToggle(notificationType, txt) {
        var $target = $('.notification' + notificationType), 
            timeHandle;
        clearTimeout(Notification.TimeHandle);
        if (txt)
            $target.find(".txt").text(txt);
        $(".notification").hide();
        $target.stop(true).slideDown(240);
        Notification.timeHandle 
            = setTimeout((function ($target) {
                return function () {
                    $target.fadeOut(240);
                };
            }).call(this, $target), 3800);
        return !0;
    }

    closeNotification(e){
        $(e.target).closest('.notification').fadeOut(240);
    }

    render() {
        var {labelName, ...other} = this.props;
        return (
            <div className={'notification ' + this.props.color} {...other} >
                <i className='txt'></i>
                <i className='close' onClick={this.closeNotification} >×</i>
            </div>
        );
    }
}

export default Notification;