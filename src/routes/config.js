export default {
    menus: [ 
        //企业用户
        { key: '/app/companyhome/index', identi:['comp'], title: '首页', icon: 'mobile', component: 'Companyhome' },
        //个人用户总览
        { key: '/app/Userhome/index',  identi:['user'], title: '总览', icon: 'mobile', component: 'Userhome' },
        //设备
        { key: '/app/Userhome/Equipment', identi:['user'], title: '设备', icon: 'bars', component: 'Equipment' },
        //报警
        { key: '/app/Userhome/Alarmlist', identi:['comp','user'], title: '报警', icon: 'bars', component: 'Alarmlist' },
        //系统管理
        {
            key: '/app/settings', title: '系统管理' , identi:['comp','user'], icon: 'bars',
            subs: [
                { key: '/app/settings/employeelist', identi:['comp','user'], title: '用户管理', component: 'Employeelist'}, 
                { key: '/app/settings/loglist', identi:['comp','user'], title: '日志', component: 'Loglist'},             
            ],
        },
    ],
    // 非菜单相关路由
    others: [
        { key: '/app/companyhome/companyscene', title: '场景', component: 'Companyscene'},
        { key: '/app/companyhome/deveicedet', title: '设备详情', component: 'Deveicedet'},
        { key: '/app/companyhome/companydeveice', title: '设备总览', component: 'Companydeveice'},
        { key: '/app/companyhome/setarea', title: '设置防区', component: 'Setarea'},
        { key: '/app/companyhome/settime', title: '设置布防时间', component: 'Settime'},
        { key: '/app/companyhome/calling', title: '点名', component: 'Calling'},
        { key: '/app/companyhome/connent', title: '关系网', component: 'Connent'},
        { key: '/app/userhome/Alarmdetails', title: '报警详情', component: 'Alarmdetails'},
        { key: '/app/userhome/Userdeveice', title: '设备详情', component: 'Userdeveice'},
            {
        key: '/subs4', title: '页面', icon: 'switcher',
        subs: [
            { key: '/login', title: '登录' },
            { key: '/404', title: '404' },
        ],
        },
    ]
}

