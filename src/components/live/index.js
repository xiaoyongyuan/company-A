import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';

export default class Live extends React.Component {
  componentDidMount() {
    // videojs.options.flash.swf = videoswf;
    this.player = videojs('myvideo', {
        preload: 'auto', // 预加载
        bigPlayButton: {}, // 大按钮
        controls: true, // 是否开启控制栏
        width: 800, // 播放器宽度
        height: 600, // 播放器高度
        playbackRates: [1, 1.5, 2], 
        muted: true, //是否循环播放
        loop : true, //是否静音
        autoplay:true, //是否自动播放
    }, function onPlayerReady() {
      this.src({
        src: 'rtmp://58.200.131.2:1935/livetv/hunantv',
        type:'rtmp/flv'
        // src: 'http://www.w3school.com.cn/i/movie.mp4',
        // type:'video/mp4'
      })
    });
    
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }
  render() {
    return (
      <div>    
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js" id="myvideo" />
        </div>
      </div>
    )
  }
}