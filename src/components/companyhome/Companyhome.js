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
        }
    }
    componentDidMount(){
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
            <div className="Companyhome gutter-example button-demo" >
                <div className="backBlock">
                    <Row>
                        <Col xl={11} xxl={11}>
                            <Row>
                                <Col span={23}>
                                    <div className="Imgdiv backLitte boxShow">
                                        <Scenedata type="maps" />
                                      {/*  <img src={this.state.scenegraph}
                                             className="img-responsive"
                                             alt=""
                                        />*/}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={11} xxl={11}>
                           {/* <Row>
                                <Col xl={12} xxl={12}  ><a href={'#/app/companyhome/companyscene?code='+this.state.code} className="title_font shareUsers" className="title_font shareUsers">{this.state.enterpriseTitle}</a></Col>
                                <Col xl={12} xxl={12} ><a href={'#/app/companyhome/companyscene?code='+this.state.code} className="title_font shareUsers">{this.state.enterpriseTitle}</a></Col>
                                <Col xl={12} xxl={12} className="relationship">
                                    <img src={zixingguanli} alt="" /><span className="titleFont">自行管理</span>
                                    {
                                        this.state.activelist.length||this.state.passivelist.length?<Link to={'/app/companyhome/connent'} className="qiYeFont">&nbsp;&nbsp;关系网</Link>:''
                                    }
                                </Col>
                            </Row>*/}
                            <Row>
                              {/*  <Col xl={12} xxl={12} >111</Col>
                                <Col xl={12} xxl={12} >222</Col>*/}
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
                            <div className="backLitte marginTop littleLeft">
                                <Row>
                                    <p className="blockNumber echartsFont">巡更统计</p>
                                    <Col span={24}><PatrolStatistics /></Col>
                                </Row>
                            </div>
                            <div className="backLitte marginTop littleLeft marginBottom">
                                <Row>
                                    <p className="blockNumber echartsFont">点名统计</p>
                                    <Col span={24}><RollcallStatistics /></Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="backBlock marginTop">
                    <Row >
                    <Col xl={22} xxl={20}>
                        <Row>
                            <Col xl={24} xxl={24} className="marginTop marginLeft marginBottom"><div className="zonglanCircle" />&nbsp;&nbsp;<span className="titleFont">用户设备</span></Col>
                            <Equipment />
                        </Row>
                    </Col>
                </Row>
                </div>
            </div>
        )
    }
}

export default Companyhome;