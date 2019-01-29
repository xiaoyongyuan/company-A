import React, { Component } from 'react';
import { Row,Col,Carousel} from 'antd';
import '../../style/yal/css/overView.css';
import {post} from "../../axios/tools";
import equip from "../../style/yal/img/equip.png";
import team from "../../style/yal/img/team.png";
import usernum from "../../style/yal/img/usernum.png";
import admin from "../../style/yal/img/admin.png";
import Echartline from "./Echartline";
import Echartpie from "./Echartpie";
import Universebg from "./Universebg";
import moment from "moment";
const pao=[{a:"13621"},{a:"534534"},{a:"1564358"},{a:"964983"},{a:"154684"}]
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
}]

class overView extends Component {
    constructor(props){
        super(props);
        this.state= {
            option:{},
            deveice:deveice,
            analysisCount:0,//总报警数
            unhandle:0,//未处理报警数
            okconfirm:0,//确认数
            xufalse:0,//虚报警数
            ignore:0,//忽略数
            today:moment().format('LL'),
        }
        this.saveRef = ref => {this.refDom = ref};
    }
    componentWillMount=()=>{
        this.setState({
            DHeight:document.documentElement.clientHeight-65+'px'
        })

    }
    componentDidMount() {
        const _this=this;
        window.onresize = () => {
            this.setState({
                DHeight:document.documentElement.clientHeight-65+'px'
            })
        }
        post({url:'/api/company/getone_special'},(res)=>{
            if(res.success){
                var dataMap = Object.keys(res.info.lnglat).map(key=> res.info.lnglat[key]);
                dataMap.map((v)=>{
                    if(v.name==="西安文物局"){
                        v.name="";
                        v.value="";
                    }
                })
                //报警次数
                var alarmnum = Object.keys(res.info.alarm).map(key=> res.info.alarm[key]);
                //阿房宫报警次数
                var alarmnumapgdx = alarmnum[0].count;
                var alarmnumapg = [];
                for(var i = alarmnumapgdx.length-1;i>=0;i--){
                    alarmnumapg.push(alarmnumapgdx[i])
                }
                //明秦王陵报警次数
                var alarmnumqwldx = alarmnum[1].count;
                var alarmnumqwl = [];
                for(var j = alarmnumqwldx.length-1;j>=0;j--){
                    alarmnumqwl.push(alarmnumqwldx[j])
                }
                //阿房宫名称
                var apgname = alarmnum[0].name;
                //明秦王陵名称
                var qwlname = alarmnum[1].name;
                //时间
                var time = alarmnum[0].hour;
                var timehour = [];
                for(var k=time.length-1;k>=0;k--){
                    time[k].substring(11);
                    timehour.push(time[k].substring(11));
                }
                //巡更次数
                var patrol = Object.keys(res.info.patrol).map(key=> res.info.patrol[key]);
                //阿房宫巡更次数
                var patrolNumepgdx = patrol[0].count;
                var patrolNumepg = [];
                for(var m = patrolNumepgdx.length-1;m>=0;m--){
                    patrolNumepg.push(patrolNumepgdx[m]);
                }
                //名秦王巡更次数
                var patrolNumqwldx = patrol[1].count;
                var patrolNumqwl = [];
                for (var n = patrolNumqwldx.length-1;n>=0;n--) {
                    patrolNumqwl.push(patrolNumqwldx[n]);
                }
                //巡更次数日期
                var daylydx = patrol[0].dayly;
                var dayly = [];
                for(var g = daylydx.length-1;g>=0;g--){
                    dayly.push(daylydx[g].substring(8));
                }
                //巡更次数阿房宫名称
                var patroNameepg = patrol[0].name;
                //巡更次数秦王陵名称
                var patroNameqwl = patrol[1].name;
                //野外文物点名
                var rollcall = Object.keys(res.info.rollcall).map(key=> res.info.rollcall[key]);
                //名秦王点名次数
                var rollcallNumqwldx = rollcall[1].count;
                var rollcallNumqwl = [];
                for (var h = rollcallNumqwldx.length-1;h>=0;h--) {
                    rollcallNumqwl.push(rollcallNumqwldx[h]);
                }
                //点名次数日期
                var dmdaylydx = rollcall[0].dayly;
                var dmdayly = [];
                for(var f = dmdaylydx.length-1;f>=0;f--){
                    dmdayly.push(dmdaylydx[f].substring(8));
                }
                //点名次数秦王陵名称
                var rollcallNameqwl = rollcall[1].name;
                var analysis=Object.keys(res.info.alarmcount).map(key=> res.info.alarmcount[key]);
                analysis.map((v)=>{
                    this.state.analysisCount+=v.a_confirm+v.a_false+v.a_ignore+v.a_unhandle;
                });
                //未处理报警数
                for(var t=0;t<analysis.length;t++){
                    this.state.unhandle+=analysis[t].a_unhandle
                }
                //确认数
                for(var a=0;a<analysis.length;a++){
                    this.state.okconfirm+=analysis[a].a_confirm
                }
                //虚报警数
                for(var b=0;b<analysis.length;b++){
                    this.state.xufalse+=analysis[b].a_false
                }
                //忽略数
                for(var c=0;c<analysis.length;c++){
                    this.state.ignore+=analysis[c].a_ignore
                }
                _this.setState({
                    xianmap:dataMap, //位置信息
                    alarmnumapg:alarmnumapg,//阿房宫报警次数
                    alarmnumqwl:alarmnumqwl,//明秦王陵报警次数
                    timehour:timehour,//报警次数时间轴
                    apgname:apgname,//报警次数阿房宫名称
                    qwlname:qwlname,//报警次数秦王陵名称
                    patrolNumepg:patrolNumepg,//阿房宫巡更次数
                    patrolNumqwl:patrolNumqwl,//秦王陵巡更次数
                    dayly:dayly,//巡更次数时间轴
                    patroNameepg:patroNameepg,//巡更次数阿房宫名称
                    patroNameqwl:patroNameqwl,//巡更次数秦王陵名称
                    rollcallNumqwl:rollcallNumqwl,//明秦王陵点名次数
                    dmdayly:dmdayly,//点名次数时间轴
                    rollcallNameqwl:rollcallNameqwl,//点名明秦王陵名称
                },()=>{
                    console.log("daylydx",this.state.daylydx);
                    console.log("dayly",this.state.dayly);
                    console.log("阿房宫报警次数",this.state.alarmnumapg);
                    console.log("明秦王陵报警次数",this.state.alarmnumqwl);
                    console.log(this.state.ignore);
                    console.log(this.state.xufalse);
                    console.log(this.state.okconfirm);
                    console.log(this.state.unhandle);
                    console.log(this.state.analysisCount);
                })
            }
        })
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
                                    <span className="titlename">可查看单位</span>
                                </div>
                                <div className="comp">
                                    <Echartpie type="lookcomp" winhe={(parseInt(this.state.DHeight)*0.7-20)*0.5-50} />
                                </div>
                            </div>
                        </div>
                        <div className="clunm lumpbott">
                            <div className="lump ">
                                <div className="titleechart">
                                    <span className="titlename">可查看设备</span>
                                </div>
                                <div className="comp">
                                    <div className="equiptable">
                                        <div className="equipment equiphead">
                                            <Row className="lines">
                                                <Col className="gutter-row" xl={8}>
                                                    名称
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    单位
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    未处理报警数
                                                </Col>
                                            </Row>
                                        </div>
                                        <Carousel vertical autoplay style={{ height:'300px' }}>
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
                                        </Carousel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={10} className="wcolummap">
                        <div className="mainmap">
                            <div className="titleechart">
                                <span className="titlename">下辖单位区位图</span>
                                <span className="today">当前日期:{this.state.today}</span>
                            </div>
                        </div>
                        <div className="maps">
                            <Echartpie type="xianmap" winhe={(parseInt(this.state.DHeight)*0.7-10)*0.8-60} xianmap={this.state.xianmap} />
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
                                <div className="titleechart">
                                    <span className="titlename">账号信息</span>
                                </div>
                                <div className="comp" style={{height:'calc(100% - 60px)'}}>
                                    <div className="yundate">
                                        云服务到期日期: <b>{this.state.today}</b>
                                    </div>
                                    <div className="newsclo" style={{height:'calc(100% - 55px)'}}>
                                        <Row className="message">
                                            <Col className="heihgdabo" span={10} offset={1}>
                                                <Row className="messthis">
                                                    <Col span={8}>
                                                        <div className="equiptu">
                                                            <img src={equip} alt="" />
                                                        </div>
                                                    </Col>
                                                    <Col span={16}>
                                                        <Row>
                                                            <Col span={24}>
                                                                <p className="sgxdword">设备总数</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="sgxdnum-row">
                                                            <Col span={24} className="sgxdnum-col">
                                                                <p className="sgxdword"><span className="sgxdnum">18</span> 个</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className="heihgdabo" span={10} offset={2}>
                                                <Row className="messthis">
                                                    <Col span={8}>
                                                        <div className="equiptu">
                                                            <img src={team} alt="" />
                                                        </div>
                                                    </Col>
                                                    <Col span={16}>
                                                        <Row>
                                                            <Col span={24}>
                                                                <p className="sgxdword">所属团队</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="sgxdnum-row">
                                                            <Col span={24} className="sgxdnum-col">
                                                                <p className="sgxdword">维护团队</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className="message">
                                            <Col className="heihgdabo" span={10} offset={1}>
                                                <Row className="messthis">
                                                    <Col span={8}>
                                                        <div className="equiptu">
                                                            <img src={usernum} alt="" />
                                                        </div>
                                                    </Col>
                                                    <Col span={16}>
                                                        <Row>
                                                            <Col span={24}>
                                                                <p className="sgxdword">用户数</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="sgxdnum-row">
                                                            <Col span={24} className="sgxdnum-col">
                                                                <p className="sgxdword"><span className="sgxdnum">3</span> 个</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className="heihgdabo" span={10} offset={2}>
                                                <Row className="messthis">
                                                    <Col span={8}>
                                                        <div className="equiptu">
                                                            <img src={admin} alt="" />
                                                        </div>
                                                    </Col>
                                                    <Col span={16}>
                                                        <Row>
                                                            <Col span={24}>
                                                                <p className="sgxdword">管理员</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="sgxdnum-row">
                                                            <Col span={24} className="sgxdnum-col">
                                                                <p className="sgxdword">15319403465</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="clunm lumpbott">
                            <div className="lump">
                                <div className="titleechart">
                                    <span className="titlename">报警次数</span>
                                </div>
                                <div className="comp">
                                    <Echartline
                                        type="alarmnum"
                                        winhe={(parseInt(this.state.DHeight)*0.7-10)*0.5-10}
                                        alarmnumapg={this.state.alarmnumapg}
                                        alarmnumqwl={this.state.alarmnumqwl}
                                        timehour = {this.state.timehour}
                                        apgname={ this.state.apgname }
                                        qwlname = { this.state.qwlname }
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
                                <span className="titlename">野外文物点名</span>
                            </div>
                            <div className="comp">
                                <Echartline
                                    type="rollcall"
                                    winhe={parseInt(this.state.DHeight)*0.3-70}
                                    rollcallNumqwl = { this.state.rollcallNumqwl }
                                    dmdayly = { this.state.dmdayly }
                                    rollcallNameqwl = { this.state.rollcallNameqwl }
                                />
                            </div>
                        </div>
                    </Col>
                    <Col span={10} className="bottomheig" style={{paddingRight:0}}>
                        <div className="wappscol">
                            <div className="titleechart">
                                <span className="titlename">报警分析</span>
                            </div>
                            <div className="comp">
                                <Echartpie type="alarmanalyze" winhe={parseInt(this.state.DHeight)*0.3-70} />
                            </div>
                        </div>
                    </Col>
                    <Col span={7} className="bottomheig" style={{paddingRight:0,paddingLeft:'17px'}}>
                        <div className="wappscol">
                            <div className="titleechart">
                                <span className="titlename">巡更次数</span>
                            </div>
                            <div className="comp">
                                <Echartline
                                    type="patrol"
                                    winhe={parseInt(this.state.DHeight)*0.3-70}
                                    patrolNumepg = { this.state.patrolNumepg }
                                    patrolNumqwl = { this.state.patrolNumqwl }
                                    dayly = { this.state.dayly }
                                    patroNameepg = { this.state.patroNameepg }
                                    patroNameqwl = { this.state.patroNameqwl }
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default overView;
