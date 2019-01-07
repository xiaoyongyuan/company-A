import React,{Component} from "react";
import {Button, Col, Row} from "antd";
import {post} from "../../axios/tools";
const data=[
    {
        "code": "0",
        "cid": "1000001",
        "pdate": "2018-12-12 12:09:09",
        "ppic": "http://pic01.aokecloud.cn/alarm/1000004/pic/20190104//1000004_20190104172947.jpg",
        "patrolname": "李四",
        "cameraname": "早班",
        "phandle": "0"
    },
    {
        "code": "1",
        "cid": "1000001",
        "pdate": "2018-12-12 12:09:09",
        "ppic": "http://pic01.aokecloud.cn/alarm/1000011/pic/20181228//1000011_20181228154552.jpg",
        "patrolname": "张三",
        "cameraname": "中班",
        "phandle": "1"
    }
];
class PatrolRecordModel extends Component{
    componentDidMount() {
        post({url:"/api/patrolresult/getone",data:{code:this.props.patrolImgStatus}},(res)=>{

        })

    }
    //通过
    patrolAdopt =()=>{
        post({url:"/api/patrolresult/patrolconfirm",data:{code:"5"}},(res)=>{

        })
    };
    //不通过
    noPatrolAdopt =()=>{
        post({url:"/api/patrolresult/patrolconfirm",data:{code:"5"}},(res)=>{

        })
    };
    render(){
        return(
           <div className="PatrolRecordModel">
               <Row style={{margin:"10px 0px"}}>
                   <Col span={2}>{data[this.props.patrolImgStatus].patrolname}</Col>
                   <Col span={5}>{data[this.props.patrolImgStatus].pdate}</Col>
                   <Col span={3}>{data[this.props.patrolImgStatus].cid}</Col>
                   <Col span={6} offset={4}>{data[this.props.patrolImgStatus].cameraname}</Col>
               </Row>
               <Row>
                   <Col span={24}><img src={data[this.props.patrolImgStatus].ppic} alt="nodata" width="100%"/></Col>
               </Row>
               <Row style={{margin:"10px 0px"}}>
                   <Col span={24}>处理结果:<span>{this.props.states==0?"通过":"不通过"}</span></Col>
               </Row>
               <Row>
                   <Col span={12} offset={9}><Button type="primary" onClick={this.patrolAdopt}>通过</Button><Button type="primary" onClick={this.noPatrolAdopt}>不通过</Button></Col>
               </Row>
           </div>
        )
    }
}
export default PatrolRecordModel;