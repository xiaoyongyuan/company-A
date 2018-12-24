import React from 'react';
import {Form, Row, Col,Icon } from 'antd';
import '../../style/sjg/home.css';
class Userdeveice extends React.Component{
    constructor(props){
        super(props);
        this.state={
            portvalue:"827317",
            ipvalue:"192.168.1.67",
        };
    }
    onChangeip=(e)=> {//ip  input 修改ip
        this.setState({
            ipvalue:e.target.value,
        });
        console.log('ip= ', e.target.value );
    }
    onChangeport=(e)=> {//ip  input 修改端口
        this.setState({
            portvalue:e.target.value,
        });
        console.log('port= ', e.target.value );
    }
   
    inputOnBlurip=(e)=>{ //ip  input 失去焦点
        this.setState({
             focus: false
             });
          console.log('focus= ',"失去焦点" );
    }
    inputOnBlursport=(e)=>{ //端口 input 失去焦点
        this.setState({
             focus: false
             });
          console.log('focus= ',"失去焦点" );
    }
    

    render(){
   
        function on_port()
            {
            document.getElementById('port').focus()
            }
        function on_ip()
            {
            document.getElementById('ip').focus()
            }
             
            
        return(
            
            <div style={{padding:"1%"}}>
                <div className="box-padding"> 
                    <p> <Icon type="bars" /> 设备信息</p>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                        设备：
                        </Col>
                        <Col span={21} className="t_l">
                          efsh9293oiax
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           报警类型：
                        </Col>
                        <Col span={21} className="t_l">
                            围界入侵
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           所在位置：
                        </Col>
                        <Col span={21} className="t_l">
                            西安
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           最后报警时间：
                        </Col>
                        <Col span={21} className="t_l">
                            2018-12-16 15:30:12
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                        防区设置：
                        </Col>
                        <Col span={21} className="t_l">
                             <a href="#" className="underline">2个</a>
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           设防时间：
                        </Col>
                        <Col span={21} className="t_l">
                        <a href="#" className="underline"> 2段</a>                     
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           上次心跳：
                        </Col>
                        <Col span={21} className="t_l">
                           2018-12-30 16：11:45
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           设备温度：
                        </Col>
                        <Col span={21} className="t_l">
                           38℃
                        </Col>
                    </Row>



                    <p><Icon type="video-camera" /> 摄像头信息</p>



                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           设备IP：
                        </Col>
                        <Col span={21} className="t_l">
                              <input type="text"value={this.state.ipvalue} id="ip"
                              onChange={(e)=>this.onChangeip(e)}
                              onBlur={(e)=>this.inputOnBlurip(e) }
                              /> 
                              <span> <Icon type="edit" onClick={on_ip} /></span> 
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           设备端口：
                        </Col>
                        <Col span={21} className="t_l">
                            <input type="text"value={this.state.portvalue} 
                             onChange={(e)=>this.onChangeport(e)}
                             id="port"
                             onBlur={(e)=>this.inputOnBlursport(e) } 
                            />      
                            <span>  <Icon type="edit" onClick={on_port} /></span>
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           设备状态：
                        </Col>
                        <Col span={21} className="t_l">
                           运行中
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           设备软件版本：
                        </Col>
                        <Col span={21} className="t_l">
                           无
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                          设备硬件版本：
                        </Col>
                        <Col span={21} className="t_l">
                           无
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           当前状态：
                        </Col>
                        <Col span={21} className="t_l">
                           正常
                        </Col>
                    </Row>
                </div>
                
            </div>
        )
    }
}

export default Userdeveice=Form.create()(Userdeveice);
