/**
 * 头部登录人信息
 */
import React, { Component } from 'react';
import { Menu, Icon, Layout, Popover,Modal } from 'antd';
import screenfull from 'screenfull';
import icon_admin from '../style/imgs/icon_admin.png';
import icon_user from '../style/imgs/icon_user.png';
import SiderCustom from './SiderCustom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
    state = {
        user: '',
        visible: false,
    };
    componentDidMount() {
        const _user = JSON.parse(localStorage.getItem('user'));
        if(!_user){
            this.props.history.push('/login');
        }else{
            this.setState({
                user: _user
            });
        }
    };
    screenFull = () => { //全屏
            screenfull.toggle();
        if (screenfull.enabled) {
            // screenfull.request();
        }
    };
    menuClick = e => {
        e.key === 'logout' && this.logout();
    };

    showModaldelete = () =>{ //退出
        this.setState({
            deleteshow: true,
        });
    }
    deleteOk = () =>{//确认退出
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.props.history.push('/login')
    };
    deleteCancel = () =>{//取消退出
        this.setState({
            deleteshow: false,
        });
    };

    logout = () => { //退出
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.props.history.push('/login')
    };
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };
    render() {
        const { responsive, path } = this.props;
        return (
            <div style={{background:'#313653'}}>
            <Header className="custom-theme header" >
                {
                    responsive.data.isMobile ? (
                        <Popover content={<SiderCustom path={path} popoverHide={this.popoverHide} />} trigger="click" placement="bottomLeft" visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
                            <Icon type="bars" className="header__trigger custom-trigger" />
                        </Popover>
                    ) : (
                        <Icon
                            className="header__trigger custom-trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    )
                }
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '63px', float: 'right' }}
                    onClick={this.menuClick}
                >
                    <Menu.Item style={{borderBottom:'2px solid #31365'}} key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
                    <SubMenu style={{borderBottom:'2px solid #31365'}} title={<span className="avatar"><img src={this.props.user.utype==='1'?icon_user:icon_admin} alt="头像" /></span>}>
                        <MenuItemGroup title="用户中心" style={{background:"rgba(255,255,255,0.5)"}}>
                            <Menu.Item key="setting:1">你好 - {this.props.user.realname}</Menu.Item>
                            {/*<Menu.Item key="setting:2">个人信息</Menu.Item>*/}
                            <Menu.Item key="logoutto" onClick={this.showModaldelete}><span>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
            </Header>

            <Modal title="提示信息" visible={this.state.deleteshow} onOk={this.deleteOk}
                   width={370}
                onCancel={this.deleteCancel}
                okText="确认"
                cancelText="取消"
            >
            <p>确认退出吗？</p>
            </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {  
// const  {responsive}=state.httpData;
    const { responsive = {data: {}} } = state.httpData;
    return {responsive};
};

export default withRouter(connect(mapStateToProps)(HeaderCustom));
