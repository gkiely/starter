module.exports = function(components){
  return function renderComponent(id, key){
    let Result = components[key];
    let info = _.omit(this.state.page, 'items');

    if(Result){
      return (
        <Result key={id} 
                app={this.state.app} 
                el={this.state.page.items[id]}
                {...info}
        />
      );
    }
  }
};