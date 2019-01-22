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
            // tooltip: {
            //     trigger: 'axis'
            // },
            legend: { //图标设置
                x: '60%',
                top: '0%',
                data:[{
                    name: '阿房宫',
                    icon: 'circle',
                    textStyle: {
                        color: '#165ecc',
                    }
                },{
                    name: '明秦王陵',
                    icon: 'circle',
                    textStyle: {
                        color: '#13fcff'
                    }
                }
                ],
            },
            grid: { //图像的位置
                left: '10%',
                right: '8%',
                bottom: '30%',
                top: '10%',
                containLabel: false
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['2','4','6','8','10','12','14','16','18','20','22','24'],
                name:'小时',
                nameTextStyle:{
                    color:'#788cae'
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#7d91b4',  //更改坐标轴文字颜色
                        fontSize : 14      //更改坐标轴文字大小
                    }
                },
            },
            yAxis: {
                type: 'value',
                name:'次数',
                nameTextStyle:{
                    color:'#788cae'
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#7d91b4',  //更改坐标轴文字颜色
                        fontSize : 14      //更改坐标轴文字大小
                    }
                },
            },
            series: [
                {
                    name:'阿房宫',
                    type:'line',
                    stack: '总量',
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#165ecc'
                            }
                        }
                    },
                    data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90]
                },
                {
                    name:'明秦王陵',
                    type:'line',
                    stack: '总量',
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#13fcff'
                            }
                        }
                    },
                    data:[220, 182, 191, 234, 290, 330, 310,220, 182, 191, 330, 310]
                }
            ]
        }
        this.setState({option})
    }
    // 点名次数
    rollcall=()=>{
        var option = {
            tooltip: {
                trigger: 'axis'
            },

            textStyle: {
                color: '#32cbd7',
                fontSize: '10px'
            },
            grid: { //图像的位置
                left: '10%',
                right: '8%',
                bottom: '10%',
                top: '15%',
                containLabel: false
            },
            legend: {
                x: '60%',
                top: '0%',
                data:[{
                    name: '阿房宫',
                    icon: 'circle',
                    textStyle: {
                        color: '#165ecc',
                    }
                },{
                    name: '明秦王陵',
                    icon: 'circle',
                    textStyle: {
                        color: '#13fcff'
                    }
                }
                ],
            },
            calculable: true,
            xAxis: [{
                show: true,
                type: 'category',
                boundaryGap: true,
                data: [1,2,3,4,5,6,7],
                name:'天',
                //刻度线是否显示
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    show: true
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        // 使用深浅的间隔色
                       color: '#7d91b4'
                    }
                }
            }],
            yAxis: [{
                    type: 'value',
                    name: '厂用电率',
                    axisLine: {
                        onZero: false,
                        show: true,
                        symbol: ['none', 'arrow'],
                        symbolSize: [10, 10],
                        symbolOffset: [0, 10],
                        lineStyle: {
                            color: '#7d91b4'
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgb(20,203,215,0.2)'
                        }
                    }
                },
                {
                    type: 'value',
                    name: '',
                    axisLine: {
                        show: false,
                        symbol: ['none', 'arrow'],
                        symbolSize: [10, 10],
                        symbolOffset: [0, 10],
                        lineStyle: {
                            color: 'rgb(20,203,215,0.2)'
                        },
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {}
                }
            ],
            series: [{
                name: '阿房宫',
                type: 'line',
                symbol: 'symbol',
                itemStyle: {
                    normal: {
                        color: '#2cdece',
                        lineStyle: {
                            color: '#13fcff'
                        }
                    }
                },
                data: [
                    1,
                    3,
                    5,
                    6,
                    3,
                    13,
                    11
                ]
            },{
                name: '明秦王陵',
                type: 'bar',
                barWidth: '10px',
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: [30, 30, 0, 0],
                        //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [{
                                    offset: 0,
                                    color: '#0394ef'
                                },
                                {
                                    offset: 0.5,
                                    color: '#047ee4'
                                },
                                {
                                    offset: 1,
                                    color: '#066ada'
                                }
                            ]
                        )
                    }
                },
                data: [10, 52, 200, 334, 390, 330, 220]
            }]
        };
        this.setState({option})

    }
    //巡更次数
    patrol=()=>{
        var color = "#189cbb";var scale = 1;
        let data=[{name:'2017-12-09',value:4},{name:'2017-12-10',value:6},{name:'2017-12-11',value:2},{name:'2017-12-12',value:5},{name:'2017-12-13',value:3},{name:'2017-12-14',value:2},{name:'2017-12-15',value:2}]
        let option = {
                    grid: { //图的位置
                        left: "3%",
                        right: "7%",
                        top:'8%',
                        bottom: "0%",
                        containLabel: true
                    },
                    legend: { //图标
                        data: ['明秦王陵', '阿房宫'],
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    yAxis: [{
                        type: "value",
                        max: 10,
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                                fontSize: 14*scale,
                            }
                        },
                        axisTick: {
                            show: false,
                            lineStyle: {
                                color: color,
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff', //y轴线颜色
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                
                                
                            }
                        },
                        name: '次',
                        nameTextStyle: {
                            color: "#fff",
                            fontSize: 16*scale,
                            padding: [0, 0, 10, 0]
                        }
                    }],
                    xAxis: [{
                        type: "category",
                        data: [1,2,3,4,5,6,7],
                        axisLabel: {
                            padding: [0, 15, 0, 0],
                            textStyle: {
                                color: '#fff', //x轴字体
                                fontSize: 16*scale,
                            }
                        },
                        axisTick: {
                            show: false,
                            lineStyle: {
                                color: color,
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff', //x轴线颜色
                            }
                        },
                        splitLine: {
                            show:false,
                            lineStyle: {
                               show:false,
                              
                            }
                        },
                        name: '天',
                        nameTextStyle: {
                            color: "#fff",
                            fontSize: 16*scale,
                            padding: [0, 0, 10, 0]
                        }
                    }],

                    series: [{
                        name: "明秦王陵",
                        type: "bar",
                        data: data,
                        barWidth: '30%',
                        barCategoryGap: "35%",
                        label: {
                            normal: {
                                show: false,
                                position: "top",
                                distance:20,
                                formatter: function(params) {
                                    return params.data.value;
                                },
                                textStyle: {
                                    color: "#ffc72b",
                                    fontSize: 16*scale
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: "#04dad5" // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: "#009cd2" // 100% 处的颜色
                                }], false),
                            }
                        },
                        markLine: {
                            symbol: 'none',
                            data: [{
                                type: 'average',
                                valueIndex: 1,
                                lineStyle: {
                                    normal: {
                                        color: color,
                                        type: 'dashed',
                                        width: 0,
                                    }
                                },
                                label: {
                                    normal: {
                                        show: false,
                                    }
                                },
                            }]
                        },
                    },{
                        name: "阿房宫",
                        type: "bar",
                        data: data,
                        barWidth: '30%',
                        barCategoryGap: "35%",
                        label: {
                            normal: {
                                show: false,
                                position: "top",
                                distance:20,
                                formatter: function(params) {
                                    return params.data.value;
                                },
                                textStyle: {
                                    color: "#ffc72b",
                                    fontSize: 16*scale
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: "#0b8fc7" // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: "#0c59d0" // 100% 处的颜色
                                }], false),
                            }
                        },
                        markLine: {
                            symbol: 'none',
                            data: [{
                                type: 'average',
                                valueIndex: 1,
                                lineStyle: {
                                    normal: {
                                        color: color,
                                        type: 'dashed',
                                        width: 0,
                                    }
                                },
                                label: {
                                    normal: {
                                        show: false,
                                    }
                                },
                            }]
                        },
                    }]
                };
        this.setState({option})
    }
    render() {
        const _this=this;
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