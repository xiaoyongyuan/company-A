import React, { Component } from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Row,Col,Card } from 'antd';
import { Link } from 'react-router-dom';
import '../../style/ztt/css/Companyhome.css';
import '../../style/publicStyle/publicStyle.css'
import Locationmap from "./Locationmap";
import {post} from "../../axios/tools";
import nodata from "../../style/imgs/nodata.png";
//图标
import zixingguanli from "../../style/ztt/img/zixingguanli.png";
import baojing from "../../style/ztt/img/baojing.png";
import gongxiang from "../../style/ztt/img/gongxiang.png";
import quyumidu from "../../style/ztt/img/quyumidu.png";
import shumeipaiTitle from "../../style/ztt/img/shumeipaiTitle.png";
import cloud from "../../style/ztt/img/cloud.png";
class Companyhome extends Component {
    constructor(props){
        super(props);
        this.state= {
            mapJson: [],
            enterpriseTitle:[],
            cloudDate: [],
            myEquipment:[],
            code:[],
            codeCamera:[]
        }
    }
    componentDidMount(){
        post({url:'/api/company/getone'},(res)=>{
            if(res.success){
                let clat=res.data.clat;
                let clng=res.data.clng;
                var data="未开通";
                this.setState({
                    enterpriseTitle:res.data.cname,
                    myEquipment:res.camera,
                    mapJson:[{name:res.data.cname,value:[clng,clat]}],
                    code:res.data.code,
                })
                if(res.data.clouddate!==""){
                    this.setState({
                        cloudDate:res.data.clouddate,
                    });
                }else{
                    this.setState({
                        cloudDate:data,
                    });
                }
            }
        })
    }

    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                <Row gutter={10}>
                    <Col xl={11} xxl={10}>
                        <Card>
                            <Row>
                                <Col xl={12} xxl={12}  ><a href={'#/app/companyhome/companyscene?code='+this.state.code} className="title_font shareUsers" className="title_font shareUsers">{this.state.enterpriseTitle}</a></Col>
                                <Col xl={12} xxl={12} className="relationship"><img src={zixingguanli} alt="" /><span className="titleFont">自行管理</span><Link to={'/app/companyhome/connent'} className="qiYeFont">&nbsp;&nbsp;关系网</Link></Col>
                            </Row>
                            <Row>
                                <Col xl={12} xxl={12}>
                                    <div className="gutter-box cloudIndex baoJing">
                                        <div className="gutter-box admin baoJing">
                                            <Card>
                                                <div className="clear y-center">
                                                    <Col xl={10} lg={8}>
                                                        <img src={baojing} alt="" className="noBorder baoJingBackground" />
                                                    </Col>
                                                    <Col xl={10} lg={5} offset={1}>
                                                        <Row>
                                                            <Col xl={24} className="baoJingFont adminFont">1258次</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xl={24}>未处理报警数</Col>
                                                        </Row>
                                                    </Col>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={12} xxl={12}>
                                    <div className="gutter-box cloudIndex baoJing">
                                        <div className="gutter-box admin personalUser">
                                            <Card>
                                                <div className="clear y-center">
                                                    <Col xl={10} lg={8}>
                                                        <img src={cloud} alt="" className="noBorder personalUserBackground" />
                                                    </Col>
                                                    <Col xl={10} lg={5} offset={1}>
                                                        <Row>
                                                            <Col xl={24} className="cloudFont adminFont personalUseFont listContext" title={this.state.cloudDate}>
                                                            {this.state.cloudDate}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xl={24} className="listContext">云服务到期日期</Col>
                                                        </Row>
                                                    </Col>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                        <Row>
                            <Col className="gutter-row topShift" xl={24}>
                                <Card>
                                    <Row>
                                        <Col xl={1} xxl={1}><div className="sandian"><img src={shumeipaiTitle} alt="" /></div></Col>
                                        <Col xl={10} xxl={12}><span className="titleFont">我的设备</span></Col>
                                    </Row>
                                     <Row style={{display:this.state.myEquipment.length===0?"block":"none"}}>
                                        <Col xl={24} xxl={24} style={{width:"100%",textAlign:"center",margin:"20px"}}><img src={nodata} alt="" /></Col>
                                    </Row>
                                    <div style={{display:this.state.myEquipment.length!==0?"block":"none"}}>
                                        {
                                            this.state.myEquipment.map((item,index)=>{
                                                return(
                                                    <Row className="situation shareUsers" key={index}>
                                                        <Col className="gutter-row" xl={8}>{item.eid}</Col>
                                                        <Col className="gutter-row" xl={8}>{item.cstatus?"使用中":"故障"}</Col>
                                                        <Col className="gutter-row" xl={8}>{item.count}</Col>
                                                    </Row>
                                                );
                                            })
                                        }
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row topShift" xl={24}>
                                <Card>
                                    <Row>
                                        <Col xl={1} xxl={1}><div className="sandian"><img src={gongxiang} alt="" /></div></Col>
                                        <Col xl={10} xxl={12}><span className="titleFont">共享用户</span></Col>
                                    </Row>
                                    <Row>
                                        <Col xl={24} xxl={24} style={{width:"100%",textAlign:"center",margin:"20px"}}><img src={nodata} alt=""/></Col>
                                    </Row>
                                   {/* <Link to={'/app/companyhome/companyscene'}>
                                        <Row className="situation shareUsers" style={{marginTop:"10px"}}>
                                            <Col className="gutter-row" xl={8}>户县博物馆</Col>
                                            <Col className="gutter-row" xl={8}>设备30</Col>
                                            <Col className="gutter-row" xl={8}>报警数123223</Col>
                                        </Row>
                                    </Link>
                                    <Row className="situation">
                                        <Col className="gutter-row" xl={8}>户县博物馆</Col>
                                        <Col className="gutter-row" xl={8}>设备30</Col>
                                        <Col className="gutter-row" xl={8}>报警数123223</Col>
                                    </Row>
                                    <Row className="situation">
                                        <Col className="gutter-row" xl={8}>户县博物馆</Col>
                                        <Col className="gutter-row" xl={8}>设备30</Col>
                                        <Col className="gutter-row" xl={8}>报警数123223</Col>
                                    </Row>
                                    <Row className="situation">
                                        <Col className="gutter-row" xl={8}>户县博物馆</Col>
                                        <Col className="gutter-row" xl={8}>设备30</Col>
                                        <Col className="gutter-row" xl={8}>报警数123223</Col>
                                    </Row>
                                    <Row className="situation">
                                        <Col className="gutter-row" xl={8}>户县博物馆</Col>
                                        <Col className="gutter-row" xl={8}>设备30</Col>
                                        <Col className="gutter-row" xl={8}>报警数123223</Col>
                                    </Row>*/}
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={12} xxl={10} className="rightShift">
                        <Card>
                            <Row>
                                <Col xl={1} xxl={1}><div className="sandian"><img src={quyumidu} alt="" /></div></Col>
                                <Col xl={10} xxl={12}><span className="titleFont">位置图</span></Col>
                            </Row>
                            <Locationmap datasMap={this.state.mapJson} codeID={this.state.code} />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Companyhome;