import React, { Component } from 'react';
import { Row, Col,Button,Modal, Switch, Input, Icon  } from 'antd';
const ButtonGroup = Button.Group;
class Alarmdetails extends React.Component{
	constructor(props){
      super(props);
      this.state={
      	data:{ //请求的数据
      		src:'http://pic28.photophoto.cn/20130818/0020033143720852_b.jpg',
      		name:'理工大北门',
      		objtext:'人',
      		type:'1',
      		filed:{
      			1:[[[200,100],[400,100],[400,300],[200,300]]],
      		},
      		obj:{
      			1:[[[100,100],[200,100],[200,150],[100,150]]],
      		}
      	},
      	filed:true, //是否显示围界信息
      	obj:true, //是否显示报警对象
      	prev:23, //上一条数据code
      	next:24, //下一条数据code
      	code:22 //当前数据的code
      };
  }
  componentWillMount() {
  	//此处拿到父页面参数
  } 
  componentDidMount() { 
  	this.draw()
  	//此处请求数据
  }
  componentWillReceiveProps(nextProps){ //此处修改父页面参数
      // if( nextProps.visible != vis){
      //     vis=nextProps.visible;
      //     if(nextProps.visible){
      //         vis=nextProps.visible;
      //         this.setState({
      //             code:nextProps.code
      //         }, () => {
      //             this.requestdata()});
      //     }
      // }        
  }

  typetext=()=>{//处理状态显示
  	let text=''; 
  	switch(this.state.data.type){
  		case '0':
  			text='未处理';
  			break;
  		case '1':
  			text='确认';
  			break;
  		case '2':
  			text='忽略';
  			break;
  		case '3':
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
  		filed:true,
  		obj:true,
  		code:this.state[text]
    },()=>{
    	this.componentDidMount()
    });
  }
  draw = ()=>{ //画围界
  	let ele = document.getElementById("canvasobj");
    let area = ele.getContext("2d");
    area.clearRect(0,0,500,300);//清除之前的绘图
    area.lineWidth=1;

    const datafiled=this.state.data.filed;
    const objs=this.state.data.obj;

  	if(this.state.filed){
  		area.strokeStyle='#f00';
  		for(var key in datafiled){
        area.beginPath();
        area.moveTo(datafiled[key][0][0][0],datafiled[key][0][0][1]);
        area.lineTo(datafiled[key][0][1][0],datafiled[key][0][1][1]);
        area.lineTo(datafiled[key][0][2][0],datafiled[key][0][2][1]);
        area.lineTo(datafiled[key][0][3][0],datafiled[key][0][3][1]);
        area.lineTo(datafiled[key][0][0][0],datafiled[key][0][0][1]);
        area.stroke();
        area.closePath();
  		}
  		
  	}
  	if(this.state.obj){
  		area.strokeStyle='#ff0';
  		for(var key in objs){
          area.beginPath();
          area.moveTo(objs[key][0][0][0],objs[key][0][0][1]);
          area.lineTo(objs[key][0][1][0],objs[key][0][1][1]);
          area.lineTo(objs[key][0][2][0],objs[key][0][2][1]);
          area.lineTo(objs[key][0][3][0],objs[key][0][3][1]);
          area.lineTo(objs[key][0][0][0],objs[key][0][0][1]);
          area.stroke();
          area.closePath();
  		}
  		
  	}
  }
  alarmdeal=(type)=>{ //报警处理
  	// post({url:'/api/alarm/updata',data:{code:this.state.code,status:type}},(res)=>{
  	// 	if(res){
  				this.setState({
			  		type:type,
			    },()=>{
			    	this.typetext()
			    })
  	// 	}
  	// })
  }
    
    render(){ 
    const _this=this;      
        return(
            <div class="alarmDetails">
            	<Row>
            		<Col xl={12} xxl={8}>
            			<canvas id="canvasobj" width="500px" height="300px" style={{backgroundImage:'url('+this.state.data.src+')'}} />
            			<div>
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
            		<Col xl={8} xxl={6}>
            				<h4>{this.state.data.name}</h4>
            				<p><label>报警对象：<span>{this.state.data.objtext}</span></label></p>
            				<p><label>围界信息: <Switch size='small' checked={this.state.filed} onChange={(checked)=>this.onChange(checked,'filed')} /></label></p>
            				<p><label>报警信息: <Switch size='small' checked={this.state.obj} onChange={(checked)=>this.onChange(checked,'obj')} /></label></p>
            				<p><label>报警结果：<Input /></label></p>
            				<p><label>处理结果：</label><span>{this.state.typetext}</span></p>
            				<p><label>处理类型：</label> <Button type="primary"  onClick={()=>this.alarmdeal(1)}>确认</Button> <Button type="primary" onClick={()=>this.alarmdeal(3)}>虚警</Button> <Button type="primary" onClick={()=>this.alarmdeal(2)}>忽略</Button></p>
            		</Col>
            	</Row>
            </div>
        )
    }
}
export default Alarmdetails
