import React, { Component } from 'react';
import {Form,Table, Row, Col, Button,Radio, Modal,TimePicker,Input,Checkbox} from 'antd';
import {post} from "../../axios/tools";
import moment from 'moment';
const FormItem = Form.Item;
let vis=false;
class ModalForm extends Component {
    constructor(props){
        super(props);
        this.state={
            visible:props.visible || false,
            form:false
        };
    }
    componentDidMount() {
        //编辑  数据回填
        this.setState({
            code:this.props.code
        },()=>{
            this.requestdata()
        });
    }
    componentWillReceiveProps(nextProps){
        if( nextProps.visible !== vis){
            vis=nextProps.visible;
            if(nextProps.visible){
                vis=nextProps.visible;
                this.setState({
                    code:nextProps.code
                }, () => {
                    this.requestdata()});
            }
        }
             
    }
    requestdata=(params) => {//取数据
        if(this.state.code){
            post({url:"/api/patrol/getone",data:{code:this.state.code} }, (res)=>{
                    this.props.form.setFieldsValue({
                    // realname: `${res.data.realname}`,
                    // emailaddress: `${res.data.emailaddress}`,
                    });
            })
        }
    }
    formref = () => { //将form传给父组件由父组件控制表单提交
        return this.props.form;
    };

    onChange = (checkedList) => { //分组选择
        this.setState({
            checkedList:checkedList.target.value
        });
    }
    render() {
        const CheckboxGroup = Checkbox.Group;
        const { getFieldDecorator } = this.props.form;
        const format = 'HH';
        const _this=this;
        let times=moment(this.state.timeList).format("HH");
        function onChange_time1(time, timeString) {
             _this.setState({
                timeList:time,
                timeString:timeString
            });

        }
        function onChange_time2(time, timeString) {
            _this.setState({
                timeList2:time,
                timeString:timeString
            });
        }
        function newArray(start, end) {
            let result = [];
            for (let i = start; i < end; i++) {
                result.push(i);
            }
            return result;
        }

        function disabledHours() {
            let hours = newArray(0, 60);
            if(times== '00'){
                hours.splice(times,24-times);
            }else{
                // console.log(times,parseInt(times),parseInt(times)+1)
                hours.splice(parseInt(times)+1,24-times);
            }
            return hours;
        }
        function onChangecheck(checkedValues) {
            console.log('checked = ', checkedValues);
        }
        const plainOptions = [
            { label: '测试1', value:"测试1" },
            { label: '测试2', value:"测试2" },
            { label: '测试3', value:"测试3" },
            { label: '测试4', value:"测试4" },
        ];
        return (
           


                <Form layout="vertical" onSubmit={this.handleSubmit}>
                <FormItem label="班次名称">
                    {getFieldDecorator('pteam', {
                        rules: [{
                            required: false, message: '班次名称',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="开始时间">
                    {getFieldDecorator('bdate', {
                        rules: [{ required: true, message: '请选择时间!' }],
                    })(
                        <TimePicker onChange={onChange_time1} defaultOpenValue={moment('00', format)}
                                    format={format} 
                        />
                    )}
                </FormItem>
                <FormItem label="结束时间">
                    {getFieldDecorator('edate', {
                        rules: [{ required: true, message: '请选择时间!' }],
                    })(
                        <TimePicker onChange={onChange_time2}
                                    disabledHours={disabledHours}
                                    format={format} 
                        />
                    )}
                </FormItem>
                <FormItem label="巡更设备">
                            {getFieldDecorator('patrolE', {

                                rules: [{ required: false, message: '请选择巡更设备!' }],
                            })(
                                <CheckboxGroup options={plainOptions} onChange={onChangecheck} />
                            )}
                        </FormItem>
                </Form>

        )
    }


}

export default ModalForm = Form.create({})(ModalForm);