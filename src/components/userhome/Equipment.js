import React from 'react';
import { Card ,Row, Col, Icon, } from 'antd';
import '../../style/sjg/home.css';
import {post} from "../../axios/tools";
class Equipment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            camera:[],
        };
      }
    componentDidMount() {        
        post({url:'/api/company/getone'},(res)=>{ //获取团队列表
            if(res){
                this.setState({
                    data:res.data, //用户信息
                    res:res, //用户信息
                    camera:res.camera, //摄像头信息                  
                },()=>{
                    
                }); 
            }   
        })
        
    }
    statework=(i)=>{ //布防转换     
        if(this.state.camera[i].work===2){
           return "布防中"
        }else if(this.state.camera[i].work===1){
            return "不在布防中";
            
        }else{
            return "未设置"           
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
        let time= this.state.camera[i].heart.time.toString();// 取到时间
        let yijingtime=new Date(time); //取到时间转换
        let timq=yijingtime.getTime(yijingtime) // 取到时间戳
        let myDate=new Date();// 当前时间
        let timc=myDate.getTime(myDate) // 当前时间戳
        if(timc-timq>60000){
            return "离线";
        }else{
            return "在线";
        }          
    }
    isonlinebg=(i)=>{ //是否在线背景色  
        console.log(i,"aaaaaaaaaaaaaaaa");
        let time= this.state.camera[i].heart.time.toString();// 取到时间
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
            <div>
                <Row className="paddRow">  
                    {
                    this.state.camera.map((el,i)=>{
                        return(
                            <Col key="i" xxl={{ span: 5}} xs={{ span: 6}}className="cardPdd">
                                <Card                       
                                    cover={<a href={"#/app/userhome/Alarmlist?id="+el.code+"&type=0"}><img alt="example" src={this.state.camera[i].picpath} width='100%' /></a>}
                                    actions={[
                                        <a href={"#/app/companyhome/setarea?id="+el.code} className="actionsBbottom">
                                             <p> {this.field(i)}条 
                                             </p>
                                             <p>布防区域 </p> 
                                        </a>,
                                        <a href={"#/app/companyhome/settime?id="+el.code} className="actionsBbottom colCen">
                                                <Icon type="clock-circle" />
                                                {this.statework(i)}
                                        </a>, 
                                         <a href={"#/app/userhome/Userdeveice?id="+el.code} className="colCen actionsBbottom ">
                                             <Icon type="setting" />
                                         </a>
                                ]}
                                >
                                    <Row className="paddRow">  
                                        <Col xxl={{ span:6}} xs={{ span: 6}}>
                                           <div className={this.isonlinebg(i)}>
                                               {this.isonline(i)}
                                           </div> 
                                        </Col>
                                        <Col xxl={{ span: 18}} xs={{ span: 18}} className="titcon">
                                           <p>{el.location}</p> 
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
        )
    }
}
export default Equipment
