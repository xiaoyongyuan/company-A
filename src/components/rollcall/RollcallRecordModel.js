import React,{Component} from "react";
import {Row,Col} from "antd";
import {post} from "../../axios/tools";
import "../../style/ztt/css/rollCall.css";
let vis=false;
class RollcallRecordModel extends Component {
    constructor(props){
        super(props);
        this.state={
            rollset:{}
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
        this.setState({
            code:this.props.code
        },()=>{
            console.log(this.props.code,this.state.code)
        })
    }

    componentDidMount() {
        post({url:"/api/rollcalldetail/getone",data:{code:this.state.code}},(res)=>{
            if(res.success){
                this.setState({
                    rollset:res.data
                })
            }
        })
    }
    componentWillReceiveProps(nextProps){
        if( nextProps.visible !== vis){
            vis=nextProps.visible;
            if(nextProps.visible){
                vis=nextProps.visible;
                this.setState({
                    code:nextProps.code
                }, () => {
                    this.componentDidMount()});
            }
        }
             
    }

    render(){
        return(
            <div className="rollcallRecordModel">
                <Row><Col span={24} className="rollcallModelTitle fontSizeModel">{this.state.rollset.cameraname} - {this.state.rollset.rname}</Col></Row>
                <Row className="rollcallModel">
                    <Col span={24}>
                        <img src={this.state.rollset.rrpic} alt="" width="100%"/>
                    </Col>
                </Row>
                <Row className="rollcallModel">
                    <Col span={8} className="rollcallModelTitle">{this.state.rollset.resultdate}</Col>
                    <Col span={8} className="rollcallModelTitle">{this.state.rollset.ifeveryday==0?"自动点名":"手动点名"}</Col>
                    <Col span={8} className={this.normal(this.state.rollset.rfinal)}>{this.state.rollset.rfinal==1?"正常":"报警"}</Col>
                </Row>
            </div>
        )
    }
}
export default RollcallRecordModel