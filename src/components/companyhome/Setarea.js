import React, { Component } from "react";
import { Row, Col, Button, Modal } from "antd";
import "../../style/jhy/css/setarea.css";
import { post } from "../../axios/tools";
const blue = "#5063ee";
const red = "#ED2F2F";
var clickX = 0; // 保留上次的X轴位置
var clickY = 0; // 保留上次的Y轴位置
class Setarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "",
      clicknum: 0,
      present: [],
      areaone: [[400, 100], [600, 300], [600, 500], [200, 500], [200, 300]], //防区一
      areatwo: [], //防区二
      deleteshow: false
    };
  }
  componentWillMount = () => {
    this.setState({
      cid: this.props.query.id
    });
  };
  boundarydraw() {
    let ele = document.getElementById("cavcontainer");
    let area = ele.getContext("2d");
    area.clearRect(0, 0, 704, 576);
    if (this.state.areaone.length > 0) {
      let areaone = this.state.areaone;
      area.strokeStyle = blue;
      area.lineWidth = 3;
      area.beginPath();
      area.moveTo(areaone[0][0], areaone[0][1]);
      area.lineTo(areaone[1][0], areaone[1][1]);
      area.lineTo(areaone[2][0], areaone[2][1]);
      area.lineTo(areaone[3][0], areaone[3][1]);
      area.lineTo(areaone[4][0], areaone[4][1]);
      area.lineTo(areaone[0][0], areaone[0][1]);
      area.stroke();
      // if (this.state.areatwo.length > 0) {
      //   let areatwo = this.state.areatwo;
      //   area.strokeStyle = red;
      //   area.beginPath();
      //   area.moveTo(areatwo[0][0], areatwo[0][1]);
      //   area.lineTo(areatwo[1][0], areatwo[1][1]);
      //   area.lineTo(areatwo[2][0], areatwo[2][1]);
      //   area.lineTo(areatwo[3][0], areatwo[3][1]);
      //   area.lineTo(areatwo[4][0], areatwo[4][1]);
      //   area.lineTo(areatwo[0][0], areatwo[0][1]);
      //   area.stroke();
      //   area.closePath();
      // }
    }
    // else if (this.state.areatwo.length > 0) {
    //   let areatwo = this.state.areatwo;
    //   area.strokeStyle = red;
    //   area.lineWidth = 3;
    //   area.beginPath();
    //   area.moveTo(areatwo[0][0], areatwo[0][1]);
    //   area.lineTo(areatwo[1][0], areatwo[1][1]);
    //   area.lineTo(areatwo[2][0], areatwo[2][1]);
    //   area.lineTo(areatwo[3][0], areatwo[3][1]);
    //   area.lineTo(areatwo[4][0], areatwo[4][1]);
    //   area.lineTo(areatwo[0][0], areatwo[0][1]);
    //   area.stroke();
    //   area.closePath();
    // }
  }

  draw = () => {
    //绘制区域
    let item = this.state.present;
    let ele = document.getElementById("cavcontainer");
    let area = ele.getContext("2d");
    area.clearRect(0, 0, 704, 576);
    area.strokeStyle = "#ff0";
    area.lineWidth = 3;
    area.beginPath();
    area.moveTo(item[0][0], item[0][1]);
    item.map((elx, i) => {
      if (i > 0) {
        area.lineTo(item[i][0], item[i][1]);
        if (i === 4) {
          area.lineTo(item[0][0], item[0][1]);
        }
        area.stroke();
      }
    });
  };
  componentDidMount() {
    //摄像头详情
    // post({ url: "/api/camera/getone", data: { code: this.state.cid } }, res => {
    //   if (res) {
    //     //     let field = res.data.field,
    //     //       areaone = [],
    //     //       areatwo = [];
    //     //     if (field) {
    //     //       areaone = field[1] ? JSON.parse(field[1]) : [];
    //     //       areatwo = field[2] ? JSON.parse(field[2]) : [];
    //     //     }
    //     this.setState(
    //       {
    //         //         areaone: areaone,
    //         //         areatwo: areatwo,
    //         src: res.data.fieldpath
    //       },
    //       () => {
    //         console.log(res.data.fieldpath);
    //         this.boundarydraw();
    //       }
    //     );
    //   }
    // });
    this.boundarydraw();
    const getEvent = e => {
      return e || window.event;
    };

    const getLocation = e => {
      return {
        x: e.x || e.clientX,
        y: e.y || e.clientY
      };
    };
    // var onDragUp = function() {
    //   document.body.style.cursor = "auto";
    // };

    document.ondblclick = e => {
      getLocation(getEvent(e));
      console.log(getLocation(getEvent(e)), "==================");
    };
  }

  // getcoord = coords => {
  //   //获取坐标
  //   let ele = document.getElementById("time_graph_canvas");
  //   let canvsclent = ele.getBoundingClientRect();
  //   let x = coords.clientX - canvsclent.left * (ele.width / canvsclent.width);
  //   let y = coords.clientY - canvsclent.top * (ele.height / canvsclent.height);
  //   let pre = [x, y];
  //   return pre;
  // };

  render() {
    return (
      <div className="setarea">
        <div className="topcont clearfix">
          <div
            className="cavwrap"
            style={{
              width: "704px",
              height: "576px",
              float: "left",
              boxSizing: "border-box"
            }}
          >
            <canvas
              width="100%"
              height="100%"
              id="cavcontainer"
              style={{
                // backgroundImage: "url(" + this.state.src + ")",
                backgroundImage: `url('http://pic01.aokecloud.cn/alarm/1000004/background/efa61zz7.jpg')`,
                backgroundSize: "100% 100%"
              }}
            />
          </div>

          <div className="optbtn">
            <Button type="primary" className="operbtn1">
              按钮1
            </Button>
            <br />
            <br />
            <Button type="primary" className="operbtn2">
              按钮2
            </Button>
          </div>
        </div>
        <div className="areaexplain">
          <p>
            围界设定方法：
            <br />
            请在左侧图片处鼠标单击绘制防区，防区均为四边形，
            每个设备最多可设置两处防区。防区绘制完成后请点击“新增”按钮生效。
          </p>
        </div>
      </div>
    );
  }
}

export default Setarea;
