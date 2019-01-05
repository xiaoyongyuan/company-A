import React from 'react';
import {Form, Row, Col, Button, Modal,Icon,Card} from 'antd';
import ModalForm from './ModalForm.js';
import {post} from "../../axios/tools";
import '../../style/sjg/home.css';

class PatrolPlan extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            list:[]
        };
    }
  
    componentDidMount() {
        this.requestdata()      
    }
    requestdata=(params={}) => {//取数据
        post({url:"/api/patrol/getlist"}, (res)=>{
            if(res.success){
                console.log(res.data,"********************")
                this.setState({
                    resdatd:res,
                    list: res.data
                    
                },()=>{
                    console.log(this.state.list,"111111")
                })
            }
        })

        
    }
    showModaldelete = (code,index) =>{ //删除弹层
        this.setState({
            deleteshow: true,
            delcode:code,
            delindex:index.i
        });
    }

    deleteOk = () =>{//删除确认
        let code={
            code:this.state.delcode,
        };
        post({url:"/api/patrol/del",data:code},(res)=>{
            if(res.success){
                const list=this.state.list;
                list.splice(this.state.delindex,1);
                this.setState({
                    deleteshow: false,
                    list
                });
            }
        })
    };
    deleteCancel = () =>{//删除取消
        this.setState({
            deleteshow: false,
        });
    };
    showModal = (e) => { //新增弹窗
        e.preventDefault();
        this.setState({
            visible: true,
            type:0,
        });
    };
    showModalEdit=(code,index)=>{ //编辑
        this.setState({
            visible: true,
            type:code,
            indexi:index.i
        });
    }
    handleCancel = (e) => { //modal取消
        const forms=this.formRef.formref();
        e.preventDefault();
        this.setState({
            visible: false,
        });
        forms.resetFields();
    };


    handleCreate = (e) => {//modal提交
        e.preventDefault();
        const forms=this.formRef.formref();
        forms.validateFields((err, values) => {
            if (!err) {
                if(this.state.type){
                    //修改
                     console.log("修改接口1111111111111",)
                    let data={
                        code:this.state.type,
                        pteam:values.pteam,
                        pbdate:values.bdate.format("HH"),
                        pedate:values.edate.format("HH"),
                        clist:values.patrolE.join(","),
                    };
                    post({url:"/api/patrol/update",data:data},(res)=>{
                        if(res.success){
                            let list=this.state.list;
                            list[this.state.indexi]=res.data[0]; 
                            this.setState({
                                list:list,
                               
                                visible: false,
                            })
                        }
                    })
                }else{
                       console.log("新增接口1111111111111",values.pteam)
                    const data={
                        pteam:values.pteam,
                        pbdate:values.bdate.format("HH"),
                        pedate:values.edate.format("HH"),
                        clist:values.patrolE.join(",")
                    }
                    post({url:"/api/patrol/add",data:data}, (res)=>{
                        if(res.success){
                            data.code=res.code;
                            const list=this.state.list;
                            list.unshift(data);
                            this.setState({
                                list:list,
                                visible: false,
                            })
                        }
                    })
                }
                forms.resetFields()//清空
            }
        });
    };

    render(){
        return(       
            <div className="PatrolPlan">
                <Card className="margin_top50 card_width"
                    extra={<Row>
                            <Col span={2} offset={6}>
                                <Button onClick={this.showModal}>新增</Button>
                            </Col>
                        </Row>     
                        }
                >
                     <Row>
                    {
                        this.state.list.map((item,i)=>{
                            return(
                                <Col key={i} className="margin_top50 m_r" span={7}>
                                    <div className="patrol_item">
                                        <div className="patrol_head">
                                           <div >{this.state.list[i].pteam}</div>
                                        </div>
                                        <div className="patrol_detail">
                                            <div>{this.state.list[i].pbdate}:00--{this.state.list[i].pedate}:00</div>
                                            <div>
                                            { this.state.list[i].camera}
                                            </div>
                                        </div>
                                        <div className="patrol_query">
                                         <span onClick={() => {this.showModalEdit( this.state.list[i].code,{i})}}><Icon type="search" />编辑</span> 
                                        </div>
                                        <div className="del">
                                          <span onClick={() => {this.showModaldelete( this.state.list[i].code,{i})}}><Icon type="delete" />删除 </span>
                                        </div>
                                    </div>
                                </Col>
                                )
                        })
                    } 
                </Row>
                </Card>,
                

               

                <Modal title={this.state.type?'编辑':'新增'}
                    okText="确认"
                    cancelText="取消"
                    visible={this.state.visible}
                    onOk={this.handleCreate}
                    onCancel={this.handleCancel}
                >
                    <ModalForm visible={this.state.visible}
                               code={this.state.type}
                               index={this.state.index}
                               wrappedComponentRef={(form) => this.formRef = form}
                    />
                </Modal>
                <Modal
                 title="提示信息"
                 okText="确认"
                 cancelText="取消"
                 visible={this.state.deleteshow} onOk={this.deleteOk}
                 onCancel={this.deleteCancel}
                >
                    <p>确认删除吗？</p>
                </Modal>
            </div>
        )
    }
}
export default PatrolPlan=Form.create()(PatrolPlan);
