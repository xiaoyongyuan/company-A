import React, { Component } from 'react';
import { Row, Col } from 'antd';

 class CanvasDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state={
        canvassty:{
            backgroundImage:'url(http://pic28.photophoto.cn/20130818/0020033143720852_b.jpg)'
        }
    };
        // this.initCanvas = this.initCanvas.bind(this)
  }
  initCanvas() {
    let ele = document.getElementById("time_graph_canvas")
    let circle = ele.getContext("2d");
    circle.lineWidth = 3;
    circle.strokeStyle = 'red';
        circle.moveTo(320,195);
        circle.lineTo(184,366);
        circle.lineTo(465,444);
        circle.lineTo(495,229);
        circle.lineTo(320,195);
        circle.stroke();
        circle.closePath();
 
  
  }

  componentDidMount() {
    this.initCanvas()
  }

  render() {
    return (
        <div>
                <Row>
                    <Col xl={{ span: 10}} xxl={{ span: 8 }}>
                        <div className="photo" id="canvasphoto">
                           <canvas id="time_graph_canvas" width="704px" height="576px" style={this.state.canvassty}></canvas> 
                        </div>
                    </Col>
                    <Col xl={{ span: 6}} xxl={{ span: 8 }}>

                    </Col>

                </Row>
           </div> 
   
    )
  }
}

export default CanvasDemo;