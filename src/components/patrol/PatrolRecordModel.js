import React,{Component} from "react";
import {Button, Col, Row} from "antd";
import {post} from "../../axios/tools";
const data=[
    {
        "code": "1",
        "cid": "1000001",
        "pdate": "2018-12-12 12:09:09",
        "ppic": "http://pic01.aokecloud.cn/alarm/1000004/pic/20190104//1000004_20190104172947.jpg",
        "patrolname": "李四",
        "cameraname": "测试一",
        "phandle": "0"
    },
    {
        "code": "3",
        "cid": "1000001",
        "pdate": "2018-12-12 12:09:09",
        "ppic": "http://pic01.aokecloud.cn/alarm/1000011/pic/20181228//1000011_20181228154552.jpg",
        "patrolname": "张三",
        "cameraname": "测试二",
        "phandle": "1"
    }
];
class PatrolRecordModel extends Component{
    componentWillMount() {
        this.setState({
            stateType:this.props.states,
            patrolImgDetail:this.props.patrolImgStatus
        })
    }
    componentDidMount() {
        console.log(this.state.patrolImgDetail);
        post({url:"/api/patrolresult/getone",data:{code:this.state.patrolImgDetail}},(res)=>{

        })

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
                   <Col span={2}>{this.state.patrolImgDetail==="1"?data[0].patrolname:data[1].patrolname}</Col>
                   <Col span={5}>{this.state.patrolImgDetail==="1"?data[0].pdate:data[1].pdate}</Col>
                   <Col span={3}>{this.state.patrolImgDetail==="1"?data[0].cameraname:data[1].cameraname}</Col>
                   <Col span={6} offset={4}>{this.state.patrolImgDetail==="1"?data[0].patrolname:data[1].patrolname}</Col>
               </Row>
               <Row>
                   <Col span={24}><img src={this.state.patrolImgDetail==="1"?data[0].ppic:data[1].ppic} alt="nodata" width="100%"/></Col>
               </Row>
               <Row style={{margin:"10px 0px"}}>
                   <Col span={24}>处理结果:<span>{}</span></Col>
               </Row>
               <Row>
                   <Col span={12} offset={9}><Button type="primary" onClick={this.patrolAdopt}>通过</Button><Button type="primary" onClick={this.noPatrolAdopt}>不通过</Button></Col>
               </Row>
           </div>
        )
    }
}
export default PatrolRecordModel;