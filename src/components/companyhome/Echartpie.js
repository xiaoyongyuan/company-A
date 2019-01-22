import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import xianmap from "../../style/ztt/map/xianmap";
require('echarts/map/js/china.js');
class Echartpie extends Component {
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
    xianmap=()=>{ //地图
        echarts.registerMap('xian', xianmap);
        let datasMap=this.state.father.datasMap;
        let option={
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
                    name: 'light',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: [{name:'33333',value:[109.06,34.32]}],
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
                            color: '#F4E925'
                        }
                    }
                },
                {
                    type:"effectScatter",// series图表类型
                    coordinateSystem:"geo",// series坐标系类型
                    data:datasMap, // series数据内容
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
    
    // 可查看单位
    lookcomp=()=>{
        let option = {
            title: {
                text: "2个",
                subtext: '可查看单位',
                x: 'center',
                y: 'center',
                textStyle: {
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 'normal'
                },
                subtextStyle: {
                    color: "rgba(255,255,255,.45)",
                    fontSize: 14,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            calculable: true,
            series: [
                {
                    name: '阿房宫',
                    type: 'pie',
                    radius: [60, 90],
                    center: ['50%', '50%'],
                    data: [{
                            value: 34,
                            name: '阿房宫',
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: '#f6e3a1'
                                }, {
                                    offset: 1,
                                    color: '#ff4236'
                                }])
                            },
                            label: {
                                color: "rgba(255,255,255,.45)",
                                fontSize: 14,
                                formatter: '阿房宫\n{a|34}个',
                                rich: {
                                    a: {
                                        color: "#fff",
                                        fontSize: 20,
                                        lineHeight: 30,
                                    },
                                }
                            }
                        },
                        {
                            value: 52,
                            name: 'rose2',
                            itemStyle: {
                                color: "transparent"
                            }
                        }
                    ]
                },
                {
                    name: '明秦王陵',
                    type: 'pie',
                    radius: [70, 80],
                    center: ['50%', '50%'],
                    data: [{
                            value: 34,
                            name: '明秦王陵',
                            itemStyle: {
                                color: "transparent"
                            }
                        },
                        {
                            value: 52,
                            name: '明秦王陵',
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: '#348fe6'
                                }, {
                                    offset: 1,
                                    color: '#625bef'
                                }])
                            },
                            label: {
                                color: "rgba(255,255,255,.45)",
                                fontSize: 14,
                                formatter: '明秦王陵\n{a|52}个',
                                rich: {
                                    a: {
                                        color: "#fff",
                                        fontSize: 20,
                                        lineHeight: 30
                                    },
                                }
                            }
                        }
                    ]
                }
            ]
        };
        this.setState({option})
    }
    //报警分析
    alarmanalyze =()=>{
        let option = {
            color: ['rgba(76, 132, 210, .4)'], 
            series: [{
                name: '未处理报警数',
                type: 'pie',
                clockWise: true,
                radius: ['55%', '65%'],
                center: ['15%', 'center'],
                label: {
                    show: true,
                    normal: {
                        position: 'center',
                        textStyle: {
                            color: '#ffd285',
                        },
                    }
                },
                itemStyle: {
                    normal: {
                        label: {
                            show: true
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                hoverAnimation: false, 
                data: [{
                    value: 90,
                    name: '忽略数',
                    label: {
                        normal: {
                            formatter: '40%',
                            textStyle: {
                                color: '#fff',
                                fontSize: 20

                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: { // 完成的圆环的颜色
                                colorStops: [{
                                    offset: 0,
                                    color: '#00cefc' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#367bec' // 100% 处的颜色
                                }]
                            },

                            labelLine: {
                                show: true
                            }
                        } 
                    }
                }, {
                    value: 10,
                    label: {
                        normal: {
                            formatter: '\n未处理报警数',
                            textStyle: {
                                color: '#fff',
                                fontSize: 14
                            }
                        }
                    },
                }]
            },{
                name: '虚报警数',
                type: 'pie',
                clockWise: true,
                radius: ['55%', '65%'],
                center: ['38%', 'center'],
                label: {
                    show: true,
                    normal: {
                        position: 'center',
                    }
                },
                itemStyle: {
                    normal: {
                        label: {
                            show: true
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                hoverAnimation: false, 
                data: [{
                    value: 90,
                    name: '虚报警数',
                    label: {
                        normal: {
                            formatter: '10%',
                            textStyle: {
                                color: '#fff',
                                fontSize: 20

                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: { // 完成的圆环的颜色
                                colorStops: [{
                                    offset: 0,
                                    color: '#00cefc' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#367bec' // 100% 处的颜色
                                }]
                            },

                            labelLine: {
                                show: true
                            }
                        } 
                    }
                }, {
                    value: 10,
                    label: {
                        normal: {
                            formatter: '\n虚报警数',
                            textStyle: {
                                color: '#fff',
                                fontSize: 14
                            }
                        }
                    },
                }]
            },{
                name: '忽略数',
                type: 'pie',
                clockWise: true,
                radius: ['55%', '65%'],
                center: ['61%', 'center'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                label: {
                    show: true,
                    normal: {
                        position: 'center',
                        textStyle: {
                            color: '#ffd285',
                        },
                    }
                },
                hoverAnimation: false, 
                data: [{
                    value: 90,
                    name: '忽略数',
                    label: {
                        normal: {
                            formatter: '40%',
                            textStyle: {
                                color: '#fff',
                                fontSize: 20

                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: { // 完成的圆环的颜色
                                colorStops: [{
                                    offset: 0,
                                    color: '#00cefc' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#367bec' // 100% 处的颜色
                                }]
                            },

                            labelLine: {
                                show: true
                            }
                        } 
                    }
                }, {
                    value: 10,
                    label: {
                        normal: {
                            formatter: '\n忽略数',
                            textStyle: {
                                color: '#fff',
                                fontSize: 14
                            }
                        }
                    },
                }]
            },{
                name: '确认',
                type: 'pie',
                clockWise: true,
                radius: ['55%', '65%'],
                center: ['85%', 'center'],
                label: {
                    show: true,
                    normal: {
                        position: 'center',
                        textStyle: {
                            color: '#ffd285',
                        },
                    }
                },
                itemStyle: {
                    normal: {
                        label: {
                            show: true
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                hoverAnimation: false, 
                data: [{
                    value: 90,
                    name: '确认',
                    label: {
                        normal: {
                            formatter: '10%',
                            textStyle: {
                                color: '#fff',
                                fontSize: 20

                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: { // 完成的圆环的颜色
                                colorStops: [{
                                    offset: 0,
                                    color: '#00cefc' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#367bec' // 100% 处的颜色
                                }]
                            },

                            labelLine: {
                                show: true
                            }
                        } 
                    }
                }, {
                    value: 10,
                    label: {
                        normal: {
                            formatter: '\n确认',
                            textStyle: {
                                color: '#fff',
                                fontSize: 14
                            }
                        }
                    },
                }]
            }]
        }
        this.setState({option})

    }
    xianmap=()=>{ //地图
        echarts.registerMap('xian', xianmap);
        let datasMap=this.state.father.datasMap;
        let option={
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
                    name: 'light',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: [{name:'33333',value:[109.06,34.32]}],
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
                            color: '#F4E925'
                        }
                    }
                },
                {
                    type:"effectScatter",// series图表类型
                    coordinateSystem:"geo",// series坐标系类型
                    data:datasMap, // series数据内容
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

export default Echartpie;