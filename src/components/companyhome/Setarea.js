import React, { Component } from "react";
import { Row, Col, Button, Modal } from "antd";
import "../../style/jhy/css/setarea.css";
import { post } from "../../axios/tools";
const blue = "#5063ee";
const red = "#ED2F2F";
const maskcol = "rgba(255, 255, 255, 0.3)";
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
      area.fillStyle = maskcol;
      area.lineWidth = 2;
      area.beginPath();
      area.moveTo(areaone[0][0], areaone[0][1]);
      area.lineTo(areaone[1][0], areaone[1][1]);
      area.lineTo(areaone[2][0], areaone[2][1]);
      area.lineTo(areaone[3][0], areaone[3][1]);
      area.lineTo(areaone[4][0], areaone[4][1]);
      area.lineTo(areaone[0][0], areaone[0][1]);
      area.fill();
      areaone.map(val => {
        area.beginPath();
        area.fillStyle = "rgba(128, 100, 162, 0.7)";
        area.arc(val[0], val[1], 5, 0, Math.PI * 2, false);
        area.fill();
      });
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
  getarrX = arr => {
    let arrX = [];
    arr.map((item, i) => {
      arrX.push(item[0]);
    });
    return arrX;
  };
  getarrY = arr => {
    let arrY = [];
    arr.map((item, i) => {
      arrY.push(item[1]);
    });
    return arrY;
  };
  getMaxX = arr => Math.max(...arr);

  getMinX = arr => Math.min(...arr);
  getMaxY = arr => Math.max(...arr);

  getMinY = arr => Math.min(...arr);
  draw = () => {
    //绘制区域
    let item = this.state.present;
    let ele = document.getElementById("cavcontainer");
    let area = ele.getContext("2d");
    area.clearRect(0, 0, 704, 576);
    area.strokeStyle = "#ff0";
    area.fillStyle = maskcol;
    area.lineWidth = 2;
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
    var clickX = 0; // 保留上次的X轴位置
    var clickY = 0; // 保留上次的Y轴位置
    const _this = this;
    document
      .querySelector("#cavcontainer")
      .addEventListener("mousedown", function(e = window.event) {
        console.log(_this.state.areaone);
        console.log(
          _this.getMaxX(_this.getarrX(_this.state.areaone)),
          "xzuida"
        );
        console.log(
          _this.getMinX(_this.getarrX(_this.state.areaone)),
          "xzuixiao"
        );
        console.log(
          _this.getMaxY(_this.getarrY(_this.state.areaone)),
          "yzuida"
        );
        console.log(
          _this.getMinY(_this.getarrY(_this.state.areaone)),
          "xzuixiao"
        );
        console.log(e.offsetX, e.offsetY, "坐标offset");
        clickX = e.offsetX;
        clickY = e.offsetY;
        document
          .querySelector("#cavcontainer")
          .addEventListener("mousemove", function movefun(e) {
            _this.getarrX(_this.state.areaone).map((x, xi) => {
              if (x - 5 < e.offsetX && e.offsetX < x + 5) {
                _this.getarrY(_this.state.areaone).map((y, yi) => {
                  if (y - 5 < e.offsetY && e.offsetY < y + 5) {
                    var addX = e.offsetX - clickX; //鼠标移动的距离
                    var addY = e.offsetY - clickY;
                    clickX = e.offsetX;
                    clickY = e.offsetY;
                    if (xi === yi) {
                      console.log(
                        "在角点处=================================================================="
                      );
                      _this.setState(() => {
                        _this.state.areaone[xi] = [
                          _this.state.areaone[xi][0] + addX,
                          _this.state.areaone[xi][1] + addY
                        ];
                        _this.boundarydraw();
                      });
                    } else {
                      console.log(
                        "不在交点处+++++++++++++++++++++++++++++++++++++++++++"
                      );
                    }
                  }
                });
              }
            });
            if (
              _this.getMinX(_this.getarrX(_this.state.areaone)) + 5 <
                e.offsetX &&
              e.offsetX <
                _this.getMaxX(_this.getarrX(_this.state.areaone)) - 5 &&
              _this.getMinY(_this.getarrY(_this.state.areaone)) + 5 <
                e.offsetY &&
              e.offsetY < _this.getMaxY(_this.getarrY(_this.state.areaone)) - 5
            ) {
              console.log("zailimian");
              var addX = e.offsetX - clickX; //鼠标移动的距离
              var addY = e.offsetY - clickY;
              clickX = e.offsetX;
              clickY = e.offsetY;
              console.log(addX, addY, "增加的");
              _this.setState(
                state => {
                  console.log(state.areaone, "chishi");
                  return {
                    areaone: [
                      [state.areaone[0][0] + addX, state.areaone[0][1] + addY],
                      [state.areaone[1][0] + addX, state.areaone[1][1] + addY],
                      [state.areaone[2][0] + addX, state.areaone[2][1] + addY],
                      [state.areaone[3][0] + addX, state.areaone[3][1] + addY],
                      [state.areaone[4][0] + addX, state.areaone[4][1] + addY]
                    ]
                  };
                },
                () => {
                  _this.boundarydraw();
                }
              );
            }

            if (
              _this.getMinX(_this.getarrX(_this.state.areaone)) < 5 ||
              _this.getMaxX(_this.getarrX(_this.state.areaone)) > 699 ||
              _this.getMinY(_this.getarrY(_this.state.areaone)) < 5 ||
              _this.getMaxY(_this.getarrY(_this.state.areaone)) > 571
            ) {
              document
                .querySelector("#cavcontainer")
                .removeEventListener("mousemove", movefun);
            }
            document
              .querySelector("#cavcontainer")
              .addEventListener("mouseup", function(e) {
                document
                  .querySelector("#cavcontainer")
                  .removeEventListener("mousemove", movefun);
              });
          });
      });
  }

  render() {
    return (
      <div className="setarea">
        <div className="topcont clearfix">
          <div className="cavwrap">
            <canvas
              width="704px"
              height="576px"
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
