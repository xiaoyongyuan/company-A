import React, { Component} from 'react';
import {Row, Col, Button, DatePicker, LocaleProvider, Timeline , Form,Modal,Spin,message} from "antd";
import {post} from "../../axios/tools";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import '../../style/sjg/home.css';
import RollcallRecordModel from "./RollcallRecordModel";

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
class RollcallHostory extends React.Component{
	constructor(props){
        super(props);
        this.state={
            bdate:'',//检索的开始时间
            edate:'',//检索的结束时间
            rollCallType:false,
            list:[],
            dataitem:{},
            loading:false,
            page:1, //当前页数
            pageSize:20, //每页显示数量
            isrequest:true,
        }
    }
       
    componentDidMount() {
        post({url:'/api/rollcalldetail/getlist_info_dayly'},(res)=>{
            if(res.success){
                 console.log('******************', res);
                
                    this.setState({
                          list:res.data
                        //   list:list
                    })
            }
        })
         var _this=this;
        //  var x=0;
        let pag=1;
        document.getElementById("scorll").onscroll=function() {
            // console.log(`滚动了${x += 1}次`);
            var scrollHeight = document.getElementById("scorll").scrollHeight;//div里内容的高度
            var scrollTop = document.getElementById("scorll").scrollTop;//0-18
            var clientHeight = document.getElementById("scorll").clientHeight;//div内里框框的高度
            var scrollbottom=scrollHeight-clientHeight;
            var scrollTopP=Math.ceil(scrollTop);
            _this.setState({
                scrollbottom:scrollbottom,
                scrollTop:scrollTop
               })
              
            if(scrollbottom-scrollTopP===0){//滚动到底部了
                 pag++;
               _this.setState({
                scrollbottom:scrollbottom,
                scrollTop:scrollTop,
                page:pag
               })
               if(_this.state.isrequest){ 
                post({url:'/api/rollcalldetail/getlist_info_dayly',data:{pageindex:_this.state.page}},(res)=>{
                    console.log(res,"res");
                    console.log(res.data,"res.data");
                    if(res.data.length>0){
                       _this.setState({
                        loading: true,
                          } )
                        }else{
                            if(res.data.length===0){
                               message.success('没有更多了');
                            }
                            _this.setState({
                                isrequest: false,
                             } )
                        }
                    if(res.success){
                        if(res.data.length>0){
                            const list=_this.state.list;
                            const alist = list.concat(res.data);
                            _this.setState({
                                 list: alist,
                                 loading: false,
                            } )
                        }
                       
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
                            list:res.data
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
             <Spin spinning={this.state.loading} className="spin" size="large">
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
                                        placeholder="开始日期"
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

                <div className="timeline_ml">
            
                 <Timeline pending={true}>
                        {
                            this.state.list.map((item,j)=>{
                                return (
                                    <Timeline.Item key={j}>
                                        <p> {item.dayly} </p>
                                         { 
                                             item.info.map((el,i)=>{
                                                return (
                                                    <div key={i}>
                                                        <div className="times"> 第{i+1}次</div>
                                                            <div className="line_detail">
                                                                <div className="line_alerm">
                                                                   <div> {el.alarm.length>0?<div className="circle"><div></div></div>:<div className="circlegreen"><div></div></div>}</div>
                                                                        <div>
                                                                            {el.rollcalldate.slice(11,20)}自动点名，
                                                                            共点名 {el.taskid}个对象，
                                                                            {el.alarm.length}个报警，
                                                                            {el.normal}个正常， 
                                                                            <a href={"#/app/rollcall/rollcallrecord?taskid="+el.taskid+"&rollcalldate="+el.rollcalldate} className="underline">查看详情</a>
                                                                        </div>
                                                                </div>
                                                                {
                                                                el.alarm.map((num,n)=>{
                                                                     return (
                                                                            <div key={n} className="alarm_img" style={num.rpic?{display:'inlin-block'}:{display:'none'}} >
                                                                                <img src={num.rrpic} alt="alarm_img" width="100%" onClick={()=>this.handlerollCallType(n)} />
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
                    <RollcallRecordModel code={this.state.code} />
                 </Modal>
             </Spin>
            </div>
        )
    }
}

export default RollcallHostory= Form.create()(RollcallHostory);;
