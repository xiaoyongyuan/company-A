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
                    // console.log('总览res3333333333333',this.state.res);
                    // console.log('总览usercount',this.state.res.usercount);
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
            var jsonData= JSON.parse(this.state.camera[i].field)
            var count = 0;
            for(var j in jsonData){
              count++;
            }
        return count;
    }
    isonline=(i)=>{ //是否在线  
        var time= this.state.camera[i].heart.time ;
        var myDate=new Date;
        var str=time.substring(14,16);
        console.log('bbbbbbbbbbbbbbbb',myDate.getMinutes());
        console.log('AAAAA',str);
        
            if(myDate-str>1){
                return "离线"
            }else{
                return "在线";
            }
        
     
   }
    

    render(){
        const _this=this;  
        var styleObj={
            topMar:{ margin:'60px 0 0 0',},
            successBg:{ background:'#96FF66'},
        }
        return(       
            <div>
                 <Row>
                    <Col span={23} className="paddL">
                      <Card 
                            title="Card title" style={styleObj.topMar}                         
                      >
                            <Row>
                                <Col span={12}>                             
                                   <p>云服务到期日期: <span>{this.state.data.cloudvaliddate?this.state.data.cloudvaliddate:'未开通'}</span></p>
                                   <p>设备总数: <span>{this.state.camera.length?this.state.camera.length:0}个</span></p>
                                   <p>所属团队: <span>{this.state.data.pname}</span></p>
                                   <p>用户数: <span>
                                         {/* {this.state.res.usercount} */}
                                   </span></p>
                                   <p>管理员名称: <span>{this.state.data.adminname}</span></p>
                                </Col>
                                <Col span={12}>
                                    <Timeline>
                                        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                                        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                                        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                                        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>                                    
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
                                         <a href={"#/app/companyhome/Userdeveice?id="+el.code} className="colCen actionsBbottom ">
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
                                    <Icon type="bell" /> <span>120</span> 
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
