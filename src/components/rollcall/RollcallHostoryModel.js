import React,{Component} from "react";
import {Row,Col} from "antd";
import {post} from "../../axios/tools";
import "../../style/ztt/css/rollCall.css";
let vis=false;
class RollcallHostoryModel extends Component {
    constructor(props){
        super(props);
        this.state={
            list:{},
           visible:props.visible || false,
        };
    }
    componentDidMount() {
        this.setState({
            code:this.props.code
        },()=>{
            this.requestdata()
        });
    }
    componentWillReceiveProps(nextProps){
        console.log('nextProps',nextProps);
        console.log('nextProps.code',nextProps.code);
        console.log("22222",nextProps.visible);
        if( nextProps.visible !== vis){
            console.log('---------nextProps.code',nextProps.code);
            console.log(nextProps.visible);
            vis=nextProps.visible;
            if(nextProps.visible){
                vis=nextProps.visible;
                this.setState({
                    code:nextProps.code
                }, () => {
                    console.log('*******code', nextProps.code);
                    post({url:'/api/rollcalldetail/getone',data:{code:nextProps.code}},(res)=>{
                        if(res.success){
                             console.log('******************1', res.data);
                                this.setState({
                                       list:res.data
                                },()=>{
                                    console.log('this.state.list', this.state.list.rname);
                                })
                        }
                    })
                });
            }
        }
             
    }

    requestdata=() => {//数据回填
        if(this.state.code){
            post({url:'/api/rollcalldetail/getone',data:{code:this.state.code}},(res)=>{
                if(res.success){
                     console.log('******************1', res.data);
                        this.setState({
                               list:res.data
                        },()=>{
                            console.log('this.state.list', this.state.list.rname);
                        })
                }
            })
        }
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