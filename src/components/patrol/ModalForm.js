import React, { Component } from 'react';
import {Form,TimePicker,Input,Checkbox} from 'antd';
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
    componentWillMount(){
       
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
        console.log("nextProps", nextProps);
        if( nextProps.visible != vis){
            vis=nextProps.visible;
            if(nextProps.visible){
                vis=nextProps.visible;
                this.setState({
                    code:this.props.code,
                });
            }
        }

    }
    requestdata=() => {//取数据
        if(this.state.code){
            post({url:"/api/patrol/getone",data:{code:this.state.code} }, (res)=>{
                console.log("***************************************",typeof(`${res.data.clist}` ))
                    this.props.form.setFieldsValue({
                        pteam: res.data.pteam,
                        pbdate: moment(res.data.pbdate),
                        pedate: moment(res.data.pedate),
                        patrolE:`${res.data.clist}`.split(",") ,
                    });
            })
        }
        
        post({url:"/api/camera/getlist"}, (res)=>{ //获取摄像头
            if(res.success){
                console.log(res.data,"摄像头code")
                  let codearr=[];
                res.data.map((el,i) => {
                    codearr.push({ label: el.name, value:el.code })
                })
                this.setState({
                    plainOptions: codearr
                },()=>{
                    console.log(this.state.plainOptions,"ccccccccccc")
                })
            }
        })
    }
    formref = () => { //将form传给父组件由父组件控制表单提交
        return this.props.form;
    };


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
                                <CheckboxGroup options={this.state.plainOptions} onChange={onChangecheck} />
                            )}
                        </FormItem>
                </Form>

        )
    }


}

export default ModalForm = Form.create({})(ModalForm);