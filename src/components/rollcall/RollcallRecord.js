import React from 'react';
import {Row,Col,Form} from "antd";
class RollcallRecord extends React.Component{
    render(){
        return(       
            <div className="RollcallRecord">
            <Form>
                <Row>
                    <Col span={4}></Col>
                    <Col span={4}></Col>
                    <Col span={4}></Col>
                    <Col span={4}></Col>
                </Row>
            </Form>
            </div>
        )
    }
}
export default RollcallRecord;
