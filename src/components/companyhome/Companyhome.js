import React, { Component } from 'react';
import { Row,Col } from 'antd';
import '../../style/ztt/css/Companyhome.css';
import {post} from "../../axios/tools";
import Equipment from '../userhome/Equipment';
import RollcallStatistics from "./RollcallStatistics";
import PatrolStatistics from "./PatrolStatistics";
//图标
import baojing from "../../style/ztt/img/baojing.png";
import cloud from "../../style/ztt/img/cloud.png";
import nopic from "../../style/imgs/nopic.png";
import Scenedata from '../companyhome/Scenedata';

class Companyhome extends Component {
    constructor(props){
        super(props);
        this.state= {
            mapJson: [],
            enterpriseTitle:[],
            cloudDate: '',
            myEquipment:[],
            code:[],
            codeCamera:[],
            alarmcount:[],
            activelist:[], //共享设备
            passivelist:[], //查看我的用户
            scenegraph:nopic,
            topLeftHeight:0,
        }
    }
    componentDidMount(){
        var alertHeight=document.getElementById("alertHeight").clientHeight;
        var patrolStatisticsHeight=document.getElementById("patrolStatistics").clientHeight;
        var rollcallStatisticsHeight=document.getElementById("rollcallStatistics").clientHeight;
        window.onresize = () => {
            this.setState({
               topLeftHeight:(alertHeight+patrolStatisticsHeight+rollcallStatisticsHeight)-80+"px",
                policeHeight:alertHeight
            })
        };
        post({url:'/api/company/getone'},(res)=>{
            if(res.success){
                let mapJson=[{
                    name:res.data.cname,
                    value:[res.data.clng,res.data.clat]
                }];
                res.activelist.map((el,i)=>{
                    mapJson.push({
                        name:el.activename,
                        value:[el.activelng,el.activelat]
                    })
                })
                this.setState({
                    activelist:res.activelist, //共享用户
                    passivelist:res.passivelist, //查看我的用户
                    enterpriseTitle:res.data.cname,
                    myEquipment:res.camera,
                    mapJson:mapJson,
                    code:res.data.code,
                    alarmcount:res.alarmcount,
                    cloudDate:res.data.cloudvaliddate,
                    scenegraph:res.data.scenegraph?res.data.scenegraph:nopic, //场景图
                });
            }
        })
    }
    //设备状态
    handleStatus =(status)=>{
        if(status===""){
            return "离线";
        }else if(status===1){
            return "启用";
        }else if(status===0){
            return "禁用";
        }
    };
    render() {
        return (
            <div className="Companyhome gutter-example button-demo" style={{height:this.state.DHeight}}>
                <div className="companyhome" >
                    <div className="boxHeight backBlock" >
                        <div className="backLitte boxShow "style={{width:'50%',height:this.state.DHeight,margin:"16px"}}>
                            <Scenedata type="maps" />
                        </div>
                        <div className="topRightContext">
                            <div id="alertHeight">
                                <Row>
                                    <Col xl={12} xxl={12}>
                                        <div className="clear y-center marginTop littleLeft boxShow">
                                            <Col span={8}>
                                                <img src={baojing} alt="" className="noBorder" />
                                            </Col>
                                            <Col span={12} offset={1}>
                                                <Row>
                                                    <Col span={24} className="blockFont adminFont">{this.state.alarmcount}</Col>
                                                </Row>
                                                <Row>
                                                    <Col span={24} className="listContext blockNumber">未处理报警数</Col>
                                                </Row>
                                            </Col>
                                        </div>
                                    </Col>
                                    <Col xl={12} xxl={12}>
                                        <div className="clear y-center marginTop marginLeft boxShow">
                                            <Col span={8}>
                                                <img src={cloud} alt="" className="noBorder" />
                                            </Col>
                                            <Col span={12} offset={1}>
                                                <Row>
                                                    <Col span={24} className="cloudFont adminFont blockFont listContext" title= {this.state.cloudDate?this.state.cloudDate:'无期限'}>
                                                        {this.state.cloudDate?this.state.cloudDate:'无期限'}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={24} className="listContext blockNumber">云服务到期日期</Col>
                                                </Row>
                                            </Col>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="backLitte marginTop littleLeft" id="patrolStatistics">
                                <p className="blockNumber echartsFont">巡更统计</p>
                                <Col span={24}><PatrolStatistics patrolHeight={this.state.topLeftHeight} policeHeight={this.state.policeHeight}/></Col>
                            </div>
                            <div className="backLitte marginTop littleLeft marginBottom" id="rollcallStatistics">
                                <p className="blockNumber echartsFont">点名统计</p>
                                <Col span={24}><RollcallStatistics rollcallHeight={this.state.topLeftHeight} policeHeight={this.state.policeHeight} /></Col>
                            </div>
                        </div>
                    </div>
                </div>
                <Row className="equipmentUser">
                    <Col xl={24} xxl={24} className="marginTop marginLeft marginBottom"><div className="zonglanCircle" />&nbsp;&nbsp;<span className="titleFont">用户设备</span></Col>
                    <Equipment />
                </Row>
            </div>
        )
    }
}

export default Companyhome;