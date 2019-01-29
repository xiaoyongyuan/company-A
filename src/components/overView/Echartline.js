import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
require('echarts/map/js/china.js');
class Echartline extends Component {
    constructor(props){
        super(props);
        this.state= {
            father:{},
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
    // 报警次数
    alarmnum=()=>{
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                icon:"circle",
                data: [ '阿房宫','明秦王陵'],
                align: 'left',
                right: 10,
                textStyle: {
                    color:[""]
                },
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 35
            },
            grid: {
                left: '10%',
                right: '8%',
                bottom: '33%',
                containLabel: false
            },
            xAxis: [{
                type: 'category',
                name:"天",
                nameTextStyle:{
                    color:"#fff"
                },
                data: ['喀什市',
                    '疏附县',
                    '疏勒县',
                    '英吉沙县',
                    '泽普县',
                    '岳普湖县',
                    '巴楚县',
                    '伽师县',
                    '叶城县',
                    '莎车县 ',
                ],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#586680",
                        width: 1,
                        type: "solid"
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#fff",
                    }
                },
            }],
            yAxis: [{
                name:"次数",
                nameTextStyle:{
                    color:"#fff"
                },
                type: 'value',
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: "#fff",
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#586680",
                        width: 1,
                        type: "solid"
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "#061C3C",
                    }
                },
            }],
            series: [{
                name: '阿房宫',
                type: 'bar',
                data: [20, 50, 80, 58, 83, 68, 57, 80, 42, 66],
                itemStyle: {
                    normal: {
                        barBorderRadius: 50,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#DB8A20'
                        }, {
                            offset: 1,
                            color: '#CF3D29'
                        }]),
                        opacity: 1,
                    }
                }
            },{
                name: '明秦王陵',
                type: 'bar',
                data: [70, 48, 73, 68, 53, 47, 50, 72, 96, 86],
                itemStyle: {
                    normal: {
                        barBorderRadius: 50,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#4BAFD3'
                        }, {
                            offset: 1,
                            color: '#1664C2'
                        }]),
                        opacity: 1,
                    }
                }
            }]
        };
        this.setState({option})
    }
    // 点名次数
    rollcall=()=>{
        var option = {
            tooltip: {
                trigger: 'axis',
                formatter:function(params){
                    var roall=`<div><p>{params[0].marker}{params[0].seriesName}{params[0].data}</p></div>`;
                   console.log(params);
                   return roall;
                },
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            legend: {
                icon:"circle",
                data: ['阿房宫', '明秦王陵'],
                align: 'left',
                right: 10,
                textStyle: {
                    color:["#0D77A4","#CE3929"]
                },
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 35
            },
            grid: {
                left: '10%',
                right: '8%',
                bottom: '15%',
                containLabel: false
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#657D9D'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color:"#BBD1D9"
                    }
                },
                data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35']
            }],
            yAxis: [{
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        color:"#BBD1D9"
                    }
                },
                splitLine: {
                    show:false,
                    lineStyle: {
                        color: '#021833'
                    }
                }
            }],
            series: [{
                name: '阿房宫',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 3
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgba(16,97,204, 0.5)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(17,235,210, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgba(16,97,204,0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(17,235,210,1)'
                        }])
                    },
                    emphasis: {
                        color: 'rgb(0,196,132)',
                        borderColor: 'rgba(0,196,132,0.2)',
                        extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                        borderWidth: 10
                    }
                },
                data: [220, 182, 191, 134, 150, 120, 110, 125 ]
            }, {
                name: '明秦王陵',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 3
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(205,52,42, 0.5)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(235,235,21, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    },
                },
                itemStyle: {
                    normal: {

                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgba(235,234,21,0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(205,52,42,1)'
                        }])
                    },
                    emphasis: {
                        color: 'rgb(99,250,235)',
                        borderColor: 'rgba(99,250,235,0.2)',
                        extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                        borderWidth: 10
                    }
                },
                data: [120, 110, 125, 145, 122, 165, 122, 220]
            }  ]
        };
        this.setState({option})

    }
    //巡更次数
    patrol=()=>{
        let option = {
            grid: {
                left: '13%',
                right: '8%',
                bottom: '13%',
                top: '20%',
            },
            legend: {
                icon:"circle",
                data: ['阿房宫', '明秦王陵'],
                align: 'left',
                right: 10,
                textStyle: {
                    color:["#BD3827","#2971CD"]
                },
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 35
            },
            xAxis: [{
                type: 'category',
                boundaryGap: true,
                axisLine: { //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: '#5B6B89'
                    },
                },
                axisLabel: { //坐标轴刻度标签的相关设置
                    textStyle: {
                        color: '#d1e6eb',
                        margin: 15,
                    },
                },
                axisTick: {
                    show: false,
                },
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', ],
            }],
            yAxis: [{
                type: 'value',
                min: 0,
                max: 980,
                splitNumber: 5,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#07234B'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#5B6B89'
                    },
                },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: '#d1e6eb',

                    },
                },
                axisTick: {
                    show: false,
                },
            }],
            series: [{
                name: '阿房宫',
                type: 'line',
                // smooth: true, //是否平滑曲线显示
                // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                showAllSymbol: true,
                symbol: 'emptyCircle',
                symbolSize: 6,
                lineStyle: {
                    normal: {
                        color: "#BD3827", // 线条颜色
                    },
                    borderColor: '#f0f'
                },
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#fff',
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#D53A25",

                    }
                },
                tooltip: {
                    show: false
                },
                data: [393, 438, 485, 631, 689, 824, 987]
            }, {
                name: '明秦王陵',
                type: 'bar',
                barWidth: 20,
                tooltip: {
                    show: false
                },
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#fff',
                    }
                },
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [{
                                offset: 0,
                                color: '#14c8d4'
                            },
                                {
                                    offset: 1,
                                    color: '#2971CD'
                                }
                            ]
                        ),
                        /*color: function(params) {
                            var colorList = ['#0ec1ff', '#10cdff', '#12daff', '#15ebff', '#17f8ff', '#1cfffb', '#1dfff1'];
                            return colorList[params.dataIndex];
                        }*/
                    }
                },
                data: [200, 382, 102, 267, 186, 315, 316]
            }]
        };
        this.setState({option})
    }
    render() {
        return (
            <ReactEcharts
                option={this.state.option}
                style={{height:this.props.winhe+'px'}}
                onEvents={this.onClickByModel}
            />
        )
    }
}

export default Echartline;