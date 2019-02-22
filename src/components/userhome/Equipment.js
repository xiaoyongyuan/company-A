import React from 'react';
import {Card,Row,Col,Icon,Spin} from 'antd';
import '../../style/sjg/home.css';
import {post} from "../../axios/tools";
import nopic from "../../style/imgs/nopic.png";
import nodata from "../../style/imgs/nodata.png";
class Equipment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            camera:[],
            loading:true,
            type:1,
            nodatapic:true,
        };
      }
      componentWillMount(){
        const activecompcode=localStorage.getItem('activecompcode');
        this.setState({
            activecompcode:activecompcode && activecompcode !='undefined'?activecompcode:''
        })
      }
    componentDidMount() {        
        post({url:'/api/camera/get_camerainfolist',data:{passivecode:this.state.activecompcode}},(res)=>{ //获取团队列表
            if(res){
                if(res.camera.length===0){
                    this.setState({
                      nodatapic:false,
                  })
              }
                if(res.camera.length){
                    this.setState({
                        loading:false,
                        data:res.data, //用户信息
                        res:res, //用户信息
                        camera:res.camera, //摄像头信息
                        type:1
                    })
                }else{
                    this.setState({
                        loading:false,
                        type:0
                    })
                }
            } else{
                this.setState({
                    loading:false,
                    type:0
                })
            }
        })
        
    }
 
    statework=(i)=>{ //布防转换     
        if(this.state.camera[i].work===2){
            return (<span className="defenceEqui"><Icon type="clock-circle" /> 布防中</span>)
        }else if(this.state.camera[i].work===1){
            return (<span className="nodefence coverflow" title="不在布防中"><Icon type="clock-circle" /> 不在布防中</span>)
        }else{
            return (<span className="setup"><Icon type="clock-circle" /> 未设置</span>)
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
                return(<div className="onLine offLineBack">离线</div>)
            }else{
                return(<div className="onLine onLineBack">在线</div>)
            }
        }else{
           return(<div className="onLine onLineBack">在线</div>)
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
    };
    render(){

        return(
                <div className="equipment">
                    <Spin size="large" tip="Loading......" spinning={this.state.loading} className="loadding" />
                    {this.state.nodatapic?"":
                    <Row style={{display:this.state.type===0?"block":"none",paddingTop:"40px"}}>
                        <Col style={{width:"100%",textAlign:"center"}}><div className="backImg"><img src={nodata} alt="" /></div></Col>
                    </Row>}
                    <div className="equipmentCard">
                        <Row className="paddRow" gutter={32}>
                            {
                                    this.state.camera.map((el,i)=>{
                                        return(
                                            <Col key={i} xxl={{ span: 4}} xl={{ span:6}} lg={{ span: 6}} md={{span:6}} sm={{span:6}} xs={{span:6}} className="cardPdd ">
                                                <Card className="boxShow"
                                                      cover={<a href={"#/app/userhome/Alarmlist?id="+el.code+"&type=0"}><img alt="example" src={this.state.camera[i].picpath?this.state.camera[i].picpath:nopic} width="100%" /></a>}
                                                      actions={
                                                          this.state.utype==='1' || this.state.activecompcode
                                                              ?[
                                                                  <div className="actionsBbottom">
                                                                      <p>{this.field(i)}条
                                                                      </p>
                                                                      <p>布防区域 </p>
                                                                  </div>,
                                                                  <div className="actionsBbottom colCen ">
                                                                      {this.statework(i)}
                                                                  </div>,
                                                                  <div className="colCen actionsBbottom ">
                                                                      <span className="sheding"><Icon type="setting" /></span> <span className="sheding">设定</span>
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
                                                                      <span className="sheding"><Icon type="setting" /></span> <span className="sheding">设定</span>
                                                                  </a>
                                                              ]}
                                                >
                                                    <Row className="paddRow">
                                                        <Col xxl={{ span:24}} lg={{span:24}} >
                                                            <div className="equipmentNumber">
                                                                <div >{this.isonline(i)}</div>
                                                                <div className="equipmentRight ">
                                                                    <p className="coverflow" title={el.name}>{el.name}</p>
                                                                    <p className="coverflow" title={el.eid}>{el.eid}</p>
                                                                </div>
                                                            </div>

                                                        </Col>
                                                    </Row>
                                                    <div className="bell">
                                                        <a href={"#/app/userhome/Alarmlist?id="+el.code+"&type=0"} style={{color:'#f00'}}>
                                                            <Icon type="bell" /> <span className="equipNumnber">{this.state.camera[i].alarm}</span>
                                                        </a>
                                                    </div>
                                                </Card>
                                            </Col>
                                        )
                                    })
                           }
                        </Row>
                    </div>
                </div>
        )
    }
}
export default Equipment
