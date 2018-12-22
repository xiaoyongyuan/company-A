/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';


//企业用户
import Companyhome from './companyhome/Companyhome';
import Companyscene from './companyhome/Companyscene';
import Companydeveice from './companyhome/Companydeveice';
import Calling from './companyhome/Calling';
import Connent from './companyhome/Connent';
import Deveicedet from './companyhome/Deveicedet';
import Setarea from './companyhome/Setarea';
import Settime from './companyhome/Settime';



// 个人用户
import Alarmdetails from './userhome/Alarmdetails';
import Alarmlist from './userhome/Alarmlist';
import Equipment from './userhome/Equipment';
import Userhome from './userhome/Userhome';

//系统管理
import Loglist from './settings/Loglist';
import Employeelist from './settings/Employeelist';


const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});

export default {
    WysiwygBundle

    , Companyhome, Companyscene, Companydeveice, Calling, Connent, Deveicedet, Settime, Setarea
    , Alarmdetails, Alarmlist, Equipment, Userhome
    , Employeelist, Loglist

}