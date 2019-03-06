import React, { Component } from 'react';
import '../../style/sjg/home.css';
import {Form,Table, Row, Col, Button,Radio, Modal,TimePicker,message} from 'antd';
import moment from 'moment';
import {post} from "../../axios/tools";
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
class Setarea extends Component {
    constructor(props){
        super(props);
        this.state= {
            status: 1,
            form: false,
            checkedList:"weekday",
            cid:''
        }
    }
    componentWillMount=()=>{
        this.setState({
            cid:this.props.query.id
        });
    }
    componentDidMount() {
        //取数据
        this.requestdata()
    }
    requestdata=() => {//取数据
        post({url:"/api/workingtime/getlist",data:{cid:this.state.cid}}, (res)=>{
            if(res.success){
                this.setState({
                    list: res.data
                })
            }
        })
     }
    onChange_radio=(checkedList)=>{//单选
        this.setState({
            checkedList:checkedList.target.value
        });
    }
    showModaldelete = (code,index,record) =>{ //删除弹层
        this.setState({
            deleteshow: true,
            type:code,
            index:index
        });
    }
//删除确认
    deleteOk = (code,index) =>{
        const data={
            code:this.state.type,
        }
        const list=this.state.list;
        list.splice(this.state.index,1);
        post({url:"/api/workingtime/del",data:data}, (res)=>{
            if(res.success){
                this.setState({
                    list:list,
                    deleteshow: false,
                })
                message.success('删除成功'); 
            }
        })
    };
    deleteCancel = () =>{//删除取消
        this.setState({
            deleteshow: false,
        });
    };
    switch = (code,index)=>{ //状态开关

        const stype=this.state.list[index].cwstatus?0:1
        const data={
            cwstatus:stype,
            code:code
        }
        const list=this.state.list;
        list[index].cwstatus=stype
        post({url:"/api/workingtime/update",data:data}, (res)=>{
            if(res.success){
                this.setState({
                    list:list
                },()=>{
                    if(stype===1){
                        message.success('开启成功'); 
                    }else{
                        message.success('关闭成功'); 
                    }
                })
                
            }
        })
    };
    add = (e) => {//新增
        console.log('**values("HH")',e);
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('11111111111111',values.bdate.format("HH"));

            if(values.bdate.format("HH")==null&&values.edate.format("HH")==null){
                message.success('请选择时间');
             }
            if(!err){
                const data={
                    starttime:values.bdate.format("HH"),
                    endtime:values.edate.format("HH"),
                    wtype:this.state.checkedList,
                    cwstatus:1,
                    cid:this.state.cid,
                }
                if(values.bdate.format("HH")==="00"&&values.edate.format("HH")==="00"||values.bdate.format("HH")<values.edate.format("HH")){
                 post({url:"/api/workingtime/add",data:data}, (res)=>{
                    if(res.success){
                        data.code=res.code;
                        const list=this.state.list;
                        list.unshift(data);
                        this.setState({
                            list:list,
                        })
                        message.success('新增成功');
                    }
                    
                })
              }else{
                message.warning('开始时间不能大于结束时间');

             }
            }
            this.props.form.resetFields();
        })
  
    }
    render() {
        const format = 'HH';
        const _this=this;
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text, record,index) => (index+1)
            },
            {
                title: '时间',
                dataIndex: 'starttime',
                key: 'createon',
                render: (text, record,index) => (
                    <span>
                        {record.starttime}<span>:00:00</span>----{record.endtime}<span>:00:00</span>
                    </span>
                ),
            }, {
                title: '类型',
                dataIndex: 'wtype',
                key: 'wtype',
                render: (text, record) => {
                    switch(text){
                        case 'weekday':
                            return ('工作日');
                        case 'today':
                            return ('每天');
                        default:
                            return ('周末');
                    }
                },
            },
            {
                title: '状态',
                dataIndex: 'cwstatus',
                key: 'cwstatus',
                render: (text) => {
                    switch(text){
                        case 1:
                            return ('开启');
                        default:
                            return ('关闭');
                    }
                }
            },
            {
                title: '操作',
                dataIndex: 'code',
                key: 'code',
                render: (text, record,index) => (
                    <span>
                        <Button className="queryBtn" onClick={() => {this.switch(text,index);}}>{record.cwstatus?'关闭':'开启'}</Button>
                        <Button className="deleteBtn" onClick={()=>_this.showModaldelete(text,index,record)} >删除</Button>
                    </span>
                ),
            }];
        let times=moment(this.state.timeList).format("HH");
        function onChange_time1(time, timeString) {
             _this.setState({
                timeList:time,
                timeString:timeString
            });

        }
        function onChange_time2(time, timeString) {
            // _this.setState({
            //     timeList2:time,
            //     timeString:timeString
            // });
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
            if(times === '00'){
                hours.splice(times,24-times);
            }else{
                hours.splice(parseInt(times)+1,24-times);
            }
            return hours;
        }
        return (
            <div className="padding20 Settime">
                {/* <BreadcrumbCustom first="场景" second="布防时间" /> */}
                <Row style={{marginBottom:'20px'}}>
                    <Col span={24}>
                        <Form layout="inline" onSubmit={this.add}>
                            <FormItem label="开始时间">
                                {getFieldDecorator('bdate', {
                                    rules: [{ required: true, message: '请选择开始时间!' }],
                                })(
                                    <TimePicker onChange={onChange_time1} placeholder="开始时间" defaultOpenValue={moment('00', format)}
                                                format={format} 
                                    />
                                )}
                            </FormItem>
                            <FormItem label="结束时间">
                                {getFieldDecorator('edate', {
                                    rules: [{ required: true, message: '请选择结束时间!' }],
                                })(
                                    <TimePicker onChange={onChange_time2} placeholder="结束时间"
                                                disabledHours={disabledHours}
                                                format={format} 
                                    />
                                )}
                            </FormItem>
                            <FormItem label="">
                                <RadioGroup onChange={this.onChange_radio} value={this.state.checkedList}>
                                    <Radio value={"weekday"}>工作日</Radio>
                                    <Radio value={"playday"}>周末</Radio>
                                    <Radio value={"today"}>每天</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem>
                                <Button className="queryBtn" htmlType="submit">
                                    新增
                                </Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>

                <Table columns={columns} dataSource={this.state.list} />
                <Modal title="提示信息" visible={this.state.deleteshow} onOk={this.deleteOk}
                       onCancel={this.deleteCancel} okText="确认" cancelText="取消"
                >
                    <p>确认删除吗？</p>
                </Modal>
            </div>
        )
    }
}
export default Setarea=Form.create()(Setarea);
