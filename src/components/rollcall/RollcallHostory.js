import React, { Component} from 'react';
import {Row, Col, Button, DatePicker, LocaleProvider, Timeline , Form,Modal,Spin,message} from "antd";
import {post} from "../../axios/tools";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import '../../style/sjg/home.css';
import RollcallRecordModel from "./RollcallRecordModel";
import nopic from "../../style/imgs/nopic.png";
import nodata from "../../style/imgs/nodata.png";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
class RollcallHostory extends React.Component{
	constructor(props){
        super(props);
        this.state={
            bdate:'',//检索的开始时间
            edate:'',//检索的结束时间
            rollCallType:false,
            list:[],
            dataitem:{},
            loading:true,
            page:1, //当前页数
            pageSize:20, //每页显示数量
            isrequest:true,
            scrollTop:Number,
        }
    }
    componentDidMount() {
        post({url:'/api/rollcalldetail/getlist_info_dayly'},(res)=>{
            if(res.success){
                //  console.log('******************', res);
                    this.setState({
                          list:res.data,
                          loading: false,
                          type:true,
                    })
            }else{
                this.setState({
                    type:false,
              })
            }
        })
         var _this=this;
        //  var x=0;
        let pag=2;
        document.getElementById("scorll").onscroll=function() {
            // console.log(`滚动了${x += 1}次`);
            var scrollHeight = document.getElementById("scorll").scrollHeight;//div里内容的高度
            var scrollTop = document.getElementById("scorll").scrollTop;//0-18
            var clientHeight = document.getElementById("scorll").clientHeight;//div内里框框的高度
            var scrollbottom=scrollHeight-clientHeight;
            var scrollTopP=Math.floor(scrollTop);
            _this.setState({
                scrollbottom:scrollbottom,
                scrollTop:scrollTop
               },()=>{
                }
               )
            if(scrollbottom-scrollTopP===0){//滚动到底部了
               
               _this.setState({
                scrollbottom:scrollbottom,
                scrollTop:scrollTop,
                page:pag
               })
               if(_this.state.isrequest){ 
                post({url:'/api/rollcalldetail/getlist_info_dayly',data:{pageindex:_this.state.page}},(res)=>{
                    console.log(res,"res");
                   
                    if(res.data.length>0){
                        
                            pag++;
                            const list=_this.state.list;
                            const alist = list.concat(res.data);
                            _this.setState({
                                 list: alist,
                                 loading: false,
                            } )
                    }else{
                        if(res.data.length===0){
                            message.success('没有更多了');
                        }
                        _this.setState({
                            isrequest: false,
                            } )
                    }
                   
                })
             }
            
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
        })
    };
    //结束时间
    onChange2 =(dateString2)=> {
        this.onChangeDate("endValue",dateString2);
        this.setState({
            edate:dateString2
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
                daylybdate:this.state.bdate?this.state.bdate.format('YYYY-MM-DD'):'',
                daylyedate:this.state.edate?this.state.edate.format('YYYY-MM-DD'):'',
            }
            post({url:'/api/rollcalldetail/getlist_info_dayly',data:data},(res)=>{
                if(res.success){
                        this.setState({
                            isrequest: true,
                            list:res.data
                        },()=>{
                            console.log('******************',this.state.list.length);
                            
                        }
                        
                        )
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
             {/* <Spin spinning={this.state.loading} className="spin" size="large">  style={this.state.loading?{display:'block'}:{display:'none'}} */}
              <Button type="primary" className="backtop" onClick={this.backtop} style={this.state.scrollTop>20?{display:'block'}:{display:'none'}}>返回顶部</Button>
                <LocaleProvider locale={zh_CN}>
                    <Row className="sear_mtop Patrol_ml">
                        <Form onSubmit={this.handleSubmit}>
                            <Col xl={5} xxl={4} lg={6}>
                                <Form.Item
                                    {...formItemLayout}
                                    label="日期"
                                >
                                {getFieldDecorator('range-picker1')(
                                    <DatePicker
                                        format="YYYY-MM-DD"
                                        placeholder="开始日期"
                                        setFieldsValue={this.state.bdate}
                                        onChange={this.onChange1}
                                        disabledDate={this.disabledStartDate}
                                        onOpenChange={this.handleStartOpenChange}
                                    />
                                )}
                            </Form.Item>
                            </Col>
                            <Col xl={4} xxl={3} lg={7}>
                                <Form.Item>
                                    {getFieldDecorator('range-picker2')(
                                        <DatePicker
                                            format="YYYY-MM-DD"
                                            placeholder="结束日期"
                                            setFieldsValue={this.state.edate}
                                            onChange={this.onChange2}
                                            disabledDate={this.disabledEndDate}
                                            onOpenChange={this.handleEndOpenChange}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xl={3} xxl={2} lg={2} className="msch">
                                <Button type="primary" htmlType="submit">查询</Button>
                            </Col>
                        </Form>
                    </Row>
                </LocaleProvider>
                {/* <div>{this.state.list.length?<div></div>:<div className="textcenter">暂无数据</div>}</div> */}
                <Spin spinning={this.state.loading} size="large" className="spin" tip="Loading..." />
                <div className="timeline_ml">
               
                 <Timeline pending={true}>
                         
                        {
                            this.state.list.length?this.state.list.map((item,j)=>{
                                return (
                                    <div key={j}> 
                                    <div style={{marginTop:"70px",display:this.state.type===0?"block":"none"}}>
                                        <div style={{width:"100%",textAlign:"center"}}><div className="backImg"><img src={nodata} alt="" /></div></div>
                                    </div>
                                    <Timeline.Item>
                                        <p> {item.dayly} </p>
                                         { 
                                             item.info.map((el,i)=>{
                                                return (
                                                    <div key={i}>
                                                        {/* <div className="times"> 第{i+1}次</div> */}
                                                            <div className="line_detail">
                                                                <div className="line_alerm">
                                                                   <div> {el.alarm.length>0?<div className="circle"><div></div></div>:<div className="circlegreen"><div></div></div>}</div>
                                                                        <div className="m_l">
                                                                            {el.rollcalldate.slice(11,20)}
                                                                            {el.ifeveryday===0?"自动点名":"手动点名"}，
                                                                            共点名 {el.totalcount}个对象，
                                                                            {el.executing===0? <span></span>: <span> {el.executing} 正在点名，</span>}
                                                                            {el.alarm.length===0? <span></span>: <span> {el.alarm.length} 个报警，</span>}
                                                                            {el.normal===0? <span></span>: <span> {el.normal} 个正常，</span>}
                                                                            {el.fail===0? <span></span>: <span> {el.fail} 失败，</span>}
                                                                            <a href={"#/app/rollcall/rollcallrecord?taskid="+el.taskid+"&rollcalldate="+el.rollcalldate} className="underline">查看详情</a>
                                                                        </div>
                                                                </div>
                                                                {
                                                                el.alarm.map((num,n)=>{
                                                                     return (
                                                                                <div key={n} className="alarm_img" style={num.rpic?{display:'inlin-block'}:{display:'none'}} >
                                                                                    <img src={num.rrpic?num.rrpic:nopic} alt="alarm_img" width="100%" onClick={()=>this.handlerollCallType(num.code)} />
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
                                    </div>
                                )
                            }):<div className="textcenter">暂无数据</div>
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
                    <RollcallRecordModel code={this.state.code} visible={this.state.rollCallType} />
                 </Modal>
             {/* </Spin> */}
            </div>
        )
    }
}

export default RollcallHostory= Form.create()(RollcallHostory);;
