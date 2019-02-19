import React, { Component } from 'react';
import { Row,Col,Carousel,Modal} from 'antd';
import '../../style/yal/css/overView.css';
import {post} from "../../axios/tools";
import Echartline from "./Echartline";
import Echartpie from "./Echartpie";
import Universebg from "./Universebg";
import moment from "moment";
const pao=[{a:"13621"},{a:"534534"},{a:"1564358"},{a:"964983"},{a:"154684"}]

class overView extends Component {
    constructor(props){
        super(props);
        this.state= {
            option:{},
            analysisCount:0,//总报警数
            unhandle:0,//未处理报警数
            okconfirm:0,//确认数
            xufalse:0,//虚报警数
            ignore:0,//忽略数
            today:moment().format('LL'),
            rollArrX: [],//点名次数x轴
            rollName: [],//点名次数名称
            afang: [],
            ming: [],
            patrolX: [],//巡更
            patrolName: [],
            patrolafang:[],
            patrolafangafang:[],
            patrolafangming:[],
            deveicek:[],//设备
            callist:[],
            visible: false,
            alarmVideo:[],
            carsalarm:{},//车报警数量
            fireCount:{},//火报警数量
            personalarm:{},//人报警数量
            name:"",
            value:Number,
            alarmnumber:{},
            mapJson:{},
            mapValue:[],
            tootilp:[],
        };
        this.saveRef = ref => {this.refDom = ref};
    }
    componentWillMount=()=>{
        this.setState({
            DHeight:document.documentElement.clientHeight-65+'px'
        })

    };
    //即时视频model
    instantVideo =(pathImg)=>{
        this.setState({
            visible:true,
            pathImg:pathImg
        })
    };
    VideoCancel =()=>{
        this.setState({
            visible:false
        })
    };
    //报警分析
    alarmAnalysis =()=>{
        post({url:"/api/alarm/gets_radar_big"},(res)=>{
            if(res.success){
                var countalar=res.data.cars.value+res.data.fire.value+res.data.patrol.value+res.data.person.value+res.data.rollcall.value;
                this.setState({
                    cars:res.data.cars.value,
                    fire:res.data.fire.value,
                    patrol:res.data.patrol.value,
                    person:res.data.person.value,
                    rollcall:res.data.rollcall.value,
                    countalar:countalar,
                })
            }
        })
    };
    //位置图
    locationMap =()=>{
        post({url:"/api/company/getone_special"},(res)=>{
            if(res.success){
                var mapJson={},mapValue=[],tootilp=[];
                for(var a in res.lnglat) {
                    mapValue.push({name:res.lnglat[a].name, value:res.lnglat[a].alarmcount});
                    var name=res.lnglat[a].name;
                    var value=res.lnglat[a].value;
                    mapJson[name]=value;
                    tootilp.push({name:res.lnglat[a].name,ecount:res.lnglat[a].ecount,alarmcount:res.lnglat[a].alarmcount});
                }
                this.setState({
                    mapJson:mapJson,
                    mapValue:mapValue,
                    tootilp:tootilp
                });
            }
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
    };
    //报警次数
    alarmList =()=>{
        post({url:"/api/alarm/gets_alarm_afterday_big"},(res)=>{
            if(res.success){
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
            }
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

    dynamic =()=>{//设备近况
        var ScollOut=document.getElementById("ScollhiddenOut");
        var bl = 5;
        setInterval(
            document.getElementById("ScollhiddenOut").onscroll=function() {
                bl=bl+1.2;
                var scrollHeight = ScollOut.scrollHeight;//div里内容的高度
                var scrollTop =ScollOut.scrollTop;//0-18
                var clientHeight = ScollOut.clientHeight;//div内里框框的高度
                var scrollbottom=scrollHeight-clientHeight;
                var scrollTopP=Math.ceil(scrollTop);
              
                if(scrollbottom-scrollTopP<2) {//滚动到底部了
                    ScollOut.scrollTop=0;
                    bl=0;
                }else{
                    ScollOut.scrollTop = bl;
                    // console.log("ScollhiddenOut", document.getElementById("ScollhiddenOut").scrollTop);
                }
            },2000);
    };
    deveicek =()=>{//设备近况
        post({url:"/api/camera/gets_camerainfo_big"},(res)=>{
            if(res.success){
                this.setState({
                    deveicek:res.data,
                    lasttime:res.data.lasttime,
                    hearttime:res.data.hearttime,
                })
            }
        })
    }
    cal=()=>{//设备轮播
        post({url:"/api/alarm/gets_info_big"},(res)=>{
            if(res.success){
                this.setState({
                    callist:res.data,
                })
            }
        })
    }
    alarmnumber=()=>{//报警数量
        post({url:"/api/alarm/gets_radar_big"},(res)=>{
            if(res.success){
                if(res.data.cars!=="" || res.data.fire!=="" || res.data.person!==""){
                    this.setState({
                        carsalarm:res.data.cars.value,
                        fireCount:res.data.fire.value,
                        personalarm:res.data.person.value,
                    })
                }
            }
        })
    }
    componentDidMount() {
        window.onresize = () => {
            this.setState({
                DHeight:document.documentElement.clientHeight-65+'px',
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
        //设备近况
        setInterval(this.deveicek(),10000);
        //设备轮播
        setInterval(this.cal(),10000);
        //报警视频
        this.alarmVideo();
        //位置图
        this.locationMap();
        //报警数量
        this.alarmnumber();
        //报警分析
        this.alarmAnalysis();
    }
    render() {
        const _this=this;
        return (
            <div className="overView" style={{height:this.state.DHeight}}>
                <Universebg />
                <div className="titletop">
                    <div className="titlevalue">
                        椒图安防平台
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
                                    <Echartpie type="lookcomp" winhe={(parseInt(this.state.DHeight)*0.7-20)*0.5-50}
                                               cars={this.state.cars}
                                               fire={this.state.fire}
                                               patrol={this.state.patrol}
                                               person={this.state.person}
                                               rollcall={this.state.rollcall}
                                               countalar={this.state.countalar}
                                               alarmAnalysisName={this.state.alarmAnalysisName}
                                    />
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
                                                    状态
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="scollhidden">
                                            <div className="scollhidden-out" id="ScollhiddenOut">
                                                <div className="scollhidden-inner">
                                                    {this.state.deveicek.map((el,i)=>(
                                                        <div className="equipment equipbody" key={'row'+i}>
                                                            <Row className="lines">
                                                                <Col className="gutter-row" xl={8}>
                                                                    {el.cname}
                                                                </Col>
                                                                <Col className="gutter-row" xl={6}>
                                                                    {el.name}
                                                                </Col>
                                                                <Col className="gutter-row" xl={8}>
                                                                    <div>
                                                                        {moment().subtract('minutes',5).format('YYYY-MM-DD HH:mm:ss') > el.hearttime &&
                                                                        moment().subtract('minutes',5).format('YYYY-MM-DD HH:mm:ss') > el.hearttime
                                                                            ? <div>&nbsp; 离线</div>:<div>&nbsp; 在线 </div>
                                                                        }
                                                                    </div>
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
                                <span className="today">当前日期:<span className="timeBig">{this.state.today}</span></span>
                            </div>
                        </div>
                        <div className="maps">
                            <Echartpie type="xianmap" winhe={(parseInt(this.state.DHeight)*0.7-10)*0.8-100}
                                                      mapJson={this.state.mapJson}
                                                      mapValue={this.state.mapValue}
                                                      tootilp={this.state.tootilp}
                             />
                        </div>
                        <div className="draw">
                            <div className="untreated alarmtitle">
                                <strong>报&nbsp;警&nbsp;数</strong>
                            </div>
                            <div className="alarmover ">
                                <Carousel vertical autoplay className="alarmcarousel">
                                    <div className="carouselbg">
                                        <h3 className="cars">
                                            <div className="bg_imgcars"> </div>
                                            <div className="alerm_num">{this.state.carsalarm<1000000?this.state.carsalarm:(this.state.carsalarm/1000000).toFixed(2)+"百万"}</div>
                                        </h3>
                                    </div>
                                    <div className="carouselbg">
                                        <h3 className="fire">
                                            <div className="bg_imgfire"> </div>
                                            <div className="alerm_num"> {this.state.fireCount<1000000?this.state.fireCount:(this.state.fireCount/1000000).toFixed(2)+"百万"}</div>
                                        </h3>
                                    </div>
                                    <div className="carouselbg">
                                        <h3 className="person">
                                            <div className="bg_imgperson"> </div>
                                            <div className="alerm_num"> {this.state.personalarm<1000000?this.state.personalarm:(this.state.personalarm/1000000).toFixed(2)+"百万"}</div>
                                        </h3>
                                    </div>
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
                                    <Carousel autoplay className="righttop">
                                        {this.state.callist.map((el,i)=>(
                                            <div key={i}>
                                                <div className="Rotation_chart" ref="Rotation_chart">
                                                    <div><img src={el.picpath} alt="" /></div>
                                                    <div className="redcolor">
                                                        <span> {el.cname}</span> ,<span>{el.cameraname}</span>,
                                                        <span>{el.type==="alarm"?"报警":""} </span>
                                                        <span>{el.type==="rollcall"?"点名报警":""}</span>
                                                        <span>{el.type==="patrol"?"巡更":""}</span>,
                                                        <span>{el.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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
                                            <div className="compVideo" key={i} onClick={()=>this.instantVideo(v.picpath)}><img src={v.picpath} alt="" /></div>
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
                    <Modal
                        width={700}
                        visible={this.state.visible}
                        onCancel={this.VideoCancel}
                        footer={null}
                        className="video"
                    >
                        <div className="shipin">
                            <div className="shipin-context"><img src={this.state.pathImg} alt="" /></div>
                        </div>
                    </Modal>
                </Row>
            </div>
        )
    }
}
export default overView;
