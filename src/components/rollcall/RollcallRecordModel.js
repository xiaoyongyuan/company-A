import React,{Component} from "react";
import {Row,Col} from "antd";
import {post} from "../../axios/tools";
import "../../style/ztt/css/rollCall.css";
const rollset=[
    {
        code:0,
        rname:"理工大",
        cid:"eftt09",
        ifeveryday:"0",
        resultdate:"2019-01-05 11:07",
        rrpic:"http://pic01.aokecloud.cn/alarm/1000011/pic/20181228//1000011_20181228154552.jpg",
        rfinal:"0"
    },{
        code:1,
        rname:"西安软件园",
        cid:"tftt06",
        ifeveryday:"1",
        resultdate:"2019-01-04 11:07",
        rrpic:"http://pic01.aokecloud.cn/alarm/1000004/pic/20190104//1000004_20190104172947.jpg",
        rfinal:"1"
    },{
        code:2,
        rname:"绿地",
        cid:"tftt06",
        ifeveryday:"0",
        resultdate:"2018-12-03 11:07",
        rrpic:"http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg",
        rfinal:"0"
    },{
        code:3,
        rname:"中兴通讯",
        cid:"tftt06",
        ifeveryday:"1",
        resultdate:"2019-01-02 11:07",
        rrpic:"http://pic01.aokecloud.cn/alarm/1000004/pic/20190104//1000004_20190104172947.jpg",
        rfinal:"1"
    },{
        code:4,
        rname:"中兴通讯",
        cid:"tftt06",
        ifeveryday:"1",
        resultdate:"2019-01-02 11:07",
        rrpic:"http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg",
        rfinal:"0"
    }
];
class RollcallRecordModel extends Component {
    constructor(props){
        super(props);
        this.state={

        };
    }
    normal =(status)=>{
        if(status==0){
            return "fontColor rollcallModelTitle";
        }else if(status==1){
            return "fontColor1 rollcallModelTitle";
        }
    };
    componentWillMount() {
        console.log(this.props.code,"ssssssssss");
    }

    componentDidMount() {
        post({url:"/api/rollcalldetail/getone",data:{code:this.props.code}},(res)=>{
            if(res.success){

            }
        })
    }

    render(){
        return(
            <div className="rollcallRecordModel">
                <Row><Col span={24} className="rollcallModelTitle fontSizeModel">{rollset[this.props.code].rname} - {rollset[this.props.code].cid}</Col></Row>
                <Row className="rollcallModel">
                    <Col span={24}>
                        <img src={rollset[this.props.code].rrpic} alt="" width="100%"/>
                    </Col>
                </Row>
                <Row className="rollcallModel">
                    <Col span={8} className="rollcallModelTitle">{rollset[this.props.code].resultdate}</Col>
                    <Col span={8} className="rollcallModelTitle">{rollset[this.props.code].ifeveryday==0?"自动点名":"手动点名"}</Col>
                    <Col span={8} className={this.normal(rollset[this.props.code].rfinal)}>{rollset[this.props.code].rfinal==0?"正常":"报警"}</Col>
                </Row>
            </div>
        )
    }
}
export default RollcallRecordModel