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

                console.log('1res.data',res.data);
                console.log('2res.camera',res.camera);
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
        if(this.state.camera[i].field ===""){
        }else{
            var jsonData= JSON.parse(this.state.camera[i].field)
        }    
        var count = 0;
        for(var j in jsonData){
            count++;
        }
        return count;
    }
    isonline=(i)=>{ //是否在线  
        var time= this.state.camera[i].heart.time ;
        var myDate=new Date();
        var ctime=myDate.getMinutes()
        var str=time.substring(14,16);
            if(ctime-str>1||ctime-str===1){
                return "离线"
            }else{
                return "在线";
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
export default Equipment
