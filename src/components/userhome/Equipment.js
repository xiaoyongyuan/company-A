import React from 'react';
import { Card ,Row, Col, Icon, } from 'antd';
import '../../style/sjg/home.css';
import {post} from "../../axios/tools";
class Equipment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            camera:[],
        };
      }
    componentDidMount() {        
        post({url:'/api/company/getone'},(res)=>{ //获取团队列表
            if(res){
                console.log('设备',res.camera);
                this.setState({
                    camera:res.camera, //摄像头信息
                }); 
            }   
        })
        
    }
    render(){

        return(
            <div>
                <Row className="paddRow">  
                    {
                    this.state.camera.map((el,i)=>{
                        return(
                             <Col key="i" xxl={{ span: 5}}xs={{ span: 6}}className="cardPdd">
                                <Card                       
                                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    actions={[
                                        <a href="#" className="actionsBbottom"><p>2条</p><p>布防区域</p> </a>,
                                        <a href="#" className="actionsBbottom colCen">
                                                <Icon type="clock-circle" /> 布防中
                                        </a>, 
                                        <a href="#/app/userhome/Userdeveice" className="colCen actionsBbottom ">
                                            <Icon type="setting" />
                                        </a>
                                ]}
                                >                       
                                    <Row className="paddRow">  
                                        <Col xxl={{ span:6}} xs={{ span: 6}}>
                                         {/* {
                                            if({el.cstatus}==1){
                                                <div className="onLine">在线</div> 
                                            }
                                          } */}

                                        <div className="onLine">{el.cstatus?"在线":"离线"}</div> 
                                        </Col>
                                        <Col xxl={{ span: 18}} xs={{ span: 18}} className="titcon">
                                        <p>标题</p> 
                                        <p>内容</p>
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
export default Equipment
