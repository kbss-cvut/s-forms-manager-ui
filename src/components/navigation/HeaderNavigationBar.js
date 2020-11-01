import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = state => ({connectedApps: state.connectedApps})

class HeaderNavigationBar extends React.Component {

    constructor() {
        super();
        this.state = {
            connectedApps: []
        }
    }

    render() {
        const connectedAppsLinks = this.props.connectedApps.map(app =>{
            return <NavDropdown.Item key={app} as={Link} to={"/browse/" + app }>{app}</NavDropdown.Item>;}
        );
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">S-Forms Manager</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Connected Apps</Nav.Link>
                        <NavDropdown title="Browse Forms">
                            {connectedAppsLinks}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default connect(mapStateToProps)(HeaderNavigationBar);