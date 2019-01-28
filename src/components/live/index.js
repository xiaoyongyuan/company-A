import React from 'react';
import VideoJsForReact from 'videojs-for-react';
// import 'videojs/dist/video-js.min.css';
// import videojs from '../../utils/video/video.js';

class Live extends React.Component {
		constructor() {
      super()
      this.state = {
        videoJsOptions: {
          preload: 'auto', // 预加载
          bigPlayButton: {}, // 大按钮
          autoplay: true,// 自动播放
          controls: true,// 是否开启控制栏
          width: 800,// 播放器宽度
          height: 600,// 播放器高度
          // teachOrder:['flash'],
          playbackRates: [1, 1.5, 2], // 播放倍速
          sources: [// 视频源
            {
              src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/44_176_20170224113626af3a75cd-3508-4bc3-b51f-366fca3c7e39.m3u8',
              type: 'application/x-mpegURL',
              label: '资源1',
              withCredentials: false,
              res: 960
            },{
              src: 'http://www.w3school.com.cn/i/movie.mp4',
              type: 'video/mp4',
              label: '资源3',
              res: 1080
            }
          ]
        }
      }
    }
    // rtmp://mobliestream.c3tv.com:554/live/goodtv.sdp
    // "rtmp://192.168.1.19/live/stream7"
    // http://pic01.aokecloud.cn/alarm/1000011/video/20181229/1000011_20181229095336.mp4
    // http://www.w3school.com.cn/i/movie.mp4
    render() {
        return (
            <div className="live" style={{height: '100%', overflow: 'hidden'}}>
              <VideoJsForReact
                sourceChanged={(player) => console.log(player)}
                onReady={(player) => console.log('准备完毕', player)}
                {...this.state.videoJsOptions}
                />
            </div>
            )
    }
}

export default Live;
