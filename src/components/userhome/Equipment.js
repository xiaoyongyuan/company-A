import React from 'react';
import { Card ,Row, Col, Icon,Spin  } from 'antd';
import '../../style/sjg/home.css';
import {post} from "../../axios/tools";
import nopic from "../../style/imgs/nopic.png";
import zonglan from "../../style/ztt/img/fwnleiruwang.png";
class Equipment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            camera:[],
            loading:true
        };
      }
    componentDidMount() {        
        post({url:'/api/company/getone'},(res)=>{ //获取团队列表
            if(res.success){
                this.setState({
                    data:res.data, //用户信息
                    res:res, //用户信息
                    camera:res.camera, //摄像头信息
                    loading:false
                },()=>{
                    
                }); 
            }   
        })
        
    }
 
    statework=(i)=>{ //布防转换     
        if(this.state.camera[i].work===2){
            return (<span><Icon type="clock-circle" style={{color:'#5dcb9a'}} /> 布防中</span>)
        }else if(this.state.camera[i].work===1){
            return (<span><Icon type="clock-circle" style={{color:'#666'}} /> 不在布防中</span>)
        }else{
            return (<span><Icon type="clock-circle" style={{color:'#666'}} /> 未设置</span>)          
        }
    }
    field=(i)=>{ //布防区域的个数 
        var jsonData;
        if(this.state.camera[i].field ===""){
             jsonData=0;
        }else{
             jsonData= JSON.parse(this.state.camera[i].field)
        }    
        var count = 0;
        for(var j in jsonData){
            count++;
        }
        return count;
    }
    isonline=(i)=>{ //是否在线
        if(this.state.camera[i]&&this.state.camera[i].heart.time){
            let time= this.state.camera[i].heart.time.toString();// 取到时间
            let yijingtime=new Date(time); //取到时间转换
            let timq=yijingtime.getTime(yijingtime) // 取到时间戳
            let myDate=new Date();// 当前时间
            let timc=myDate.getTime(myDate) // 当前时间戳
            if(timc-timq>60000){
                return(<div className='onLine offLineBack'>离线</div>)
            }else{
                return(<div className='onLine onLineBack'>在线</div>)
            }
        }else{
           return(<div className='onLine onLineBack'>在线</div>) 
        }
            
   }
    isonlinebg=(i)=>{ //是否在线背景色  
        if(this.state.camera[i].heart.time){
            var time= this.state.camera[i].heart.time.toString();// 取到时间
        }
        let yijingtime=new Date(time); //取到时间转换
        let timq=yijingtime.getTime(yijingtime) // 取到时间戳
        let myDate=new Date();// 当前时间
        let timc=myDate.getTime(myDate) // 当前时间戳
        if(timc-timq>60000){
            return "onLine offLineBack";
        }else{
            return "onLine onLineBack";
        }          
    }
    render(){

        return(
            <Spin size="large" tip="Loading......" spinning={this.state.loading} className={this.props.type!==1?"equipment":""}>
                <div className="Equipment">
                    <Row className="paddRow" gutter={32}>
                            {
                            this.state.camera.map((el,i)=>{
                                return(
                                    <Col key={i} xxl={{ span: 4}} lg={{ span: 6}} md={{span:6}} sm={{span:6}} xs={{span:6}} className="cardPdd">
                                    <Card
                                        cover={<a href={"#/app/userhome/Alarmlist?id="+el.code+"&type=0"}><img alt="example" src={this.state.camera[i].picpath?this.state.camera[i].picpath:nopic} width="100%" /></a>}
                                        actions={
                                            this.state.utype==='1'
                                            ?[
                                            <div className="actionsBbottom">
                                                 <p>{this.field(i)}条
                                                 </p>
                                                 <p>布防区域 </p>
                                            </div>,
                                            <div className="actionsBbottom colCen">
                                                    {this.statework(i)}
                                            </div>,
                                             <div className="colCen actionsBbottom ">
                                                 <Icon type="setting" /> 设定
                                             </div>
                                        ]
                                        :[
                                            <a href={"#/app/companyhome/setarea?id="+el.code} className="actionsBbottom">
                                                 <p> {this.field(i)}条
                                                 </p>
                                                 <p>布防区域 </p>
                                            </a>,
                                            <a href={"#/app/companyhome/settime?id="+el.code} className="actionsBbottom colCen">
                                                    {this.statework(i)}
                                            </a>,
                                             <a href={"#/app/userhome/Userdeveice?id="+el.code} className="colCen actionsBbottom ">
                                                 <Icon type="setting" /> 设定
                                             </a>
                                        ]}
                                    >
                                        <Row className="paddRow">
                                            <Col xxl={{ span:9}} lg={{span:9}} >
                                                   {this.isonline(i)}
                                            </Col>
                                            <Col xxl={{span: 10}} lg={{ span: 12}} className="titcon">
                                               <p>{el.name}</p>
                                               <p>{el.eid}</p>
                                            </Col>
                                        </Row>
                                        <div className="bell">
                                        <a href={"#/app/userhome/Alarmlist?id="+el.code+"&type=0"} style={{color:'#f00'}}>
                                            <Icon type="bell" /> <span>{this.state.camera[i].alarm}</span>
                                        </a>
                                        </div>
                                    </Card>
                                </Col>
                                )
                            })
                           }
                        </Row>
                </div>
            </Spin>
        )
    }
}
export default Equipment
