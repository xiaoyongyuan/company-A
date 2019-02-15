import React,{ Component } from "react";
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import xianmap from "../../style/ztt/map/xianmap";
class  MapXian extends Component{
    render() {
        echarts.registerMap('xian', xianmap);
       var geoCoordMap=this.props.mapJson;
        var goData =this.props.mapValue;
        /*var geoCoordMap = {
            '阿房宫': [108.83, 34.26],
            '明秦王陵遗址': [108, 34],
            "西安文物局":[108.93, 34.34]
        };*/
       /* var goData = [{
            name: '阿房宫',
            value: 16079
        },{
            name: '明秦王陵遗址',
            value: 6275
        },{
            name: '西安文物局',
            value: 89
        }];*/
        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
        var convertData = function(name, data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var fromCoord = geoCoordMap[name];
                var toCoord = geoCoordMap[data[i].name];
                if (fromCoord && toCoord) {
                    res.push({
                        //对换即可调整方向
                        coords: [toCoord, fromCoord]
                    });
                }
            }
            return res;
        };
        var series = [];
        [
            ['西安文物局', goData],
        ].forEach(function(item) {
            series.push({
                name: 'item[0]',
                type: 'lines',
                zlevel: 2,
                //线特效配置
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.1,
                    symbol: planePath, //标记类型
                    symbolSize: 10
                },
                lineStyle: {
                    normal: {
                        width: 1,
                        opacity: 0.4,
                        curveness: 0.2, //弧线角度
                        color: '#FFEA93'
                    }
                },
                data: convertData(item[0], item[1])
            }, {  //终点
                name: 'item[0]',
                type: 'effectScatter',
                coordinateSystem: 'geo',
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
                zlevel: 2,
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
                symbol: 'circle',
                //圆点大小
                symbolSize:10,
                data: item[1].map(function(dataItem) {
                    return {
                        name: dataItem.name,
                        value: geoCoordMap[dataItem.name]
                    };
                })

            }, {//起点
                name: 'item[0]',
                type: 'effectScatter',
                coordinateSystem: 'geo',
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
                zlevel: 2,
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
                symbolSize:1 ,
                symbol: 'circle',
                data: [{
                    name: item[0],
                    value: geoCoordMap[item[0]]
                }]

            })

        });
        let option={
            background:"#091e57",
            tooltip:{
                trigger: 'item',
                backgroundColor: "rgba(11,71,153,0.7)",
                formatter:function () {

                    //console.log(this.state.tootilp,"ssss");
                    // var mapList=`<div><p>${params.name}</p><p>报警次数：${params.name}</p><p>设备数：${params.name}</p><div>`;
                }
            },
            geo: {
                map: 'xian',
                roam: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                            [{ offset: 0, color: '#80D6EB' },{ offset: 1, color: '#3B80B4' }]
                        )}
                },
                aspectScale:.8, //长宽比
                zoom:1.2, //当前视角的缩放比例
                //取消鼠标移入地图上的文字
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle:{
                    normal:{
                        areaColor:"#091E57", //地图的背景
                        borderColor:"#0EC8D5" //分界线的颜色
                    },
                    emphasis:{
                        areaColor:"#091e57" //悬浮时的颜色
                    },
                }
            },
            series:series
            /*[{
                    type:"effectScatter",// series图表类型
                    coordinateSystem:"geo",// series坐标系类型
                    //data:this.props.xianmap, // series数据内容
                    data:[{name: "阿房宫", value: [108.83, 34.26]},{name: "明秦王陵遗址", value: [108, 34]}],
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
            ]*/
        }
        return(
            <ReactEcharts option={option}   style={{height:this.props.winhe+'px'}}/>
        );
    }
}
export default MapXian;