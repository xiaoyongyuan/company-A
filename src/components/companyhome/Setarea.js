import React, { Component, Fragment } from "react";
import { Row, Col, Button, Modal } from "antd";
import ReactDom from "react-dom";
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
      opebtn2: "添加防区二",
      opedisable1: false,
      opedisable2: false,
      subdisable1: true,
      subdisable2: true,
      defwidth: "",
      defheight: ""
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
          areaone = field[1] ? JSON.parse(field[1]) : [];
          areatwo = field[2] ? JSON.parse(field[2]) : [];
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
  componentDidUpdate() {
    this.renderDefence();
    if (this.confirmdef1) {
      // console.log(this.confirmdef1, "mmmmmmmmmmmmmmmmmmmmm");
      // this.confirmdef1.addEventListener("mousemove", event => {
      //   return;
      // });
      ReactDom.findDOMNode(this.confirmdef1).getElementsByClassName(
        "centerContext"
      )[0].onmousemove = function(ev) {
        // alert(7);
        ev.stopPropagation();
        ev.cancelBubble = true;
        ev.preventDefault();
        ev.returnValue = false;
        // ev.nativeEvent.stopImmediatePropagation();
        return false;
      };
    }

    if (this.confirmdef2) {
    }
  }
  renderDefence = () => {
    if (this.state.areaone.length) {
      let areaone = this.state.areaone[0];
      if (areaone.length) {
        return (
          <Sechild
            ref={confirmdef1 => {
              this.confirmdef1 = confirmdef1;
            }}
            color={blue}
            left={parseInt(areaone[0][0])}
            top={parseInt(areaone[0][1])}
            width={parseInt(this.state.defwidth)}
            height={parseInt(this.state.defheight)}
          />
        );
      }
    }
    if (this.state.areatwo.length) {
      let areatwo = this.state.areatwo[0];
      if (areatwo.length) {
        return (
          <Sechild
            ref={confirmdef2 => {
              this.confirmdef2 = confirmdef2;
            }}
            color={red}
            left={parseInt(areatwo[0][0])}
            top={parseInt(areatwo[0][1])}
            width={parseInt(this.state.defwidth)}
            height={parseInt(this.state.defheight)}
            style={{ zIndex: "1015" }}
          />
        );
      }
    }
    if (this.state.areaone.length && this.state.areatwo.length) {
      let areaone = this.state.areaone[0];

      let areatwo = this.state.areatwo[0];
      if (areaone.length && areatwo.length) {
        return (
          <Fragment>
            <Sechild
              color={blue}
              left={parseInt(areaone[0][0])}
              top={parseInt(areaone[0][1])}
              width={parseInt(this.state.defwidth)}
              height={parseInt(this.state.defheight)}
            />
            <Sechild
              color={red}
              left={parseInt(areatwo[0][0])}
              top={parseInt(areatwo[0][1])}
              style={{ zIndex: "1020" }}
              width={parseInt(this.state.defwidth)}
              height={parseInt(this.state.defheight)}
            />
          </Fragment>
        );
      }
    }
  };
  handOperation(id) {
    switch (id) {
      case 1: {
        this.setState(
          {
            opebtn1: "删除防区一",
            opedisable1: true,
            subdisable1: false,
            opedisable2: true,
            subdisable2: true,
            subbtn1: "确认添加防区一"
          },
          () => {}
        );
        break;
      }
      case 2: {
        // if(this.state.areaone.length!==0){
        //   localStorage.setItem('S_areaone', this.state.areaone);
        //   this.setState({areaone:[]})
        // }
        this.setState(
          {
            opebtn2: "删除防区二",
            opedisable1: true,
            subdisable1: true,
            opedisable2: true,
            subdisable2: false,
            subbtn2: "确认添加防区二"
          },
          () => {}
        );
        if (this.state.subbtn1 === "确认删除防区一") {
          this.setState({ subdisable1: true });
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
              opedisable2: false,
              subdisable1: false,
              subdisable2: true,
              subbtn1: "确认删除防区一",
              present: [
                defenceState.topLeftPoint,
                defenceState.topRightPoint,
                defenceState.bottLeftPoint,
                defenceState.bottRightPoint
              ],
              defwidth: defenceState.width,
              defheight: defenceState.height
            },
            () => {
              this.state.areaone = this.state.present;
              console.log(this.state.areaone, "this.state.areaone");
            }
          );
          post(
            {
              url: "/api/camera/fieldadd",
              data: {
                key: 1,
                field: JSON.stringify([this.state.present]),
                code: this.state.cid
              }
            },
            res => {
              if (res) {
                this.setState(
                  {
                    areaone: [this.state.present],
                    present: []
                  },
                  () => {
                    console.log(
                      this.state.areaone,
                      this.state.present,
                      "添加一返回"
                    );
                  }
                );
              }
            }
          );

          break;
        }
        if (this.state.subbtn1 === "确认删除防区一") {
          this.setState(
            {
              opebtn1: "添加防区一",
              opedisable1: false,
              subdisable1: true,
              opedisable2: false,
              subdisable2: true,
              subbtn1: "确认添加防区一"
            },
            () => {}
          );
          post(
            {
              url: "/api/camera/fielddel",
              data: { key: 1, code: this.state.cid }
            },
            res => {
              if (res) {
                this.setState(
                  {
                    areaone: [],
                    present: []
                  },
                  () => {
                    console.log(
                      this.state.areaone,
                      this.state.present,
                      "删除一返回"
                    );
                  }
                );
              }
            }
          );
          if (this.state.subbtn2 === "确认删除防区二") {
            this.setState({
              opedisable1: false,
              opedisable2: true,
              subdisable2: false
            });
          }
          break;
        }
      }
      case 2: {
        if (this.state.subbtn2 === "确认添加防区二") {
          // if (localStorage.getItem('S_areaone')!==''){
          //   this.setState({
          //     areaone: localStorage.getItem('S_areaone')
          //   })
          // }
          this.setState(
            {
              opebtn2: "添加防区二",
              opedisable1: false,
              subdisable1: true,
              opedisable2: true,
              subdisable2: false,
              subbtn2: "确认删除防区二",
              present: [
                defenceState.topLeftPoint,
                defenceState.topRightPoint,
                defenceState.bottLeftPoint,
                defenceState.bottRightPoint
              ],
              defwidth: defenceState.width,
              defheight: defenceState.height
            },
            () => {
              this.state.areatwo = this.state.present;
              console.log(this.state.areatwo, "this.state.areatwo");
            }
          );
          post(
            {
              url: "/api/camera/fieldadd",
              data: {
                key: 2,
                field: JSON.stringify([this.state.present]),
                code: this.state.cid
              }
            },
            res => {
              if (res) {
                this.setState(
                  {
                    areatwo: [this.state.present],

                    present: []
                  },
                  () => {
                    console.log(
                      this.state.areatwo,
                      this.state.present,
                      "添加二返回"
                    );
                  }
                );
              }
            }
          );
          if (this.state.subbtn1 === "确认删除防区一") {
            this.setState({
              subdisable1: false,
              opedisable1: true
            });
          }
          break;
        }
        if (this.state.subbtn2 === "确认删除防区二") {
          this.setState(
            {
              opebtn2: "添加防区二",
              opedisable1: false,
              subdisable1: true,
              opedisable2: false,
              subdisable2: true,
              subbtn2: "确认添加防区二"
            },
            () => {}
          );
          if (this.state.subbtn1 === "确认添加防区一") {
            this.setState({
              subdisable1: true
            });
          }
          post(
            {
              url: "/api/camera/fielddel",
              data: { key: 2, code: this.state.cid }
            },
            res => {
              if (res) {
                this.setState(
                  {
                    areatwo: [],
                    present: []
                  },
                  () => {
                    console.log(
                      this.state.areatwo,
                      this.state.present,
                      "删除二返回"
                    );
                  }
                );
              }
            }
          );
          break;
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
            style={{ background: `url('${this.state.src}') center/cover` }}
          >
            {(this.state.areaone.length !== 0 ||
              this.state.areatwo.length !== 0) &&
              this.renderDefence()}
            {this.state.opebtn1 === "删除防区一" ||
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
              disabled={this.state.opedisable1}
            >
              添加防区一
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
              添加防区二
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
