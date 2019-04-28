import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import {post} from "../../axios/tools";
import {message} from 'antd';
export default class Live extends React.Component {
    constructor(props){
        super(props);
        this.state={
            id:{}
        }
    }
    componentWillMount() {
        this.setState({
            id:this.props.query.id
        })
    }


    componentDidMount() {
      this.handleTask();
    // videojs.options.flash.swf = videoswf;
    var _this=this;
    this.player = videojs('myvideo', {
        preload: 'auto',// 预加载
        bigPlayButton: {},// 大按钮
        controls: true,// 是否开启控制栏
        width: 800,// 播放器宽度
        height: 600,// 播放器高度
        playbackRates: [1, 1.5, 2], 
        muted: true, //是否循环播放
        loop : true, //是否静音
        autoplay:true, //是否自动播放     
    }, function onPlayerReady() {
        if(_this.state.id){
            this.src({
                src: 'rtmp://39.108.188.75:1935/live/'+_this.state.id,
                type:'rtmp/flv'
            })
        }
    });
  }
    //请求任务id
    handleTask=()=>{
        if(this.props.query.id){
            post({url:"/api/equipment/get_directvideo",data:{eid:this.props.query.id}},(res)=>{
                if(res.success){
                    this.setState({
                        //任务id
                        taskId:res.data
                    },()=>{
                        this.handlePullFlow()
                    })
                }
            })
        }
    };
    //判断是否能直播
    handlePullFlow=()=>{
        if(this.state.taskId){
            post({url:"/api/smptask/getone",data:{code:this.state.taskId,apptype:1}},(res)=>{
                if(res.success){
                    if(res.taskstatus===1){
                        message.success(res.taskmemo);
                    }
                }
            })
        }
    };
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
      //关闭
      if(this.state.taskId){
          post({url:"/api/equipment/get_directclose",data:{eid:this.props.query.id}},(res)=>{
              if(res.success){
                  message.success("关闭直播！");
              }
          })
      }
  }
  render() {
    return (
      <div>    
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js" id="myvideo"></video>
        </div>
        
      </div>
    )
  }
}