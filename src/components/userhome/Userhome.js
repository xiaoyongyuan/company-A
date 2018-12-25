import React from 'react';
import { Card ,Row, Col,Timeline, Icon, } from 'antd';
import '../../style/sjg/home.css';
import {post} from "../../axios/tools";
class Userhome extends React.Component{
    constructor(props){
      super(props);
      this.state={
        camera:[],
        data:{},
      };
    }

    componentDidMount() {        
        post({url:'/api/company/getone'},(res)=>{ //获取团队列表
            if(res){
                this.setState({
                    data:res.data, //用户信息
                    camera:res.camera, //摄像头信息


                    
                }); 
            }   
        })
        
    }

    render(){
        var styleObj={
            topMar:{ margin:'60px 0 0 0',},
          
            successBg:{ background:'#96FF66'},
        }

        return(          
            <div>
                 <Row>
                    <Col span={23} className="paddL">
                      <Card 
                            title="Card title" style={styleObj.topMar}                         
                      >
                            <Row>
                                <Col span={12}>                             
                                   <p>云服务到期日期: <span>{this.state.data.cloudvaliddate?this.state.data.cloudvaliddate:'未开通'}</span></p>
                                   <p>设备总数: <span>{this.state.camera.length?this.state.camera.length:0}个</span></p>
                                   <p>所属团队: <span>西安光电维华团队</span></p>
                                   <p>用户数: <span>3个</span></p>
                                   <p>管理员名称: <span>{this.state.data.adminname}</span></p>
                                </Col>
                                <Col span={12}>
                                    <Timeline>
                                        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                                        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                                        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                                        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>                                    
                                    </Timeline>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    
                </Row>
                <Row className="paddRow"> 
                {
                    this.state.camera.map((el,i)=>{
                        return (
                            <Col xxl={{ span: 5}} xs={{ span: 6}}className="cardPdd">
                                <Card                       
                                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    actions={[
                                        <a href={"#/app/companyhome/setarea?id="+el.code} className="actionsBbottom"><p>2条</p><p>布防区域</p> </a>,
                                        <a href={"#/app/companyhome/settime?id="+el.code} className="actionsBbottom colCen">
                                                <Icon type="clock-circle" /> 布防中
                                        </a>, 
                                         <a href={"#/app/companyhome/Userdeveice?id="+el.code} className="colCen actionsBbottom ">
                                             <Icon type="setting" />
                                         </a>
                                ]}
                                >
                                    <Row className="paddRow">  
                                        <Col xxl={{ span:6}} xs={{ span: 6}}>
                                           <div className="onLine">在线</div> 
                                        </Col>
                                        <Col xxl={{ span: 18}} xs={{ span: 18}} className="titcon">
                                           <p>{el.location}</p> 
                                           <p>{el.eid}</p>
                                        </Col>
                                    </Row>
                                    <div className="bell">
                                    <Icon type="bell" /> <span>120</span> 
                                    </div>
                                </Card>
                            </Col>
                        )
                    })
                } 
                    
                    
                </Row>
            </div>
        )
    }
}
export default Userhome
