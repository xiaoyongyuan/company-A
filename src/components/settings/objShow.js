import React, { Component } from 'react';
class objShow extends Component {
    constructor(props){
        super(props);
        this.state={
            filed:[
                {w: 139, x: 119, h: 219, y: 73, tag: 0},
                {w: 39, x: 49, h: 219, y: 73, tag: 2},
                {w: 79, x: 59, h: 219, y: 273, tag: 3},
                {w: 39, x: 249, h: 219, y: 173, tag: 1},
            ]
        };
    }
    componentDidMount() {
       this.myCanvas();
       this.fontCanvas();
    }
    handleType=(tag)=>{
        switch (tag) {
            case 0:
                return "人";
            case 1:
                return "车";
            case 2:
                return "动物";
            case 3:
                return "树";
        }
    }
    myCanvas=()=>{
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        ctx.strokeStyle = "blue";
        const filed=this.state.filed;
        filed.map((v)=>{
            ctx.beginPath();
            ctx.rect(v.x,v.y,v.w,v.h);
            ctx.stroke();
        })
    };
    fontCanvas=()=>{
        var c=document.getElementById("fontCanvas");
        var ctx=c.getContext("2d");
        ctx.font="15px 宋体";
        ctx.strokeStyle = "#13A013";
        const filed=this.state.filed;
        filed.map((v,i)=>{
            ctx.beginPath();
            ctx.rect(v.x,v.y-20,0,20);
            ctx.stroke();
        });
        filed.map((v)=>{
            ctx.strokeText(this.handleType(v.tag),v.x+5,v.y-5);
        })
    };
    render() {
        let objShow={
            position: "relative",
        };
        let labelStyle={
            position: "absolute",
            top:0,
            left:0,
        };
        return (
           <div style={objShow}>
               <canvas id="fontCanvas" width="550px" height="500px" style={labelStyle} />
               <canvas id="myCanvas" width="550px" height="500px" style={{background:"#A0A0A0"}} />
           </div> 
        )
    }

}

export default objShow;