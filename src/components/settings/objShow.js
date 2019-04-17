import React, { Component } from 'react';
class objShow extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        ctx.lineWidth=1;
        ctx.strokeStyle="#C61717";
        ctx.beginPath();
        ctx.moveTo(30,30);
        ctx.lineTo(150,30);
        ctx.lineTo(150,150);
        ctx.lineTo(30,150);
        ctx.lineTo(30,30);
        ctx.stroke();
    }
    render() {
        let objShow={

        };
        let labelStyle={
            display:"inlineBlock",
            width:"40px",
            height:"20px",
            color:"#fff"
        };
        return (
           <div style={{objShow}}>
               <span style={{labelStyle}}>车</span>
               <canvas id="myCanvas" width="550px" height="500px" style={{background:"#A0A0A0"}} />
           </div> 
        )
    }

}

export default objShow;