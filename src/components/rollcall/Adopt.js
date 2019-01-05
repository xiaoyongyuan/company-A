
import React, { Component } from 'react';
import '../../style/sjg/home.css';
import { Card, Form, Input, Row, Col, message } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import Radioss from '../Radio';
import axios from 'axios';
const FormItem = Form.Item;
const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class Adopt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            confirmDirty: false,
            isDeal: false
        };
    }
    componentDidMount(e) {
        this.setState({
        })
        //取数据
       console.log(e);
        this.requestdata();
    }
    requestdata=(params) => {//取数据
        axios.get("table.json",params)
            .then((res)=>{
            if(res.data.success){
                console.log(res.data.data);
                this.setState({
                    list: res.data.data
                })
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="维护团队管理" second="点名审核" />
                <Row className="white">
                    <Col className="gutter-row" span={10}>
                        <div className="gutter-box">
                            <Card title="" bordered={false}>
                                <p span={4} offset={4} style={{textAlign:'center'}}>点名对象详情</p><br/>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="对象名称"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('IP', {
                                            rules: [{required: true, message: '请输入对象名称',whitespace: true}],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="状态"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('状态', {
                                            rules: [{required: false}],
                                        })(
                                            <Radioss />
                                        )}
                                    </FormItem>
                                    <Row className="area_row">
                                        <Col span={3} offset={5} className="area_text">
                                            区域：
                                        </Col>
                                        <Col span={10}>
                                            <div className="area">
                                                <img alt="2" src="../../style/logo.png" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <FormItem
                                        {...formItemLayout}
                                        label="处理结果"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('处理结果', {
                                            rules: [{required: true,whitespace: true}],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <Row className="area_row">
                                        <Col span={4} offset={4} className="area_text">
                                            SVG文件：
                                        </Col>
                                        <Col span={12}>
                                            <div className="area">
                                                <img alt="3" src="../../style/logo.png" />
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

}
export default Adopt= Form.create()(Adopt);
