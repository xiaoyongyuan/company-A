import React from 'react';
import {Form, Row, Col } from 'antd';
import '../../style/sjg/home.css';
class Userdeveice extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
          
        };
    }

    render(){
       
        
        return(
            <div style={{padding:"1%"}}>
                <div className="box-padding"> 
                    <p> 设备信息</p>
                    <Row>
                        <Col span={22}>
                            昆仑决
                        </Col>
                    </Row>

                </div>
                
            </div>
        )
    }
}

export default Userdeveice=Form.create()(Userdeveice);
