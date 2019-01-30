import React, { Component } from 'react';
import { Row,Col,Carousel,Modal} from 'antd';
import '../../style/yal/css/overView.css';
import {post} from "../../axios/tools";
import w1 from "../../style/yal/img/w1.png";
import Echartline from "./Echartline";
import Echartpie from "./Echartpie";
import Universebg from "./Universebg";
import moment from "moment";
const pao=[{a:"13621"},{a:"534534"},{a:"1564358"},{a:"964983"},{a:"154684"}];
var videoList=[
    {
        id:"1",
        img:"http://pic01.aokecloud.cn/alarm/1000004/pic/20190119/1000004_20190119110806_320X240.jpg"
    },
    {
        id:"2",
        img:"http://pic01.aokecloud.cn/alarm/1000004/pic/20190119/1000004_20190119110806_320X240.jpg"
    },
    {
        id:"3",
        img:"http://pic01.aokecloud.cn/alarm/1000004/pic/20190119/1000004_20190119110806_320X240.jpg"
    }
];
const deveice=[{
    name:'神道西侧',
    ccom:'明秦王陵遗址',
    alarm:1282,
},{
    name:'神道东侧',
    ccom:'明秦王陵遗址',
    alarm:1159,
},{
    name:'神道入口',
    ccom:'明秦王陵遗址',
    alarm:18,
},{
    name:'15',
    ccom:'阿房宫',
    alarm:212,
},{
    name:'神道东侧',
    ccom:'明秦王陵遗址',
    alarm:1159,
},{
    name:'神道入口',
    ccom:'明秦王陵遗址',
    alarm:18,
},{
    name:'15',
    ccom:'阿房宫',
    alarm:212,
}]

class overView extends Component {
    constructor(props){
        super(props);
        this.state= {
            option: {},
            deveice: deveice,
            analysisCount: 0,//总报警数
            unhandle: 0,//未处理报警数
            okconfirm: 0,//确认数
            xufalse: 0,//虚报警数
            ignore: 0,//忽略数
            today: moment().format('LL'),
            rollArrX: [],//点名次数x轴
            rollName: [],//点名次数名称
            afang: [],
            ming: [],
            patrolX: [],//巡更
            patrolName: [],
            patrolafang:[],
            patrolafangafang:[],
            patrolafangming:[],
            visible: false,
            alarmVideo:[]

        };
        this.saveRef = ref => {this.refDom = ref};
    }
    componentWillMount=()=>{
        this.setState({
            DHeight:document.documentElement.clientHeight-65+'px'
        })

    };
    //即时视频model
    instantVideo =()=>{
        this.setState({
            visible:true
        })
    };
    VideoCancel =()=>{
        this.setState({
            visible:false
        })
    };
    //报警视频
    alarmVideo =()=>{
        post({url:"/api/alarm/gets_alarm_video_big"},(res)=>{
            if(res.success){
                var videoList=Object.keys(res.data).map(key=> res.data[key]);
                this.setState({
                    alarmVideo:videoList.slice(0,3)
                })
            }
        })
    }
    //报警次数
    alarmList =()=>{
        post({url:"/api/alarm/gets_alarm_afterday_big"},(res)=>{
            var alarmX=[];
            var alarmName=[];
            var alarmafang=[];
            for(var a in res.data){
                alarmName.push(res.data[a].cname);
                for(var b in res.data[a].alarm){
                    alarmX.push(res.data[a].alarm[b].ahour);
                    alarmafang.push(res.data[a].alarm[b].alarmnum)
                }
            }
            this.setState({
                alarmX:alarmX.slice(0,24),
                alarmName:alarmName,
                alarmafang:alarmafang.slice(0,24),
                alarmming:alarmafang.slice(24,48),
            });
            console.log(alarmafang.slice(0,24))
            console.log(alarmafang.slice(24,48))
        })
    }
    //点名次数
    rollcalldetail =()=>{
        post({url:"/api/rollcalldetail/gets_rollcall_weeks_big"},(res)=>{
            if(res.success){
                var rollX=[];
                var rollName=[];
                var afang=[];
                for(var a in res.data){
                    rollName.push(res.data[a].cname);
                    for(var b in res.data[a].rollcall){
                        rollX.push(moment(res.data[a].rollcall[b].pdate).format("MM.DD"));
                        afang.push(res.data[a].rollcall[b].totalcount)
                    }
                }
                this.setState({
                    rollArrX:rollX.reverse().slice(0,7),
                    rollName:rollName,
                    afang:afang.reverse().slice(0,7),
                    ming:afang.slice(7,14),
                });
            }
        })
    };
    //巡更次数
    patrolresult =()=>{
        post({url:"/api/patrolresult/gets_patrol_weeks_big"},(res)=>{
            if(res.success){
                var patrolX=[];
                var patrolName=[];
                var patrolafang=[];
                for(var a in res.data){
                    patrolName.push(res.data[a].cname);
                    for(var b in res.data[a].patrol){
                        patrolX.push(moment(res.data[a].patrol[b].pdate).format("MM.DD"));
                        patrolafang.push(res.data[a].patrol[b].totalcount)
                    }
                }
                this.setState({
                    patrolX:patrolX.reverse().slice(0,7),
                    patrolName:patrolName,
                    patrolafangafang:patrolafang.reverse().slice(0,7),
                    patrolafangming:patrolafang.slice(7,14),
                });
            }
        })
    };
    //背景动态
    dynamic =()=>{
        var ScollOut=document.getElementById("ScollhiddenOut");
        var bl = 5;
        setInterval(
            document.getElementById("ScollhiddenOut").onscroll=function() {
                bl=bl+0.96;
                var scrollHeight = ScollOut.scrollHeight;//div里内容的高度
                var scrollTop =ScollOut.scrollTop;//0-18
                var clientHeight = ScollOut.clientHeight;//div内里框框的高度
                var scrollbottom=scrollHeight-clientHeight;
                var scrollTopP=Math.ceil(scrollTop);
                if(scrollbottom-scrollTopP===0) {//滚动到底部了
                    console.log("到底部了");
                    ScollOut.scrollTop=0;
                }
                if(scrollbottom-scrollTopP===0) {//滚动到底部了
                    ScollOut.scrollTop=0;
                    bl=0;
                }else{
                    ScollOut.scrollTop = bl;
                    console.log("ScollhiddenOut", document.getElementById("ScollhiddenOut").scrollTop);
                }
            },2000);
     };
    componentDidMount() {
        window.onresize = () => {
            this.setState({
                DHeight:document.documentElement.clientHeight-65+'px'
            })
        };
        //背景动态
        this.dynamic();
        //点名次数
        this.rollcalldetail();
        //巡更次数
        this.patrolresult();
        //报警次数
        this.alarmList();
        //报警视频
        this.alarmVideo();
    }
    render() {
        const _this=this;
        return (
            <div className="overView" style={{height:this.state.DHeight}}>
                <Universebg />
                <div className="titletop">
                    <div className="titlevalue">
                        西安文物局
                    </div>
                </div>
                <Row gutter={24} className="warrper" >
                    <Col span={7} className="wcolum">
                        <div className="clunm">
                            <div className="lump">
                                <div className="titleechart">
                                    <span className="titlename">报警分析</span>
                                </div>
                                <div className="comp">
                                    <Echartpie type="lookcomp" winhe={(parseInt(this.state.DHeight)*0.7-20)*0.5-50} />
                                </div>
                            </div>
                        </div>
                        <div className="clunm lumpbott">
                            <div className="lump ">
                                <div className="titleechart">
                                    <span className="titlename">设备近状</span>
                                </div>
                                <div className="comp">
                                    <div className="equiptable">
                                        <div className="equipment equiphead">
                                            <Row className="lines">
                                                <Col className="gutter-row" xl={8}>
                                                    单位
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    设备
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    未处理报警数
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="scollhidden">
                                            <div className="scollhidden-out" id="ScollhiddenOut">
                                                <div className="scollhidden-inner">
                                                    {_this.state.deveice.map((el,i)=>(
                                                    <div className="equipment equipbody" key={'row'+i}>
                                                        <Row className="lines">
                                                            <Col className="gutter-row" xl={8}>
                                                            {el.name}
                                                            </Col>
                                                            <Col className="gutter-row" xl={8}>
                                                            {el.ccom}
                                                            </Col>
                                                            <Col className="gutter-row" xl={8}>
                                                            {el.alarm}
                                                            </Col>
                                                        </Row>
                                                        
                                                    </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={10} className="wcolumMap">
                        <div className="mainmap">
                            <div className="titleechart">
                                <span className="titlename">位置图</span>
                                <span className="today">当前日期:{this.state.today}</span>
                            </div>
                        </div>
                        <div className="maps">
                            <Echartpie type="xianmap" winhe={(parseInt(this.state.DHeight)*0.7-10)*0.8-100} xianmap={this.state.xianmap} />
                        </div>
                        <div className="draw">
                            <div className="untreated alarmtitle">
                                未处理报警
                            </div>
                            <div className="alarmover ">
                                <Carousel vertical autoplay className="alarmcarousel">
                                    {pao.map((el,i)=>(
                                        <div className="carouselbg"><h3>{el.a}</h3></div>
                                    ))
                                    }
                                </Carousel>

                            </div>
                        </div>
                    </Col>
                    <Col span={7} className="wcolum">
                        <div className="clunm">
                            <div className="lump">
                                <div className="titleechart timely">
                                    <span className="titlename">即时信息</span>
                                </div>
                                <div className="comp" style={{height:'calc(100% - 60px)'}}>
                                <Carousel vertical autoplay className="righttop">
                                        <div className="Rotation_chart">
                                           <div>
                                               <img src={w1} alt="" />
                                           </div>  
                                           <div>
                                               222
                                           </div>
                                        </div>
                                        <div className="Rotation_chart">
                                            <div>
                                            <img src={w1} alt="" />
                                           </div>  
                                           <div>
                                               444
                                           </div>
                                        </div>
                                        <div className="Rotation_chart">
                                            <div>
                                            <img src={w1} alt="" />
                                           </div>  
                                           <div>
                                               444
                                           </div>
                                        </div>
                                        
                                       
                                </Carousel>
                                </div>
                            </div> 
                        </div>
                        <div className="clunm lumpbott">
                            <div className="lump">
                                <div className="titleechart">
                                    <span className="titlename">巡更次数</span>
                                </div>
                                <div className="comp">
                                    <Echartline
                                        type="alarmnum"
                                        winhe={(parseInt(this.state.DHeight)*0.7-10)*0.5-10}
                                        patrolX={this.state.patrolX}
                                        patrolName={this.state.patrolName}
                                        patrolafangafang={this.state.patrolafangafang}
                                        patrolafangming={this.state.patrolafangming}
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="warrperbottom">
                    <Col span={7} className="bottomheig">
                        <div className="wappscol">
                            <div className="titleechart">
                                <span className="titlename">报警次数</span>
                            </div>
                            <div className="comp">
                                <Echartline
                                    type="rollcall"
                                    winhe={parseInt(this.state.DHeight)*0.3-70}
                                    alarmName={this.state.alarmName}
                                    alarmX={this.state.alarmX}
                                    alarmafang={this.state.alarmafang}
                                    alarmming={this.state.alarmming}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col span={10} className="bottomheig" style={{paddingRight:0}}>
                        <div className="wappscol">
                            <div className="titleechart">
                                <span className="titlename">即时视频</span>
                            </div>
                            <div className="comp compCount">
                                <div className="compCountVideo">
                                    {
                                        this.state.alarmVideo.map((v,i)=>(
                                            <div className="compVideo" key={i}><img src={v.picpath} alt="" onClick={this.instantVideo} /></div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={7} className="bottomheig" style={{paddingRight:0,paddingLeft:'17px'}}>
                        <div className="wappscol">
                            <div className="titleechart">
                                <span className="titlename">点名次数</span>
                            </div>
                            <div className="comp">
                                <Echartline
                                    type="patrol"
                                    winhe={parseInt(this.state.DHeight)*0.3-70}
                                    rollArrX={this.state.rollArrX}
                                    rollName={this.state.rollName}
                                    afang={this.state.afang}
                                    ming={this.state.ming}
                                    bowen={this.state.bowen}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onCancel={this.VideoCancel}
                    footer={null}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}
export default overView;
