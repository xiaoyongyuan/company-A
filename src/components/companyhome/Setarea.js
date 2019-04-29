import React, { Component, Fragment } from "react";
import { Button, Modal } from "antd";
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
      presentlast: [],
      areaone: [],
      areatwo: [],
      cid: "",
      subbtn1: "确认添加防区一",
      subbtn2: "确认添加防区二",
      opebtn1: "添加防区一",
      opebtn2: "添加防区二",
      opedisable1: false,
      opedisable2: false,
      subdisable1: true,
      subdisable2: true,
      iscancle: false,
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
            if (this.state.areaone.length && this.state.areatwo.length) {
              let areaone = this.state.areaone[0];
              let areatwo = this.state.areatwo[0];
              if (areaone.length > 0 && areatwo.length > 0) {
                this.setState({
                  opebtn1: "添加防区一",
                  opebtn2: "添加防区二",
                  opedisable1: true,
                  opedisable2: true,
                  subdisable1: false,
                  subdisable2: false,
                  subbtn1: "确认删除防区一",
                  subbtn2: "确认删除防区二"
                });
              }
            } else if (this.state.areaone.length) {
              let areaone = this.state.areaone[0];
              if (areaone.length > 0) {
                this.setState({
                  opebtn1: "添加防区一",
                  opedisable1: true,
                  subdisable1: false,
                  subbtn1: "确认删除防区一"
                });
              }
            } else if (this.state.areatwo.length) {
              let areatwo = this.state.areatwo[0];
              if (areatwo.length) {
                this.setState({
                  opebtn2: "添加防区二",
                  opedisable2: true,
                  subdisable2: false,
                  subbtn2: "确认删除防区二"
                });
              }
            }
          }
        );
      }
    });
  }
  componentDidUpdate() {
    if (
      this.state.opebtn1 !== "删除防区一" ||
      this.state.opebtn2 !== "删除防区二"
    ) {
      if (this.confirmdef1 || this.confirmdef2) {
        document.onmousemove = function(ev) {
          ev.stopPropagation();
        };
      }
    }
  }
  renderDefence = () => {
    if (this.state.areaone.length && this.state.areatwo.length) {
      let areaone = this.state.areaone[0];
      let areatwo = this.state.areatwo[0];
      if (areaone.length > 0 && areatwo.length > 0) {
        return (
          <Fragment>
            <Sechild
              ref={confirmdef1 => {
                this.confirmdef1 = confirmdef1;
              }}
              color={blue}
              left={parseInt(areaone[0][0])}
              top={parseInt(areaone[0][1])}
              width={parseInt(areaone[1][0] - areaone[0][0])}
              height={parseInt(areaone[3][1] - areaone[0][1])}
              style={{ zIndex: "1010" }}
            />
            <Sechild
              ref={confirmdef2 => {
                this.confirmdef2 = confirmdef2;
              }}
              color={red}
              left={parseInt(areatwo[0][0])}
              top={parseInt(areatwo[0][1])}
              width={parseInt(areatwo[1][0] - areatwo[0][0])}
              height={parseInt(areatwo[3][1] - areatwo[0][1])}
              style={{ zIndex: "1020" }}
            />
          </Fragment>
        );
      }
    } else if (this.state.areaone.length) {
      let areaone = this.state.areaone[0];
      if (areaone.length > 0) {
        return (
          <Sechild
            ref={confirmdef1 => {
              this.confirmdef1 = confirmdef1;
            }}
            color={blue}
            left={parseInt(areaone[0][0])}
            top={parseInt(areaone[0][1])}
            width={
              this.state.defwidth
                ? this.state.defwidth
                : parseInt(areaone[1][0] - areaone[0][0])
            }
            height={
              this.state.defheight
                ? this.state.defheight
                : parseInt(areaone[3][1] - areaone[0][1])
            }
          />
        );
      }
    } else if (this.state.areatwo.length) {
      let areatwo = this.state.areatwo[0];
      if (areatwo.length > 0) {
        return (
          <Sechild
            ref={confirmdef2 => {
              this.confirmdef2 = confirmdef2;
            }}
            color={red}
            left={parseInt(areatwo[0][0])}
            top={parseInt(areatwo[0][1])}
            width={
              this.state.defwidth
                ? this.state.defwidth
                : parseInt(areatwo[1][0] - areatwo[0][0])
            }
            height={
              this.state.defheight
                ? this.state.defheight
                : parseInt(areatwo[3][1] - areatwo[0][1])
            }
          />
        );
      }
    } else {
      return null;
    }
  };
  handOperation(id) {
    switch (id) {
      case 1: {
        this.setState({
          opebtn1: "删除防区一",
          opedisable1: true,
          subdisable1: false,
          opedisable2: true,
          subdisable2: true,
          subbtn1: "确认添加防区一"
        });
        if (this.state.areatwo.length) {
          let areatwo = this.state.areatwo[0];
          if (areatwo.length) {
            this.setState(
              {
                areatwo: [],
                presentlast: [areatwo]
              },
              () => {}
            );
          }
        }
        if (this.state.subbtn2 === "确认删除防区二") {
          this.setState({ subdisable2: true });
        }
        break;
      }
      case 2: {
        if (this.state.areaone.length) {
          let areaone = this.state.areaone[0];
          if (areaone.length) {
            this.setState(
              {
                areaone: [],
                presentlast: [areaone]
              },
              () => {}
            );
          }
        }
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
              subdisable1: false,
              opedisable2: false,
              subbtn1: "确认删除防区一",
              present: [
                defenceState.topLeftPoint,
                defenceState.topRightPoint,
                defenceState.bottRightPoint,
                defenceState.bottLeftPoint
              ],
              defwidth: defenceState.width,
              defheight: defenceState.height
            },
            () => {
              this.state.areaone = [this.state.present];
              if (this.state.presentlast) {
                this.state.areatwo = this.state.presentlast;
                this.state.presentlast = [];
              }
              this.renderDefence();
              this.forceUpdate();

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
                    this.setState({
                      present: []
                    });
                  }
                }
              );
            }
          );
          if (this.state.subbtn2 === "确认删除防区二") {
            this.setState({
              opedisable2: true,
              subdisable2: false
            });
          }
          this.renderDefence();

          break;
        }
        if (this.state.subbtn1 === "确认删除防区一") {
          this.setState(
            {
              areaone: [],
              present: [],
              opebtn1: "添加防区一",
              opedisable1: false,
              subdisable1: true,
              subbtn1: "确认添加防区一"
            },
            () => {
              this.renderDefence();
            }
          );

          post(
            {
              url: "/api/camera/fielddel",
              data: { key: 1, code: this.state.cid }
            },
            res => {}
          );
          this.renderDefence();

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
              subbtn2: "确认删除防区二",
              present: [
                defenceState.topLeftPoint,
                defenceState.topRightPoint,
                defenceState.bottRightPoint,
                defenceState.bottLeftPoint
              ],
              defwidth: defenceState.width,
              defheight: defenceState.height
            },
            () => {
              this.state.areatwo = [this.state.present];
              if (this.state.presentlast) {
                this.state.areaone = this.state.presentlast;
                this.state.presentlast = [];
              }

              this.renderDefence();
              this.forceUpdate();

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
                    this.setState({
                      present: []
                    });
                  }
                }
              );
            }
          );
          if (this.state.subbtn1 === "确认删除防区一") {
            this.setState({
              opedisable1: true,
              subdisable1: false
            });
          }
          this.renderDefence();

          break;
        }
        if (this.state.subbtn2 === "确认删除防区二") {
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
              this.renderDefence();
            }
          );
          post(
            {
              url: "/api/camera/fielddel",
              data: { key: 2, code: this.state.cid }
            },
            res => {}
          );
          this.renderDefence();

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
        <div className="setarea_cont">
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
        </div>
      </div>
    );
  }
}

export default Setarea;
