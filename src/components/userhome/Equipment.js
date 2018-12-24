import React from 'react';
import { Card ,Row, Col, Icon, } from 'antd';
import '../../style/sjg/home.css';
class Equipment extends React.Component{
    render(){
        const { Meta } = Card;
        return(
            <div>
                <Row className="paddRow">  
                    <Col xxl={{ span: 5}}xs={{ span: 6}}className="cardPdd">
                        <Card                       
                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                            actions={[
                               <div className="actionsBbottom"><p>2条</p><p>布防区域</p> </div>,
                               <div className="actionsBbottom colCen">
                                       <Icon type="clock-circle" /> 布防中
                               </div>                                            
                            , 
                                <div className="colCen actionsBbottom ">
                                    <Icon type="setting" />
                                </div>
                        ]}
                        >                       
                            <Row className="paddRow">  
                                <Col xxl={{ span:6}} xs={{ span: 6}}>
                                   <div className="onLine">在线</div> 
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
                    <Col xxl={{ span: 5}}xs={{ span: 6}}className="cardPdd">
                        <Card                        
                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                            actions={[
                                <a href="#" className="actionsBbottom"><p>2条</p><p>布防区域</p> </a>,
                                <a href="#" className="actionsBbottom colCen">
                                        <Icon type="clock-circle" /> 布防中
                                </a>, 
                                 <a href="/app/Userhome/Userdeveice" className="colCen actionsBbottom ">
                                     <Icon type="setting" />
                                 </a>
                        ]}
                        >
                            
                            <Row className="paddRow">  
                                <Col xxl={{ span:6}} xs={{ span: 6}}>
                                   <div className="offLine">离线</div> 
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
                </Row>
            </div>
        )
    }
}
export default Equipment
