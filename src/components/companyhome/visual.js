import React, { Component } from 'react';
import { Row,Col } from 'antd';
import '../../style/yal/css/datavisual.css';
import {post} from "../../axios/tools";
import equip from "../../style/yal/img/equip.png";
import team from "../../style/yal/img/team.png";
import usernum from "../../style/yal/img/usernum.png";
import admin from "../../style/yal/img/admin.png";
import nodata from "../../style/imgs/nodata.png";
// import Echartdata from "./Echartdata";
import Echartline from "./Echartline";
import Echartpie from "./Echartpie";
import moment from "moment";

const deveice=[{
    name:'神道西侧',
    ccom:'明秦王陵',
    alarm:2430,
},{
    name:'神道东侧',
    ccom:'水水水水',
    alarm:2430,
},{
    name:'神道nam侧',
    ccom:'明秦陵',
    alarm:2430,
},{
    name:'神道西侧',
    ccom:'明秦王陵',
    alarm:2430,
},{
    name:'神道西侧',
    ccom:'明秦王陵',
    alarm:2430,
},{
    name:'神道西侧',
    ccom:'明秦王陵',
    alarm:2430,
}]


class Datavisual extends Component {
    constructor(props){
        super(props);
        this.state= {
            option:{},
            deveice:deveice,
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
                _this.setState({
                    xianmap:res.info.lnglat, //位置信息
                })
            }

        })
    }
    render() {
        const _this=this;
        return (
            <div className="Datavisual" style={{height:this.state.DHeight}}>
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
                                <Echartpie type='lookcomp' winhe={(parseInt(this.state.DHeight)*0.7-20)*0.5-50} />
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
                                    <Row className='lines'>
                                        <Col className="gutter-row" xl={8}>
                                            名称
                                        </Col>
                                        <Col className="gutter-row" xl={8}>
                                            状态
                                        </Col>
                                        <Col className="gutter-row" xl={8}>
                                            未处理报警数
                                        </Col>
                                    </Row>
                                </div>
                                {_this.state.deveice.map((el,i)=>(

                                    <div className="equipment equipbody" key={'row'+i}>
                                    <Row className='lines'>
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
                    </Col>
                    <Col span={10} className="wcolummap">
                        <div className="mainmap">
                            <div className="titleechart">
                                <span className="titlename">位置图</span>
                                <span className="today">当前日期:{this.state.today}</span>
                            </div>
                        </div>
                        <div className="maps">
                            <Echartpie type='xianmap'  winhe={(parseInt(this.state.DHeight)*0.7-10)*0.8-60} />
                        </div>
                        <div className="draw">
                            <div className="untreated alarmtitle">
                            未处理报警
                            </div>
                            <div className="untreated alarmvalue">
                            19385
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
                                <div className="newsclo"  style={{height:'calc(100% - 55px)'}}>
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
                                                            <p className="sgxdword"><span className="sgxdnum">26</span> 个</p>
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
                                                            <p className="sgxdword"><span className="sgxdnum">26</span> 个</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className="heihgdabo" span={10} offset={2}>
                                            <Row className="messthis">
                                                <Col span={8}>
                                                    <div className="equiptu">
                                                        <img src={admin} />
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
                                                            <p className="sgxdword">13696854956</p>
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
                                <Echartline type='alarmnum' winhe={(parseInt(this.state.DHeight)*0.7-10)*0.5-10} />
                            </div>
                        </div>
                    </div>
                    </Col>
                </Row>
                <Row className="warrperbottom">
                    <Col span={7} className="bottomheig">
                        <div className="wappscol">
                            <div className="titleechart">
                                <span className="titlename">点名次数</span>
                            </div>
                            <div className="comp">
                                    <Echartline type='rollcall' winhe={parseInt(this.state.DHeight)*0.3-70} />
                            </div>
                        </div>
                    </Col>
                    <Col span={10} className="bottomheig" style={{paddingRight:0}}>
                        <div className="wappscol">
                            <div className="titleechart">
                                <span className="titlename">报警分析</span>
                            </div>
                            <div className="comp">
                                <Echartpie type='alarmanalyze' winhe={parseInt(this.state.DHeight)*0.3-70}/>
                            </div>
                        </div>
                    </Col>
                    <Col span={7} className="bottomheig"  style={{paddingRight:0,paddingLeft:'17px'}}>
                        <div className="wappscol">
                            <div className="titleechart">
                                <span className="titlename">巡更次数</span>
                            </div>
                            <div className="comp">
                                <Echartline type='patrol' winhe={parseInt(this.state.DHeight)*0.3-70} />
                            </div>
                        </div>
                    </Col>
                        
                </Row>




            </div>
        )
    }
}
export default Datavisual;
