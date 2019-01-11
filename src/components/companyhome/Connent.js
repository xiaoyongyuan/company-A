import React,{ Component } from 'react';
import { Row, Col, Card } from 'antd';
import Relationshipnetwork from './Relationshipnetwork'
import {post} from "../../axios/tools";
import '../../style/ztt/css/Companyhome.css'
class Connent extends Component{
    constructor(props){
        super(props);
        this.state={
            myNetwork:[],
            myLookUser:"",
            lookMyuser:"",
            myLookeEuipment:[],
            lookMyEquipment:[]
        };
    }
    componentDidMount() {
        post({url:"/api/company/getone"},(res)=>{
            if(res.success){
                var  myLookUserNum=res.activelist.length;
                var  lookMyuserNum=res.passivelist.length;
                this.setState({
                    myNetwork:res.data.cname,
                    myLookUser:myLookUserNum,
                    lookMyuser:lookMyuserNum,
                    lookMyEquipment:res.passivelist,
                    myLookeEuipment :res.activelist
                })
            }
        })
    }

    render() {
        return(
            <div className="gutter-example button-demo">
                <span>所在位置:首页/关系网</span>
                <Row>
                    <Col span={6} offset={5} className="topShift">
                        <Card>
                            <div className="pb-m">
                                <Row>
                                    <Col span={12}>
                                        <span className="titleFont">查看我的用户</span>
                                    </Col>
                                    <Col span={12}>
                                        <span className="titleFont">共计：</span><span className="fontStyle">{this.state.lookMyuser}</span>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{display:this.state.lookMyEquipment?"block":"none"}}>
                            {
                                this.state.lookMyEquipment.map((v,i)=>(
                                    <Row key={i}>
                                        <Col span={12}>{v.activename}</Col>
                                        <Col span={12}>设备:{v.avtiveecount}</Col>
                                    </Row>
                                ))
                            }
                            </div>

                        </Card>
                    </Col>
                    <Col span={6} className="rightShift topShift">
                        <Card>
                            <div className="pb-m">
                                <Row>
                                    <Col span={12}>
                                        <span className="titleFont">我查看的用户</span>
                                    </Col>
                                    <Col span={12}>
                                        <span className="titleFont">共计：</span><span className="fontStyle">{this.state.myLookUser}</span>
                                    </Col>
                                </Row>
                            </div>
                            {
                                this.state.myLookeEuipment.map((v,i)=>(
                                    <Row key={i}>
                                        <Col span={12}>{v.activename}</Col>
                                        <Col span={12}>设备:{v.avtiveecount}</Col>
                                    </Row>
                                ))
                            }
                        </Card>
                    </Col>
                </Row>
                <Relationshipnetwork  myNetwork={this.state.myNetwork}/>
            </div>
        );
    }
}
export default Connent