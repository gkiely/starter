/*======================================
=            Vendor Imports            =
======================================*/
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
/*=====  End of Vendor Imports  ======*/

/*===================================
=            App Imports            =
===================================*/
/*=====  End of App Imports  ======*/

/*=============================
=            Setup            =
=============================*/
/*=====  End of Setup  ======*/

/*===============================
=            Helpers            =
===============================*/
/*=====  End of Helpers  ======*/


/*=================================
=            Component            =
=================================*/
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      prevPath: '',
    };
    autoBind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.location !== this.props.location) {
      this.setState({ 
        prevPath: this.props.location,
      });
    }
  }
  render(){
    return (
      <div>Starter Template</div>
    );
  }
}
/*=====  End of Component  ======*/

/*==============================
=            Router            =
==============================*/
// let routes = {
//   default(prev, next){
//   }
// };

ReactDOM.render((
  <Router>
    <Route component={withRouter(App)}></Route>
  </Router>
), document.getElementById('app'));

export default App;
/*=====  End of Router  ======*/
