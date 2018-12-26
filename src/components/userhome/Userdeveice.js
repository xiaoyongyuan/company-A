import React from 'react';
import {Form, Row, Col,Icon } from 'antd';
import '../../style/sjg/home.css';
import {post} from "../../axios/tools";
class Userdeveice extends React.Component{
    constructor(props){
        super(props);
        this.state={
            portvalue:"",
            ipvalue:"",
            code:"1000001",
            data:{},
            edata:{},
            heartdata:{},
            workingtime:[],
        };
    }
    componentDidMount() {             
        //取数据
        this.requestdata()
    }
    requestdata=(params) => {//取数据  
        post({url:"/api/camera/getone",data:{code:this.props.query.id}}, (res)=>{
            if(res.success){
                console.log("列表数据：",res.data);
                this.setState({
                    data:res.data, 
                    edata:res.edata, 
                    heartdata:res.heartdata, 
                    workingtime:res.workingtime,
                    ipvalue:res.data.ip,
                    portvalue:res.data.authport,
                    code1:this.props.query.id
                })
            }
        })
    }
    onChangeip=(e)=> {//ip  input 修改ip
        this.setState({
            ipvalue:e.target.value,
        });
        console.log('ip= ', e.target.value );
    }
    onChangeport=(e)=> {//ip  input 修改端口
        this.setState({
            portvalue:e.target.value,
        });
        console.log('port= ', e.target.value );
    } 
    inputOnBlurip=(e)=>{ //ip  input 失去焦点
        post({url:"/api/camera/update",data:{code:this.props.query.id,ip:this.state.ipvalue}}, (res)=>{
            if(res.success){
                console.log("列表数据：",);
            
            }
        })
        this.setState({
            focus: false
        });
        console.log('focus= ',"失去焦点" );
    }
    inputOnBlursport=(e)=>{ //端口 input 失去焦点
        post({url:"/api/camera/update",data:{code:this.props.query.id,authport:this.state.portvalue}}, (res)=>{
            if(res.success){
                console.log("列表数据：",);
            }
        })
        this.setState({
             focus: false
             });
          console.log('focus= ',"失去焦点" );
    } 
    field=()=>{ //布防区域的个数 
        var jsonData;
        if(this.state.data.field ===""){
             jsonData=0;
        }else{
            var jsonData= this.state.data.field
        }  
        var count = 0;
        for(var j in jsonData){
          count++;
        }
         return count;
    }
    status=()=>{ //报警类型 
        if(this.state.edata.status=="stop"){
            return "停止运行"
        }else if(this.state.edata.status=="run"){
            return "运行中";
        }else{
            return "摄像头未连接";
        }          
     }
     atype=()=>{ //报警类型 
        if(this.state.data.atype===1){
            return "围界入侵"
        }else{
            return "";
        }          
    }

    isonline=(i)=>{ //当前状态 
        let time= this.state.heartdata.time;// 取到时间
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

    render(){
        const _this=this;
        function on_port()
            {
            document.getElementById('port').focus()
            }
        function on_ip()
            {
            document.getElementById('ip').focus()
            }                     
        return(     
            <div style={{backgroundColor:"#fff",padding:"1%"}}>
                <div className="box-padding"> 
                    <p> <Icon type="bars" /> 设备信息</p>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                        设备：
                        </Col>
                        <Col span={21} className="t_l">
                          {this.state.data.eid}
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           报警类型：
                        </Col>
                        <Col span={21} className="t_l">
                            {/* 围界入侵 */}
                            {this.atype()}
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           所在位置：
                        </Col>
                        <Col span={21} className="t_l">
                        {this.state.data.location}
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           最后报警时间：
                        </Col>
                        <Col span={21} className="t_l">
                        {this.state.data.atime}
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                        防区设置：
                        </Col>
                        <Col span={21} className="t_l">
                             <a href={"#/app/companyhome/setarea?id="+_this.props.query.id} className="underline">
                              {this.field()}个
                             </a>
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           设防时间：
                        </Col>
                        <Col span={21} className="t_l">
                        <a href={"#/app/userhome/Userdeveice?id="+_this.props.query.id} className="underline">
                        {this.state.workingtime.length}段
                         </a>                     
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           上次心跳：
                        </Col>
                        <Col span={21} className="t_l">
                        {this.state.heartdata.time}
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           设备温度：
                        </Col>
                        <Col span={21} className="t_l">
                        {this.state.heartdata.temp}℃
                        </Col>
                    </Row>
                    <p><Icon type="video-camera" /> 摄像头信息</p>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           设备IP：
                        </Col>
                        <Col span={21} className="t_l">
                              <input type="text"value={this.state.ipvalue} id="ip"
                              onChange={(e)=>this.onChangeip(e)}
                              onBlur={(e)=>this.inputOnBlurip(e) }
                              /> 
                              <span> <Icon type="edit" onClick={on_ip} /></span> 
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           设备端口：
                        </Col>
                        <Col span={21} className="t_l">
                            <input type="text"value={this.state.portvalue}
                             onChange={(e)=>this.onChangeport(e)}
                             id="port"
                             onBlur={(e)=>this.inputOnBlursport(e) } 
                            />      
                            <span>  <Icon type="edit" onClick={on_port} /></span>
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           设备状态：
                        </Col>
                        <Col span={21} className="t_l">
                           {this.status()}         
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           设备软件版本：
                        </Col>
                        <Col span={21} className="t_l">
                           {this.state.edata.softversion}
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                          设备硬件版本：
                        </Col>
                        <Col span={21} className="t_l">
                        {this.state.edata.hardversion}
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           当前状态：
                        </Col>
                        <Col span={21} className="t_l">
                           {this.isonline()}
                         
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default Userdeveice=Form.create()(Userdeveice);
