import React, { Component } from 'react';
import { Row, Col,Button,Modal, Switch, Input, Icon  } from 'antd';
import {queryString} from "../../utils/index";
import {post} from "../../axios/tools";
const ButtonGroup = Button.Group;
const { TextArea } = Input;
let vis=false;
class Alarmdetails extends React.Component{
	constructor(props){
      super(props);
      this.state={
      	data:{ //请求的数据
      		src:'',
      		name:'理工大北门',
      		tags:'',
      		type:'1',
          atime:'',
      		field:[],
      		// obj:{
      		// 	1:[[[100,100],[200,100],[200,150],[100,150]]],
      		// }
      	},
      	field:true, //是否显示围界信息
      	obj:true, //是否显示报警对象
      	prev:'', //上一条数据code
      	next:'', //下一条数据code
      	code:'', //当前数据的code
      };
  }
  componentWillMount() {
  	//此处拿到父页面参数
    this.setState({
        // code:this.props.code
        code:320
    });
  }
  componentDidMount() {
    post({url:"/api/alarm/getone",data:{code:this.state.code}},(res)=>{
        let data={
          src:res.data.picpath,
          field:res.data.field,
          alarmtype:res.data.alarmtype,
          atime:res.data.atime,
          type:res.data.status,   
          tags:res.data.tags,        
        }
        this.setState({
          data:data,
          prev:res.data.last,
          next:res.data.next, 
      },()=>{
        this.draw();
        this.typetext()

      });
    })

    
    } 
  componentWillReceiveProps(nextProps){ //此处修改父页面参数
      if( nextProps.visible != vis){
          vis=nextProps.visible;
          if(nextProps.visible){
              vis=nextProps.visible;
              this.setState({
                  code:nextProps.code
              }, () => {
                  this.componentDidMount()});
          }
      }        
  }

  typetext=()=>{//处理状态显示
  	let text=''; 
  	switch(this.state.data.type){
  		case 0:
  			text='未处理';
  			break;
  		case 1:
  			text='确认';
  			break;
  		case 2:
  			text='忽略';
  			break;
  		case 3:
  			text='虚警';
  			break;
  	}
  	this.setState({
  		typetext:text,
  	})
  }
  onChange=(checked,text)=>{ //控制显示围界与对象
  	this.setState({
        [text]: checked,
    },()=>{
    	this.draw()
    });	
  }
  looknew=(text)=>{ //查看上下一条
  	this.setState({
  		field:true,
  		obj:true,
  		code:this.state[text]
    },()=>{
    	this.componentDidMount()
    });
  }
  draw = ()=>{ //画围界
  	let ele = document.getElementById("canvasobj");
    let area = ele.getContext("2d");
    area.clearRect(0,0,600,500);//清除之前的绘图
    area.lineWidth=1;

    
    const datafield=this.state.data.field;
  	if(this.state.field && datafield.length){      
  		area.strokeStyle='#f00';
      datafield.map((el,i)=>{
        area.beginPath();
        area.moveTo(datafield[i][0][0],datafield[i][0][1]);
        area.lineTo(datafield[i][1][0],datafield[i][1][1]);
        area.lineTo(datafield[i][2][0],datafield[i][2][1]);
        area.lineTo(datafield[i][3][0],datafield[i][3][1]);
        area.lineTo(datafield[i][0][0],datafield[i][0][1]);
        area.stroke();
        area.closePath();

      })
  	}
    const objs=this.state.data.obj;
  	// if(this.state.obj){
  	// 	area.strokeStyle='#ff0';
  	// 	for(var key in objs){
   //        area.beginPath();
   //        area.moveTo(objs[key][0][0][0],objs[key][0][0][1]);
   //        area.lineTo(objs[key][0][1][0],objs[key][0][1][1]);
   //        area.lineTo(objs[key][0][2][0],objs[key][0][2][1]);
   //        area.lineTo(objs[key][0][3][0],objs[key][0][3][1]);
   //        area.lineTo(objs[key][0][0][0],objs[key][0][0][1]);
   //        area.stroke();
   //        area.closePath();
  	// 	}
  		
  	// }
  }
  alarmdeal=(type)=>{ //报警处理
  	post({url:'/api/alarm/update',data:{code:this.state.code,status:type}},(res)=>{
  		if(res){
        let data=this.state.data;
        data.type=type;
				this.setState({
		  		data:data,
		    },()=>{
		    	this.typetext()
		    })
  		}
  	})
  }
    
    render(){ 
    const _this=this;      
        return(
            <div className="alarmDetails">
            	<Row>
            		<Col xl={17} xxl={17}>
            			<canvas id="canvasobj" width="704px" height="576px" style={{backgroundImage:'url('+this.state.data.src+')',backgroundSize:"100% 100%"}} />
            			<div style={{textAlign:'center'}}>
            				<ButtonGroup>
							  <Button type="primary" onClick={()=>this.looknew('prev')} disabled={this.state.prev?false:true}>
								<Icon type="left" />上一条
							  </Button>
							  <Button type="primary" onClick={()=>this.looknew('next')}  disabled={this.state.next?false:true}>
								下一条<Icon type="right" />
							  </Button>
							</ButtonGroup>
            			</div>
            		</Col>	
            		<Col xl={6} xxl={6}>
            				<h4>{this.state.data.name}</h4>
            				<p><label>报警对象：<span>{this.state.data.tags}</span></label></p>
            				<p><label>围界信息: <Switch size='small' checked={this.state.field} onChange={(checked)=>this.onChange(checked,'field')} /></label></p>
            				<p><label>报警信息: <Switch size='small' checked={this.state.obj} onChange={(checked)=>this.onChange(checked,'obj')} /></label></p>
            				<p><label>报警时间：<span>{this.state.data.atime}</span></label></p>
                    {/*<p><label>报警结果：<TextArea rows={3} /></label></p>*/}
            				<p><label>处理结果：</label><span>{this.state.typetext}</span></p>
            				<p><label>处理类型：</label> <Button type="primary"  onClick={()=>this.alarmdeal(1)}>确认</Button> <Button type="primary" onClick={()=>this.alarmdeal(3)}>虚警</Button> <Button type="primary" onClick={()=>this.alarmdeal(2)}>忽略</Button></p>
            		</Col>
            	</Row>
            </div>
        )
    }
}
export default Alarmdetails
