import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
// import { crossjsonP } from "../../axios/tools";
import { post } from "../../axios/tools";

class Scenedata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {},
      type: "rollcall"
    };
  }
  componentWillMount() {
    console.log(this.props.code, "code");

    this.setState({
      type: this.props.type
    });
  }

  maps = (scenegraph, cameracorrd) => {
    // crossjsonP({ url: scenegraph }, res => {
    //   console.log("++++++++++++==================______________", res);
    //   if (res) {
    //     echarts.registerMap("xiant", res);
    //   }
    // });
    post(
      {
        url: "/api/company/get_scenegraph",
        data: { code: this.props.code }
      },
      res => {
        console.log(res, "==================================");
      }
    );
    const cameralist = [];
    cameracorrd.map((el, i) => {
      if (el.lat && el.lng) {
        cameralist.push({
          value: [el.lng, el.lat],
          name: el.name
        });
      }
    });

    let option = {
      background: "#091e57",
      geo: {
        map: "xiant",
        roam: true,
        aspectScale: 0.8, //长宽比
        zoom: 1.2, //当前视角的缩放比例
        //取消鼠标移入地图上的文字
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            //         	color: '#ddd',
            borderColor: "rgba(147, 235, 248, 1)",
            borderWidth: 1,
            areaColor: "#35425F",
            shadowColor: "rgba(128, 217, 248, 1)",
            // shadowColor: 'rgba(255, 255, 255, 1)',
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10
          },
          emphasis: {
            areaColor: "#35425F" //悬浮时的颜色
          }
        }
      },
      series: [
        {
          name: "light",
          type: "scatter",
          coordinateSystem: "geo",
          data: cameralist,
          symbolSize: 15, //圈圈大小
          label: {
            normal: {
              formatter: "{b}",
              position: "right",
              show: false //字体显示
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: "#f4258e"
            }
          }
        }
      ]
    };
    return option;
  };

  onByModelClick = e => {
    if (e.componentType === "series") {
      // window.location.href="#/app/companyhome/companyscene?code="+this.props.codeID
    }
  };

  onClickByModel = {
    click: this.onByModelClick
  };
  render() {
    const _this = this;
    return (
      <div>
        {this.props.scenegraph ? (
          <ReactEcharts
            option={this.maps(this.props.scenegraph, this.props.cameracorrd)}
            onEvents={this.onClickByModel}
            style={{ height: "600px" }}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Scenedata;
