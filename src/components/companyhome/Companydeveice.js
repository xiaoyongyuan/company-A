import React,{ Component } from 'react';
import {Row, Col, Tabs,Button,Icon,Table,Modal,Input, Switch } from 'antd';
import house from "../../style/ztt/img/house.jpg";
import camera from "../../style/ztt/img/camera.png";
import nopic from "../../style/imgs/nopic.png";
import '../../style/ztt/css/Companyhome.css';
import {post} from "../../axios/tools";
import {url} from "../../utils/index";

const usertype=JSON.parse(localStorage.getItem('user'));
const TabPane = Tabs.TabPane;
class Companydeveice extends Component{
    constructor(props){
        super(props);
        this.state= {
            untreated: [],
            processed: [],
            patrol: [],
            record: [],
            ModalText:[],
            states:[],
            type:"",
            inputDis:"",
            modalTitle:"",
            stateContext:"",
            stateContext1:"",
            visible: false,
            confirmLoading: false,
            camera:{ //摄像头信息
                eid:'',  //id
                field:0  //防区设置状态1已设置，0未设置
            },
            video:true, //直播显示
            cid:'1000002', //摄像头id,由上一页面传入
            alarmcode:'', //报警信息的code,由点击事件传入
            // alarmphoto:'',
            canvasbg:nopic, //canvas报警背景
            live:'',
            imgbigshow:false, //放大图片的控制器
            imgbig:nopic,//放大图片的地址
            field:true, //是否显示围界信息
            obj:true, //是否显示报警对象

        }

    }

    
    //点击表头变化字体颜色
    callback(key) {
      return "ant-tabs-tab";
    }
    draw = ()=>{ //画围界
        let ele = document.getElementById("canvasobj");
        let area = ele.getContext("2d");
        area.clearRect(0,0,704,576);//清除之前的绘图
        area.lineWidth=1;

        
        let datafield=this.state.processed[this.state.alarmindex].field;
        datafield?datafield=JSON.parse( datafield):datafield=[]
        if(this.state.field && datafield.length){ 
          let areafield = ele.getContext("2d"); 
          area.lineWidth=1;    
            areafield.strokeStyle='#f00';
          datafield.map((el,i)=>{
            areafield.beginPath();
            areafield.moveTo(datafield[i][0][0],datafield[i][0][1]);
            areafield.lineTo(datafield[i][1][0],datafield[i][1][1]);
            areafield.lineTo(datafield[i][2][0],datafield[i][2][1]);
            areafield.lineTo(datafield[i][3][0],datafield[i][3][1]);
            areafield.lineTo(datafield[i][0][0],datafield[i][0][1]);
            areafield.stroke();
            areafield.closePath();
          })
        }
        const objs=this.state.processed[this.state.alarmindex].finalresult;
        if(this.state.obj && objs.length){
          //计算缩放比例
          const x=704/this.state.processed[this.state.alarmindex].pic_width, y=576/this.state.processed[this.state.alarmindex].pic_height;
          objs.map((el,i)=>{
            area.strokeStyle='#ff0';
            area.beginPath();
            area.rect(parseInt(el.x*x),parseInt(el.y*y),parseInt(el.w*x),parseInt(el.h*y));
            area.stroke();
            area.closePath();
          })
            
        }
    }

    //返回直播
    looklive=()=>{
        this.setState({
            video:true,
            alarmvideo:false
        });
    }
    //查看报警图片
    alarmlook=(index,type,code)=>{
        let img='';
        if(type){ //type==1为未处理
            img=this.state.untreated[index].picpath
        }else{
            img=this.state.processed[index].picpath
        }
        this.setState({
            video:false,
            alarmindex:index, //处理报警用
            alarmcode:code, //处理报警用
            alarmvideo:false, 
            alarmtype:type, //处理报警用，未处理的还是已处理的
            field:true,
            obj:true,
            canvasbg:img?img:nopic, //canvas显示的报警图片
        },()=>{
            this.draw()
        });
    }
    //查看报警视频
    alarmvideo=(index,type)=>{
        let video='';
        if(type){ //type==1为未处理
            video=this.state.untreated[index].videopath
        }else{
            video=this.state.processed[index].videopath
        }
        this.setState({
            alarmvideo:true,
            live:video
        });
    }
    //点名放大图片
    mouseover=(index)=>{
        this.setState({
            imgbigshow:true,
            imgbig:this.state.record[index].picpath?this.state.record[index].picpath:nopic
        });
    }
    mouseout=()=>{  //鼠标移出
        this.setState({
            imgbigshow:false
        });
    }
    batchdeal=()=>{ //一键处理
        post({url:'/api/alarm/handleall',data:{cid:this.state.cid}},(res)=>{
            if(res){
                this.componentDidMount()
            } 
        })

    }
    alarmdeal=(type)=>{ //报警处理
        post({url:'/api/alarm/updata',data:{code:this.state.alarmcode,status:type}},(res)=>{
            if(res){
                let untreated='';
                if(this.state.alarmtype){
                    untreated=this.state.untreated;
                    untreated[this.state.alarmindex].state=type
                    this.setState({
                        untreated:untreated
                    }); 
                }else{
                    untreated=this.state.processed;
                    untreated[this.state.alarmindex].state=type
                    this.setState({
                        processed:untreated
                    });
                }
                
            } 
        })
    }

    updatastate =()=>{ //启用禁用
        let cstatus=this.state.cstatus?0:1;
        post({url:'/api/camera/update',data:{code:this.state.cid,cstatus:cstatus}},(res)=>{
            if(res){
                this.setState({
                    cstatus:cstatus,
                });
            } 
        })

    }
    updatacancel=()=>{ //撤防与布防
        let if_cancel=this.state.if_cancel?0:1;
        post({url:'/api/camera/update',data:{code:this.state.cid,if_cancel:if_cancel}},(res)=>{
            if(res){
                this.setState({
                    if_cancel:if_cancel,
                });
            } 
        })

    }
    showPatrol=()=>{ //设置巡更弹层
        this.setState({
            visible:true
        });

    }
    handleCancel = () => {//巡更放弃修改
        this.setState({
            visible: false,
        });
    }
    componentWillMount=()=>{
        this.setState({
            cid:this.props.query.code
        });
    }
    componentDidMount() { 
    //摄像头详情 
    post({url:'/api/camera/getone',data:{code:this.state.cid}},(res)=>{
            if(res){
                let field='';
                res.data.field?field=1:field=0;
                this.setState({
                    camera:{
                        name:res.data.name,  
                        field:field,  //防区
                        if_cancel: res.data.if_cancel, // 布防撤防
                        cstatus:res.data.cstatus  //摄像头状态

                    }
                });
            }
        })      
        //未处理报警
        post({url:'/api/alarm/getlist',data:{cid:this.state.cid,status:0}},(res)=>{
            if(res){
                this.setState({
                    untreated:res.data,
                    record:res.data  //点名先复用
                });
            } 
        })
        //已处理报警
        post({url:'/api/alarm/getlist',data:{cid:this.state.cid,status:4}},(res)=>{
            if(res){
                this.setState({
                    processed:res.data
                });
            } 
        })
    }
    render() {
        const columns1 = [{ //未处理报警
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text,record,index) => (index+1),
        }, {
            title: '报警时间',
            dataIndex: 'atime',
            key: 'atime',
        }, {
            title: '报警类型',
            dataIndex: 'alarmtype',
            key: 'alarmtype',
            render: (text) => ('入侵报警')
        },{
            title: '处理状态',
            dataIndex: 'status',
            key: 'status',
            render: (text,record,index) => {
                switch(text){
                    case '1':
                        return '确认';
                    case '2':
                        return '忽略';
                    case '3':
                        return '虚警';
                    default:
                        return '未处理';
                }
                
            },
        },{
            title: '操作',
            dataIndex: 'videopath',
            key: 'videopath',
            render: (text,record,index) => {
                if(text) return (<span><Button onClick={()=>{this.alarmlook(index,"1",record.code)}}>查看</Button><Button onClick={()=>{this.alarmvideo(index,"1")}}>视频</Button></span>)
                else return (<span><Button onClick={()=>{this.alarmlook(index,"1",record.code)}}>查看</Button></span>)
            },
        }];
        const columns2 = [{ //已处理报警
            title: '序号',
            dataIndex: 'index',
            key: 'indexun',
            render: (text,record,index) => (index+1),
        }, {
            title: '报警时间',
            dataIndex: 'atime',
            key: 'atimeun',
        }, {
            title: '报警类型',
            dataIndex: 'alarmtype',
            key: 'alarmtypeun',
            render: (text) => ('入侵报警')
        },{
            title: '处理状态',
            dataIndex: 'status',
            key: 'statusun',
            render: (text,record,index) => {
                console.log(text)
                switch(text){
                    case 0:
                        return '未处理'
                        break;
                    case 1:
                        return '确认'
                        break;
                }
            },
        },{
            title: '操作',
            dataIndex: 'videopath',
            key: 'videopathun',
            render: (text,record,index) => {
                if(text) return (<span><Button onClick={()=>{this.alarmlook(index,"0",record.code)}}>查看</Button><Button onClick={()=>{this.alarmvideo(index,"0")}}>视频</Button></span>)
                else return (<span><Button onClick={()=>{this.alarmlook(index,"0",record.code)}}>查看</Button></span>)
            },
        }];
        const columns3= []; //巡更
        const columns4 = [{ //点名
            title: '序号',
            dataIndex: 'index',
            key: 'indexun',
            render: (text,record,index) => (index+1),
        }, {
            title: '点名时间',
            dataIndex: 'atime',
            key: 'atimeun',
        }, {
            title: '点名结果',
            dataIndex: 'alarmtype',
            key: 'alarmtypeun'
        },{
            title: '结果图',
            dataIndex: 'picpath',
            key: 'picpath',
            render: (text,record,index) => {
                let pic=text
                return (
                <div style={{width:"150px"}}><img src={pic} width="100%" onMouseOver={()=>{this.mouseover(index)}} onMouseOut={this.mouseout} /></div>
                )
                
            }
        }];
        return(
            <div className="gutter-example button-demo">
                <span style={{color:'#4B4B5F'}}>所在位置:场景/设备总览</span>
                <Row gutter={10}>
                    <Col xl={{ span:12}} xxl={{ span:12}}>{/*直播*/}
                        <div style={{width:"600px"}}>
                            <div className="video" style={this.state.video?{display:'block'}:{display:'none'}}>
                                <img src={nopic} width='600px' height='300px' className="img-responsive" alt="test" style={{width:"100%"}}/>
                            </div>
                            <div className="alarmphoto" style={{display:this.state.video?"none":"block"}}>
                                <canvas id="canvasobj" width="600px" height="300px" style={{backgroundImage:'url('+this.state.canvasbg+')',backgroundSize:"100% 100%"}}></canvas> 
                                <div style={{height:"35px",width:"100%",display:"block"}}>
                                    <Row className="alarmwj">
                                        <Col xl={{ span:10}}><label> 围界信息： <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked onChange={this.wjopen} /></label></Col>
                                        <Col xl={{ span:10}}><label> 报警信息： <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked onChange={this.objopen} /></label></Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div className="dealbtn" style={{display:this.state.video?"none":"block"}}>
                            <label>处理：</label>
                            <Button type="primary" onClick={()=>{this.alarmdeal(1)}}>确认</Button>
                            <Button type="dashed" onClick={()=>{this.alarmdeal(3)}}>虚警</Button>
                            <Button onClick={()=>{this.alarmdeal(2)}}>忽略</Button>
                        </div>                        
                    </Col>
                    <Col xl={12}>
                        <Row>
                            <Col xl={1} xxl={1}><div className=""><img src={camera} alt=""/></div></Col>
                            <Col xl={10} xxl={10}><span>摄像头信息</span><Icon type="video-camera" theme="filled" style={{color:'#2a6cf4',fontSize:2.0+'em'}} onClick={this.looklive} /></Col>
                        </Row>
                        <div className="scenemess" style={{display:!this.state.alarmvideo?"block":"none"}}>
                            <Row className="line">
                                <Col xl={24} xxl={24}>设备名称：<span>{this.state.camera.name} </span></Col>
                            </Row>
                            <Row className="line">
                                <Col xl={24} xxl={24}>布防区域：{usertype.utype==0
                                        ?<a href={"#/app/companyhome/setarea?id="+this.state.cid}>{this.state.camera.field?"已设置":"未设置"}</a>
                                        :this.state.camera.field?"已设置":"未设置"}
                                </Col>
                            </Row>
                            <Row className="line">
                                <Col xl={24} xxl={24}>点名对象：{usertype.utype==0
                                    ?<a href={"#/app/companyhome/calling?id="+this.state.cid}>未设置</a>
                                    :"未设置"}
                                </Col>
                            </Row>
                            <Row className="line">
                                <Col xl={24} xxl={24}>状态：<span>{this.state.cstatus?'已启动':'禁用中'}</span>{usertype.utype==0?<Icon type="edit" style={{fontSize:1.3+'em'}} onClick={this.updatastate} />:''} </Col>
                            </Row>
                            <Row className="line">
                                <Col xl={24} xxl={24}>布防时间：{usertype.utype==0
                                    ?<a href={'#/app/companyhome/settime?id='+this.state.cid}>布防中</a>
                                    :"布防中"}
                                </Col>
                            </Row>
                            <Row className="line">
                                <Col xl={24} xxl={24}>巡更次数：<span>{this.state.patrol?this.state.patrol:0}</span>{usertype.utype==0?<Icon type="edit" style={{fontSize:1.3+'em'}} onClick={this.showPatrol}/>:''}</Col>
                            </Row>
                            <Row className="line">
                                <Col xl={5} xxl={5}><Button type="primary" onClick={this.batchdeal}>一键处理</Button></Col>
                                <Col xl={10} xxl={10}>{usertype.utype==0?<Button type="primary" onClick={this.updatacancel}>{this.state.if_cancel?'撤防':'布防'}</Button>:''}</Col>
                            </Row>
                        </div>
                        <div className="alarmvideo" style={{display:this.state.alarmvideo?"block":"none"}}>
                            <video controls="controls" autoplay="autoplay" style={{width:"100%",height:"300px"}} src={this.state.live}></video>
                        </div>
                    </Col>
                </Row>
                <Modal
                    title={this.state.type?"状态":"设定巡更次数"}
                    visible={this.state.visible}
                    onOk={this.patrolOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Row>
                        <p style={{display:this.state.stateContext1?"block":"none"}}>{this.state.stateContext}</p>
                        <div style={{display:this.state.inputDis?"none":"block"}}>
                            <Col xl={4} xxl={4}>巡更次数：</Col>
                            <Col xl={20} xxl={20}><Input  type="text" value={this.state.patrol?this.state.patrol:0} /></Col>
                        </div>
                    </Row>
                </Modal>
                <Row style={{paddingTop:"20px"}}>
                    <Tabs type="card" onChange={this.callback}>
                        <TabPane tab="未处理报警" key="1">
                           <Table dataSource={this.state.untreated} columns={columns1}
                                  rowKey={record => record.uid}/>
                        </TabPane>
                        <TabPane tab="已处理报警" key="2">
                            <Table dataSource={this.state.processed} columns={columns2} rowKey={record => record.uid}></Table>
                        </TabPane>
                        <TabPane tab="点名记录" key="4">
                            <Table dataSource={this.state.record} columns={columns4} rowKey={record => record.uid} />
                        </TabPane>
                        {/*<TabPane tab="电子巡更" key="3">
                            <Table dataSource={this.state.patrol} columns={columns3}  rowKey={record => record.uid} />
                        </TabPane>*/}
                    </Tabs>
                    <div className="imgbig" style={{position:"fixed",left:"300px",top:"200px",width:"500px",zIndex:2,display:this.state.imgbigshow?'block':'none'}}>
                        <img src={this.state.imgbig} width="100%" />
                    </div>
                </Row>
            </div>
        );
    }
}
export default Companydeveice