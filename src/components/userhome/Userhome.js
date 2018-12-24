import React from 'react';
import { Card ,Row, Col,Timeline, Icon, } from 'antd';
import '../../style/sjg/home.css';
class Userhome extends React.Component{

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
                                   <p>云服务到期日期：<span>2019-12-30</span></p>
                                   <p>设备总数<span>2个</span></p>
                                   <p>所属团队：<span>西安光电维华团队</span></p>
                                   <p>用户数：<span>3个</span></p>
                                   <p>管理员：<span>3个</span></p>
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
export default Userhome
