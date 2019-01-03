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
            <div>
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
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}
                >
                    <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
                    {/*<Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item>*/}
                    <SubMenu title={<span className="avatar"><img src={this.props.user.utype==='1'?icon_user:icon_admin} alt="头像" /></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {this.props.user.realname}</Menu.Item>
                            {/*<Menu.Item key="setting:2">个人信息</Menu.Item>*/}
                            <Menu.Item key="logoutto"><span onClick={this.showModaldelete}>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                        {/*<MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>*/}
                    </SubMenu>
                </Menu>
            </Header>

            <Modal title="提示信息" visible={this.state.deleteshow} onOk={this.deleteOk}
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
