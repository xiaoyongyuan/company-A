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
                        areaColor: "#35425F",
                        shadowColor: 'rgba(128, 217, 248, 1)',
                        // shadowColor: 'rgba(255, 255, 255, 1)',
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                    },
                    emphasis:{
                        areaColor:"#35425F" //悬浮时的颜色
                    },
                }
            },
            series:[
                {
                    name: 'light',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: [
                            {name:'',
                                value:[109.02390003204346,34.17467198883092],
                                symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                            },
                            {name:'',
                                value:[109.02390003204346,34.17229311310708],
                                symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                            },
                        {name:'',
                            value:[109.02390003204346,34.17467198883092],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                        },
                        {name:'',
                            value:[109.02390003204346,34.16998518451599],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                        },
                        {name:'',
                            value:[109.02390003204346,34.16760617668499],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                        },

                        {name:'',
                            value:[109.0239429473877,34.16526261087611],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                        },
                        {name:'',
                            value:[109.0239429473877,34.16295449004889],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                        },
                        {name:'',
                            value:[109.0239429473877,34.160646306117926],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                        },
                        {name:'',
                            value:[109.0239429473877,34.158302547099595],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                        },
                        {name:'',
                            value:[109.0239429473877,34.15599423599647],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                        },
                        {name:'',
                            value:[109.01188373565674,34.17463648371606],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                        },
                        {name:'',
                            value:[109.01188373565674,34.17002069158771],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                        },
                        {name:'',
                            value:[109.01188373565674,34.167677192815034],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                        },
                        {name:'',
                            value:[109.01192665100098,34.1653691380062],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                        },
                        {name:'',
                            value:[109.01192665100098,34.16306102009149],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                        },
                        {name:'',
                            value:[109.01192665100098,34.16071732810289],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
                        },
                        {name:'',
                            value:[109.01201248168945,34.156136287732515],
                            symbol:'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548927397272&di=d988a5c1ff9ecd5785406657a15e3587&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm2%2FM06%2F79%2FC0%2FwKhQcVRABumEB1GZAAAAABycr1Q784.jpg..700x700.jpg'
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
                            show: false
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
                            show: false,
                            // color: '#3F5874', //hover时字的颜色
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
                style={{height:'450px'}}
            />
        )
    }
}

export default Scenedata;