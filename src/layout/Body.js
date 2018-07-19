import React, { Component } from "react";
import "./Body.css";


import { Switch, Route/*, Redirect*/ } from 'react-router-dom'

// routes config
import routes from '../routes';


class Body extends Component {

  constructor(props) {
    super(props);
    this.bodyRef = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.bodyRef.current.scrollTop = this.bodyRef.current.scrollHeight;
  };

  render() {
    console.log('process.env.PUBLIC_URL:"', process.env.PUBLIC_URL, '"')
   
    return (
      <div className="Body" ref={this.bodyRef}>
        <Switch>
          {routes.map((route, idx) => {
            return route.component ? (<Route key={idx} path={process.env.PUBLIC_URL + route.path} exact={route.exact} name={route.name} render={props => (
                <route.component {...props} />
              )} />)
              : (null);
          },
          )}
        </Switch>
      </div>
    );
  }
}

export default Body;