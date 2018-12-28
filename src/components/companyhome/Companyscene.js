import React,{ Component } from 'react';
import { Row, Col, Card,Button,Carousel } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import juyuwang from '../../style/ztt/img/juyuwang.png';
import '../../style/ztt/css/Companyhome.css';
import {queryString} from "../../utils/index";
import {post} from "../../axios/tools";
import Equipment from '../userhome/Equipment';
//图标
import changjing from '../../style/ztt/img/changjing.png';
// import shipin from "../../style/ztt/img/shipin.png";
import noshipin from "../../style/ztt/img/noshipin.png";
import policeShipin from "../../style/ztt/img/policeShipin.png";
// import defenceDisplay from "../../style/ztt/img/defenceDisplay.png";
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
            cameraCard:0, //设备数
            usercount:0, //账号用户数
            adminname:'', //管理员
        }
    }
    componentDidMount(){
        const { query }=this.props;
        post({url:"/api/company/getone"},(res)=>{
            if(res.success){
                this.setState({
                    title:res.data.cname,
                    cloudDate:res.data.clouddate,
                    clng:res.data.clng,
                    clat:res.data.clat,
                    pname:res.data.pname, //所属团队
                    cameranum:res.camera.length,
                    usercount:res.usercount,
                    adminname:res.data.adminname, //管理员


                })
            }
        })
    }
    getParams = ()=>{
        queryString();
    }
    classColor = (state)=>{
        if(state === 1) {
            return 'LANCardHeaderColor LANCardHeader';
        }else if(state === 2) {
            return 'LANCardHeaderColor2 LANCardHeader';
        }else if(state === 3){
            return 'LANCardHeaderColor3 LANCardHeader';
        }else if(state === 4){
            return 'LANCardHeaderColor4 LANCardHeader';
        }
    }
    fontColor = (state)=>{
        if(state === 1) {
            return 'titleColor jiYu_font listContext';
        }else if(state === 2) {
            return 'titleColor2 jiYu_font listContext';
        }else if(state === 3){
            return 'titleColor3 jiYu_font listContext';
        }else if(state === 4){
            return 'titleColor2 jiYu_font listContext';
        }
    }
    LANstate = (state)=>{
        if(state === 4){
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
                                    <Col xl={15} xxl={15} offset={1} className="cloud_title">云服务到期日期: {this.state.cloudDate?<span style={{color:'#1890ff'}}>{this.state.cloudDate}</span>:<span>无期限</span>}</Col>
                                </Row>
                                <Row className="cloud_data">
                                    <Col xl={8} xxl={6} offset={1}>经度: {this.state.clng?this.state.clng:'**'}</Col>
                                    <Col xl={8} xxl={6}>纬度: {this.state.clat?this.state.clat:'**'}</Col>
                                </Row>
                                <Row className="cloud_data">
                                    <Col offset={1}>设备总数: {this.state.cameranum?this.state.cameranum:0}</Col>
                                </Row>
                                <Row className="cloud_data">
                                    <Col offset={1}>所属团队: {this.state.pname?this.state.pname:'未绑定'}</Col>
                                </Row>
                                <Row className="cloud_data">
                                    <Col offset={1}>用户数: {this.state.usercount?this.state.usercount:0}</Col>
                                </Row>
                                <Row className="cloud_data">
                                    <Col offset={1}>管理员: {this.state.adminname?this.state.adminname:'********'}</Col>
                                </Row>
                                {/*<Row className="cloud_data">
                                    <Col xl={8} xxl={4} offset={4}>
                                        <Link to={'/app/companyhome/calling'}><Button type="primary">点名</Button></Link>
                                    </Col>
                                </Row>*/}
                            </Col>
                            {/*<Col xl={7} xxl={6}>
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
                                                        </Col>*/}
                        </Row>
                    </Card>
                </Row>
                <Equipment />

                
            </div>
        );
    }
}
export default Companyscene