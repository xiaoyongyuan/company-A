import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import scenemap from "../../style/ztt/map/scenemap";
import xianmap from "../../style/ztt/map/xianmap";

class Scenedata extends Component {
    constructor(props){
        super(props);
        this.state= {
            option:{},
            type:'rollcall',
            width:'400px',
            height:'300px',
        }
    }
    componentWillMount(){
        this.setState({
            type:this.props.type,

        })
    }

    componentDidMount(){
        this[this.state.type]()
        
    }
    maps=()=>{ //地图
        echarts.registerMap('xiant', scenemap);
        let option={
            background:"#091e57",
            geo: {
                map: 'xiant',
                roam: true,
                aspectScale:.8, //长宽比 
                zoom:1.2, //当前视角的缩放比例
                //取消鼠标移入地图上的文字
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        //         	color: '#ddd',
                        borderColor: 'rgba(147, 235, 248, 1)',
                        borderWidth: 1,
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(	47,79,79, .2)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(128, 217, 248, 1)',
                        // shadowColor: 'rgba(255, 255, 255, 1)',
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                    },
                    emphasis:{
                        areaColor:"#091e57" //悬浮时的颜色
                    },
                }
            },
            series:[
                {
                    name: 'light',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: [
                        {name:'新阳',
                            value:[108.1389856338501,34.482646536335054],
                            symbol:'rect'
                            // symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548417244157&di=5ccc8987829e1e36b8503789ebb874d8&imgtype=0&src=http%3A%2F%2Fimg9.3lian.com%2Fc1%2Fvector%2F10%2F01%2F178.jpg'
                        },
                        {name:'安康',
                            value:[108.92807006835938,32.715377396161614],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548417244157&di=b378709f7286f9c2d5a7b74343e52909&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F15%2F28%2F06%2F57458PIC5Zb_1024.jpg'
                        }
                        ],
                    symbolSize: 18, //圈圈大小
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false  //字体显示
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4258e'
                        }
                    }
                },
                {
                    type:"effectScatter",// series图表类型
                    coordinateSystem:"geo",// series坐标系类型
                    // data:datasMap, // series数据内容
                    effectType:"ripple", //涟漪特效
                    itemStyle: {
                        normal: {
                            color: '#f4e925', //圈圈的颜色 
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
                            color: '#f4e925', //hover时字的颜色
                        }
                    },
                    symbolSize:20 //涟漪大小
                }
            ]
        }
        this.setState({option})
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
        const _this=this;
        return (
            <ReactEcharts
                option={this.state.option}
                onEvents={this.onClickByModel}
            />
        )
    }
}

export default Scenedata;