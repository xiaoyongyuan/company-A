import React, { Component } from "react";
import "../../style/jhy/css/defendarea.css";
const blue = "#5063ee";
const red = "#ED2F2F";
class Sechild extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    var onPreviewDown = function(e) {
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
          var add_length = clickX - location.x;
          clickX = location.x;
          var length = parseInt(preview.style.width) - add_length;
          preview.style.width = length + "px";
          break;
        case "s":
          var add_length = clickY - location.y;
          clickY = location.y;
          var length = parseInt(preview.style.height) - add_length;
          preview.style.height = length + "px";
          break;
        case "w":
          var add_length = clickX - location.x;
          clickX = location.x;
          var length = parseInt(preview.style.width) + add_length;
          preview.style.width = length + "px";
          preview.style.left = clickX + "px";
          break;
        case "n":
          var add_length = clickY - location.y;
          clickY = location.y;
          var length = parseInt(preview.style.height) + add_length;
          preview.style.height = length + "px";
          preview.style.top = clickY + "px";
          break;
        case "move":
          var add_lengthX = location.x - clickX; //鼠标移动的距离
          var add_lengthY = location.y - clickY;
          var preDistanceX = add_lengthX + preLeft;
          var preDistanceY = add_lengthY + preTop;
          preview.style.top = preDistanceY + "px";
          preview.style.left = preDistanceX + "px";
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
    $("preview").onmousedown = onPreviewDown;
    document.onmousemove = onDragMove;
    document.onmouseup = onDragUp;
  }
  render() {
    return (
      <div
        id="preview"
        style={{
          width: "200px",
          minWidth: "80px",
          height: "200px",
          minHeight: "40px",
          border: "1px solid gray",
          position: "absolute",
          left: "200px",
          top: "100px",
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
      </div>
    );
  }
}
export default Sechild;
