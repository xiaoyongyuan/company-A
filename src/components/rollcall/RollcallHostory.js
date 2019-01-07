import React, { Component} from 'react';
import {Row, Col, Button, DatePicker, LocaleProvider, Timeline , Form,} from "antd";
import {post} from "../../axios/tools";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import '../../style/sjg/home.css';
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const data=[
    {
        "companycode":1000003,
        "dayly":"2019-01-05",
        "info":[
            {
                "companycode":1000003,
                "rollcalldate":"2019-01-05 16:31:00",
                "taskid":5,
                "totalcount":2,
                "unhandle":0,
                "normal":1,
                "alarm":[
                    {
                        "code":89,
                        "rpic":'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
                        "rfinal":2,
                        "cid":1000007,
                     },
                     {
                        "code":90,
                        "rpic":'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
                        "rfinal":1,
                        "cid":1000007,
                    }
                ]
            },
            {
                "companycode":1000003,
                "rollcalldate":"2019-01-06 12:31:00",
                "taskid":5,
                "totalcount":2,
                "unhandle":0,
                "normal":1,
                "alarm":[
                    {
                        "code":89,
                        "rpic":'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
                        "rfinal":2,
                        "cid":1000007,
                     },
                     {
                        "code":90,
                        "rpic":'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
                        "rfinal":1,
                        "cid":1000007,
                    }
                ]
            },
        ]
    }, {
        "companycode":1000003,
        "dayly":"2019-01-06",
        "info":[
            {
                "companycode":1000003,
                "rollcalldate":"2019-01-06 16:31:00",
                "taskid":5,
                "totalcount":2,
                "unhandle":0,
                "normal":1,
                "alarm":[
                    {
                        "code":89,
                        "rpic":'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
                        "rfinal":2,
                        "cid":1000007,
                     },
                     {
                        "code":90,
                        "rpic":'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
                        "rfinal":1,
                        "cid":1000007,
                    }
                ]
            },
            {
                "companycode":1000003,
                "rollcalldate":"2019-01-06 12:31:00",
                "taskid":5,
                "totalcount":2,
                "unhandle":0,
                "normal":1,
                "alarm":[
                    {
                        "code":89,
                        "rpic":'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
                        "rfinal":2,
                        "cid":1000007,
                     },
                     {
                        "code":90,
                        "rpic":'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
                        "rfinal":1,
                        "cid":1000007,
                    }
                ]
            },
        ]
    }
]



class RollcallHostory extends React.Component{
	constructor(props){
        super(props);
        this.state={
            bdate:'',//检索的开始时间
            edate:'',//检索的结束时间
        }
    }
    
   //开始时间
   onChange1 =(dateString1)=> {
        this.onChangeDate('startValue',dateString1);
        this.setState({
            bdate:dateString1
        },()=>{
            console.log('startValue', this.state.bdate.format('YYYY-MM-DD'));
        })
        
    };
    //结束时间
    onChange2 =(dateString2)=> {
        this.onChangeDate("endValue",dateString2);
        this.setState({
            edate:dateString2
        },()=>{
            console.log('endValue',this.state.edate.format('YYYY-MM-DD'));
        })
       
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

    handleSubmit =()=>{
            const data={
                bdate:this.state.bdate?this.state.bdate.format('YYYY-MM-DD'):'',
                edate:this.state.edate?this.state.edate.format('YYYY-MM-DD'):'',
            }
            post({url:'/api/rollcalldetail/getlist_info_dayly',data:data},(res)=>{
                if(res.success){
                    console.log('******************', res.data);
                        this.setState({
                        })
                }
            })
    };
    componentDidMount() {
        console.log(data,"data");
        var str=data[0].info[0].alarm
        console.log(str ,"alarm________________________");
        post({url:'/api/rollcalldetail/getlist_info_dayly'},(res)=>{
            if(res.success){
                console.log('******************', res);
                
                    this.setState({
                        list: res.data
                        // policeList:res.data,
                        // type:1,
                        // totalcount:res.totalcount
                    })
                
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(       
            <div className="RollcallHostory">
                <LocaleProvider locale={zh_CN}>
                    <Row style={{marginTop:"50px"}}>
                        <Form onSubmit={this.handleSubmit}>
                            <Col xl={7} xxl={5} lg={9}>
                                <Form.Item
                                    {...formItemLayout}
                                    label="日期"
                                >
                                {getFieldDecorator('range-picker1')(
                                    <DatePicker
                                        format="YYYY-MM-DD"
                                        placeholder="开始时间"
                                        setFieldsValue={this.state.bdate}
                                        onChange={this.onChange1}
                                        disabledDate={this.disabledStartDate}
                                        onOpenChange={this.handleStartOpenChange}
                                    />
                                )}
                            </Form.Item>
                            </Col>
                            <Col xl={4} xxl={3} lg={6}>
                                <Form.Item>
                                    {getFieldDecorator('range-picker2')(
                                        <DatePicker
                                            format="YYYY-MM-DD"
                                            placeholder="结束时间"
                                            setFieldsValue={this.state.edate}
                                            onChange={this.onChange2}
                                            disabledDate={this.disabledEndDate}
                                            onOpenChange={this.handleEndOpenChange}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                          
                            <Col xl={3} xxl={2} lg={3}>
                                <Button type="primary" htmlType="submit">查询</Button>
                            </Col>
                          
                        </Form>
                    </Row>
                </LocaleProvider>

                <div className="timeline_ml">
              
                {/* <Timeline>
                        {
                            data.map((item,j)=>{
                                return (
                                    <Timeline.Item key={j}>
                                        <p> {this.state.list[j].dayly}</p>
                                        
                                            data[j].info.map((in,i)=>{
                                                <div>
                                                    <div className="times"> 第{i}次</div>
                                                        <div className="line_detail"> {this.state.list[j].info[i].rollcalldate}.substring(11, 19) 自动点名，共点名 {this.state.list[j].info[i].taskid}个对象，{this.state.list[j].info[i].alarm}个报警，{this.state.list[j].info[i].normal}个正常，
                                                        <a href="#" className="underline">查看详情</a>
                                                    </div>
                                                </div>
                                            })
                                    </Timeline.Item>
                                )
                            })
                        } 

                </Timeline> */}
                 <Timeline>
                        {
                            data.map((item,j)=>{
                                return (
                                    <Timeline.Item key={j}>
                                        <p> {item.dayly}</p>
                                         { 
                                             item.info.map((el,i)=>{
                                                return (
                                                    <div key={i}>
                                                        <div className="times"> 第{i+1}次</div>
                                                            <div className="line_detail">
                                                                <div>
                                                                {el.rollcalldate.slice(11,20)}自动点名，
                                                                    共点名 {el.taskid}个对象，
                                                                    {el.alarm.length}个报警，
                                                                    {el.normal}个正常， 
                                                                    <a href={"#/app/?id="+i.code} className="underline">查看详情</a>
                                                                </div>
                                                                {
                                                                el.alarm.map((num,n)=>{
                                                                     return (
                                                                            <div key={n} className="alarm_img" style={num.rpic?{display:'block'}:{display:'none'}} >
                                                                                <img src={num.rpic} alt="alarm_img" width="100%" />
                                                                            </div> 
                                                                            )
                                                                    })
                                                                }
                                                            </div>
                                                    </div>
                                                   )
                                            })
                                            }
                                    </Timeline.Item>

                             
                                )
                            })
                        } 

                </Timeline>
                </div>
            </div>
        )
    }
}

export default RollcallHostory= Form.create()(RollcallHostory);;