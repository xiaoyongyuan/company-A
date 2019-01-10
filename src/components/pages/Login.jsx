/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData } from '@/action'; //action->index按需取
import bg from '../../style/imgs/bg.jpg';
import "../../style/ztt/img/icon/iconfont.css";
import {qrcode} from "../../axios/tools";
import QRCode from "qrcode.react";
const FormItem = Form.Item;
var count=0;
let qrcodeSet=undefined;//控制二维码请求结果定时器
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            typeState:0,//控制扫码登录和密码登录
            qrcodeStatus:0,//控制二维码失效页面
            qrcode:""
        }
    }
    //请求二维码
    handleQrcoderequest =()=>{
        //60秒之后归零
        count=0;
        qrcode({url:"/login/get_qrcode"},(res)=>{
            if(res.success){
                this.setState({
                    qrcode:res.qrcode,
                    qrcodeStatus:0
                },()=>{
                    this.hanleQrcode();
                })
            }
        });
    };
    //二维码请求结果
    hanleQrcode =()=>{
        qrcodeSet= setInterval(()=>{
            qrcode({url:"/login/qrcode_ret",data:{qrcode:this.state.qrcode}},(res)=>{
                if(count<60){
                    count++;
                    console.log(count,"1111")
                }else if(count==60){
                    clearInterval(qrcodeSet);
                    this.setState({
                        qrcodeStatus:1
                    });
                }
                if(res.success){
                    clearInterval(qrcodeSet);
                    this.setState({
                        account:res.ret.user,
                        comid:res.ret.comid
                    });
                    if(this.state.user!=="" && this.state.comid!==""){
                        this.loginLast();
                    }
                }

            });
        },1000);
    };
    handlerImg = ()=>{
        if(this.state.typeState===0){
            //请求二维码
            this.handleQrcoderequest();
            this.setState({
                typeState:1
            })
        }else if(this.state.typeState===1){
            clearInterval(qrcodeSet);
            this.setState({
                typeState:0,
                qrcodeStatus:0
            })
        }
    };
    //二维码登录
    loginLast =()=>{
        let values={
            account:this.state.account,
            comid:this.state.comid
        };
        const { fetchData } = this.props;
        fetchData({funcName: 'webapp', url:'/login/verify_qrcode', params:values, stateName:'auth'});
    }
    componentWillMount() {
        const { receiveData } = this.props;
        receiveData(null, 'auth');
    }
    componentDidUpdate(prevProps) { 
        const { auth: nextAuth = {}, history } = this.props;
        if (nextAuth.data && nextAuth.data.success) {
            localStorage.setItem('token', nextAuth.data.token);
            localStorage.setItem('user', JSON.stringify(nextAuth.data.data));
            localStorage.setItem('comid', nextAuth.data.data.companycode);
            localStorage.setItem('account', nextAuth.data.data.account);
            if(nextAuth.data.data.ctype==='5'){
                history.push('/app/userhome/index');
            }else{
                history.push('/app/companyhome/index');
            }
            
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        //在从此处登录，并记录下来
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //获取到的表单的值values
                const { fetchData } = this.props;
                fetchData({funcName: 'webapp', url:'/login/verify', params:values, stateName:'auth'});
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login" style={{backgroundImage: 'url(' + bg + ')'}}>
                <div className="login-form" >
                    <div className="login-top" >
                        <div className="login-form1">
                            <div className="master-login-title">{this.state.typeState?this.state.loginTitle="扫码登录":this.state.loginTitle="密码登录"}</div>
                            <div className={"pwdBtn iconfont"+(this.state.typeState?" icon-diannao ":" icon-erweima")} onClick={this.handlerImg}></div>
                        </div>
                    </div>
                    <div className="qrcode">
                        <div  className="login-code" style={{display:this.state.typeState?"block":"none"}}>
                            <QRCode size={150} value={this.state.qrcode} />
                        </div>
                        <div className="qrcodeModel" style={{display:this.state.qrcodeStatus?"block":"none"}}>
                            <p className="qrcodeModelFont">二维码已失效</p>
                            <Button type="primary"  className="btn" onClick={this.handleQrcoderequest}>刷新二维码</Button>
                        </div>
                    </div>
                    <Form onSubmit={this.handleSubmit}  style={{display:this.state.typeState?"none":"block",maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('account', {
                                rules: [{ required: true, message: '请输入用户名(手机号)!'
                                 },{
                                    pattern: new RegExp(/^1(3|4|5|7|8)\d{9}$/, "g"),
                                    message: '请输入正确的手机号！'
                                 }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToPorps = state => {
    const { auth } = state.httpData;
    return { auth };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));  

//第一个参数输入值，第二个输出。
//使用context取值