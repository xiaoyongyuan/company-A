import React,{Component} from "react";
import {Row,Col} from "antd";
import {post} from "../../axios/tools";
import "../../style/ztt/css/rollCall.css";

const rollset=[
    {
        code:89,
        rrpic:'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
        rfinal:0,
        cid:1000007,
        rname:"理工大",
        ifeveryday:"1",
        resultdate:"2019-01-05 16:31:00",
    
     },
     {
        code:90,
        rrpic:'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
        rfinal:1,
        cid:1000007,
        rname:"理工大",
        ifeveryday:"0",
        resultdate:"2019-01-05 16:31:00",
    },
    
    {
        code:91,
        rrpic:'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229094947.jpg',
        rfinal:0,
        cid:1000007,
        rname:"理工大",
        ifeveryday:"1",
        resultdate:"2019-01-05 12:31:00",
     },
    
     {
        code:92,
        rrpic:'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229094947.jpg',
        rfinal:1,
        cid:1000007,
        rname:"理工大",
        ifeveryday:"0",
        resultdate:"2019-01-05 12:31:00",
    }
    ,{
        code:93,
        rrpic:'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
        rfinal:2,
        cid:1000007,
        rname:"理工大",
        ifeveryday:"1",
        resultdate:"2019-01-05 11:07",
     },
     {
        code:94,
        rrpic:'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
        rfinal:0,
        cid:1000007,
        rname:"理工大",
        ifeveryday:"0",
        resultdate:"2019-01-05 11:07",
    }
];

class RollcallHostoryModel extends Component {
    constructor(props){
        super(props);
        this.state={
            list:{},
        };
    }
    
    componentWillMount() {

    }

    componentDidMount() {
        // console.log('******************this.props.code',this.props.code);
        post({url:'/api/rollcalldetail/getone',data:{code:this.props.code}},(res)=>{
            if(res.success){
                 console.log('******************', res);
                    this.setState({
                           list:res.data
                    },()=>{
                        console.log('this.state.list', this.state.list.rname);
                    })
            }
        })
    }
    normal =(status)=>{
        if(status==0){
            return "fontColor rollcallModelTitle";
        }else if(status==1){
            return "fontColor1 rollcallModelTitle";
        }
    };
    
    render(){
        
        return(
            <div className="rollcallRecordModel">
                <Row>
                    <Col span={24} className="rollcallModelTitle fontSizeModel">
                       {this.state.list.rname} - {this.state.list.cid} 
                    </Col>
                </Row>
                <Row className="rollcallModel">
                    <Col span={24}>
                        <img src={this.state.list.rrpic} alt="" width="100%"/>
                    </Col>
                </Row>
                <Row className="rollcallModel">
                    <Col span={8} className="rollcallModelTitle">
                    {this.state.list.resultdate}
                    </Col>
                    <Col span={8} className="rollcallModelTitle">
                    {this.state.list.ifeveryday==0?"自动点名":"手动点名"}
                    </Col>
                    <Col span={8}
                     className={this.normal(this.state.list.rfinal)}
                     >
                     {this.state.list.rfinal==0?"正常":"报警"}
                     </Col>
                </Row>
            </div>
        )
    }
}
export default RollcallHostoryModel