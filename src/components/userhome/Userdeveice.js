import React from 'react';
import {Form, Row, Col, Button,Icon} from 'antd';
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
                this.setState({
                    data:res.data, 
                    edata:res.edata, 
                    heartdata:res.heartdata, 
                    workingtime:res.workingtime,
                    ipvalue:res.edata.cameraip,
                    portvalue:res.edata.cameraportno,
                    camerauser:res.edata.camerauser,
                    camerapasswd:res.edata.camerapasswd,
                    code1:this.props.query.id
                })
            }
        })
    }
    onChangeip=(e)=> {//ip  input 修改ip
        this.setState({
            ipvalue:e.target.value,
        });
    }
    onChangeport=(e)=> {//ip  input 修改
        this.setState({
            portvalue:e.target.value,
        });
    } 
    onChangeuser=(e)=> {//user  input 修改
        this.setState({
            camerauser:e.target.value,
        });
    }
    onChangepwd=(e)=> {//pwd  input 修改
        this.setState({
            camerapasswd:e.target.value,
        });
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
    isonline=()=>{ //当前状态 
        let time= this.state.heartdata.time;// 取到时间
        let yijingtime=new Date(time); //取到时间转换
        let timq=yijingtime.getTime(yijingtime) // 取到时间戳
        let myDate=new Date();// 当前时间
        let timc=myDate.getTime(myDate) // 当前时间戳
        if(time){
            if(timc-timq>60000){
               
                return "离线";
            }else{
                return(<span className='oncolor'>在线</span>)
                
            }    
        }
    }
    tempbg=()=>{ //设备温度
        if(this.state.heartdata.temp<55){
            return 'oncolor';
        }else{
            return 'reecolor';
        }
    }
    isheart=()=>{ //是否1分钟内心跳 
        if(this.state.heartdata.time){
            let time= this.state.heartdata.time.toString();// 取到时间
            let yijingtime=new Date(time); //取到时间转换
            let timq=yijingtime.getTime(yijingtime) // 取到时间戳
            let myDate=new Date();// 当前时间
            let timc=myDate.getTime(myDate) // 当前时间戳     
            if(timc-timq>60000){
                return 'reecolor';            
            }else{
                return 'oncolor';
            }      
        }else{
            return 'reecolor';
        }
    }
    


    submitbtn = (e) => {//modal提交
       
        let data={
            code:this.props.query.id,
            ip:this.state.ipvalue,
            ausername:this.state.camerauser,
            authport:this.state.portvalue,
            apassword:this.state.camerapasswd,
        };
        post({url:"/api/camera/camerareset",data:data}, (res)=>{
            if(res.success){
            }
        })
        this.setState({
            focus: false
        });
              
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
                        <a href={"#/app/companyhome/settime?id="+_this.props.query.id} className="underline">
                        {this.state.workingtime.length}段
                         </a>                     
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           上次心跳：
                        </Col>
                        <Col span={21} className="t_l">
                        <span className={this.isheart()}>{this.state.heartdata.time}</span>
                        
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           设备温度：
                        </Col>
                        <Col span={21} className="t_l">
                           <span className={this.tempbg()}> {this.state.heartdata.temp}℃ </span> 
                        </Col>
                    </Row>
                    <p><Icon type="video-camera" /> 摄像头信息</p>
                   

                  

                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            用户名：
                        </Col>
                        <Col span={21} className="t_l">
                              <input type="text"value={this.state.camerauser} id="ip"
                              onChange={(e)=>this.onChangeuser(e)}
                              onBlur={(e)=>this.inputOnBlur(e) }
                              /> 
                              <span> <Icon type="edit" onClick={on_ip} /></span> 
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           密码：
                        </Col>
                        <Col span={21} className="t_l">
                            <input type="text"value={this.state.camerapasswd}
                             onChange={(e)=>this.onChangepwd(e)}
                             id="port"
                             onBlur={(e)=>this.inputOnBlur(e) } 
                            />      
                            <span>  <Icon type="edit" onClick={on_port} /></span>
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           设备IP：
                        </Col>
                        <Col span={21} className="t_l">
                              <input type="text"value={this.state.ipvalue} id="ip"
                              onChange={(e)=>this.onChangeip(e)}
                              onBlur={(e)=>this.inputOnBlur(e) }
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
                             onBlur={(e)=>this.inputOnBlur(e) } 
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
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                           
                        </Col>
                        <Col span={21} className="t_l">
                        <Button type="primary" onClick={this.submitbtn()}> 提交 </Button>
                        </Col>
                    </Row>
                    
                </div>
            </div>
        )
    }
}
export default Userdeveice=Form.create()(Userdeveice);
