import React, { Component } from 'react';
import QRCode from "qrcode.react";
class LoginCode extends Component{
    constructor(props){
        super(props);
        this.state={
            url:""
        }
    }
    componentDidMount() {
        this.setState({
            url:"http://i.aokecloud.cn/"
        })
    }
    render() {
        return (
            <div className="login-code" style={{display:this.props.typeState?"block":"none"}}>
                <QRCode size={150} value={this.state.url}/>
            </div>
        );
    }
}
export default LoginCode