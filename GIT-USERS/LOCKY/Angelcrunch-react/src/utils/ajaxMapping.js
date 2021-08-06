var Domain = __AjaxDomain;

export const Ajax={
    defaultType: 'jsonp',
    login:{
        url: '//' + Domain + '/v3/home/login'
    },

    /*
    * Is use in project folder
    */ 
    item_list: {                     // Follow
        url: '//' + Domain + '/v3/m_startup'
    },

    project_details: {                     // Details
        url: '//' + Domain + '/v3/startup/m_detail'
    },

    project_financeInfo: {                 // Finance information
        url: '//' + Domain + '/v3/startup/m_finance'
    },

    project_baseInfo: {                   // Base information
        url: '//' + Domain + '/v3/startup/base_info'
    },

    business_plan_files: {                 // The business plan files
        url: '//' + Domain + '/v3/startup/pb'
    },

    follow: {                     // Follow
        url: '//' + Domain + '/v3/follow'
    },
    unfollow: {                     // Unfollow
        url: '//' + Domain + '/v3/unfollow'
    }
}

export default Ajax;