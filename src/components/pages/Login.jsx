/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData } from '@/action'; //action->index按需取
import bg from '../../style/imgs/bg.jpg';

const FormItem = Form.Item;
class Login extends React.Component {
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
                    <div className="login-logo">
                        <span>用户登录</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('account', {
                                rules: [{ required: true, message: '请输入用户名!',
                                    pattern: new RegExp(/^1(3|4|5|7|8)\d{9}$/, "g")
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