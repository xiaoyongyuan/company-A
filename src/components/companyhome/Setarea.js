import React, { Component } from 'react';
import { Row, Col,Button,Modal } from 'antd';
import '../../style/sjg/home.css';
import {post} from "../../axios/tools";
const blue='#40a9ff';
const red='#f5222d';
class Setarea extends Component {
    constructor(props){
        super(props);
        this.state={
            src:'',
            clicknum:0,
            present:[],
            areaone:'', //防区一
            areatwo:'', //防区二
        };
    }
    boundarydraw(){                  
        let ele = document.getElementById("time_graph_canvas")
        let area = ele.getContext("2d");
        area.clearRect(0,0,704,576);
        if(this.state.areaone){
                let areaone=this.state.areaone[0];            
                area.strokeStyle=blue;
                area.lineWidth=3;
                area.beginPath();
                area.moveTo(areaone[0][0],areaone[0][1]);
                area.lineTo(areaone[1][0],areaone[1][1]);
                area.lineTo(areaone[2][0],areaone[2][1]);
                area.lineTo(areaone[3][0],areaone[3][1]);
                area.lineTo(areaone[0][0],areaone[0][1]);
                area.stroke();
                area.closePath();
                if(this.state.areatwo){
                    let areatwo=this.state.areatwo[0]; 
                    area.strokeStyle=red;
                    area.beginPath();
                    area.moveTo(areatwo[0][0],areatwo[0][1]);
                    area.lineTo(areatwo[1][0],areatwo[1][1]);
                    area.lineTo(areatwo[2][0],areatwo[2][1]);
                    area.lineTo(areatwo[3][0],areatwo[3][1]);
                    area.lineTo(areatwo[0][0],areatwo[0][1]);
                    area.stroke();
                    area.closePath();

                }
        }else if(this.state.areatwo){
            let areatwo=this.state.areatwo[0]; 
            area.strokeStyle=red;
            area.lineWidth=3;
            area.beginPath();
            area.moveTo(areatwo[0][0],areatwo[0][1]);
            area.lineTo(areatwo[1][0],areatwo[1][1]);
            area.lineTo(areatwo[2][0],areatwo[2][1]);
            area.lineTo(areatwo[3][0],areatwo[3][1]);
            area.lineTo(areatwo[0][0],areatwo[0][1]);
            area.stroke();
            area.closePath();
        }
               
    }

    componentWillMount=()=>{
        this.setState({
            cid:this.props.query.id
        });
    }
    componentDidMount() { 
    //摄像头详情 
        post({url:'/api/camera/getone',data:{code:this.state.cid}},(res)=>{
            if(res){
                console.log(res)
                let field=res.data.field;
                if(field){
                    this.setState({
                        areaone:field[1],
                        areatwo:field[2],
                        src:res.data.picpath,
                    },()=>{
                        this.boundarydraw()
                    });

                }
                
            }
        })  
    
    }
    draw = (field) => { //绘制区域
        let item=this.state.present;
        let ele = document.getElementById("time_graph_canvas");
        let area = ele.getContext("2d");
        area.strokeStyle='#ff0';
        area.lineWidth=3;
        area.beginPath();
        area.moveTo(item[0][0],item[0][1]);
        item.map((elx,i)=>{
            if(i>0){
               area.lineTo(item[i][0],item[i][1]);
               if(i==3){
               area.lineTo(item[0][0],item[0][1]);
               } 
               area.stroke();
            }
        })
    }
    
    clickgetcorrd =(e)=>{ //点击
        if(!this.state.areaone||!this.state.areatwo){
            console.log('inde',this.state.clicknum)
            if(this.state.present.length=='4'){
                this.setState({
                    deleteshow: true
                });
            }else{
                let getcord=this.getcoord(e);  //获取点击的坐标
                let precorrd=this.state.present; //
                precorrd.push(getcord);
                this.setState({
                    clicknum: this.state.clicknum+1,
                    present:precorrd
                });
            }
            
        }
        
    }
    deleteOk=()=>{
        let ele = document.getElementById("time_graph_canvas");
        let area = ele.getContext("2d");
        this.boundarydraw();

        area.clearRect(0,0,704,576);
        this.setState({
            deleteshow: false,
            present:[]
        });
    }
    deleteCancel=()=>{
        this.setState({
            deleteshow: false
        });
    }
    getcoord = (coords) => {  //获取坐标
        let ele = document.getElementById("time_graph_canvas");
        let canvsclent = ele.getBoundingClientRect();
        let x= coords.clientX - canvsclent.left * (ele.width / canvsclent.width);
        let y= coords.clientY - canvsclent.top * (ele.height / canvsclent.height)
        let pre=[x,y]
        return pre
    }
    drawmove =(e)=>{  //移动
        if(this.state.clicknum){
            let ele = document.getElementById("time_graph_canvas");
            let area = ele.getContext("2d");
            let item=this.state.present;
            let getcord=this.getcoord(e);
            area.clearRect(0,0,704,576);//清除之前的绘图
            if(this.state.clicknum==4){//区域完成
                this.boundarydraw();
                this.draw();
                this.setState({
                    clicknum: 0
                });
            }else{
                this.boundarydraw();
                this.draw();
                area.strokeStyle='#ff0'; 
                area.lineWidth=3;
                area.beginPath();
                area.moveTo(item[item.length-1][0],item[item.length-1][1]);
                area.lineTo(getcord[0],getcord[1]);
                area.stroke();
                area.closePath(); 
            }

        }

    }
    submitok(index){
        if(index){
            if(this.state.areaone){
                post({url:'/api/camera/fielddel',data:{key:1,code:this.state.cid}},(res)=>{
                    if(res){
                        this.setState({
                            areaone:''
                        },()=>{

                          this.boundarydraw()  
                        });
                        
                    }
                })
            }else{
                if(this.state.present.length==4){
                    post({url:'/api/camera/fieldadd',data:{key:1,field:[this.state.present],code:this.state.cid}},(res)=>{
                        if(res){
                            this.setState({
                                areaone:[this.state.present],
                                present:[]
                            },()=>{
                              this.boundarydraw()  
                            });
                            
                        }
                    })
                }
                
            }
        }else{
            if(this.state.areatwo){
                post({url:'/api/camera/fielddel',data:{key:2,code:this.state.cid}},(res)=>{
                    if(res){
                        this.setState({
                            areatwo:'',
                        },()=>{
                            console.log('gggg',this.state.areatwo)
                          this.boundarydraw()  
                        });
                        
                    }
                })
            }else{
                if(this.state.present.length==4){
                    post({url:'/api/camera/fieldadd',data:{key:2,field:[this.state.present],code:this.state.cid}},(res)=>{
                        if(res){
                            this.setState({
                                areatwo:[this.state.present],
                                present:[]
                            },()=>{
                              this.boundarydraw()  
                            });
                            
                        }
                    })
                }
            }
        }

    }

    render() {
        return (
           <div style={{marginTop:"30px"}}>
                <Row>
                    <Col xl={{ span:12}} xxl={{ span: 12 }}>
                        <div className="photo" id="canvasphoto">
                           <canvas id="time_graph_canvas" width="704px" height="576px" style={{backgroundImage:'url('+this.state.src+')',backgroundSize:'cover'}} onClick={this.clickgetcorrd} onMouseMove={this.drawmove}></canvas> 
                        </div>
                    </Col>
                    <Col xl={{ span: 12}} xxl={{ span: 12 }}>
                       
                        <div className="clearInfo">
                            <Row>
                                <Button type="primary" onClick={()=>this.submitok(1)}>{this.state.areaone?'删除防区一':'新增防区一'}</Button>
                            </Row>
                            <br /><br />
                            <Row>
                                <Button type="danger" onClick={()=>this.submitok()}>{this.state.areatwo?'删除防区二':'新增防区二'}</Button>
                            </Row>
                        </div>
                        <div className="restartAlg">
                            <Row>
                                <Col span={14}>
                                        围界设定方法：请在左侧图片处鼠标单击绘制防区，防区均为四边形，
                                    每个设备最多可设置四处防区。防区设置完成后请点击“新增”按钮生效。
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Modal title="提示信息" visible={this.state.deleteshow} onOk={this.deleteCancel}
                       onCancel={this.deleteCancel}>
                    <p>您还有未提交的防区，请先点击新增按钮进行提交</p>
                </Modal>
           </div> 
        )
    }

}

export default Setarea;