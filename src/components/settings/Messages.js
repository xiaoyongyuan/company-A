import React, { Component } from 'react';
import { Tabs,Collapse, Icon,Badge } from 'antd';
import "../../style/ztt/css/message.css";
import replay_move from "../../style/ztt/img/message/replay_move.png";
import colck from "../../style/ztt/img/message/colck.png";
import rep from "../../style/ztt/img/message/rep.png";
import ot from "../../style/ztt/img/message/ot.png";
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
class Messages extends Component {
    constructor(props){
        super(props);
    }
    callback=(key)=> {
        console.log(key);
    };

    render() {
        const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

        const genExtra = () => (
            <Icon
                type="setting"
                onClick={(event) => {
                    // If you don't want click extra trigger collapse, you can prevent this:
                    event.stopPropagation();
                }}
            />
        );

        return (
           <div className="Messages">
               <div className="messages-top">
                   <Tabs defaultActiveKey="1" onChange={()=>this.callback}>
                       <TabPane tab="全部" key="1">
                           <Collapse onChange={this.callback}>
                               <Panel header={
                                   <div className="messTime">
                                       <div className="messAll">
                                           <Badge dot>
                                               <div className="mesICon"><img src={replay_move} alt="" /></div>
                                           </Badge>
                                           <div className="messFont">
                                               <span>防区异动</span>
                                               <span>添加新的防区</span>
                                           </div>
                                       </div>
                                       <div className="messData">2019-04-22 17:11:09</div>
                                   </div>}
                                      key="1"
                                      extra={genExtra()}>
                                   <div className="panelText">{text}</div>
                               </Panel>
                               <Panel header={
                                   <div className="messTime">
                                       <div className="messAll">
                                           <Badge dot>
                                               <div className="mesICon"><img src={colck} alt="" /></div>
                                           </Badge>
                                           <div className="messFont">
                                               <span>整点打卡</span>
                                               <span>北大门，正常</span>
                                           </div>
                                       </div>
                                       <div className="messData">2019-04-22 17:11:09</div>
                                   </div>}
                                      key="2" extra={genExtra()}>
                                   <div className="panelText">{text}</div>
                               </Panel>
                               <Panel header={
                                   <div className="messTime">
                                       <div className="messAll">
                                           <Badge dot>
                                               <div className="mesICon"><img src={rep} alt="" /></div>
                                           </Badge>
                                           <div className="messFont">
                                               <span>值守报表</span>
                                               <span>三月份报表已生成</span>
                                           </div>
                                       </div>
                                       <div className="messData">2019-04-22 17:11:09</div>
                                   </div>}
                                      key="3" extra={genExtra()}>
                                   <div className="panelText">{text}</div>
                               </Panel>
                               <Panel header={
                                   <div className="messTime">
                                       <div className="messAll">
                                           <Badge dot>
                                               <div className="mesICon"><img src={ot} alt="" /></div>
                                           </Badge>
                                           <div className="messFont">
                                               <span>其他</span>
                                               <span>其他</span>
                                           </div>
                                       </div>
                                       <div className="messData">2019-04-22 17:11:09</div>
                                   </div>}
                                      key="5" extra={genExtra()}>
                                   <div className="panelText">{text}</div>
                               </Panel>
                           </Collapse>
                       </TabPane>
                       <TabPane tab="异动" key="2">
                           <Collapse onChange={this.callback}>
                               <Panel header={
                                   <div className="messTime">
                                       <div className="messAll">
                                           <Badge dot>
                                               <div className="mesICon"><img src={replay_move} alt="" /></div>
                                           </Badge>
                                           <div className="messFont">
                                               <span>防区异动</span>
                                               <span>添加新的防区</span>
                                           </div>
                                       </div>
                                       <div className="messData">2019-04-22 17:11:09</div>
                                   </div>}
                                      key="1"
                                      extra={genExtra()}>
                                   <div className="panelText">{text}</div>
                               </Panel>
                           </Collapse>
                       </TabPane>
                       <TabPane tab="整点打卡" key="3">
                           <Collapse onChange={this.callback}>
                             <Panel header={
                                 <div className="messTime">
                                    <div className="messAll">
                                   <Badge dot>
                                       <div className="mesICon"><img src={colck} alt="" /></div>
                                   </Badge>
                                   <div className="messFont">
                                       <span>整点打卡</span>
                                       <span>北大门，正常</span>
                                   </div>
                               </div>
                                     <div className="messData">2019-04-22 17:11:09</div>
                                 </div>}
                                  key="2" extra={genExtra()}>
                               <div className="panelText">{text}</div>
                           </Panel>
                           </Collapse>
                       </TabPane>
                       <TabPane tab="值守报表" key="4">
                           <Collapse onChange={this.callback}>
                               <Panel header={
                                   <div className="messTime">
                                       <div className="messAll">
                                       <Badge dot>
                                           <div className="mesICon"><img src={rep} alt="" /></div>
                                       </Badge>
                                       <div className="messFont">
                                           <span>值守报表</span>
                                           <span>三月份报表已生成</span>
                                       </div>
                                   </div>
                                       <div className="messData">2019-04-22 17:11:09</div>
                                   </div>}
                                      key="3" extra={genExtra()}>
                                   <div className="panelText">{text}</div>
                               </Panel>
                           </Collapse>
                       </TabPane>
                       <TabPane tab="其他" key="6">
                           <Collapse onChange={this.callback}>
                               <Panel header={
                                   <div className="messTime">
                                        <div className="messAll">
                                       <Badge dot>
                                           <div className="mesICon"><img src={ot} alt="" /></div>
                                       </Badge>
                                       <div className="messFont">
                                           <span>其他</span>
                                           <span>其他</span>
                                       </div>
                                   </div>
                                       <div className="messData">2019-04-22 17:11:09</div>
                                   </div>}
                                      key="5" extra={genExtra()}>
                                   <div className="panelText">{text}</div>
                               </Panel>
                           </Collapse>
                       </TabPane>
                   </Tabs>
               </div>
           </div> 
        )
    }
}
export default Messages;