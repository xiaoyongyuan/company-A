import React, { Component } from "react";
import { Row, Col, Button, Modal } from "antd";
import "../../style/jhy/css/setarea.css";
import { post } from "../../axios/tools";
import Sechild from "./Sechild";
const blue = "#5063ee";
const red = "#ED2F2F";
class Setarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "",
      present: [], //未确定的正在绘制的防区
      areaone: [], //防区一
      areatwo: [], //防区二
      cid: "",
      subbtn1: "确认添加防区一",
      subbtn2: "确认添加防区二",
      opebtn1: "添加防区一",
      opebtn2: "添加防区二"
    };
    this.submit = this.submit.bind(this);
    this.handOperation = this.handOperation.bind(this);
  }
  componentWillMount = () => {
    this.setState({
      cid: this.props.query.id
    });
  };
  componentDidMount() {
    //摄像头详情
    post({ url: "/api/camera/getone", data: { code: this.state.cid } }, res => {
      if (res) {
        let field = res.data.field,
          areaone = [],
          areatwo = [];
        if (field) {
          areatwo = field[1] ? JSON.parse(field[1]) : [];
          areatwo = field[2] ? JSON.parse(field[2]) : [];
          console.log(areatwo);
        }
        this.setState(
          {
            areaone: areaone,
            areatwo: areatwo,
            src: res.data.fieldpath
          },
          () => {
            this.renderDefence(); //绘制防区
          }
        );
      }
    });
  }
  renderDefence = () => {
    if (this.state.areaone.length) {
      let areaone = this.state.areaone[0];
      console.log(areaone[0][0]);
      return (
        <Sechild
          color={blue}
          left={parseInt(areaone[0][0])}
          top={parseInt(areaone[0][1])}
        />
      );
    }
    if (this.state.areatwo.length) {
      let areatwo = this.state.areatwo[0];
      console.log(areatwo[0][0]);
      return (
        <Sechild
          color={red}
          left={parseInt(areatwo[0][0])}
          top={parseInt(areatwo[0][1])}
        />
      );
    }
  };
  handOperation(id) {
    switch (id) {
      case 1: {
        if (this.state.opebtn1 === "添加防区一") {
          this.setState(
            {
              opebtn1: "删除防区一"
            },
            () => {
              this.state.subbtn1 = "确认删除防区一";
            }
          );
        }
        // document.getElementById("add1").onclick = null;
      }
      case 2: {
        if (this.state.opebtn2 === "添加防区二") {
          this.setState(
            {
              opebtn2: "删除防区二"
            },
            () => {
              this.state.subbtn2 = "确认删除防区二";
            }
          );
        }
      }
      default:
        return;
    }
  }
  submit(index) {
    switch (index) {
      case 1: {
        if (this.state.subbtn1 === "确认删除防区一") {
          console.log("dianjiale");
          console.log(this.defence, "this");
          // const decomstyle = getComputedStyle(this.defence);
          // console.log(window.getComputedStyle(this.defence), "decomstyle");
          // post({ url: '/api/camera/fieldadd', data: { key: 1, field: JSON.stringify([this.state.present]), code: this.state.cid } }, (res) => {
          //   if (res) {
          //     this.setState({
          //       areaone: [this.state.present],
          //       present: [],
          //       subbtn1: '删除防区一'

          //     }, () => {
          //     });

          //   }
          // })
        } else if (this.state.subbtn1 === "删除防区一") {
          // post({ url: '/api/camera/fielddel', data: { key: 1, code: this.state.cid } }, (res) => {
          //   if (res) {
          //     this.setState({
          //       areaone: [],
          //       subbtn1:'添加防区一'
          //     }, () => {
          //     });
          //   }
          // })
        } else {
          return;
        }
      }
      case 2: {
        if (this.state.subbtn2 === "添加防区二") {
          // post({ url: '/api/camera/fieldadd', data: { key: 2, field: JSON.stringify([this.state.present]), code: this.state.cid } }, (res) => {
          //   if (res) {
          //     this.setState({
          //       areatwo: [this.state.present],
          //       present: [],
          //       subbtn1: '删除防区二'
          //     }, () => {
          //     });
          //   }
          // })
        } else if (this.state.subbtn2 === "删除防区二") {
          // post({ url: '/api/camera/fielddel', data: { key: 2, code: this.state.cid } }, (res) => {
          //   if (res) {
          //     this.setState({
          //       areatwo: [],
          //       subbtn2: '添加防区二'
          //     }, () => {
          //     });
          //   }
          // })
        } else {
          return;
        }
      }
      default:
        return;
    }
  }

  render() {
    return (
      <div className="setarea ">
        <div className="toparea clearfix">
          <div
            className="photo "
            style={{ background: `url('${this.state.src}') center/100% 100%` }}
          >
            {this.state.areaone.length !== 0 &&
            this.state.areatwo.length !== 0 ? (
              this.renderDefence()
            ) : this.state.opebtn1 === "删除防区一" ||
              this.state.opebtn2 === "删除防区二" ? (
              <Sechild
                ref={defence => {
                  this.defence = defence;
                }}
              />
            ) : null}
          </div>
          <div className="optbtn">
            <Button
              type="primary"
              className="queryBtn"
              id="add1"
              onClick={() => this.handOperation(1)}
              disabled={false}
            >
              {this.state.subbtn1 === "确认添加防区一" && "添加防区一"}
            </Button>
            <Button
              type="primary"
              className="queryBtn"
              id="sub1"
              onClick={() => this.submit(1)}
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
              id="add2"
            >
              {this.state.subbtn2 === "确认添加防区二" && "添加防区二"}
            </Button>
            <Button
              type="primary"
              className="queryBtn"
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
            请在左侧图片处鼠标单击绘制防区，防区均为四边形，
            每个设备最多可设置两处防区。防区绘制完成后请点击“新增”按钮生效。
          </p>
        </div>
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
