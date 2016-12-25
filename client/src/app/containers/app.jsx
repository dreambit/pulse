
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
          <NavbarBrand href="/">Pulse</NavbarBrand>
          <Nav className="float-xs-right" navbar>
            <NavItem>
              <NavLink tag={Link} to="/online">Dashboard</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/">Main</NavLink>
            </NavItem>
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
