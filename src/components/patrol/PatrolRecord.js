import React from 'react';
import {Row, Col, Button, DatePicker, LocaleProvider, Table, Form, Select,Modal,message} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import {post} from "../../axios/tools";
import "../../style/ztt/css/patrolRecord.css";
import PatrolRecordModel from "./PatrolRecordModel";
import moment from "moment";
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
class PatrolRecord extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],//巡更记录列表
            patrolImg:false,
            equipment:[],//设备
            page:1, //当前页
        }
    }
    componentDidMount() {
        this.patrolList();
        this.handlePatrol();
    }
    //日期
    onChangeDate = (dates, dateStrings)=> {
        this.setState({
            bdate:moment(dateStrings[0]).format("YYYY-MM-DD HH:mm:ss"),
            edate:moment(dateStrings[1]).format("YYYY-MM-DD HH:mm:ss")
        });
        console.log(moment(dateStrings[0]).format("YYYY-MM-DD HH:mm:ss"));
        console.log(moment(dateStrings[1]).format("YYYY-MM-DD HH:mm:ss"));
    };
    patrolStatus =(item)=>{
        this.setState({
            patrolImg:true,
            patrolImgStatus:item,
        });
    };
    //model close
    patrolCancel =()=>{
        this.setState({
            patrolImg:false
        });
        this.patrolList();
    };
    //select设备
    patrolChange =(value)=>{
        this.setState({
            cid:value
        });
    };
    //通过 不通过
    patrolAdopt = (item,type,index)=>{
        post({url:"/api/patrolresult/patrolconfirm",data:{code:item,phandle:type}},(res)=>{
            let lists=this.state.dataSource;
            lists[index].phandle=res.data[0].phandle;
            this.setState({
                dataSource:lists
            });
        });
    };

    //巡更列表信息
    patrolList =()=>{
        const params={
            pagesize:10,
            ifhandle:1,
            pageindex:this.state.page,
            bdate:this.state.bdate,
            edate:this.state.edate,
            cid:this.state.cid

        }
        post({url:"/api/patrolresult/getlist",data:params},(res)=>{
            if(res.success){
                this.setState({
                    dataSource:res.data,
                    total:res.totalcount,
                })
            }
        });
    };
    //设备
    handlePatrol =()=>{
        post({url:"/api/camera/getlist"},(res)=>{
           if(res.success){
               this.setState({
                   equipment:res.data
               })
           }
        })
    };
    //查询
    handlePatrolSelect =()=>{
        this.setState({
            bdate:this.state.bdate,
            edate:this.state.edate,
            cid:this.state.cid,
            page:1,
        },()=>{
            this.patrolList()
        })
    };
    changePage=(page,pageSize)=>{ //分页  页码改变的回调，参数是改变后的页码及每页条数
        this.setState({
            page: page,
        },()=>{
            this.patrolList()
        })

    }
    
    render(){
        const { getFieldDecorator } = this.props.form;
        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text,record,index) => (index+1)
        }, {
            title: '巡更图',
            dataIndex: 'ppic',
            key: 'ppic',
            render: (text,record) => {
                return(
                    <div><img src={text} alt="" width="100px" height="50px"  onClick={()=>this.patrolStatus(record.code)}/></div>
                )
            },
        }, {
            title: '巡更人',
            dataIndex: 'handlename',
            key: 'handlename',
        },{
            title: '日期',
            dataIndex: 'ptime',
            key: 'ptime',
        },{
            title: '班次',
            dataIndex: 'pteam',
            key: 'pteam',
            render:(text,record)=>{
                return(
                        text+'('+record.pbdate+':00:00 —— '+record.pedate+':00:00 ) '
                )
            }
        },{
            title: '处理',
            dataIndex: 'phandle',
            key: 'phandle',
            render: text => <span>{text==1?"通过":"不通过"}</span>,
        },{
            title: '操作',
            dataIndex: 'code',
            key: 'code',
            render:(text,record,index)=>{
                return(
                    <div>
                        <Button className="operationBtn" onClick={()=>this.patrolAdopt(record.code,1,index)}>通过</Button>
                        <Button type="danger" className="nopass" onClick={()=>this.patrolAdopt(record.code,2,index)}>不通过</Button>
                    </div>
                )
            }
        }];
        return(       
            <div className="PatrolRecord">
                    <Row style={{marginTop:"50px"}}>
                        <Form layout="inline" onSubmit={this.handlePatrolSelect} className="rangeForm">
                            <LocaleProvider locale={zh_CN}>
                                <Form.Item
                                label="日期"
                            >
                                {getFieldDecorator('range-picker1')(
                                    <RangePicker
                                        ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
                                        format="YYYY/MM/DD HH:mm:ss"
                                        showTime
                                        placeholder={['开始时间', '结束时间']}
                                        onChange={this.onChangeDate}
                                    />
                                )}
                            </Form.Item>
                            </LocaleProvider>
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

                <Row style={{marginTop:"40px"}}>
                    <Col spma={24}>
                        <Table dataSource={this.state.dataSource} columns={columns} 
                        pagination={{defaultPageSize:10,current:this.state.page, total:this.state.total,onChange:this.changePage}}
                        />
                    </Col>
                    <Modal
                        width={700}
                        title="巡更记录详情"
                        visible={this.state.patrolImg}
                        onOk={this.patrolOk}
                        onCancel={this.patrolCancel}
                        footer={null}
                    >
                        <PatrolRecordModel visible={this.state.patrolImg}  code={this.state.patrolImgStatus} />
                    </Modal>
                </Row>
            </div>
        )
    }
}
export default PatrolRecord=Form.create()(PatrolRecord);
