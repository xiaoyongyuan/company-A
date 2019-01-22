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
            color:['#165ecc','#13fcff'],
            legend: { //图标设置

                x: '50%',
                top: '-2%',
                data:[{
                    name: '阿房宫',
                    icon: 'circle',
                    textStyle: {
                        color: '#165ecc',
                    }
                },{
                    name: '明秦王陵遗址',
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
                bottom: '37%',
                top: '11%',
                containLabel: false
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23',],
                name:'时',
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
                name:'次',
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
                    data:[11 ,9 ,3 ,1 ,0,0 ,0 ,0 ,0 ,0 ,0 ,0,1 ,76 ,172 ,97 ,148,131 ,233 ,250 ,173 ,182 ,126 ,36]
                },
                {
                    name:'明秦王陵遗址',
                    type:'line',
                    stack: '总量',
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#13fcff'
                            }
                        }
                    },
                    data:[1 ,4 ,0 ,0 ,2,1 ,0 ,0 ,1 ,3 ,6 ,0,1 ,0 ,4 ,14 ,125,89 ,22 ,10 ,31 ,11 ,11 ,13]
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
                bottom: '13%',
                top: '20%',
                containLabel: false
            },
            legend: {
                x: '65%',
                top: '0%',
                data:[{
                    name: '明秦王陵遗址',
                    icon: 'circle',
                    textStyle: {
                        color: '#13fcff',
                    }
                }
                ],
            },
            calculable: true,
            xAxis: [{
                show: true,
                type: 'category',
                boundaryGap: true,
                data: ["16","17","18","19","20","21","22"],
                name:'日',
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
                    name: '次',
                    axisLine: {
                        onZero: false,
                        show: false,
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
                        show: false,
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
                name: '明秦王陵遗址',
                type: 'bar',
                barWidth: '10px',
                symbol: 'symbol',
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
                data: [1, 0, 6, 0, 0, 1, 15]
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
                        right: "10%",
                        top:'26%',
                        bottom: "0%",
                        containLabel: true
                    },
                    legend: { //图标
                        x: '50%',
                        top: '0',
                        data: ['明秦王陵遗址', '阿房宫'],
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
                            fontSize: 14*scale,
                            padding: [0, 0, 10, 0]
                        }
                    }],
                    xAxis: [{
                        type: "category",
                        data: ["16","17","18","19","20","21","22"],
                        axisLabel: {
                            padding: [0, 15, 0, 0],
                            textStyle: {
                                color: '#fff', //x轴字体
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
                                color: '#fff', //x轴线颜色
                            }
                        },
                        splitLine: {
                            show:false,
                            lineStyle: {
                               show:false,
                              
                            }
                        },
                        name: '日',
                        nameTextStyle: {
                            color: "#fff",
                            fontSize: 14*scale,
                            padding: [0, 0, 10, 0]
                        }
                    }],

                    series: [{
                        name: "明秦王陵遗址",
                        type: "bar",
                        data: [0,0,5,0,0,0,8],
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
                        data: [0,0,0,0,0,0,9],
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