import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
// import shanxi1 from "../../style/ztt/map/xian";
require('echarts/map/js/china.js');
class Locationmap extends Component {
    constructor(props){
        super(props);
        this.state= {
            father:{},
            option:{}
        }
    }
    componentDidMount(){
        const xian={"type":"FeatureCollection","features":[{"type":"Feature","id":"610100","properties":{"name":"西安市","cp":[108.948024,34.263161],"childNum":2},"geometry":{"type":"MultiPolygon","coordinates":[["@@D@@CMMAIKGMCADADCBEFDDFHABDFFDDDJ@NCF@"],["@@@BBBBBBBDBBBB@DBD@BAD@D@L@FBH@B@B@B@B@B@B@@@BA@@@ABA@C@@BA@@BA@@B@@@B@B@B@BB@@B@@@D@@@B@@AB@@AB@B@B@B@B@B@DBB@B@@@F@BAFCBAB@DAB@B@BBDD@@BFBFBBBBFB@@B@B@@ABAD@@ADA@AD@B@B@B@D@DBBBBBBBB@B@D@B@B@D@B@BA@ABA@ABC@CBA@@@AB@B@B@B@B@B@F@B@B@B@B@D@B@B@BB@BBBBBBBB@DBB@D@F@D@D@B@D@D@FBD@DBB@B@HBDBB@DBDBB@BBBBB@@BBBBB@BBD@B@BBBBBD@@@DBBBDDBD@B@D@D@D@D@BBD@B@D@BBB@BBB@DB@BBB@@BB@BAD@FAB@D@B@D@D@HBFBD@F@D@D@D@DA@@B@B@BBD@BBB@BBB@BBB@@@B@@@BA@@BABA@@DABA@ABA@A@ABA@C@A@CBABC@CDCBAB@BCFADA@A@A@AA@A@AAC@AAAAAA@AA@@C@A@C@GFIBEBAFA@@DC@AAA@@AA@@CAAACAAA@C@@@EBC@SDQBEBEBC@EDQF]@@@C@C@AAA@A@A@A@ABA@ABABA@C@CBE@C@C@A@AVB@@C@@BG@EEBE@CAICIAEACCEGGICC@@GAC@A@CAA@IAC@A@EDC@A@@AGKBIBGBEBI@CBCNAH@BADCBABA@AAA@AA@A@C@CB@@A@C@A@AAAAA@@AACAAAC@ACGCEAC@AAA@G@A@CBA@CBEBABAD@BAD@DAD@BBD@DAB@DABABADA@ABE@A@C@A@ABADABADADCB@BC@A@A@AAAAA@@CA@ABAB@BABA@@@A@A@@@AAA@A@A@C@A@CBABABADADABADAB@DAF@HA@ABABABCBA@A@A@C@A@A@A@AAA@C@AB@BADAD@BAB@B@B@D@D@D@@@@@@A@@@@A@BA@@@@BAB@@@@@@@B@@AA@@@@@@@@@A@@@A@A@@@@@@@@A@@BA@A@@A@@A@@BA@@@@@A@@@@B@@@@@@@@B@@B@@@B@@@B@@@@@@A@@@A@@@@A@@@@@@A@@@C@@@@@@A@@@@@AAAA@@@@@@BA@@@@@@B@@AA@@@@A@@A@@@@@A@@@@@@@@@@AB@@@BAAABA@@@@@AA@@@A@@AA@@AB@@@BA@@@A@A@@AAAA@@A@@A@@@@BAAA@@@@@@A@AAAC@@B@@@@A@@A@@ABA@@@A@@@A@@@@B@@@B@@AA@@AB@@@@@@@@@@@@A@AAA@@@A@@@@A@@A@@@@BA@@A@@@@@AA@@A@@@@@@AB@@@@@A@@@@A@@@@@A@@@@@A@@@@@@B@@@@@@@@@@@@@A@@@@AA@@@@@@@@@B@@A@@@@@A@@@@@@@AA@@@@@@@@@AA@@@@@@@@@@@@@@BA@@@@@@@@@@@@@@@@AA@@@@@@@@@@@@BA@@@@@@@@@@@@@@A@@@A@@@@@@@@@@A@@@@@@B@@@@@@A@@@@@@@@A@@@A@@@@@@@@@@@@@@AB@@@@@@@@@@@@@@@@@@A@@@@@@@@@@@A@@@@A@@A@@@@@@@@@@@@@@B@@A@@@@@@B@@A@@@@@@@@@@@A@@@@@@A@@AA@@@@@@@@@@@BA@@@@@@@@@@@@@A@@@@@@@@@@@@@@@A@@@@@@@@@@@@B@@@@@@@B@@A@@A@@@@@@@@@@@@A@@@@@@@@@@@@B@@@@@@@@A@@@@@@@@@@@A@@@@@@B@@@@@@@@A@@@@@@@A@@@@@A@@@@B@@@@@B@@AB@@@@@@A@@@@@@B@@@@@@A@@AA@@@A@@@@@@@A@@@@@@@@@A@@@@@@A@@@@A@@@@@@@A@@@@@@@A@@@@@@@@@A@@@@@@A@@A@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@A@@B@@@@@@A@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@A@@A@@@@@@@@@@@@@@@@@@B@@@@@@@@@@@B@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@B@BAF@F@F@DADAD@BA@CB@@A@CAABABADA@@DA@ADCBAB@BADABADA@@@@@@DABCBABCB@DADAJADAB@BAB@DAB@BAB@BADABABABADGB@@@@@B@F@DBBBBBB@BBB@D@B@B@DAB@D@DAB@B@D@BBB@B@FBBBBBDD@@BBFAHCD@F@FBB@DADABADAHAHCHAB@DAJELCJA@AFA@@DCJCJCHAB@@@B@BAB@@@BBBBDBBBBBBBBBDBD@DBB@D@@@B@B@B@B@B@@@B@B@@AB@BABABABAB@BADC@@B@D@B@F@B@B@D@BBD@DBDBB@DB@@F@@@@@D@B@D@@@DAD@BAD@DAB@B@B@D@D@B@BAD@B@BABAB@BAB@D@B@D@B@@@B@B@@@BB@@B@BA@ABABC@CBCBA@ABCBA@C@AB@@A@AB@@ABA@@BAB@BAB@BAB@F@BAD@D@B@@@F@B@@AB@@@@@BA@A@A@@AA@@@CA@CCAAAC@AAAACECCCAAAAAC@A@@@@@AB@@@B@B@@@B@B@B@B@DC@@BAB@B@@@D@@@D@@@BBB@DBB@B@B@@@BAB@@AB@B@@@B@@@B@B@@@D@BA@@B@@@BA@@BAB@@AB@@@BCBA@@B@@A@A@@@A@AB@@AB@BA@@B@@@@@BAB@@A@@BABC@AB@BCDA@@BA@@BAB@B@@@B@@BB@FD@@B@BBBBBBB@@@B@@@@AB@@@DEDA@@BA@@BA@ABABABABA@@@AAA@@@AA@CCCAAAC@A@@@AB@@ABABABABA@A@@BA@@@A@AA@AA@@AAA@AC@AACAA@GCA@@@A@@B@@AB@D@@@B@B@BBB@BBBBBBBB@@BDB@@@B@@@@@@AB@@A@@@E@@@ABC@E@C@AA@@AA@ACCCCCECECICEEEGIEEAACCA@CAA@A@A@A@A@A@A@AA@@A@AA@AAAAA@A@A@A@C@A@C@ABC@CAA@A@AAC@A@C@A@A@@AAAAA@AAA@A@C@A@C@A@@@ABA@@BA@@BA@AB@@CDABCBABA@AB@@A@A@A@@@A@@@AAA@A@AA@@A@A@@@A@AB@@AB@@@BAB@@@BA@@B@B@BABA@@BA@@@A@@@@A@@AA@AAAAACAGCAAGAGCEAEAC@C@A@@@A@@BA@ABA@A@ABA@@@ABABA@@BA@@@@A@@AA@@@A@@@ABAAA@@@A@AAA@AAAAAAAACAACAA@EAA@A@C@A@@@AAA@@@AA@@A@@AA@@A@@AA@A@A@A@C@CAA@@@@A@A@@@AAA@A@A@A@A@AAA@A@A@A@A@A@C@C@A@C@A@A@C@C@C@EAC@E@@@IAEBA@A@EA@@A@A@AAA@@@AAAAAC@@@@AAA@@@AAA@C@A@A@@@C@A@@A@@@@@CAA@A@A@AAA@A@@@@AAAAA@CACAA@A@AA@@A@@A@@@AAA@@@A@C@A@@@A@ABABA@@BA@@FCBA@@BA@A@A@@AAAAAAA@AAAAE@A@AAEAA@@AA@@A@@@A@A@GBA@C@AAAAC@AAC@@CI@AAE@CA@AAAAAAAABABABABA@A@AA@@AAAAAAAAAAA@A@A@ABABAB@DA@ABAB@BADAB@DADABAB@BABAFC@AB@DABADADCB@B@BAB@B@BAD@BAB@BADAB@D@BAB@DABABA@ABADCB@BADABAD@NAFE@GCIIE@A@@@A@A@A@C@ABA@A@A@CBA@C@A@AAA@AAA@A@C@A@AACAA@AAC@AAAE@A@C@A@A@C@A@A@CBA@A@C@AAA@AAAA@@CCCAA@A@A@A@A@AA@AA@@A@AAA@AA@AAA@AAAAAAAAAA@@AAAA@@CACAA@C@A@A@AAAA@A@A@AAA@A@C@A@A@A@AAA@ACAA@AAA@A@A@CAA@A@CAA@A@A@C@AAE@@@AAA@AAA@@AAAAC@ACCC@@@A@CBA@C@CAE@C@E@CBE@C@CBEBC@CBC@A@C@CACACA@AAA@A@ACAA@CBA@A@A@CAACACAACAA@CDABABABCBC@C@GAC@A@C@ABCBE@E@E@CAGBG@C@G@C@CBAB@DADAB@BCBEAC@G@E@C@CBABCBCDCBA@EBADABCDABEBCBCACAC@E@C@A@CACCAAE@ABEBC@CCAAAAAAAAC@CAAAAAC@C@ABC@A@C@CBABC@CAC@CBABCBABAB@BADADADADCBEBCBABC@CBI@E@E@CBEBC@CBABCBC@C@A@ECCAAAC@CBCBC@C@C@A@EACCCACCAA@AAA@ACACAG@G@C@K@EBEBC@CDAB@@CBCBABA@CAC@EAEBABA@CAEACAC@CACBCFABABE@C@AAC@C@ABAAACAAC@C@ABEBCDABA@E@E@CCABC@AB@B@@ABAB@D@D@J@F@BAFBB@B@DEBCBABEFADCBA@C@C@CAA@CAA@CBCBC@ABA@ABC@GAMCEACDEBBD@FGHA@GBG@CDADA@A@CAC@AAAAAABAACAECCCE@AACAACCCCCAACCCCAC@GCAAAAAA@AACCACCEAE@E@E@C@A@CACAACAAACC@C@C@A@EACAG@GBCBA@C@A@ECAAECC@EACCEACAC@C@C@A@C@CAE@CBC@EBA@ABABAAC@A@AAAECC@C@E@C@C@CAC@AACCACCCAACC@C@A@A@AC@CCAEAECE@A@C@AAAACCAACAAAA@AAAACACAC@AAA@C@A@@BABCBE@ABC@ABA@AC@AAAA@CAC@AA@CAA@CAAA@A@ABCBA@C@ABABCBA@@BC@A@CCA@CAC@A@CAA@ACAA@@AAA@A@EFABA@A@AAB@@CA@CAA@CAAACAAAAAAAC@A@EDC@AACAA@CECC@E@AA@CDIDGFA@ABCDCBCBABABABCFAD@B@DDDBDBFBF@D@D@B@DABABC@E@CAE@A@A@ABABCBA@CACAIECAA@EAA@AAC@ACAAC@C@C@C@CCCAC@C@C@@@GBABA@@DABBB@BA@CBEBC@C@C@C@EAGACBC@C@EBABC@E@C@C@CBCB@DC@A@CCACAACCGCEAEAGAEACAGAC@CAA@CA@EBEBC@C@CAACAEAA@AAAC@AAAAAAC@ABC@@ACAE@AACCACAA@CACCACECACA@C@AA@@BCBCBABEBCACACCACAC@EBC@CAA@CBC@C@E@A@C@A@C@ABAB@DADADADCDABCBC@CB@DAB@D@DAB@BG@EBCBA@@BG@E@A@ABCBABA@CAC@GBODEBA@ABODIHG@CACACAICCBC@CBCAECECCC@@GEGAGGEICAC@CACAGCGAICGCGAA@AECGAAK@CBADABCD@@A@EFCB@B@@@D@BABA@EBKBG@ABCD@FAHADCBABA@GAG@GAIBIBC@AAAC@CBA@AAAEAE@ECC@EACC@CACCCCECAGAGCAAAAAACA@@C@G@QFKBE@EACEECQGICIACCBA@AACEAAAACCCCCEECCCEAC@AAAGCE@C@A@C@A@EBGBC@A@@@ACACCCECABC@@@CBEAGDGDC@AAAEAACC@C@CAACAEACACBEBEBCAIAC@CBCBCBCACAEAC@ABCD@@GDGBGDCDCCEAC@A@AACCAAEEG@EFKFEFGD@@IBG@GBE@C@GAEAGCKKCECCEAA@ABAAABEBMBEBMHE@ED@BCBEDEBC@E@ABCBABEDA@A@AAE@A@@@CBEDEBC@E@EBGBCBC@EBE@GAAAABCBCDEDEDCDABABA@GCIGEAG@@A@EAACCCAABEBA@IAABA@@BCBEB@B@@@BCDCBEBCBABCJABA@C@CC@AACC@CAAEAA@C@EAEACCCCEEGACAAC@A@EAA@AAAAAAAGCCCEAC@CCE@AEAECCAA@A@CBABEBAB@@CA@@EAA@I@A@EDCD@BC@ABABA@@BCBCDABIHABA@A@CCEACAC@EBCBCBCBGDCBCBC@E@A@A@C@EDABA@A@A@C@CB@@A@C@@AMEA@A@A@A@A@EBC@CBC@C@E@C@A@ABEBCBMHA@CBA@K@I@CASA@@A@AF@BABCBABAD@D@@AJ@JMLOHOL@H@@@@AB@BAB@B@@@BB@@@BBB@DBBBDBDDDDDFBDBD@@@BA@@BNJBNIJCLVDPPBZD@DBBBB@@BBD@B@BAD@@@D@BBB@BDBBD@B@@@DAD@BAD@@ABABBFJXF^B^FTCVCLND@@F@FBDBDBDDBB@BDBB@DBDBDBDDDBFBDBDBFBFBFBFBBBBBB@@B@FFHBDFDBDDDBD@BBDDD@DBBBBBDBBDBBBBBD@D@DBF@BBB@@@BDBDBBDBBBBBDBBBD@B@BAHAD@FADABAFABA@ABC@AB@BAB@BAD@B@@ADA@ABABABABAB@@AB@B@B@D@D@DBD@DBB@B@@BB@BDB@BDBB@BDBFFBBDBBBDBFBBBFBB@B@D@D@BBB@BBDBBBHBD@H@H@D@B@@A@ABAB@@CBABC@A@@BA@ABABCB@FABAD@BB@@B@B@D@D@B@B@BAB@B@BAB@B@B@D@D@DBD@B@B@BBB@@B@@@DCD@BBD@B@B@BA@@DABCFABADAD@B@F@DBD@D@F@BADCF@DBFBDBDBD@FAD@DDDD@H@DBD@DD@B@DHDLJD@DDBBBD@@@J@DAB@F@B@BBBBAF@BBBF@@DBFFDDDBBDDDBDBDDDBBBBDDFBBHC@@DBAB@@@@BABA@@BADAD@BBDDDBDAFAN@BBBBH@LABABADAFD@B@BBB@AHDHBDBAFDFDDDBD@BBDBHBB@FBBDBF@DF@FCJ@@@DBD@BBDDDBDBD@FBB@F@BBBD@DD@D@BCBCB@B@BAF@DCJF@D@@B@@B@D@D@@@DBBBFBD@BAB@F@DABBBBBBFBF@D@D@BBB@BAB@@@B@B@D@B@B@FBB@D@D@F@B@B@@@@@B@@@HA@@B@@@B@B@@@B@BAD@@CBADAFAFAB@B@B@D@D@DADAFAHCDCDABAD@J@N@FBFFHDFBJBF@H@F@B@D@DAD@DBF@H@HAJCLAFAPIHEHENKDAHCFADAB@HAH@FBFAH@J@HBHBJFJFLDFBH@D@F@JAPCFALCJCDCBCBADANAD@J@JBHBHBJDLDHDHFBBBBN@L@N@PCN@NAD@HEHCDAFBJBDBD@HHJDLBF@JCLCFBJDFBBBTHLFDFFFFBHBH@B@JDHBFDFDF@H@HBF@DBB@B@D@F@D@B@B@BABABAB@FAD@D@F@BBDFDDBBFBJ@D@H@JBDBFBHFFDFDHBFDDHDDFDDBH@BEB@^LPHH@FCDK@ABA@ABABAB@BADA@@BA@A@CBCBAB@@AB@B@B@JCFADCJAB@BAB@@@BBB@@B@@@@AF@J@JBB@B@@FBB@F@D@B@@@BBAB@BAD@@ADABAB@B@BAB@B@D@DB@BBBBBB@@N@DBD@DBD@B@B@H@D@D@DD@@@BBBBBBB@B@@BB@@B@F@@@BBBADADABCBABAB@@ABAB@B@B@ADBDB@FDBF@B@B@BCDEDABAB@BB@BBBBB@B@D@D@DA@@H@B@DAD@LAF@JBF@H@NADB@BB@BD@D@BADAFCD@B@@@@DD@DBF@F@BAFBFAB@DAD@B@D@@@DDBDBBDCDAB@BBB@@B@D@B@BB@@@D@B@B@@C@@BDHBNFDLJFDF@VEF@FFBDDDHBDBBDFDDDFDFDFFDBDBFBF@HBF@J@LAH@HBHDHDHHFJDBHBTA@@N@JDFFHFJDLFLJDDB@CP@DAD@D@BAB@BAB@B@@@BA@@BBDFDB@B@BBB@B@B@BAB@B@@@BA@ABA@A@AB@BAB@B@@BB@@@@BB@@B@B@DAD@@AB@@@B@B@B@BAB@DAB@BAB@B@B@BB@@BBB@BBBBB@@BD@B@BAD@B@@AFBB@FBD@F@@@B@BAD@@A@@B@B@@@BBD@@BB@B@BABA@EF@@ABBDBDBJ@BBB@B@D@D@DBF@B@BAB@B@BAB@B@B@D@BBD@B@B@B@BA@@BCBC@A@CBA@ABA@@BAB@B@B@DAB@DABABABCD@DAB@B@B@D@@BBHFB@D@D@B@B@FAHBH@BBD@BBBDBBBDD@@@D@@@DAD@F@FBD@BBDB@@BB@BBBBB@BB@BBFBBBJ@HBFDDBJBB@H@B@TBB@F@FBH@D@D@F@D@D@B@D@D@B@B@BA@@BA@@@AB@@AB@BAB@B@B@D@BBB@D@B@D@B@B@@AB@BADABABABAB@@AB@BA@@BABABAFAD@F@JBRBHBDBHDBFBDAJALAH@HBJAJ@B@D@DAF@@@BBDBB@BBD@B@B@D@B@B@BBB@@BBDD@@@@DBBBB@@@B@B@@@B@B@@@B@B@@@B@B@BBB@@D@B@B@B@B@B@B@B@BBDDBBBBBDDBBDB@BBBB@@@@@BBBBBD@@@B@B@B@B@@CH@HBFBDDFBD@B"]],"encodeOffsets":[[[111793,34623]],[[111794,35525]]]}}],"UTF8Encoding":true};
        echarts.registerMap('xian', xian);
        let datasMap=this.state.father.datasMap;
        let option={
            backgroundColor: '#fafafa',
            background:"#404a59",
            geo: {
                map: 'xian',
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
                    data:datasMap, // series数据内容
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
        this.setState({option},()=>{
            console.log('nextProps',datasMap,this.state.option)
        })
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
        return (
            <ReactEcharts
                option={this.state.option}
                style={{height: '480px', width: '100%'}}
                className={'react_for_echarts'}
                onEvents={this.onClickByModel}
            />
        )
    }
}

export default Locationmap;