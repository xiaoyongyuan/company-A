import React,{Component} from "react";
import {Button, Col, Row} from "antd";
import {post} from "../../axios/tools";
import ing from "../../style/imgs/ing.png";
import unsucc from "../../style/imgs/unsucc.png";
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
            itemStatus:this.props.itemStatus,
            rollcallhostory:this.props.rollcallhostory
        })
    }
    componentDidMount() {
        this.setState({
            itemStatus:this.props.itemStatus,
        },()=>{
         // console.log('******************',this.state.itemStatus);        
        })
        post({url:"/api/patrolresult/getone",data:{code:this.state.code}},(res)=>{
            this.setState({
                paList:res.data
            });
        })

    }
    componentWillReceiveProps(nextProps){
        if( nextProps.visible !== vis){
            vis=nextProps.visible;
            if(nextProps.visible){
                vis=nextProps.visible;
                this.setState({
                    code:nextProps.code,
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
                   <Col span={7} offset={3}>{this.state.paList.pteam+' ('+this.state.paList.pbdate+':00:00 —— '+this.state.paList.pedate+':00:00)'}</Col>
               </Row>
               <Row>
                    {/* <Col span={24}><img src={this.state.paList.ppic} alt="nodata" width="100%" /></Col> */}
                    {this.state.itemStatus===0? <Col span={24}><img src={ing} alt="nodata" width="100%" /></Col>:''}
                    {this.state.itemStatus===1? <Col span={24}><img src={this.state.paList.ppic} alt="nodata" width="100%" /></Col>:''}
                    {this.state.paList.ppic&&this.state.rollcallhostory? <Col span={24}><img src={this.state.paList.ppic} alt="nodata" width="100%" /></Col>:''}
                    {this.state.itemStatus===2? <Col span={24}><img src={this.state.paList.ppic?this.state.paList.ppic:unsucc} alt="nodata" width="100%" /></Col>:''}
               </Row>
               <Row style={{margin:"10px 0px"}}>
                   <Col span={8}>处理结果: {this.state.paList.phandle===1?<span style={{color:'#0f0'}}>通过</span>:<span style={{color:'#f00'}}>不通过</span>}</Col>
                  <Col span={8}>处理人: {this.state.paList.handlename}</Col>
                  <Col span={8}>处理时间: {this.state.paList.phdate}</Col>
               </Row>
               <Row>
                  <Col span={24} style={{ textAlign:'right' }}>
                      <Button type="primary" onClick={()=>this.patrolAdopt(1)}>通过</Button>
                      <Button type="primary" onClick={()=>this.patrolAdopt(2)}>不通过</Button>
                  </Col>
               </Row>
           </div>
        )
    }
}
export default PatrolRecordModel;