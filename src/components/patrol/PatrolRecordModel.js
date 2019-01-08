import React,{Component} from "react";
import {Button, Col, Row} from "antd";
import {post} from "../../axios/tools";
let vis=false;
class PatrolRecordModel extends Component{
    constructor(props){
        super(props);
        this.state={
            paList:[],
            status:[]
        }
    }
    componentWillMount() {
        this.setState({
            code:this.props.code,
            index:this.props.patrolIndex
        })
    }
    componentDidMount() {
        post({url:"/api/patrolresult/getone",data:{code:this.state.code}},(res)=>{
            this.setState({
                paList:res.data
            });
        })

    }
    componentWillReceiveProps(nextProps){
        console.log('nextProps',nextProps)
        if( nextProps.visible != vis){
            vis=nextProps.visible;
            if(nextProps.visible){
                console.log('nextProps',nextProps)
                vis=nextProps.visible;
                this.setState({
                    code:nextProps.code,
                    index:nextProps.index
                },()=>{
                    this.componentDidMount()
                });
            }
        }

    }
    //通过
    patrolAdopt = (type)=>{
        post({url:"/api/patrolresult/patrolconfirm",data:{code:this.state.code,phandle:type}},(res)=>{
            let lists=this.state.paList;
            lists.phandle=res.data[0].phandle;
            this.setState({
                paList:lists
            });
        });
    };
    render(){
        return(
           <div className="PatrolRecordModel">
               <Row style={{margin:"10px 0px"}}>
                   <Col span={4}>{this.state.paList.patrolname}</Col>
                   <Col span={6}>{this.state.paList.ptime}</Col>
                   <Col span={3}>{this.state.paList.cameraname}</Col>
                   <Col span={6} offset={4}>{this.state.paList.pteam}</Col>
               </Row>
               <Row>
                   <Col span={24}><img src={this.state.paList.ppic} alt="nodata" width="100%"/></Col>
               </Row>
               <Row style={{margin:"10px 0px"}}>
                   <Col span={24}>处理结果:<span>{this.state.paList.phandle==1?"通过":"不通过"}</span></Col>
               </Row>
               <Row>
                   <Col span={12} offset={9}><Button type="primary" onClick={()=>this.patrolAdopt(1)}>通过</Button><Button type="primary" onClick={()=>this.patrolAdopt(2)}>不通过</Button></Col>
               </Row>
           </div>
        )
    }
}
export default PatrolRecordModel;