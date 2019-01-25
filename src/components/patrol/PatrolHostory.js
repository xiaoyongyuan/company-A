import React, { Component} from 'react';
import {Row, Col, Button, DatePicker, LocaleProvider, Timeline , Form,Spin,message,Modal, Icon} from "antd";
import {post} from "../../axios/tools";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import '../../style/sjg/home.css';
import nopic from "../../style/imgs/nopic.png";
import nodata from "../../style/imgs/nodata.png";
import PatrolRecordModel from "./PatrolRecordModel";
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span:5},
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
            pbdate:'',//检索的开始时间
            pedate:'',//检索的结束时间
            list:[],
            loading:true,
            page:1, //当前页数
            pageSize:20, //每页显示数量
            isrequest:true,
            loadtip:"加载中..."//下拉刷新时的提示文字
            //status  //0执行中//1已完成//2未完成
        }
    }
    componentDidMount() {
        post({url:'/api/patrolresult/getlist_team'},(res)=>{
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
        let pag=1;
        document.getElementById("scorll").onscroll=function() {
            var scrollHeight = document.getElementById("scorll").scrollHeight;//div里内容的高度
            var scrollTop = document.getElementById("scorll").scrollTop;
            var clientHeight = document.getElementById("scorll").clientHeight;//div内里框框的高度
            var scrollbottom=scrollHeight-clientHeight;
            var scrollTopP=Math.floor(scrollTop);
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
                post({url:'/api/patrolresult/getlist_team',data:{pageindex:_this.state.page}},(res)=>{
                    // console.log(res,"res"); 
                    if(res.data.length>0){
                        const list=_this.state.list;
                        const alist = list.concat(res.data);
                        _this.setState({
                             list: alist,
                             loading: false,
                        } )
                    }else{
                        if(res.data.length===0){
                            message.success('没有更多了');
                            _this.setState({
                                isrequest: false,
                                loadtip:' ',
                                } )
                            //return "RollcallHostory .timeline_ml .anticon svg";
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
            pbdate:dateString1
        })
    };
    //结束时间
    onChange2 =(dateString2)=> {
        this.onChangeDate("endValue",dateString2);
        this.setState({
            pedate:dateString2
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
    //model close
    handlerollClose =()=>{
        this.setState({
            rollCallType:false
        });
    };
    handleSubmit =()=>{
            const data={
                startdate :this.state.pbdate?this.state.pbdate.format('YYYY-MM-DD'):'',
                enddate :this.state.pedate?this.state.pedate.format('YYYY-MM-DD'):'',
            }
            post({url:'/api/patrolresult/getlist_team',data:data},(res)=>{
                if(res.success){
                        this.setState({
                            isrequest: true,
                            list:res.data,
                            type:true,
                        })
                }else{
                    this.setState({
                        type:false,
                    })
                }
            })
    };
    handlerollCallType =(index)=>{
        this.setState({
            rollCallType:true,
            code:index
        })
    };
    statepatarol =(e,item)=>{
       if(e===0){
            return(
                "patrolnone"
            )
       }else if(e===1){
            return(
                "patrolblock"
            )
       }else{
        return(
            "patrolblock"
        )
       }
    };
    colorline=(e)=>{
        if(e===0){
             return(
                 "#FFC125"
             )
        }else if(e===1){
             return(
                 "green"
             )
        }else{
         return(
             "red"
         )
        }
     };
    render(){
        const { getFieldDecorator } = this.props.form;
        return(       
            <div className="PatrolHostory scrollable-container" id="scorll" >  
              <Button onClick={this.backtop} className="backtop butBg" style={this.state.scrollTop>20?{display:'block'}:{display:'none'}}>返回顶部</Button>
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
                                        setFieldsValue={this.state.pbdate}
                                        onChange={this.onChange1}
                                        disabledDate={this.disabledStartDate}
                                        onOpenChange={this.handleStartOpenChange}
                                    />
                                )}
                            </Form.Item>
                            </Col>
                            <Col xl={4} xxl={3} lg={4}>
                                <Form.Item>
                                    {getFieldDecorator('range-picker2')(
                                        <DatePicker
                                            format="YYYY-MM-DD"
                                            placeholder="开始日期"
                                            setFieldsValue={this.state.pbdate}
                                            onChange={this.onChange1}
                                            disabledDate={this.disabledStartDate}
                                            onOpenChange={this.handleStartOpenChange}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xl={1} xxl={1} lg={1} className="msch">
                                <Button className="butBg" htmlType="submit">查询</Button>
                            </Col>
                        </Form>
                    </Row>
                </LocaleProvider>
                <div style={{marginTop:"70px",display:this.state.type?" none":"block"}}>
                    <div style={{width:"100%",textAlign:"center"}}><div className="backImg"><img src={nodata} alt="" /></div></div>
                </div>
                <Spin spinning={this.state.loading} className="spin" size="large"tip="Loading..." />
                <div className="timeline_ml" style={{display:this.state.type?"block":"none"}}>
                 <Timeline pending={this.state.loadtip}>
                    {
                        this.state.list.length?this.state.list.map((item,j)=>{
                            return (
                                <div key={j}>    
                                <Timeline.Item color={this.colorline(item.status)} >
                                    <div>
                                    <div className="inlineb"> {item.pdate} </div> 
                                    <div className="timess"> {item.pteam}({item.pbdate}:00 —— {item.pedate}:00)</div>
                                    <span className="xun_detail">
                                        {item.totalcount===0? <span></span>: <span>该班次有 {item.totalcount}个巡更点</span>}  {item.status===0? <span>,</span>:','}
                                        <span style={{padding:"0 0 0 8px"}}>  
                                            {item.status===1?<span>
                                               {item.handle_true===0? <span></span>: <span>{item.handle_true}个巡更正常 ,</span>}
                                               {item.handle_false===0? <span></span>: <span>{item.handle_false}个巡更异常 ,</span>}
                                                {/* <a href={'#/app/patrol/patrolrecord?patrolid='+item.patrolid+"&pdate="+item.pdate } className="underline"> 查看详情</a> */}
                                                </span>: "" 
                                            }
                                            {item.status===2?<span>
                                                {item.unhandle===0? <span></span>: <span>{item.unhandle}个未巡更,</span>}
                                                {item.handle_true===0? <span></span>: <span>{item.handle_true}个巡更正常，</span>}
                                                {item.handle_false===0? <span></span>: <span>{item.handle_false}个巡更异常，</span>}
                                                {/* <a href={'#/app/patrol/patrolrecord?patrolid='+item.patrolid+"&pdate="+item.pdate }className="underline"> 查看详情</a> */}
                                                </span>: ""
                                           }
                                        </span>
                                    </span>
                                    {item.status===0? <span style={{padding:"0 0 0 14px",color:"#FFC125"}}>执行中...</span>:''}
                                    {item.status===1? <span style={{padding:"0 0 0 14px",color:"green"}}>已完成</span>:''}
                                    {item.status===2? <span style={{padding:"0 0 0 14px",color:"red"}}>未完成</span>:''}
                                    </div>
                                    {item.info.map((num,n)=>{
                                        return (
                                            <div key={n} className="alarm_img">
                                                <img src={num.ppic?num.ppic:nopic} alt="alarm_img" width="100%"style={{marginBottom:'30px'}} onClick={()=>this.handlerollCallType(num.code)} />
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
                        title="巡更记录详情"
                        visible={this.state.rollCallType}
                        onCancel={this.handlerollClose}
                        footer={null}
                  >
                    <PatrolRecordModel visible={this.state.rollCallType} code={this.state.code} />
                 </Modal>
            </div>
        )
    }
}

export default RollcallHostory= Form.create()(RollcallHostory);;
