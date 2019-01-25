import React,{Component} from "react";
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
class RollcallStatistics extends Component{
    render() {
        var data = [{
            "name": "一月",
            "value": 80
        }, {
            "name": "二月",
            "value": 87.8
        }, {
            "name": "三月",
            "value": 71
        }, {
            "name": "四月",
            "value": 80
        }, {
            "name": "五月",
            "value": 66
        }, {
            "name": "六月",
            "value": 80
        }, {
            "name": "七月",
            "value": 80
        }];
        var xData = [],
            yData = [];
        var min = 50;
        data.map(function(a, b) {
            xData.push(a.name);
            if (a.value === 0) {
                yData.push(a.value + min);
            } else {
                yData.push(a.value);
            }
        });
        let option = {
           /* backgroundColor:"#323A5D",*/
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        opacity: 0
                    }
                },
                formatter: function(prams) {
                    if (prams[0].data === min) {
                        return "合格率：0%"
                    } else {
                        return "合格率：" + prams[0].data + "%"
                    }
                }
            },
            legend: {
                data: ['直接访问', '背景'],
                show: false
            },
            grid: {
                left: '5%',
                right: '3%',
                bottom: '5%',
                top: '7%',
                containLabel: true,
                z: 22
            },
            xAxis: [{
                type: 'category',
                gridIndex: 0,
                data: xData,
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#323A5D'
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#ffffff',
                    fontSize:14
                }
            }],
            yAxis: [{
                type: 'value',
                gridIndex: 0,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                min: min,
                max: 100,
                axisLine: {
                    lineStyle: {
                        color: '#323A5D'
                    }
                },
                axisLabel: {
                    color: '#ffffff',
                    formatter: '{value} %'
                }
            },
                {
                    type: 'value',
                    gridIndex: 0,
                    min: min,
                    max: 100,
                    splitNumber: 12,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
                        }
                    }
                }
            ],
            series: [{
                name: '合格率',
                type: 'bar',
                barWidth: '30%',
                xAxisIndex: 0,
                yAxisIndex: 0,
                itemStyle: {
                    normal: {
                        barBorderRadius: 30,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [{
                                offset: 0,
                                color: '#00feff'
                            },
                                {
                                    offset: 0.5,
                                    color: '#027eff'
                                },
                                {
                                    offset: 1,
                                    color: '#0286ff'
                                }
                            ]
                        )
                    }
                },
                data: yData,
                zlevel: 11

            },
                {
                    name: '背景',
                    type: 'bar',
                    barWidth: '50%',
                    xAxisIndex: 0,
                    yAxisIndex: 1,
                    barGap: '-135%',
                    data: [100, 100, 100, 100, 100, 100, 100],
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,255,255,0.1)'
                        }
                    },
                    zlevel: 9
                },

            ]
        };
        return (
            <ReactEcharts
                option={option}
                className="react_for_echarts rollcallStatistics"
            />
        );
    }
}
export default RollcallStatistics;
