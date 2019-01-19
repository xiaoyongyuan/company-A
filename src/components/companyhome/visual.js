import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { Row,Col } from 'antd';
import '../../style/yal/css/datavisual.css';
import {post} from "../../axios/tools";
import yuan from "../../style/yal/img/yuan.png";
import equip from "../../style/yal/img/shebei.png";
import team from "../../style/yal/img/tuandui .png";
import yonghu from "../../style/yal/img/yonghushu .png";
import admin from "../../style/yal/img/guanliyaun.png";
import nodata from "../../style/imgs/nodata.png";

class Datavisual extends Component {
    constructor(props){
        super(props);
        this.state= {
            option:{}
        }
    }
    componentWillMount=()=>{
        let option = {
            // title: {
            //     text: '次数',
            //     textStyle:{
            //         color:'#4e6281',
            //         fontSize:'14px'
            //     }
            // },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:[{
                    name: '阿房宫',
                    icon: 'circle',
                    textStyle: {
                        color: '#165ecc',
                    }
                },{
                    name: '明秦王陵',
                    icon: 'circle',
                    textStyle: {
                        color: '#13fcff'
                    }
                }
                ],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['2','4','6','8','10','12','14','16','18','20','22','24'],
                name:'小时',
                nameTextStyle:{
                    color:'#788cae'
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#7d91b4',  //更改坐标轴文字颜色
                        fontSize : 14      //更改坐标轴文字大小
                    }
                },
            },
            yAxis: {
                type: 'value',
                name:'次数',
                nameTextStyle:{
                    color:'#788cae'
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#7d91b4',  //更改坐标轴文字颜色
                        fontSize : 14      //更改坐标轴文字大小
                    }
                },
            },
            series: [
                {
                    name:'阿房宫',
                    type:'line',
                    stack: '总量',
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#165ecc'
                            }
                        }
                    },
                    data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90]
                },
                {
                    name:'明秦王陵',
                    type:'line',
                    stack: '总量',
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#13fcff'
                            }
                        }
                    },
                    data:[220, 182, 191, 234, 290, 330, 310,220, 182, 191, 330, 310]
                }
            ]
        }
        this.setState({option},()=>{
        })
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
                                    <Row  gutter={32} className="sgxds-row">
                                        <Col  span={11} offset={1}>
                                            <div className="sgxd1">
                                                <Row>
                                                    <Col span={10}>
                                                        <div className="equiptu">
                                                            <img src={equip} alt="" />
                                                        </div>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={24}>
                                                                <p className="sgxdword">设备总数</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="sgxdnum-row">
                                                            <Col span={24} className="sgxdnum-col">
                                                                <span className="sgxdnum">26</span><span className="sgxdword">个</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col span={11}>
                                            <div className="sgxd2">
                                                <Row>
                                                    <Col span={10}>
                                                        <div className="equiptu">
                                                            <img src={team} alt="" />
                                                        </div>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={24}>
                                                                <p className="sgxdword">所属团队</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="sgxdnum-row">
                                                            <Col span={24} style={{ marginTop:'-5px' }}>
                                                                <span className="whtdword">维护团队</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={32} className="sgxdx-row">
                                        <Col span={11} offset={1}>
                                            <div className="sgxd3">
                                                <Row>
                                                    <Col span={10}>
                                                        <div className="equiptu">
                                                            <img src={yonghu} alt="" />
                                                        </div>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={24}>
                                                                <p className="sgxdword">用户数</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="sgxdnum-row">
                                                            <Col span={24} className="sgxdnum-col">
                                                                <span className="sgxdnum">5</span><span className="sgxdword">个</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col span={11}>
                                            <div className="sgxd4">
                                                <Row>
                                                    <Col span={10}>
                                                        <div className="equiptu">
                                                            <img src={admin} alt="" />
                                                        </div>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={24}>
                                                                <p className="sgxdword">管理员</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="sgxdnum-row">
                                                            <Col span={24} style={{ marginTop:'-5px' }}>
                                                                <span className="whtdword">123456767</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="xiaotuzy">
                                    <Row className="xiaotutitle" gutter={32}>
                                        <Col xl={1} xxl={1} offset={1}><div className="sandian"><img src={yuan} alt="" /></div></Col>
                                        <Col xl={10} xxl={12}>
                                            <span>报警次数</span>
                                        </Col>
                                    </Row>
                                    <div style={{marginTop:'-50px' }}>
                                        <ReactEcharts
                                        option={this.state.option}
                                        // style={{height: '480px', width: '100%'}}
                                        className={'react_for_echarts'}
                                        // onEvents={this.onClickByModel}
                                        />
                                    </div>
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
