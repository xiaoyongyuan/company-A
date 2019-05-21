import React, { Component } from "react";
import { Row, Col, Button, Modal } from "antd";
import "../../style/jhy/css/setarea.css";
import { post } from "../../axios/tools";
const blue = "#5063ee";
const red = "#ED2F2F";
const maskcol = "rgba(204, 204, 204, 0.3)";
class Setarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "",
      cid: "",
      clicknum: 0,
      presentlast: [],
      initarea: [[152, 188], [352, 188], [552, 188], [552, 388], [152, 388]],
      areaone: [], //防区一
      areatwo: [],
      subbtn1: "确认添加防区一",
      subbtn2: "确认添加防区二",
      opebtn1: "添加防区一",
      opebtn2: "添加防区二",
      opedisable1: false,
      opedisable2: false,
      subdisable1: true,
      subdisable2: true
    };
    this.submit = this.submit.bind(this);
    this.handOperation = this.handOperation.bind(this);
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
      areaone.map((elx, i) => {
        if (i > 0) {
          area.lineTo(areaone[i][0], areaone[i][1]);
          if (i === 4) {
            area.lineTo(areaone[0][0], areaone[0][1]);
          }
        }
      });
      area.stroke();
      area.fill();
      areaone.map(val => {
        area.beginPath();
        area.fillStyle = "rgba(128, 100, 162, 0.7)";
        area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
        area.fill();
      });
      if (this.state.areatwo.length > 0) {
        let areatwo = this.state.areatwo;
        area.fillStyle = maskcol;
        area.strokeStyle = red;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areatwo[0][0], areatwo[0][1]);
        areatwo.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areatwo[i][0], areatwo[i][1]);
            if (i === 4) {
              area.lineTo(areatwo[0][0], areatwo[0][1]);
            }
          }
        });
        area.stroke();
        area.fill();
        areatwo.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
        });
      }
    } else if (this.state.areatwo.length > 0) {
      let areatwo = this.state.areatwo;
      area.strokeStyle = red;
      area.fillStyle = maskcol;
      area.lineWidth = 2;
      area.beginPath();
      area.moveTo(areatwo[0][0], areatwo[0][1]);
      areatwo.map((elx, i) => {
        if (i > 0) {
          area.lineTo(areatwo[i][0], areatwo[i][1]);
          if (i === 4) {
            area.lineTo(areatwo[0][0], areatwo[0][1]);
          }
        }
      });
      area.stroke();
      area.fill();
      areatwo.map(val => {
        area.beginPath();
        area.fillStyle = "rgba(128, 100, 162, 0.7)";
        area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
        area.fill();
      });
    }
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
    let item = this.state.initarea;
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
      }
    });
    area.stroke();
    area.fill();
    item.map(val => {
      area.beginPath();
      area.fillStyle = "rgba(128, 100, 162, 0.7)";
      area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
      area.fill();
    });
  };
  handlepoly = initarea => {
    var clickX = 0; // 保留上次的X轴位置
    var clickY = 0; // 保留上次的Y轴位置
    const _this = this;
    document
      .querySelector("#cavcontainer")
      .addEventListener("mousedown", function(e = window.event) {
        console.log(e.offsetX, e.offsetY, "坐标offset");
        clickX = e.offsetX;
        clickY = e.offsetY;
        document
          .querySelector("#cavcontainer")
          .addEventListener("mousemove", function movefun(e) {
            if (
              initarea[0][0] - 10 < e.offsetX &&
              e.offsetX < initarea[0][0] + 10 &&
              initarea[0][1] - 10 < e.offsetY &&
              e.offsetY < initarea[0][1] + 10
            ) {
              console.log("在第11111111111个点");
              var addX = e.offsetX - clickX; //鼠标移动的距离
              var addY = e.offsetY - clickY;
              clickX = e.offsetX;
              clickY = e.offsetY;
              _this.setState(() => {
                _this.state.initarea[0] = [
                  _this.state.initarea[0][0] + addX,
                  _this.state.initarea[0][1] + addY
                ];
                _this.draw();
              });
            } else if (
              initarea[1][0] - 10 < e.offsetX &&
              e.offsetX < initarea[1][0] + 10 &&
              initarea[1][1] - 10 < e.offsetY &&
              e.offsetY < initarea[1][1] + 10
            ) {
              console.log("在第2222222222222222222222个点");
              var addX = e.offsetX - clickX; //鼠标移动的距离
              var addY = e.offsetY - clickY;
              clickX = e.offsetX;
              clickY = e.offsetY;
              _this.setState(() => {
                _this.state.initarea[1] = [
                  _this.state.initarea[1][0] + addX,
                  _this.state.initarea[1][1] + addY
                ];
                _this.draw();
              });
            } else if (
              initarea[2][0] - 10 < e.offsetX &&
              e.offsetX < initarea[2][0] + 10 &&
              initarea[2][1] - 10 < e.offsetY &&
              e.offsetY < initarea[2][1] + 10
            ) {
              console.log("在第333333333333333个点");
              var addX = e.offsetX - clickX; //鼠标移动的距离
              var addY = e.offsetY - clickY;
              clickX = e.offsetX;
              clickY = e.offsetY;
              _this.setState(() => {
                _this.state.initarea[2] = [
                  _this.state.initarea[2][0] + addX,
                  _this.state.initarea[2][1] + addY
                ];
                _this.draw();
              });
            } else if (
              initarea[3][0] - 10 < e.offsetX &&
              e.offsetX < initarea[3][0] + 10 &&
              initarea[3][1] - 10 < e.offsetY &&
              e.offsetY < initarea[3][1] + 10
            ) {
              console.log("在第44444444个点");
              var addX = e.offsetX - clickX; //鼠标移动的距离
              var addY = e.offsetY - clickY;
              clickX = e.offsetX;
              clickY = e.offsetY;
              _this.setState(() => {
                _this.state.initarea[3] = [
                  _this.state.initarea[3][0] + addX,
                  _this.state.initarea[3][1] + addY
                ];
                _this.draw();
              });
            } else if (
              initarea[4][0] - 10 < e.offsetX &&
              e.offsetX < initarea[4][0] + 10 &&
              initarea[4][1] - 10 < e.offsetY &&
              e.offsetY < initarea[4][1] + 10
            ) {
              console.log("在第5555555555个点");
              var addX = e.offsetX - clickX; //鼠标移动的距离
              var addY = e.offsetY - clickY;
              clickX = e.offsetX;
              clickY = e.offsetY;
              _this.setState(() => {
                _this.state.initarea[4] = [
                  _this.state.initarea[4][0] + addX,
                  _this.state.initarea[4][1] + addY
                ];
                _this.draw();
              });
            }

            // if (
            //   _this.getMinX(_this.getarrX(initarea)) + 10 < e.offsetX &&
            //   e.offsetX < _this.getMaxX(_this.getarrX(initarea)) - 10 &&
            //   _this.getMinY(_this.getarrY(initarea)) + 10 < e.offsetY &&
            //   e.offsetY < _this.getMaxY(_this.getarrY(initarea)) - 10
            // ) {
            //   var addX = e.offsetX - clickX; //鼠标移动的距离
            //   var addY = e.offsetY - clickY;
            //   clickX = e.offsetX;
            //   clickY = e.offsetY;
            //   console.log(addX, addY, "zailimian,且不在5个点上增加的");
            //   _this.setState(
            //     state => {
            //       console.log(state.initarea, "chishi");
            //       return {
            //         initarea: [
            //           [
            //             state.initarea[0][0] + addX,
            //             state.initarea[0][1] + addY
            //           ],
            //           [
            //             state.initarea[1][0] + addX,
            //             state.initarea[1][1] + addY
            //           ],
            //           [
            //             state.initarea[2][0] + addX,
            //             state.initarea[2][1] + addY
            //           ],
            //           [
            //             state.initarea[3][0] + addX,
            //             state.initarea[3][1] + addY
            //           ],
            //           [state.initarea[4][0] + addX, state.initarea[4][1] + addY]
            //         ]
            //       };
            //     },
            //     () => {
            //       _this.draw();
            //     }
            //   );
            // }
            if (
              _this.getMinX(_this.getarrX(initarea)) < 10 ||
              _this.getMaxX(_this.getarrX(initarea)) > 694 ||
              _this.getMinY(_this.getarrY(initarea)) < 10 ||
              _this.getMaxY(_this.getarrY(initarea)) > 566
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
  };
  handleClear = () => {
    let ele = document.getElementById("cavcontainer");
    let area = ele.getContext("2d");
    area.clearRect(0, 0, 704, 576);
  };
  componentDidMount() {
    // 摄像头详情;
    // post({ url: "/api/camera/getone", data: { code: this.state.cid } }, res => {
    //   if (res) {
    //     console.log(res, "返回");
    // let field = res.data.field,
    //   areaone = [],
    //   areatwo = [];
    // if (field) {
    //   areaone = field[1] ? JSON.parse(field[1]) : [];
    //   areatwo = field[2] ? JSON.parse(field[2]) : [];
    // }
    // this.setState(
    //   {
    //     areaone: areaone,
    //     areatwo: areatwo,
    //     src: res.data.fieldpath
    //   },
    //   () => {
    //     console.log(res.data.fieldpath, "后台初始防区");
    // this.boundarydraw();
    //   }
    // );
    // }
    // });
  }
  handOperation(id) {
    switch (id) {
      case 1: {
        if (this.state.opebtn1 === "添加防区一") {
          this.draw();
          this.handlepoly(this.state.initarea);
          this.setState({
            opebtn1: "取消防区一",
            opedisable1: false,
            subdisable1: false,
            opedisable2: true,
            subdisable2: true,
            subbtn1: "确认添加防区一"
          });
          if (this.state.areatwo.length > 0) {
            let areatwo = this.state.areatwo;
            this.setState(
              {
                areatwo: [],
                presentlast: areatwo
              },
              () => {}
            );
          }
          if (this.state.subbtn2 === "确认删除防区二") {
            this.setState({ subdisable2: true });
          }
        } else if (this.state.opebtn1 === "取消防区一") {
          this.handleClear();
          this.setState({
            opebtn1: "添加防区一"
          });
          if (this.state.subbtn1 === "确认添加防区一") {
            this.setState({ subdisable1: true });
          }
          if (this.state.subbtn2 === "确认添加防区二") {
            this.setState({ opedisable2: false });
          }
        }
        break;
      }
      case 2: {
        if (this.state.opebtn2 === "添加防区二") {
          this.draw();
          this.handlepoly(this.state.initarea);

          if (this.state.areaone.length > 0) {
            let areaone = this.state.areaone;
            this.setState(
              {
                areaone: [],
                presentlast: [areaone]
              },
              () => {}
            );
          }
          this.setState(
            {
              opebtn2: "取消防区二",
              opedisable1: true,
              subdisable1: true,
              opedisable2: false,
              subdisable2: false,
              subbtn2: "确认添加防区二"
            },
            () => {}
          );
          if (this.state.subbtn1 === "确认删除防区一") {
            this.setState({ subdisable1: true });
          }
        } else if (this.state.opebtn2 === "取消防区二") {
          this.handleClear();
          this.setState({
            opebtn2: "添加防区二"
          });
          if (this.state.optbtn1 === "添加防区一") {
            this.setState({ optdisable1: false });
          }
          if (this.state.subbtn1 === "确认删除防区一") {
            this.setState({ subdisable1: false });
          }
          if (this.state.subbtn2 === "确认添加防区二") {
            this.setState({ subdisable2: true });
          }
        }

        break;
      }
      default:
        return;
    }
  }
  submit(index) {
    var defenceState = [];
    if (this.defence) {
      defenceState = this.defence.state;
    }
    switch (index) {
      case 1: {
        if (this.state.subbtn1 === "确认添加防区一") {
          this.setState(
            {
              opebtn1: "添加防区一",
              opedisable1: true,
              subdisable1: false,
              opedisable2: false,
              subbtn1: "确认删除防区一"
            },
            () => {
              this.state.areaone = this.state.initarea;
              if (this.state.presentlast.length > 0) {
                this.state.areatwo = this.state.presentlast;
                this.state.presentlast = [];
              }
              this.boundarydraw();
              this.forceUpdate();

              // post(
              //   {
              //     url: "/api/camera/fieldadd",
              //     data: {
              //       key: 1,
              //       field: JSON.stringify(this.state.initarea),
              //       code: this.state.cid
              //     }
              //   }
            }
          );
          if (this.state.subbtn2 === "确认删除防区二") {
            this.setState({
              opedisable2: true,
              subdisable2: false
            });
          }
          this.boundarydraw();

          break;
        } else if (this.state.subbtn1 === "确认删除防区一") {
          this.setState(
            {
              areaone: [],
              opebtn1: "添加防区一",
              opedisable1: false,
              subdisable1: true,
              subbtn1: "确认添加防区一"
            },
            () => {
              this.boundarydraw();
            }
          );

          // post(
          //   {
          //     url: "/api/camera/fielddel",
          //     data: { key: 1, code: this.state.cid }
          //   },
          //   res => {}
          // );
          if (this.state.optbtn2 === "添加防区二") {
            this.setState({
              opedisable2: true
            });
          }
          this.boundarydraw();

          break;
        }
      }
      case 2: {
        if (this.state.subbtn2 === "确认添加防区二") {
          this.setState(
            {
              opebtn2: "添加防区二",
              opedisable1: false,
              opedisable2: true,
              subdisable2: false,
              subbtn2: "确认删除防区二"
            },
            () => {
              this.state.areatwo = this.state.initarea;
              if (this.state.presentlast.length > 0) {
                this.state.areaone = this.state.presentlast;
                this.state.presentlast = [];
              }

              this.boundarydraw();
              this.forceUpdate();

              // post(
              //   {
              //     url: "/api/camera/fieldadd",
              //     data: {
              //       key: 2,
              //       field: JSON.stringify([this.state.present]),
              //       code: this.state.cid
              //     }
              //   }
            }
          );
          if (this.state.subbtn1 === "确认删除防区一") {
            this.setState({
              opedisable1: true,
              subdisable1: false
            });
          }
          this.boundarydraw();

          break;
        } else if (this.state.subbtn2 === "确认删除防区二") {
          this.setState(
            {
              areatwo: [],
              present: [],
              opebtn2: "添加防区二",
              opedisable2: false,
              subdisable2: true,
              subbtn2: "确认添加防区二"
            },
            () => {
              this.boundarydraw();
            }
          );
          // post(
          //   {
          //     url: "/api/camera/fielddel",
          //     data: { key: 2, code: this.state.cid }
          //   },
          //   res => {}
          // );
          this.boundarydraw();

          break;
        }
      }
      default:
        return;
    }
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
            <Button
              type="primary"
              className="queryBtn"
              id="add1"
              onClick={() => this.handOperation(1)}
              disabled={this.state.opedisable1}
            >
              {this.state.opebtn1 === "添加防区一"
                ? "添加防区一"
                : "取消添加防区一"}
            </Button>
            <Button
              type="primary"
              className="queryBtn"
              id="sub1"
              onClick={() => this.submit(1)}
              disabled={this.state.subdisable1}
            >
              {this.state.subbtn1 === "确认添加防区一"
                ? "确认添加防区一"
                : "确认删除防区一"}
            </Button>
            <br />
            <br />
            <Button
              type="primary"
              className="queryBtn"
              onClick={() => this.handOperation(2)}
              disabled={this.state.opedisable2}
              id="add2"
            >
              {this.state.opebtn2 === "添加防区二"
                ? "添加防区二"
                : "取消添加防区二"}
            </Button>
            <Button
              type="primary"
              className="queryBtn"
              disabled={this.state.subdisable2}
              onClick={() => this.submit(2)}
              id="sub2"
            >
              {this.state.subbtn2 === "确认添加防区二"
                ? "确认添加防区二"
                : "确认删除防区二"}
            </Button>
          </div>
        </div>
        <div className="areaexplain">
          <p>
            围界设定方法：
            <br />
            单击添加防区后根据需求鼠标拖动缩放防区大小或移动防区位置，
            每个设备最多可设置两处防区。防区绘制完成后请点击“确定添加”按钮生效。
          </p>
        </div>
      </div>
    );
  }
}

export default Setarea;
