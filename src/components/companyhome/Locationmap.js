import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import shanxi1 from "../../style/ztt/map/shanxi1";
class Locationmap extends Component {
    onByModelClick = (e)=>{
        if(e.componentType === "series"){
            window.location.href="#/app/companyhome/companyscene?code="+this.props.codeID
        }
    }
    onClickByModel={
        'click':this.onByModelClick
    }
    render() {
        const option={
          /*  backgroundColor: '#1F5D9A',*/
            background:"#404a59",
            geo: {
                map: 'shanxi1',
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
                        areaColor:"#3C82B5",
                        borderColor:"#78CDE5"
                    },
                    emphasis:{
                        areaColor:"#3A80B4"
                    }
                }
            },
            series:[
                {
                    type:"effectScatter",// series图表类型
                    coordinateSystem:"geo",// series坐标系类型
                    data:this.props.datasMap, // series数据内容
                    effectType:"ripple",
                    itemStyle: {
                        normal: {
                            color: '#D5656E',
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
        return (
            <ReactEcharts
                option={option}
                style={{height: '480px', width: '100%'}}
                className={'react_for_echarts'}
                onEvents={this.onClickByModel}
            />
        )
    }
}

export default Locationmap;