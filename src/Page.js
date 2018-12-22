import React,{ Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import App from './App';
// const user=JSON.parse(localStorage.getItem('user'));
export default () => {
	return (
		<Router>
        <Switch>
            <Route exact path="/" render={
            	() => <Redirect to={JSON.parse(localStorage.getItem('user')).ctype=='3'
            	?'/app/userhome/index'
            	:'/app/companyhome/index'
            } push />
            } />        
            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    </Router>

		)
    
}




// class Pages extends Component {
// 	constructor(props){
//         super(props);
//         this.state= {
//         }
//     }
	
// 		componentWillMount=()=>{
// 			const user=JSON.parse(localStorage.getItem('user'));
// 			console.log('useruser',user);
//         this.setState({
//             ctype:user.ctype
//         });
//     }
//     render() {
        
//         return (
//         		<Router>
// 			        <Switch>
// 			            <Route exact path="/" render={
// 			            	() => <Redirect to={JSON.parse(localStorage.getItem('user')).ctype=='3'
// 			            	?'/app/companyhome/companyscene'
// 			            	:'/app/companyhome/index'
// 			            } push />
// 			            } />        
// 			            <Route path="/app" component={App} />
// 			            <Route path="/404" component={NotFound} />
// 			            <Route path="/login" component={Login} />
// 			            <Route component={NotFound} />
// 			        </Switch>
// 			    </Router>
//         )
//     }
// }

// export default Pages;