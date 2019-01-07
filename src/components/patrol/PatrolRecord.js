import React from 'react';
import {Row, Col, Button, DatePicker, LocaleProvider, Table, Form, Select,Modal} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import {post} from "../../axios/tools";
import "../../style/ztt/css/patrolRecord.css";
import PatrolRecordModel from "./PatrolRecordModel";
import moment from "moment";
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
var data=[
    {
        "code": "0",
        "cid": "1000001",
        "pdate": "2018-12-12 12:09:09",
        "ppic": "http://pic01.aokecloud.cn/alarm/1000004/pic/20190104//1000004_20190104172947.jpg",
        "patrolname": "李四",
        "cameraname": "早班",
        "phandle": "0"
    },
    {
        "code": "1",
        "cid": "1000001",
        "pdate": "2018-12-12 12:09:09",
        "ppic": "http://pic01.aokecloud.cn/alarm/1000011/pic/20181228//1000011_20181228154552.jpg",
        "patrolname": "张三",
        "cameraname": "中班",
        "phandle": "1"
    }
];
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
    //日期
    onChangeDate = (dates, dateStrings)=> {
        this.setState({
            bdate:dates[0].format('YYYY-MM-DD HH:00:00'),
            edate:dateStrings[1]
        });
        console.log( dates,dateStrings);
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    };
    patrolStatus =(item)=>{
       /* const data={
            patrolImgStatus:item,
            ifhandle:1,
            bdate:this.state.bdate?this.state.bdate.format('YYYY-MM-DD HH:00:00'):'',
            edate:this.state.edate?this.state.edate.format('YYYY-MM-DD HH:00:00'):'',
            cid:this.state.cid
        };*/
        this.setState({
            patrolImg:true,
            patrolImgStatus:item
        });
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
    //通过
    patrolAdopt = (item)=>{
        console.log(item);
        post({url:"/api/patrolresult/patrolconfirm",data:{code:"5"}},(res)=>{
            this.setState({
                item:1
            })
        });
    };
    //不通过
    nopatrolAdopt =(item)=>{
        console.log(item);
        post({url:"/api/patrolresult/patrolconfirm",data:{code:"5"}},(res)=>{
            this.setState({
                item:0
            })
        });
    };
    //巡更列表信息
    patrolList =()=>{
        post({url:"/api/patrolresult/getlist",data:{ifhandle:1}},(res)=>{
            if(res.success){
                this.setState({
                    //dataSource:res.data
                    dataSource:data
                })
            }
        });
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
            if (res.success){
                this.setState({
                    // dataSource:res.data
                    dataSource:data
                })
            }
            console.log(res);
        });
    };
    componentDidMount() {
        this.patrolList();
        this.handlePatrol();
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record,index) => (index+1)
        }, {
            title: '巡更图',
            dataIndex: 'ppic',
            key: 'ppic',
            render: (text,record,index) => {
                return(
                    <div><img src={text} alt="" width="100px" height="50px"  onClick={()=>this.patrolStatus(record.code)}/></div>
                )
            },
        }, {
            title: '巡更人',
            dataIndex: 'patrolname',
            key: 'patrolname',
            render: text => <span>{text}</span>,
        },{
            title: '日期',
            dataIndex: 'pdate',
            key: 'patrolDate',
            render: text => <span>{text}</span>,
        },{
            title: '班次',
            dataIndex: 'cameraname',
            key: 'Shifts',
            render: text => <span>{text}</span>,
        },{
            title: '处理',
            dataIndex: 'phandle',
            key: 'Handle',
            render: text => <span>{text==0?"通过":"不通过"}</span>,
        },{
            title: '操作',
            dataIndex: 'code',
            key: 'code',
            render:(text,record)=>{
                return(
                    <div>
                        <Button className="operationBtn" onClick={()=>this.patrolAdopt(record.phandle)}>通过</Button>
                        <Button type="danger" onClick={()=>this.nopatrolAdopt(record.phandle)}>不通过</Button>
                    </div>
                )
            }
        }];
        return(       
            <div className="PatrolRecord">
                <LocaleProvider locale={zh_CN}>
                    <Row style={{marginTop:"50px"}}>
                        <Form layout="inline" onSubmit={this.handlePatrolSelect}>
                            <Form.Item
                                label="日期"
                            >
                                {getFieldDecorator('range-picker1')(
                                    <RangePicker
                                        ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
                                        showTime
                                        format="YYYY/MM/DD HH:00:00"
                                        onChange={this.onChangeDate}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item
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
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    查询
                                </Button>
                            </Form.Item>
                        </Form>
                    </Row>
                </LocaleProvider>
                <Row style={{marginTop:"40px"}}>
                    <Col spma={24}>
                        <Table dataSource={this.state.dataSource} columns={columns} />
                    </Col>
                    <Modal
                        width={700}
                        title="巡更详情"
                        visible={this.state.patrolImg}
                        onOk={this.patrolOk}
                        onCancel={this.patrolCancel}
                        footer={null}
                    >
                        <PatrolRecordModel states={this.state.stateType} patrolImgStatus={this.state.patrolImgStatus}/>
                    </Modal>
                </Row>
            </div>
        )
    }
}
export default PatrolRecord=Form.create()(PatrolRecord);
