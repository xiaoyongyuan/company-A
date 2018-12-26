import React from 'react';
import { Card ,Row, Col,Timeline, Icon, } from 'antd';
import '../../style/sjg/home.css';
import {post} from "../../axios/tools";
class Userhome extends React.Component{
    constructor(props){
      super(props);
      this.state={
        camera:[],
        data:{},
        usercount:"0",
        alarmdata:[]
      };
    }

    componentDidMount() {        
        post({url:'/api/company/getone'},(res)=>{ //获取团队列表
            if(res){
                this.setState({
                    data:res.data, //用户信息
                    usercount:res.usercount, //用户信息
                    camera:res.camera, //摄像头信息                  
                }); 
            }   
        })
        post({url:'/api/alarm/getlastalarm'},(res)=>{ //获取报警列表
            if(res){
                console.log('111111获取报警列表',res);
                this.setState({
                    alarmdata:res.data, 
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
   atype=(j)=>{ //报警类型 
        if(this.state.alarmdata[j].atype===1){
            return "入侵报警"
        }else{
            return "";
        }          
}
   
    render(){
      
        var styleObj={
            topMar:{ margin:'60px 0 0 0',},
            successBg:{ background:'#96FF66'},
        }
        return(       
            <div>
                 <Row>
                    <Col span={23} className="paddL">
                      <Card 
                            title={this.state.data.cname} style={styleObj.topMar}                         
                      >
                            <Row>
                                <Col span={12}>                             
                                   <p>云服务到期日期: <span>{this.state.data.cloudvaliddate?this.state.data.cloudvaliddate:'未开通'}</span></p>
                                   <p>设备总数: <span>{this.state.camera.length?this.state.camera.length:0}个</span></p>
                                   <p>所属团队: <span>{this.state.data.pname}</span></p>
                                   <p>用户数: <span>
                                         {this.state.usercount}
                                   </span></p>
                                   <p>管理员名称: <span>{this.state.data.adminname}</span></p>
                                </Col>
                                <Col span={12}>
                                    <Timeline>
                                            {
                                                this.state.alarmdata.map((item,j)=>{
                                                    return (
                                                        <Timeline.Item>
                                                        <span> {this.state.alarmdata[j].name}  </span>
                                                        <span> {this.atype(j)} </span> 
                                                        {/* {this.state.alarmdata[j].atype}  */}
                                                        <span>{this.state.alarmdata[j].atime}</span>   
                                                    </Timeline.Item>
                                                    )
                                                })
                                            } 

                                    </Timeline>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    
                </Row>
                <Row className="paddRow"> 
                {
                    this.state.camera.map((el,i)=>{
                        return (
                            <Col key="i" xxl={{ span: 5}} xs={{ span: 6}}className="cardPdd">
                                <Card                       
                                    cover={<img alt="example" src={this.state.camera[i].picpath} />}
                                     
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
                                           <div className="onLine">
                                          
                                           {this.isonline(i)}
                                           </div> 
                                        </Col>
                                        <Col xxl={{ span: 18}} xs={{ span: 18}} className="titcon">
                                           <p>{el.location}</p> 
                                           <p>{el.eid}</p>
                                        </Col>
                                    </Row>
                                    <div className="bell">
                                    <Icon type="bell" /> <span>{this.state.camera[i].alarm}</span> 
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
export default Userhome
