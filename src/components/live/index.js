import React from 'react';
import ReactHLS from 'react-hls';
import { Pagination } from "antd";

// import '../../utils/video/video.css';
// import videojs from '../../utils/video/video.js';

class Live extends React.Component {
		constructor(props){
      super(props);
      this.state={
          list:[1,2,3,4],
          total:45,
          pagesize:1,
      };
    }
    pagechange=(page,pageSize)=>{
    	//page为跳转的页数，pagesize为每页的数量
    	console.log('pageSizepageSize',page,pageSize)
    }
    render() {
        return (
            <div className="live" style={{height: '100%', background: '#ececec', overflow: 'hidden'}}>
              <ReactHLS url={"rtmp://192.168.1.19/live/stream7"} />
              <Pagination defaultCurrent={this.state.pagesize} onChange={this.pagechange} total={this.state.total} style={{width:"100%",textAlign:"center",display:this.state.total?"block":"none"}}/>
            </div>


        )
    }
}

export default Live;

// "rtmp://192.168.1.19/live/stream7"