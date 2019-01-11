import React,{ Component } from 'react';
import {Row, Col, Card,Modal,Spin } from 'antd';
import '../../style/sjg/home.css';
import BreadcrumbCustom from '../BreadcrumbCustom';
import yal from "../../style/yal/css/calling.css";
import {post} from "../../axios/tools";
const data = [
    {
        "rrpic": "http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229095825.jpg",
        "rfinal": "2",
        rname:'石狮子'
    },
    {
        "rrpic": "http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229095847.jpg",
        "rfinal": "1",
        rname:'柱子'
    },
    {
        "rrpic": "http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229095847.jpg",
        "rfinal": "1",
        rname:'柱子'
    },
    {
        "rrpic": "http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg",
        "rfinal": "2",
        rname:'兵马俑'
    }
]

class Calling extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type:0,
            list:[],
            count:4,
            normal:18,
            unusual:2,
        };
        this.showModal=this.showModal.bind(this);
    }

    componentDidMount() {
        this.reuestdata();

      this.showModal();
      setInterval(()=>{
          this.setState({
              visible: false,
              type:0
          });
      },5000);
    }

    reuestdata =(parameter={})=>{ //全部点名查询
        post({url:"/api/rollcall/getlist",data:parameter},(res)=>{
            if(res){
                this.setState({
                    // list:res.data
                    list:data

                })
            }
        })
    };
    showModal = () => {
        this.setState({
            visible: true,
            type:1
        });
    }
    render() {
        return(
            <div className="gutter-example button-demo">
                {/*<BreadcrumbCustom first="点名" second="点名任务" />*/}
                {/*<span style={{color:'#4B4B5F'}}>所在位置:  场景 /  点名</span>*/}
                <div className="dmword">
                    <span style={{display:this.state.type?"block":"none"}}>此次点名共<b>{this.state.count}</b>个对象，</span>
                    <span style={{display:this.state.type?"none":"block"}}>此次点名共<b>{this.state.count}</b>个对象，用时<b>14</b>秒。<b>{this.state.unusual}</b>个异常，<b>{this.state.normal}</b>个正常。</span>
                </div>
                <div className="divRow">
                    <Row gutter={50}>
                        {this.state.list.map((el,i)=>(
                        <Col className="gutter-row" span={7} key={i}>
                            {/*style={{background:this.state.type?"none":"#fff"}}*/}
                            <div className="gutter-box divout"  style={{border:this.state.type?"none":"2px solid #E5E5E5" ,background:this.state.type?"none":"#fff" ,height:this.state.type?"230px":"460px"}} >
                                <div className="divinnertop" style={{border:this.state.type?"2px solid #E5E5E5":"none", height:this.state.type?"100%":"50%"}}>
                                    <div className="divinnertopT">
                                    </div>
                                    <div className="divinnertopM">
                                        <div className="divinnertopML">
                                            <div className="divimg">
                                                <img src={el.rrpic} className="img-responsive" alt="test" style={{width:"100%",height:"100%"}} />
                                            </div>
                                        </div>
                                        <div className="divinnertopMR">
                                            <div className="divinnertopMRT">
                                                <span>{el.rname}</span>
                                            </div>
                                            <div className="divinnertopMRB">
                                                <span>理工大北门</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="divinnertopB" style={{display:this.state.type?"none":"block"}}>
                                        <Row>
                                            <Col md={8} offset={2}>
                                                <span>结果:</span>
                                            </Col>
                                            <Col md={5}>
                                                {el.rfinal==1
                                                    ? <span style={{ color:"green" }}>正常</span>
                                                    : <span style={{ color:"red" }}>报警</span>

                                                }
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className="divinnerbottom" style={{display:this.state.type?"none":"block"}}>
                                    <div className="divinnerbottomimg">
                                        <img src={el.rrpic} className="img-responsive" alt="test" style={{width:"100%",height:"100%"}} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        ))
                        }
                    </Row>
                </div>
                <div className="modelcircle">
                    <Modal visible={this.state.visible} className="modelCard"/>
                    <div className="scanningImg" style={{display:this.state.type?"block":"none"}}><Spin size="large" /></div>
                </div>
            </div>
        );
    }
}
export default Calling