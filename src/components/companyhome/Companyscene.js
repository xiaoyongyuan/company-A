import React,{ Component } from 'react';
import {Row, Col, Card,Button,Carousel  } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import juyuwang from '../../style/ztt/img/juyuwang.png';
import '../../style/ztt/css/Companyhome.css';
import {queryString} from "../../utils/index";
import {post} from "../../axios/tools";

//图标
import changjing from '../../style/ztt/img/changjing.png';
import shipin from "../../style/ztt/img/shipin.png";
import noshipin from "../../style/ztt/img/noshipin.png";
import policeShipin from "../../style/ztt/img/policeShipin.png";
import defenceDisplay from "../../style/ztt/img/defenceDisplay.png";
import calPolice from "../../style/ztt/img/calPolice .png";
import defenceHide from "../../style/ztt/img/defenceHide.png";
class Companyscene extends Component{
    constructor(props){
        super(props);
        this.state= {
            sceneCards: [],
            nowTimes: [],
            title: [],
            cloudDate: [],
            clng: [],
            clat: [],
            cardContext: [],
            equipmentNumber: [],
            onlineNumber: [],
            cameraCard:[],
            cameraCardCode:[]
        }
    }
    componentDidMount(){
        const { query }=this.props;
        post({url:"/api/company/getone/"+query.code},(res)=>{
            if(res.success){
                this.setState({
                    title:res.data.cname,
                    cloudDate:res.data.clouddate,
                    clng:res.data.clng,
                    clat:res.data.clat,
                    pid:res.data.pid, //所属团队
                    cardContext:res.camera,
                    cameraCard:res.camera
                })
            }
        })
        // post({url:"/api/company/getone/"},(res)=>{
        //     if(res.success){
        //         for(let i=0;i<res.camera.length;i++){
        //             this.setState({
        //                 cameraCardName:res.camera[i].code,
        //                 cameraCard:res.camera
        //             })
        //         }
        //     }
        // })
    }
    getParams = ()=>{
        queryString();
    }
    classColor = (state)=>{
        if(state==1) {
            return 'LANCardHeaderColor LANCardHeader';
        }else if(state==2) {
            return 'LANCardHeaderColor2 LANCardHeader';
        }else if(state==3){
            return 'LANCardHeaderColor3 LANCardHeader';
        }else if(state==4){
            return 'LANCardHeaderColor4 LANCardHeader';
        }
    }
    fontColor = (state)=>{
        if(state==1) {
            return 'titleColor jiYu_font listContext';
        }else if(state==2) {
            return 'titleColor2 jiYu_font listContext';
        }else if(state==3){
            return 'titleColor3 jiYu_font listContext';
        }else if(state==4){
            return 'titleColor2 jiYu_font listContext';
        }
    }
    imgs = (state)=>{
        if(state==1) {
            return shipin;
        }else if(state==2) {
            return noshipin;
        }else if(state==3){
            return policeShipin;
        }else if(state==4){
            return shipin;
        }
    }
    imgIcon = (state)=>{
        if(state==1) {
            return defenceDisplay;
        }else if(state==2) {
            return defenceHide;
        }else if(state==3){
            return calPolice;
        }else if(state==4){
            return defenceDisplay;
        }
    }
    LANstate = (state)=>{
        if(state==4){
            return "Lanstate"
        }
    }

    render() {
        return(
            <div className="gutter-example button-demo">
                <span style={{color:'#4B4B5F'}}>所在位置:场景</span>
                <Row className="gutter-row" gutter={10}>
                    <Card bordered={false}>
                        <Row gutter={10}>
                            <Col xl={24} xxl={20} className="changjing_title"><h3>{this.state.title}</h3></Col>
                        </Row>
                        <Row gutter={10}>
                            <Col xl={9} xxl={9}>
                                <img src={changjing} className="img-responsive" alt="test" style={{width:"100%",height:"220px"}} />
                            </Col>
                            <Col xl={8} xxl={6}>
                                <Row className="cloud_data">
                                    <Col xl={15} xxl={15} offset={1} className="cloud_title">云服务到期日期: {this.state.cloudDate?<span style={{color:'#1890ff'}}>{this.state.cloudDate}</span>:<span>未开通</span>}</Col>
                                </Row>
                                <Row className="cloud_data">
                                    <Col xl={8} xxl={6} offset={1}>经度: {this.state.clng}</Col>
                                    <Col xl={8} xxl={6}>纬度: {this.state.clat}</Col>
                                </Row>
                                <Row className="cloud_data">
                                    <Col offset={1}>设备总数: {this.state.cameraCard?this.state.cameraCard.length:0}</Col>
                                </Row>
                                <Row className="cloud_data">
                                    <Col offset={1}>所属团队: {this.state.pid}</Col>
                                </Row>
                                <Row className="cloud_data">
                                    <Col xl={8} xxl={4} offset={4}>
                                        <Link to={'/app/companyhome/calling'}><Button type="primary">点名</Button></Link>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl={7} xxl={6}>
                                <div className="gutter-box LANCard">
                                    <Card>
                                        <Row className="LANCardHeaderColor LANCardHeader">
                                            <Col xl={8} xxl={8}>最后一次点名</Col>
                                            <Col xl={8} xxl={8}>2018-12-11</Col>
                                        </Row>
                                        <Carousel vertical autoplay dots={false}>
                                            <Row>
                                                <Col xl={24} xxl={24}>
                                                    <div className="sceneLastCallImg">193.167.90</div>
                                                    <div className="lastCallImg"><img src={juyuwang} alt="" /></div>
                                                    <div className="lastCallFont">正常</div>
                                                </Col>
                                            </Row>
                                            <Row >
                                                <Col xl={24} xxl={24}>
                                                    <div className="sceneLastCallImg">193.167.90</div>
                                                    <div className="lastCallImg"><img src={juyuwang} alt="" /></div>
                                                    <div className="lastCallFont">正常</div></Col>
                                            </Row>
                                            <Row>
                                                <Col xl={24} xxl={24}>
                                                    <div className="sceneLastCallImg">193.167.90</div>
                                                    <div className="lastCallImg"><img src={juyuwang} alt="" /></div>
                                                    <div className="lastCallFont">正常</div></Col>
                                            </Row>
                                        </Carousel>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Row>
               {/* <Row>
                    {
                        this.state.sceneCards.map((item)=>{
                            return(
                                <Col xl={7} xxl={5} className="LANCardPosition">
                                    <div className="gutter-box LANCard">
                                        <Link to={'/app/companyhome/companydeveice'}>
                                            <Card>
                                                <Row>
                                                    <Col xl={24} xxl={24} className={this.classColor(item.state)}>局域网{item.title}</Col>
                                                </Row>
                                                <Row gutter={10} className="LANCardBody">
                                                    <Col xl={8} xxl={8}>
                                                        <img src={juyuwang} className="img-responsive" alt="test" style={{width:"100%",height:"50px"}} />
                                                    </Col>
                                                    <Col xl={8} xxl={8} className={this.LANstate(item.state)}>
                                                        <Row>
                                                            <Col xl={5} xxl={5} offset={1}>
                                                                <div className="defence"><img src={this.imgIcon(item.state)} alt=""/></div>
                                                            </Col>
                                                            <Col xl={12} xxl={15}  className={this.fontColor(item.state)}>{item.name}</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xl={17} xxl={17} offset={5} className="number_font line listContext">{item.numbers}次</Col>
                                                        </Row>
                                                    </Col>
                                                    <Col xl={6} offset={1} xxl={6} className={this.LANstate(item.state)}>
                                                        <Row>
                                                            <Col xl={24} xxl={24} className={this.fontColor(item.state)}>{item.equipment}</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xl={17} xxl={17} offset={5} className="line title_color">
                                                                <div className="sceneIcon"><img src={this.imgs(item.state)} alt=""/></div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Link>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>*/}
                <Row>
                    {
                        this.state.cameraCard.map((item,index)=>{
                            return(
                                <Col xl={7} xxl={5} className="LANCardPosition" key={index}>
                                    <div className="gutter-box LANCard">
                                        <Card>
                                        <a href={'#/app/companyhome/companydeveice?code='+item.code}>
                                            <Row>
                                                <Col xl={24} xxl={24} className="LANCardHeaderColor LANCardHeader">{item.name}:{item.ip}</Col>
                                            </Row>
                                         </a>
                                            <Row gutter={10} className="LANCardBody">
                                                <a href={'#/app/companyhome/companydeveice?code='+item.code}>
                                                    <Col xl={8} xxl={8}>
                                                        <img src={juyuwang} className="img-responsive" alt="test" style={{width:"100%",height:"50px"}} />
                                                    </Col>
                                                </a>
                                                {item.if_cancel
                                                    ?   <div>
                                                            <Col xl={8} xxl={8}>
                                                                <Row>
                                                                    <Col xl={5} xxl={5} offset={1}>
                                                                        <div className="defence"><img src={defenceDisplay} alt=""/></div>
                                                                    </Col>
                                                                    <Col xl={12} xxl={15}>布防中</Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xl={17} xxl={17} offset={5} className="number_font line listContext">{item.count?item.count:0}次</Col>
                                                                </Row>
                                                            </Col>
                                                            <Col xl={6} offset={1} xxl={6} >
                                                                <Row>
                                                                    <Col xl={24} xxl={24} className="listContext">在线设备</Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xl={17} xxl={17} offset={5} className="line title_color">
                                                                        <div className="sceneIcon"><img src={shipin} alt=""/></div>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </div>
                                                    :   <div>
                                                            <Col xl={16} xxl={16}>
                                                            <div style={{textAlign:"center",color:"#f00",width:"100%",fontSize:"1.5em"}}>禁用</div>
                                                            </Col>
                                                        </div>
                                                }
                                                
                                            </Row>
                                        </Card>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        );
    }
}
export default Companyscene