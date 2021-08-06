import $ from 'jquery';

export const TitleHelper = {
    baseTitle:' | 天使汇 | 让靠谱的项目找到靠谱的钱 | 创业，投资，找VC就上天使汇 | 中国股权众筹第一平台',
    login: '登录',
    projectDetails: '天使汇 | 项目页面 | 创业，投资，找VC就上天使汇',
    projectList: '项目列表',

    changeTitle: function(str, str2) {
        var newTitle = str + (str2 || this.baseTitle);
        if((str || str2) && 
            (newTitle != $('head title').text()))
            $('head title').text(newTitle);
    }
};

export default TitleHelper;