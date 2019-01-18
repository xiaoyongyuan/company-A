import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import xianmap from "../../style/ztt/map/xianmap";
require('echarts/map/js/china.js');
class Locationmap extends Component {
    constructor(props){
        super(props);
        this.state= {
            father:{},
            option:{}
        }
    }
    componentWillMount(){
        console.log('this.propsthis.props',this.props)
        this.setState({
            father:this.props
        })
    }
    componentDidMount(){
        echarts.registerMap('xian', xianmap);
        let datasMap=this.state.father.datasMap;
        let option={
            backgroundColor: 'transparent', //背景颜色
            background:"#091e57",
            geo: {
                map: 'xian',
                roam: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                            [{ offset: 0, color: '#80D6EB' },{ offset: 1, color: '#3B80B4' }]
                        )}
                },
                //取消鼠标移入地图上的文字
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle:{
                    normal:{
                        areaColor:"#091e57", //地图的背景
                        borderColor:"#0bf9f9" //分界线的颜色
                    },
                    emphasis:{
                        areaColor:"#091e57" //悬浮时的颜色
                    },
                }
            },
            series:[
                {
                    type:"effectScatter",// series图表类型
                    coordinateSystem:"geo",// series坐标系类型
                    data:datasMap, // series数据内容
                    effectType:"ripple",
                    itemStyle: {
                        normal: {
                            color: '#091e57',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke',
                        scale: 3, //设置缩放
                        period: 2, //设置时间
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true,
                            color: '#000000',
                        }
                    },
                    symbolSize:20
                }
            ]
        }
        this.setState({option},()=>{
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps!==this.state.father){
            this.setState({
                father:nextProps
            },()=>{                
                this.componentDidMount()
            })
        }
    }
    onByModelClick = (e)=>{
        if(e.componentType === "series"){
            window.location.href="#/app/companyhome/companyscene?code="+this.props.codeID
        }
    }

    onClickByModel={
        'click':this.onByModelClick
    }
    render() {
        return (
            <ReactEcharts
                option={this.state.option}
                style={{height: '480px', width: '100%'}}
                className={'react_for_echarts'}
                onEvents={this.onClickByModel}
            />
        )
    }
}

export default Locationmap;