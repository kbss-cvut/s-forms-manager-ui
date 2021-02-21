import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = state => ({connections: state.connections})

class HeaderNavigationBar extends React.Component {

    render() {
        const browseFormLinks = this.props.connections.map(app => {
                return <NavDropdown.Item key={app} as={Link} to={"/browse/forms/" + app}>{app}</NavDropdown.Item>;
            }
        );
        const browseContextLinks = this.props.connections.map(app => {
                return <NavDropdown.Item key={app} as={Link} to={"/browse/contexts/" + app}>{app}</NavDropdown.Item>;
            }
        );
        const searchInFormsLinks = this.props.connections.map(app => {
                return <NavDropdown.Item key={app} as={Link} to={"/search/forms/" + app}>{app}</NavDropdown.Item>;
            }
        );
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">S-Forms Manager</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/connections">
                            Connections
                        </Nav.Link>
                        <NavDropdown title="Browse Forms">
                            {browseFormLinks}
                        </NavDropdown>
                        <NavDropdown title="Browse Contexts">
                            {browseContextLinks}
                        </NavDropdown>
                        <NavDropdown title="Search in Forms">
                            {searchInFormsLinks}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default connect(mapStateToProps)(HeaderNavigationBar);