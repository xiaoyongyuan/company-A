import React, { Component } from "react";
import "../../style/jhy/css/defendarea.css";
const blue = "#5063ee";
const red = "#ED2F2F";
class Sechild extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  componentDidMount(){
    function $(id) {
      return document.getElementById(id);
    }

    function getEvent(e) {
      return e || window.event;
    }

    function getLocation(e) {
      return {
        x: e.x || e.clientX,
        y: e.y || e.clientY,
      }
    }
    var obj = null; // 当前操作的对象
    var preview = null; // 要处理的对象
    var clickX = 0; // 保留上次的X轴位置
    var clickY = 0; // 保留上次的Y轴位置
    // 鼠标点击
    var onDragDown = function (e, type) {
      e = getEvent(e);
      var location = getLocation(e);

      clickY = location.y;
      clickX = location.x;
obj=this;
      obj.operateType=type;
      preview = $("preview");
      return false;
    };
    var onUpBtnDown = function (e) {
      onDragDown(e, "n");
    };
    var onDownBtnDown = function (e) {
      onDragDown(e, "s");
    };
    var onCenterLeftBtnDown = function (e) {
      onDragDown(e, "w");
    };
    var onCenterRightBtnDown = function (e) {
      onDragDown(e, "e");
    };
    var onUpLeftBtnDown = function (e) {
      onDragDown(e, "nw");
    };
    var onUpRightBtnDown = function (e) {
      onDragDown(e, "ne");
    };
    var onDownLeftBtnDown = function (e) {
      onDragDown(e, "sw");
    };
    var onDownRightBtnDown = function (e) {
      onDragDown(e, "se");
    };
    // var onCentercontext = function (e) {
    //   onDragDown(e, "move");
    // };
    var onDragUp = function () {
      document.body.style.cursor = "auto";
      obj = null;
    };
    var move = function (operateType, location, preview) {
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
        // case "move":
        //   clickX = location.x;
        //   clickY = location.y;
        //   preview.style.top = clickY + "px";
        //   preview.style.left = clickX + "px";
        //   break;
      }
    };
    var onDragMove = function (e) {
      if (obj) {
        e = getEvent(e);
        var location = getLocation(e);
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
          // case "move":
          //   move("move", location, preview);
          //   break;
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
      // $("centercontext").onmousedown = onCentercontext;
      document.onmousemove = onDragMove;
      document.onmouseup = onDragUp;
  }
  render(){
    return(
      <div id="preview"
    style={{width:'200px',minWidth: '80px', height:'200px',minHeight: '40px', border:'1px solid gray', position: 'absolute', left:'200px', top:'100px',zIndex:'10000'}}>
    <div className="upBtn" id="upBtn"></div>
    <div className="downBtn" id="downBtn"></div>
    <div className="upLeftBtn" id="upLeftBtn"></div>
    <div className="upRightBtn" id="upRightBtn"></div>
    <div className="downLeftBtn" id="downLeftBtn"></div>
    <div className="downRightBtn" id="downRightBtn"></div>
    <div className="centerLeftBtn" id="centerLeftBtn"></div>
    <div className="centerRightBtn" id="centerRightBtn"></div>
    <div className="centercontext" id="centercontext"></div>
  </div>
    )
  }
}
export default Sechild