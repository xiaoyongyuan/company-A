import React, { Component } from "react";
import { Row, Col, Button, Modal } from "antd";
// import "../../style/lff/home.css";
import { post } from "../../axios/tools";
import Sechild from "./Sechild";
const blue = "#5063ee";
const red = "#ED2F2F";
class Setarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "",
      clicknum: 0,
      present: [], //未确定的正在绘制的防区
      areaone: [], //防区一
      areatwo: [] //防区二
    };
  }
  // componentWillMount = () => {
  //   this.setState({
  //     cid: this.props.query.id
  //   });
  // };
  // componentDidMount() {
  //   //摄像头详情
  //   post({ url: "/api/camera/getone", data: { code: this.state.cid } }, res => {
  //     if (res) {
  //       let field = res.data.field,
  //         areaone = [],
  //         areatwo = [];
  //       console.log("field", field);
  //       if (field) {
  //         areaone = field[1] ? JSON.parse(field[1]) : [];
  //         areatwo = field[2] ? JSON.parse(field[2]) : [];
  //       }
  //       this.setState(
  //         {
  //           areaone: areaone,
  //           areatwo: areatwo,
  //           src: res.data.fieldpath
  //         },
  //         () => {
  //           this.boundarydraw(); //绘制防区
  //         }
  //       );
  //     }
  //   });
  // }
  // boundarydraw() {
  //   //初始展现防区
  //   let ele = document.getElementById("time_graph_canvas");
  //   let area = ele.getContext("2d");
  //   area.clearRect(0, 0, 704, 576);
  //   if (this.state.areaone.length) {
  //     let areaone = this.state.areaone[0];
  //     area.strokeStyle = blue;
  //     area.lineWidth = 3;
  //     area.beginPath();
  //     area.moveTo(areaone[0][0], areaone[0][1]);
  //     area.lineTo(areaone[1][0], areaone[1][1]);
  //     area.lineTo(areaone[2][0], areaone[2][1]);
  //     area.lineTo(areaone[3][0], areaone[3][1]);
  //     area.lineTo(areaone[0][0], areaone[0][1]);
  //     area.stroke();
  //     area.closePath();

  //     if (this.state.areatwo.length) {
  //       let areatwo = this.state.areatwo[0];
  //       area.strokeStyle = red;
  //       area.beginPath();
  //       area.moveTo(areatwo[0][0], areatwo[0][1]);
  //       area.lineTo(areatwo[1][0], areatwo[1][1]);
  //       area.lineTo(areatwo[2][0], areatwo[2][1]);
  //       area.lineTo(areatwo[3][0], areatwo[3][1]);
  //       area.lineTo(areatwo[0][0], areatwo[0][1]);
  //       area.stroke();
  //       area.closePath();
  //     }
  //   } else if (this.state.areatwo.length) {
  //     let areatwo = this.state.areatwo[0];
  //     area.strokeStyle = red;
  //     area.lineWidth = 3;
  //     area.beginPath();
  //     area.moveTo(areatwo[0][0], areatwo[0][1]);
  //     area.lineTo(areatwo[1][0], areatwo[1][1]);
  //     area.lineTo(areatwo[2][0], areatwo[2][1]);
  //     area.lineTo(areatwo[3][0], areatwo[3][1]);
  //     area.lineTo(areatwo[0][0], areatwo[0][1]);
  //     area.stroke();
  //     area.closePath();
  //   }
  // }

  // draw = field => {
  //   //绘制当前区域
  //   let item = this.state.present;
  //   let ele = document.getElementById("time_graph_canvas");
  //   let area = ele.getContext("2d");
  //   area.strokeStyle = "#ff0";
  //   area.lineWidth = 3;
  //   area.beginPath();
  //   area.moveTo(item[0][0], item[0][1]);
  //   item.map((elx, i) => {
  //     if (i > 0) {
  //       area.lineTo(item[i][0], item[i][1]);
  //       if (i === 3) {
  //         area.lineTo(item[0][0], item[0][1]);
  //       }
  //       area.stroke();
  //     }
  //   });
  // };

  // clickgetcorrd = e => {
  //   //点击判断是否可以删除当前防区或者添加当前防区点数组
  //   if (!this.state.areaone.length || !this.state.areatwo.length) {
  //     if (this.state.present.length === 4) {
  //       this.setState({
  //         deleteshow: true
  //       });
  //     } else {
  //       let getcord = this.getcoord(e); //获取点击的坐标
  //       let precorrd = this.state.present;
  //       precorrd.push(getcord);
  //       this.setState({
  //         clicknum: this.state.clicknum + 1,
  //         present: precorrd
  //       });
  //     }
  //   }
  // };
  // deleteOk = () => {
  //   //此处不明，可能为触发清空当前防区
  //   let ele = document.getElementById("time_graph_canvas");
  //   let area = ele.getContext("2d");
  //   this.boundarydraw();

  //   area.clearRect(0, 0, 704, 576);
  //   this.setState({
  //     deleteshow: false, //按钮换为“添加防区”
  //     present: []
  //   });
  // };
  // deleteCancel = () => {
  //   this.setState({
  //     deleteshow: false //按钮换为“添加防区”
  //   });
  // };
  // getcoord = coords => {
  //   //获取坐标
  //   let ele = document.getElementById("time_graph_canvas");
  //   let canvsclent = ele.getBoundingClientRect();
  //   let x = coords.clientX - canvsclent.left * (ele.width / canvsclent.width);
  //   let y = coords.clientY - canvsclent.top * (ele.height / canvsclent.height);
  //   let pre = [x, y];
  //   return pre;
  // };
  // drawmove = e => {
  //   //边移动边绘制当前防区
  //   if (this.state.clicknum) {
  //     let ele = document.getElementById("time_graph_canvas");
  //     let area = ele.getContext("2d");
  //     let item = this.state.present;
  //     let getcord = this.getcoord(e);
  //     area.clearRect(0, 0, 704, 576); //清除之前的绘图
  //     if (this.state.clicknum === 4) {
  //       //区域完成
  //       this.boundarydraw();
  //       this.draw(); //调用---------------------
  //       this.setState({
  //         clicknum: 0
  //       });
  //     } else {
  //       this.boundarydraw();
  //       this.draw();
  //       area.strokeStyle = "#ff0";
  //       area.lineWidth = 3;
  //       area.beginPath();
  //       area.moveTo(item[item.length - 1][0], item[item.length - 1][1]);
  //       area.lineTo(getcord[0], getcord[1]);
  //       area.stroke();
  //       area.closePath();
  //     }
  //   }
  // };
  // submitok(index) {
  //   //处理点击按钮操作
  //   if (index) {
  //     if (this.state.areaone.length) {
  //       post(
  //         {
  //           url: "/api/camera/fielddel", //删除
  //           data: { key: 1, code: this.state.cid }
  //         },
  //         res => {
  //           if (res) {
  //             this.setState(
  //               {
  //                 areaone: []
  //               },
  //               () => {
  //                 this.boundarydraw();
  //               }
  //             );
  //           }
  //         }
  //       );
  //     } else {
  //       if (this.state.present.length === 4) {
  //         post(
  //           {
  //             url: "/api/camera/fieldadd", //提交当前
  //             data: {
  //               key: 1,
  //               field: JSON.stringify([this.state.present]),
  //               code: this.state.cid
  //             }
  //           },
  //           res => {
  //             if (res) {
  //               this.setState(
  //                 {
  //                   areaone: [...this.state.present],
  //                   present: []
  //                 },
  //                 () => {
  //                   this.boundarydraw();
  //                 }
  //               );
  //             }
  //           }
  //         );
  //       }
  //     }
  //   } else {
  //     if (this.state.areatwo.length) {
  //       post(
  //         {
  //           url: "/api/camera/fielddel",
  //           data: { key: 2, code: this.state.cid }
  //         },
  //         res => {
  //           if (res) {
  //             this.setState(
  //               {
  //                 areatwo: []
  //               },
  //               () => {
  //                 this.boundarydraw();
  //               }
  //             );
  //           }
  //         }
  //       );
  //     } else {
  //       if (this.state.present.length === 4) {
  //         post(
  //           {
  //             url: "/api/camera/fieldadd",
  //             data: {
  //               key: 2,
  //               field: JSON.stringify([this.state.present]),
  //               code: this.state.cid
  //             }
  //           },
  //           res => {
  //             if (res) {
  //               this.setState(
  //                 {
  //                   areatwo: [...this.state.present],
  //                   present: []
  //                 },
  //                 () => {
  //                   this.boundarydraw();
  //                 }
  //               );
  //             }
  //           }
  //         );
  //       }
  //     }
  //   }
  // }

  render() {
    return (
      <div className="Setarea">
        <div
          className="photo"
          id="canvasphoto"
          style={{ position: "relative" }}
        >
          <Sechild />
          {/* <canvas
              id="time_graph_canvas"
              width="704px"
              height="576px"
              style={{
                backgroundImage: "url(" + this.state.src + ")",
                backgroundSize: "100% 100%"
              }}
              onClick={this.clickgetcorrd}
              onMouseMove={this.drawmove}
            /> */}
        </div>
        {/* <div className="optbtn">
            <Row>
              <Button
                type="primary"
                className="queryBtn"
                onClick={() => this.submitok(1)}
              >
                {this.state.areaone.length ? "删除防区一" : "新增防区一"}
              </Button>
            </Row>
            <br />
            <br />
            <Row>
              <Button
                type="primary"
                className="deleteBtn"
                onClick={() => this.submitok()}
              >
                {this.state.areatwo.length ? "删除防区二" : "新增防区二"}
              </Button>
            </Row>
          </div> */}
        {/* <Row className="areaexplain">
          <Col xl={{ span: 24 }} xxl={{ span: 24 }}>
            <p>
              围界设定方法：
              <br />
              请在左侧图片处鼠标单击绘制防区，防区均为四边形，
              每个设备最多可设置两处防区。防区绘制完成后请点击“新增”按钮生效。
            </p>
          </Col>
        </Row> */}
        <Modal
          title="提示信息"
          visible={this.state.deleteshow}
          onOk={this.deleteCancel}
          onCancel={this.deleteCancel}
          cancelText="取消"
          okText="确定"
        >
          <p>您还有未提交的防区，请先点击新增按钮进行提交</p>
        </Modal>
      </div>
    );
  }
}

export default Setarea;
