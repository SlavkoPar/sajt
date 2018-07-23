import React, { Component } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Collapse, Fade } from 'reactstrap';
import { Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '0',

      collapse: false,
      accordion: [false,false, false, false, false, false, false, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,      
    };

    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    //this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleFade = this.toggleFade.bind(this);

  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  //toggle() {
  //  this.setState({ collapse: !this.state.collapse });
  //}

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  
  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
        <Col xs="12" md="12" className="mb-4">
            <Nav tabs>
            <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '0' })}
                  onClick={() => { this.toggle('0'); }}
                >
                Documentation
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Actions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Api
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  Reducers
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4' })}
                  onClick={() => { this.toggle('4'); }}
                >
                  Container
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '5' })}
                  onClick={() => { this.toggle('5'); }}
                >
                  Components
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '6' })}
                  onClick={() => { this.toggle('6'); }}
                >
                  Render
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="0">
              <Row>
  <Col xs="12" sm="6" md="6">
    <Card>
      <CardHeader>
        card-game application
      </CardHeader>
      <CardBody>
          <p>card-game aplication is example of usage of <b>React/Redux/Redux-loop</b> technologies.</p>
          <p>
          Where to keep business logic in <b>React/Redux</b> application?<br/>
          In a reducers we make decisions, and what should be done next. 
          </p>
          <p>
          So, we have the business logic in a reducers.<br/>
          We can follow application flow in reducers where each step defines next action.</p>
      </CardBody>
    </Card>
  </Col>
  <Col xs="12" sm="6" md="6">
    <Card>
      <CardHeader>
        redux-loop
      </CardHeader>
      <CardBody>
        <i>
      <p>
      The values returned from the reducer when scheduling an effect with <b><i>redux-loop</i></b> only describe the effect. 
      Calling the reducer will not cause the effect to run.
      </p>
      <p>
      The value returned by the reducer is just an object that the store knows how to interpret when it is enhanced by <b><i>redux-loop</i></b>. 
      </p>
      <p>
      You can safely call a reducer in your tests without worrying about 
      waiting for effects to finish and what they will do to your environment.
      </p>
      </i>
      </CardBody>
    </Card>
  </Col>
  <Col xs="12" sm="6" md="6">
    <Card>
      <CardHeader>
        <i className="fa fa-check float-right"></i>Libraries used
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
          <ul>
            <li>React</li>
            <li>Redux</li>
            <li>Redux-loop</li>
            <li>Redux-act</li>
            <li>Immutable</li>
            <li>react-router-dom</li>
          </ul>
          </Col>
          <Col>
          <ul>
            <li>SASS</li>
            <li>Bootstrap</li>
            <li>Reactstrap</li>
            <li>Jest, Enzyme, Fetch-mock</li>
            <li>Github</li> 
          </ul>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </Col>
  <Col xs="12" sm="6" md="6">
    <Card>
      <CardHeader>
        What else
      </CardHeader>
      <CardBody>
        ?
      </CardBody>
    </Card>
  </Col>
</Row>              
              </TabPane>            
              <TabPane tabId="1">
                <img src='assets/docimages/Actions.png' alt="" />
              </TabPane>
              <TabPane tabId="2">
                <img src='assets/docimages/Api.png' alt="" />
              </TabPane>
              <TabPane tabId="3">
              <div id="accordion">
                  <img src='assets/docimages/Reducers.png' alt="" />
                  <br/>
                  <br/>
                  <Card>
                    <CardHeader id="headingOne">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                        <h5 className="m-0 p-0">Shuffle Deck</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                      <CardBody>
                      <img src='assets/docimages/ShuffleDeck.png' alt="" />
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader id="headingTwo">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                        <h5 className="m-0 p-0">Draw the cards</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
                      <CardBody>
                        <img src='assets/docimages/DrawTheCard.png' alt="" />
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0">Game</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion" id="collapseThree">
                      <CardBody>
                      <img src='assets/docimages/game.png' alt="" />
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(3)} aria-expanded={this.state.accordion[3]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0">Human To Play</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[3]} data-parent="#accordion" id="collapseThree">
                      <CardBody>
                      <img src='assets/docimages/HumanToPlay.png' alt="" />
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(4)} aria-expanded={this.state.accordion[4]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0">Human Played</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[4]} data-parent="#accordion" id="collapseThree">
                      <CardBody>
                      <img src='assets/docimages/HumanPlayed.png' alt="" />
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(5)} aria-expanded={this.state.accordion[5]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0">Computer</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[5]} data-parent="#accordion" id="collapseThree">
                      <CardBody>
                      <img src='assets/docimages/Computer.png' alt="" />
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(6)} aria-expanded={this.state.accordion[6]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0">Hand played</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[6]} data-parent="#accordion" id="collapseThree">
                      <CardBody>
                      <img src='assets/docimages/HandPlayed.png' alt="" />
                      </CardBody>
                    </Collapse>
                  </Card>                                      
                  <br/>
                  <img src='assets/docimages/ReducersEnd.png' alt="" />                  
                </div>              
              </TabPane>
              <TabPane tabId="4">
                <img src='assets/docimages/Container.png' alt="" />
              </TabPane>
              <TabPane tabId="5">
                No need to create Container components.<br/>
                Redux Store holds the whole state tree of application, <br/>and our Components are Stateless.
                <br/>
                <br/>
                <img src='assets/docimages/Components.png' alt="" />
              </TabPane>
              <TabPane tabId="6">
                <img src='assets/docimages/Render.png' alt="" />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Home;
