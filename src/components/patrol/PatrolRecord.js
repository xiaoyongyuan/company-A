import React from 'react';
import {Row, Col, Button, DatePicker, LocaleProvider, Table, Form, Select,Modal} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import {post} from "../../axios/tools";
import "../../style/ztt/css/police.css";
import imgSrc from "../../style/ztt/img/house.jpg";
const Option = Select.Option;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        xl: { span: 4}
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        xl: { span: 4}
    },
};
class PatrolRecord extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            patrolImg:false,
            equipment:[],
            stateType:0
        }
    }
    onChangeDate = (field, value) => {
        this.setState({
            [field]: value,
        });
    };
    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    };
    //禁止的开始时间
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };
    //禁止的结束时间
    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };
    //开始时间
    onChange1 =(dateString1)=> {
        this.onChangeDate('startValue',dateString1);
        this.setState({
            bdate:dateString1
        });
    };
    //结束时间
    onChange2 =(dateString2)=> {
        this.onChangeDate("endValue",dateString2);
        this.setState({
            edate:dateString2
        });
    };
    patrol =()=>{
        this.setState({
            patrolImg:true
        })
    };
    patrolOk =()=>{
        this.setState({
            patrolImg:false
        })
    };
    patrolCancel =()=>{
        this.setState({
            patrolImg:false
        })
    };
    //select设备
    patrolChange =(value)=>{
        this.setState({
            cid:value
        });
    };
    //巡更列表信息
    patrolList =()=>{
        post({url:"/api/patrolresult/getlist",data:{ifhandle:1}},(res)=>{
            if(res.success){
                this.setState({
                    dataSource:res.data
                })
            }
        })
    };
    //设备
    handlePatrol =()=>{
        post({url:"/api/camera/getlist",data:{ifhandle:1}},(res)=>{
           if(res.success){
               this.setState({
                   equipment:res.data
               })
           }
        })
    };
    //查询
    handlePatrolSelect =()=>{
        const data={
            ifhandle:1,
            bdate:this.state.bdate?this.state.bdate.format('YYYY-MM-DD HH:00:00'):'',
            edate:this.state.edate?this.state.edate.format('YYYY-MM-DD HH:00:00'):'',
            cid:this.state.cid
        };
        post({url:"/api/patrolresult/getlist",data:data},(res)=>{
            console.log(res);
        })
    };
    //通过
    patrolAdopt =()=>{
        post({url:"/api/patrolresult/patrolconfirm",data:{code:"5"}},(res)=>{
           if(this.state.stateType!=="0"){
                this.setState({
                    stateType:1
                })
           }
        })
    };
    //不通过
    noPatrolAdopt =()=>{
        post({url:"/api/patrolresult/patrolconfirm",data:{code:"5"}},(res)=>{
            if(this.state.stateType!=="1"){
                this.setState({
                    stateType:0
                })
            }
        })
    };
    componentDidMount() {
        this.patrolList();
        this.handlePatrol();
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
            key: 'serial',
            render: (text, record,index) => (index+1)
        }, {
            title: '巡更图',
            dataIndex: 'patrolMap',
            key: 'patrolMap',
            render: text => <span>{text}</span>,
        }, {
            title: '巡更人',
            dataIndex: 'patrolPerson',
            key: 'patrolPerson',
            render: text => <span>{text}</span>,
        },{
            title: '日期',
            dataIndex: 'patrolDate',
            key: 'patrolDate',
            render: text => <span>{text}</span>,
        },{
            title: '班次',
            dataIndex: 'Shifts',
            key: 'Shifts',
            render: text => <span>{text}</span>,
        },{
            title: '处理',
            dataIndex: 'Handle',
            key: 'Handle',
            render: text => <span>{text}</span>,
        },{
            title: '操作',
            dataIndex: 'code',
            key: 'code',
            render:()=>{
                return(
                    <div>
                        <a type="primary">通过</a>
                        <a type="primary">不通过</a>
                    </div>
                )
            }
        }];
        return(       
            <div className="PatrolRecord">
                <LocaleProvider locale={zh_CN}>
                    <Row style={{marginTop:"50px"}}>
                        <Form onSubmit={this.handlePatrolSelect}>
                            <Col xl={6} xxl={4} lg={9}>
                                <Form.Item
                                    {...formItemLayout}
                                    label="日期："
                                >
                                    {getFieldDecorator('range-picker1')(
                                        <DatePicker
                                            showTime={{format:"HH"}}
                                            format="YYYY-MM-DD HH:00:00"
                                            placeholder="开始时间"
                                            setFieldsValue={this.state.bdate}
                                            onChange={this.onChange1}
                                            disabledDate={this.disabledStartDate}
                                            onOpenChange={this.handleStartOpenChange}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xl={6} xxl={4} lg={6}>
                                <Form.Item>
                                    {getFieldDecorator('range-picker2')(
                                        <DatePicker
                                            showTime={{format:"HH"}}
                                            format="YYYY-MM-DD HH:00:00"
                                            placeholder="结束时间"
                                            setFieldsValue={this.state.edate}
                                            onChange={this.onChange2}
                                            disabledDate={this.disabledEndDate}
                                            onOpenChange={this.handleEndOpenChange}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xl={5} xxl={4} lg={6}>
                                <Form.Item
                                    {...formItemLayout}
                                    label="设备"
                                >
                                    {getFieldDecorator('residence',{
                                        initialValue:""
                                    } )(
                                        <Select style={{ width: 120 }} onChange={this.patrolChange}>
                                            <Option value="" >所有</Option>
                                            {
                                                this.state.equipment.map((v,i)=>(
                                                    <Option value={v.code} key={i}>{v.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xl={2} xxl={4} lg={3}>
                                <Button type="primary" htmlType="submit">查询</Button>
                            </Col>
                        </Form>
                    </Row>
                </LocaleProvider>
                <Row>
                    <Col spma={24} onClick={this.patrol}>
                        <Table dataSource={this.state.dataSource} columns={columns} />
                    </Col>
                    <Modal
                        width={700}
                        title="巡更详情"
                        visible={this.state.patrolImg}
                        onOk={this.patrolOk}
                        onCancel={this.patrolCancel}
                        okText="确认"
                        cancelText="取消"
                        footer={null}
                    >
                        <Row style={{margin:"10px 0px"}}>
                            <Col span={2}>张三</Col>
                            <Col span={5}>2017-12-12 12:22:09</Col>
                            <Col span={3}>测试一</Col>
                            <Col span={6} offset={4}>早班12:00-14:00</Col>
                        </Row>
                        <Row>
                            <Col span={24}><img src="http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg" alt="nodata" width="100%"/></Col>
                        </Row>
                        <Row style={{margin:"10px 0px"}}>
                            <Col span={24}>处理结果:<span>{this.state.stateType===0?"不通过":"通过"}</span></Col>
                        </Row>
                        <Row>
                            <Col span={12} offset={9}><Button type="primary" onClick={this.patrolAdopt}>通过</Button><Button type="primary" onClick={this.noPatrolAdopt}>不通过</Button></Col>
                        </Row>
                    </Modal>
                </Row>
            </div>
        )
    }
}
export default PatrolRecord=Form.create()(PatrolRecord);
