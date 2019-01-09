import React, { Component} from 'react';
import {Row, Col, Button, DatePicker, LocaleProvider, Timeline , Form,Modal } from "antd";
import {post} from "../../axios/tools";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import '../../style/sjg/home.css';
import RollcallHostoryModel from "./RollcallHostoryModel";

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
let dataitem={
    "companycode":1000003,
    "dayly":"1111111111111111",
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
       
    ]
}
let list=[
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
                        "code":91,
                        "rpic":'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229094947.jpg',
                        "rfinal":2,
                        "cid":1000007,
                     },
                     {
                        "code":92,
                        "rpic":'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229094947.jpg',
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
                        "code":93,
                        "rpic":'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
                        "rfinal":2,
                        "cid":1000007,
                     },
                     {
                        "code":94,
                        "rpic":'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
                        "rfinal":1,
                        "cid":1000007,
                    }
                ]
            },
            
        ]
    }
    , {
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
                        "code":93,
                        "rpic":'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
                        "rfinal":2,
                        "cid":1000007,
                     },
                     {
                        "code":94,
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
            rollCallType:false,
            list:[],
            dataitem:{},
        }
    }
       
    componentDidMount() {
        post({url:'/api/rollcalldetail/getlist_info_dayly'},(res)=>{
            if(res.success){
                // console.log('******************', res);
                    this.setState({
                        list:list
                    })
            }
        })
         var _this=this;
        //  var x=0;
        document.getElementById("scorll").onscroll=function() {
            // console.log(`滚动了${x += 1}次`);
            var scrollHeight = document.getElementById("scorll").scrollHeight;//div里内容的高度
            var scrollTop = document.getElementById("scorll").scrollTop;//0-18
            var clientHeight = document.getElementById("scorll").clientHeight;//div内里框框的高度
            var scrollbottom=scrollHeight-clientHeight;
            var scrollTopP=parseInt(scrollTop);
            _this.setState({
                scrollbottom:scrollbottom,
                scrollTop:scrollTop
               })
            if(scrollbottom-scrollTopP<=1){//滚动到底部了
               _this.setState({
                scrollbottom:scrollbottom,
                scrollTop:scrollTop
               })
                const da={
                  page:1
                }
                post({url:'/api/rollcalldetail/getlist_info_dayly',data:da},(res)=>{
                    console.log(res);
                    if(res.success){
                        const list=_this.state.list;
                        list.push(dataitem);
                        _this.setState({
                             list: list
                               } )
                    }
                })
            }
        };
    }     
    backtop=()=>{ //返回顶部
        document.getElementById("scorll").scrollTop = 0; 
    };

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
    //model open
    handlerollCallType =(index)=>{
        console.log(index,"3333");
        this.setState({
            rollCallType:true,
            code:index
        })
    };
    //model close
    handlerollClose =()=>{
        this.setState({
            rollCallType:false
        })
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        return(       
            <div className="RollcallHostory scrollable-container" id="scorll" >   
              <Button type="primary" className="backtop" onClick={this.backtop} style={this.state.scrollTop>20?{display:'block'}:{display:'none'}}>返回顶部</Button>
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
            
                 <Timeline>
                        {
                            this.state.list.map((item,j)=>{
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
                                                                    <a href={"#/app/rollcall/rollcallrecord?companycode="+i.companycode} className="underline">查看详情</a>
                                                                </div>
                                                                {
                                                                el.alarm.map((num,n)=>{
                                                                     return (
                                                                            <div key={n} className="alarm_img" style={num.rpic?{display:'inlin-block'}:{display:'none'}} >
                                                                                <img src={num.rpic} alt="alarm_img" width="100%" onClick={()=>this.handlerollCallType(n)} />
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

                 <Modal
                    width={700}
                    title="点名记录详情"
                    visible={this.state.rollCallType}
                    onCancel={this.handlerollClose}
                    footer={null}
                 >
                    <RollcallHostoryModel code={this.state.code} />
                 </Modal>
            </div>
        )
    }
}

export default RollcallHostory= Form.create()(RollcallHostory);;
