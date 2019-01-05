import React, { Component} from 'react';
import {Row, Col, Button, DatePicker, LocaleProvider, Table, Form, Input,Modal} from "antd";
const FormItem = Form.Item;
class RollcallTask extends React.Component{
	constructor(props){
        super(props);
        this.state={
        }
    }
    
    render(){
        const { getFieldDecorator } = this.props.form;
        return(       
            <div className="RollcallTask">
                        <Row>
                        <Col span={14}>
                            <Form layout="inline" onSubmit={this.selectopt}>
                                <FormItem label="姓名">
                                    {getFieldDecorator('realname', {
                                        rules:[{
                                            required: false,
                                            message: '请输入名称!'
                                        }],
                                    })( 
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="账号">
                                    {getFieldDecorator('account', {
                                        rules: [{
                                            required: false,
                                            message: '请输入账号!',

                                        }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">
                                        查询
                                    </Button>
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span={6}>
                            <a href="#/app/rollcall/adopt"><Button>新增</Button></a>
                             <a href="#/app/rollcall/auditing"><Button>查看</Button></a>
                        </Col>

                    </Row>
            </div>
        )
    }
}
export default RollcallTask=Form.create()(RollcallTask);
