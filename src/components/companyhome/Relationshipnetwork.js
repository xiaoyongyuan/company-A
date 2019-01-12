import React,{Component} from 'react';
import ReactEcharts from 'echarts-for-react';
var mainColor='#ffb402';
var comeColor='#ec407a';
var outColor='#35c2ff';
class Relationshipnetwork extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    render(){
        var links=[{
            source: this.props.myNetwork,
            target: '户县博物馆1',
            /*设置指示线上的字体是否显示*/
            label:{
                show:false
            }
        }, {
            source: this.props.myNetwork,
            target: '户县博物馆2',
            label:{
                show:false
            }
        }, {
            source: '户县博物馆3',
            target: this.props.myNetwork,
            label:{
                show:false
            }
        },{
            source: '户县博物馆4',
            target: this.props.myNetwork,
            label:{
                show:false
            }
        }];
        var datas=[{
            name: '户县博物馆1',
            symbolSize: 60,
            itemStyle:{
                normal:{
                    color:comeColor
                }
            }
        }, {
            name: this.props.myNetwork,
            symbolSize: 80,
            itemStyle:{
                normal:{
                    color:mainColor,
                }
            }
        },{
            name: '户县博物馆2',
            itemStyle:{
                normal:{
                    color:comeColor
                }
            }
        }, {
            name: '户县博物馆4',
            itemStyle:{
                normal:{
                    color:outColor
                }
            }
        }, {
            name: '户县博物馆3',
            itemStyle:{
                normal:{
                    color:outColor
                }
            }
        }];
        const option={
            tooltip: {
                formatter: function(x) {
                    return x.data.des;
                }
            },
            series: [{
                type: 'graph',
                layout: 'force',
                symbolSize: 58,
                roam: true,
                edgeSymbol: ['circle', 'arrow'],
                // edgeSymbolSize: [80, 10],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                force: {
                    /*调整线条的长短*/
                    repulsion: 3500,
                    edgeLength: [10, 50]
                },
                draggable: true,
                itemStyle: {
                    normal: {
                        color: '#4b565b'
                    }
                },
                lineStyle: {
                    normal: {
                        width: 2,
                        color: '#4b565b'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        textStyle: {}
                    }
                },
                data: datas,
                links:links
            }]
        };
        return(
            <ReactEcharts
                option={option}
                style={{height: '490px', width: '100%'}}
                className={'react_for_echarts'}
            />
        )
    }
}
export default Relationshipnetwork