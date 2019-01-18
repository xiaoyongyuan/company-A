import React, { Component } from 'react';
import { Row,Col,Card } from 'antd';
import '../../style/yal/css/datavisual.css';
import {post} from "../../axios/tools";
import yuan from "../../style/yal/img/yuan.png";
import nodata from "../../style/imgs/nodata.png";

class Datavisual extends Component {
    constructor(props){
        super(props);
        this.state= {
        }
    }
    componentWillMount=()=>{

    }
    componentDidMount() {

    }
    
    render() {
        
        return (
            <div className="Datavisual">
                <Row type="flex" justify="center">
                    <Col span={10}>
                        <div className="topleft">

                        </div>
                    </Col>
                    <Col span={3}>
                        <div className="topcenter">
                            <span>西安文物局</span>
                        </div>
                    </Col>
                    <Col span={10}>
                        <div className="topright">

                        </div>
                    </Col>
                </Row>
                <Row  gutter={24} >
                    <Col span={6}>
                        <Row>
                            <Col>
                                <div className="xiaotusz">
                                   可查看单位
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="xiaotuzz">
                                        <Row className="xiaotutitle" gutter={32}>
                                            <Col xl={1} xxl={1} offset={1}><div className="sandian"><img src={yuan} alt="" /></div></Col>
                                            <Col xl={10} xxl={12}>
                                                <span>我的设备</span>
                                            </Col>
                                        </Row>
                                        <div>
                                            {/*{*/}
                                                {/*this.state.myEquipment.length*/}
                                                    {/*?this.state.myEquipment.map((item,index)=>{*/}
                                                        {/*return(*/}
                                                            {/*<Row className="situation" key={index}>*/}
                                                                {/*<Col className="gutter-row" xl={8}><a href={'#/app/companyhome/companydeveice?code='+item.code} className="should">{item.name?item.name:"未命名"}</a></Col>*/}
                                                                {/*<Col className="gutter-row" xl={8}>{this.handleStatus(item.cstatus)}</Col>*/}
                                                                {/*<Col className="gutter-row" xl={8}><a href={'#/app/Userhome/Alarmlist?id='+item.code} className=" should">未处理报警数：{item.alarm?item.alarm:"0"}</a></Col>*/}
                                                            {/*</Row>*/}
                                                        {/*);*/}
                                                    {/*})*/}
                                                    {/*:*/}
                                                    {/*<Row>*/}
                                                        {/*<Col xl={24} xxl={24} style={{width:"100%",textAlign:"center",margin:"20px"}}><img src={nodata} alt="" /></Col>*/}
                                                    {/*</Row>*/}
                                            {/*}*/}
                                            <Row className="myequip-row">
                                                <Col className="gutter-row" xl={8}>
                                                    <p>名称</p>
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    <p>状态</p>
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    <p>未处理报警数</p>
                                                </Col>
                                            </Row>
                                            <Row className="myequip-row">
                                                <Col className="gutter-row" xl={8}>
                                                    <p>西安</p>
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    <p>禁用</p>
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    <p>15689</p>
                                                </Col>
                                            </Row>
                                            <Row className="myequip-row">
                                                <Col className="gutter-row" xl={8}>
                                                    <p>西安</p>
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    <p>禁用</p>
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    <p>15689</p>
                                                </Col>
                                            </Row>
                                            <Row className="myequip-row">
                                                <Col className="gutter-row" xl={8}>
                                                    <p>西安</p>
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    <p>禁用</p>
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    <p>15689</p>
                                                </Col>
                                            </Row>
                                            <Row className="myequip-row">
                                                <Col className="gutter-row" xl={8}>
                                                    <p>西安</p>
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    <p>禁用</p>
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    <p>15689</p>
                                                </Col>
                                            </Row>
                                            <Row className="myequip-row">
                                                <Col className="gutter-row" xl={8}>
                                                    <p>西安</p>
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    <p>禁用</p>
                                                </Col>
                                                <Col className="gutter-row" xl={8}>
                                                    <p>15689</p>
                                                </Col>
                                            </Row>
                                        </div>
                                </div>
                            </Col>
                        </Row>

                    </Col>
                    <Col span={12}>
                        <div className="datus">
                            位置图
                            <div className="sanjiao">

                            </div>
                            <div className="tixing">
                                <span>4695273</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <Row>
                            <Col>
                                <div className="xiaotusy">
                                    <Row className="xiaotutitle" gutter={32}>
                                        <Col xl={1} xxl={1} offset={1}><div className="sandian"><img src={yuan} alt="" /></div></Col>
                                        <Col xl={10} xxl={12}>
                                            <span>账号信息</span>
                                        </Col>
                                    </Row>
                                    <Row className="yfwenddate">
                                        <Col span={8} offset={3} className="yfwword-col">
                                            <p className="yfwword">云服务到期日期：</p>
                                        </Col>
                                        <Col span={12}>
                                            <p className="yfwyear">2020年12月17日</p>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="xiaotuzy">
                                    报警次数
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={24} >
                    <Col span={6}>
                        <div className="xiaotuxz">
                            点名次数
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="datux" >
                            报警分析

                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="xiaotuxy">
                            巡更次数
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Datavisual;
