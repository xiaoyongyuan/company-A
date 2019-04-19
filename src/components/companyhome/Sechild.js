import React, { Component } from "react";
import "../../style/jhy/css/defendarea.css";
class Sechild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topLeftPoint: [],
      topRightPoint: [],
      bottLeftPoint: [],
      bottRightPoint: []
    };
  }
  componentDidMount() {
    function $(id) {
      return document.getElementById(id);
    }

    function getEvent(e) {
      return e || window.event;
    }

    function getLocation(e) {
      return {
        x: e.x || e.clientX,
        y: e.y || e.clientY
      };
    }
    var obj = null; // 当前操作的对象
    var preview = null; // 要处理的对象
    var clickX = 0; // 保留上次的X轴位置
    var clickY = 0; // 保留上次的Y轴位置
    var preLeft = 0; //保留处理对象的坐标
    var preTop = 0; //保留处理对象的坐标
    // 鼠标点击
    var onDragDown = function(e, type, _this) {
      e = getEvent(e);
      var location = getLocation(e);
      clickY = location.y;
      clickX = location.x;
      preview = $("preview");
      preLeft = preview.offsetLeft;
      preTop = preview.offsetTop;

      obj = _this;
      obj.operateType = type;
      return false;
    };
    var onUpBtnDown = function(e) {
      var _this = this;

      onDragDown(e, "n", _this);
    };
    var onDownBtnDown = function(e) {
      var _this = this;
      onDragDown(e, "s", _this);
    };
    var onCenterLeftBtnDown = function(e) {
      var _this = this;

      onDragDown(e, "w", _this);
    };
    var onCenterRightBtnDown = function(e) {
      var _this = this;

      onDragDown(e, "e", _this);
    };
    var onUpLeftBtnDown = function(e) {
      var _this = this;

      onDragDown(e, "nw", _this);
    };
    var onUpRightBtnDown = function(e) {
      var _this = this;

      onDragDown(e, "ne", _this);
    };
    var onDownLeftBtnDown = function(e) {
      var _this = this;

      onDragDown(e, "sw", _this);
    };
    var onDownRightBtnDown = function(e) {
      var _this = this;

      onDragDown(e, "se", _this);
    };
    var onCenterContextDown = function(e) {
      var _this = this;
      onDragDown(e, "move", _this);
    };
    var onDragUp = function() {
      document.body.style.cursor = "auto";
      obj = null;
    };
    var move = function(operateType, location, preview) {
      document.body.style.cursor = location + "_resize";
      switch (operateType) {
        case "e":
          var add_length = location.x - clickX;
          clickX = location.x;
          var length = parseInt(preview.style.width) + add_length;
          preview.style.width = length + "px";
          if (
            parseInt(preview.style.width) + parseInt(preview.offsetLeft) >
            704
          ) {
            onDragUp();
            preview.style.left = 703 - parseInt(preview.style.width) + "px";
          }
          break;
        case "s":
          var add_length = location.y - clickY;
          clickY = location.y;
          var length = parseInt(preview.style.height) + add_length;
          preview.style.height = length + "px";
          if (
            parseInt(preview.style.height) + parseInt(preview.offsetTop) >
            574
          ) {
            onDragUp();
            preview.style.top = 573 - parseInt(preview.style.height) + "px";
          }
          break;
        case "w":
          var add_length = location.x - clickX;
          clickX = location.x;
          var length = parseInt(preview.style.width) - add_length;
          preview.style.width = length + "px";
          preview.style.left = add_length + preview.offsetLeft + "px";
          if (parseInt(preview.offsetLeft) < 0) {
            onDragUp();
            preview.style.left = "1px";
          }
          break;
        case "n":
          var add_length = location.y - clickY;
          clickY = location.y;
          var length = parseInt(preview.style.height) - add_length;
          preview.style.height = length + "px";
          preview.style.top = add_length + preview.offsetTop + "px";
          if (parseInt(preview.offsetTop) < 0) {
            onDragUp();
            preview.style.top = "1px";
          }
          break;
        case "move":
          var add_lengthX = location.x - clickX; //鼠标移动的距离
          var add_lengthY = location.y - clickY;
          var preDistanceX = add_lengthX + preLeft;
          var preDistanceY = add_lengthY + preTop;
          preview.style.top = preDistanceY + "px";
          preview.style.left = preDistanceX + "px";
          var comput = getComputedStyle(preview);
          if (preview.offsetTop < 0) {
            preview.style.top = 0;
          }
          if (preview.offsetLeft < 0) {
            preview.style.left = 0;
          }
          var totalw = parseInt(preview.offsetLeft) + parseInt(comput.width);
          var totalh = parseInt(preview.offsetTop) + parseInt(comput.height);
          if (totalw > 704) {
            var finalleft = 704 - parseInt(comput.width);
            preview.style.left = `${finalleft}px`;
          }
          if (totalh > 574) {
            var finaltop = 574 - parseInt(comput.height);
            preview.style.top = `${finaltop}px`;
          }

          break;
      }
    };
    var onDragMove = function(e) {
      if (obj) {
        e = getEvent(e);
        var location = getLocation(e);
        preview = $("preview");

        switch (obj.operateType) {
          case "n":
            move("n", location, preview);
            break;
          case "s":
            move("s", location, preview);
            break;
          case "w":
            move("w", location, preview);
            break;
          case "e":
            move("e", location, preview);
            break;
          case "nw":
            move("n", location, preview);
            move("w", location, preview);
            break;
          case "ne":
            move("n", location, preview);
            move("e", location, preview);
            break;
          case "sw":
            move("s", location, preview);
            move("w", location, preview);
            break;
          case "se":
            move("s", location, preview);
            move("e", location, preview);
            break;
          case "move":
            move("move", location, preview);
            break;
        }
      }
      return false;
    };
    $("upBtn").onmousedown = onUpBtnDown;
    $("downBtn").onmousedown = onDownBtnDown;
    $("centerLeftBtn").onmousedown = onCenterLeftBtnDown;
    $("centerRightBtn").onmousedown = onCenterRightBtnDown;
    $("upLeftBtn").onmousedown = onUpLeftBtnDown;
    $("upRightBtn").onmousedown = onUpRightBtnDown;
    $("downLeftBtn").onmousedown = onDownLeftBtnDown;
    $("downRightBtn").onmousedown = onDownRightBtnDown;
    $("centerContext").onmousedown = onCenterContextDown;
    document.onmousemove = onDragMove;
    document.onmouseup = onDragUp;
  }
  render() {
    const bordcolor = this.props.color ? this.props.color : "green";
    const defleft = this.props.left + "px" ? this.props.left : "200px";
    const deftop = this.props.top + "px" ? this.props.top : "100px";
    return (
      <div
        id="preview"
        style={{
          width: "200px",
          minWidth: "20px",
          height: "200px",
          minHeight: "20px",
          border: `1px solid ${bordcolor}`,
          position: "absolute",
          left: defleft,
          top: deftop,
          zIndex: "10000"
        }}
      >
        <div className="upBtn" id="upBtn" />
        <div className="downBtn" id="downBtn" />
        <div className="upLeftBtn" id="upLeftBtn" />
        <div className="upRightBtn" id="upRightBtn" />
        <div className="downLeftBtn" id="downLeftBtn" />
        <div className="downRightBtn" id="downRightBtn" />
        <div className="centerLeftBtn" id="centerLeftBtn" />
        <div className="centerRightBtn" id="centerRightBtn" />
        <div className="centerContext" id="centerContext" />
      </div>
    );
  }
}
export default Sechild;
