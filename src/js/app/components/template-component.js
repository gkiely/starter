/*======================================
=            Vendor Imports            =
======================================*/
import React, {Component} from 'react';
import autoBind from 'react-autobind';
// import PropTypes from 'prop-types';
/*=====  End of Vendor Imports  ======*/

/*===================================
=            App Imports            =
===================================*/
/*=====  End of App Imports  ======*/

/*===============================
=            Helpers            =
===============================*/
/*=====  End of Helpers  ======*/

/*=============================
=            Setup            =
=============================*/
/*=====  End of Setup  ======*/

/*=================================
=            Component            =
=================================*/
export default class MyComponent extends Component{
  constructor(props){
    super(props);
    this.state = {};
    autoBind(this);    
  }
  render(){
    return (
      <div></div>
    );
  }
}
/*=====  End of Component  ======*/

/*==================================
=            Prop Types            =
==================================*/
// MyComponent.propTypes = {};
/*=====  End of Prop Types  ======*/