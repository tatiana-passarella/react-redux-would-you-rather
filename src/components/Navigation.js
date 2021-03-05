// Nav.js
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { setAuthUser } from '../actions/authUser';

class Navigation extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.setAuthUser(null);
  };

  render() {
    const { authUser, users } = this.props;

    return (
      <Navbar expand="lg" bg="light" variant="light" className="my-3 border">
        <Image
          src="logo192.png"
          roundedCircle
          fluid
          width="50"
          height="50"
          alt="logo"
        />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/" exact>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add">
              New Question
            </Nav.Link>
            <Nav.Link as={NavLink} to="/leaderboard">
              Leaderboard
            </Nav.Link>
          </Nav>
          <Nav className="align-items-start">
            <Navbar.Text>{users.name}</Navbar.Text>
            <Image
              src={users[authUser].avatarURL}
              roundedCircle
              fluid
              width="40"
              height="40"
              className="authuser-avatar"
              alt="user avatar"
            />
            <Button
              variant="outline-dark"
              onClick={this.handleLogout}
              className="mt-3 mt-lg-0"
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  return {
    authUser,
    users
  };
}

export default connect(
  mapStateToProps,
  { setAuthUser }
)(Navigation);