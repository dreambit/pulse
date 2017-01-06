
import React, { PropTypes } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import { Link } from 'react-router'

class App extends React.Component {

  nuvburOnClick() {
    alert(4);
  }

  render () {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand href="/">
              <img src={require('../../img/pulse.png')} width="180px" height="40px"/>
          </NavbarBrand>
          <Nav className="float-xs-right" navbar>
          </Nav>
        </Navbar>
        <Container fluid>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

export default App;
