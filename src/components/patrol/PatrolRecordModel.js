import React,{Component} from "react";
import {Button, Col, Row} from "antd";
import axios from "axios";
import {post} from "../../axios/tools";
class PatrolRecordModel extends Component{
    componentWillMount() {
        this.setState({
            stateType:this.props.states,
            patrolImgDetail:this.props.patrolImgStatus
        })
    }
    componentDidMount() {
        axios.get("ztt.json",{data:this.state.patrolImgDetail}).then((res)=>{
            console.log(res.data);
        });
    }

    //通过
    patrolAdopt =()=>{
        post({url:"/api/patrolresult/patrolconfirm",data:{code:"5"}},(res)=>{
            if(this.state.stateType!=="0"){
                this.setState({
                    stateType:1
                })
            }
        })
    };
    //不通过
    noPatrolAdopt =()=>{
        post({url:"/api/patrolresult/patrolconfirm",data:{code:"5"}},(res)=>{
            if(this.state.stateType!=="1"){
                this.setState({
                    stateType:0
                })
            }
        })
    };
    render(){
        return(
           <div className="PatrolRecordModel">
               <Row style={{margin:"10px 0px"}}>
                   <Col span={2}>张三</Col>
                   <Col span={5}>2017-12-12 12:22:09</Col>
                   <Col span={3}>测试一</Col>
                   <Col span={6} offset={4}>早班12:00-14:00</Col>
               </Row>
               <Row>
                   <Col span={24}><img src="http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg" alt="nodata" width="100%"/></Col>
               </Row>
               <Row style={{margin:"10px 0px"}}>
                   <Col span={24}>处理结果:<span>{this.state.stateType===0?"不通过":"通过"}</span></Col>
               </Row>
               <Row>
                   <Col span={12} offset={9}><Button type="primary" onClick={this.patrolAdopt}>通过</Button><Button type="primary" onClick={this.noPatrolAdopt}>不通过</Button></Col>
               </Row>
           </div>
        )
    }
}
export default PatrolRecordModel;