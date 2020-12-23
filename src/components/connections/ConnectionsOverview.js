import React from 'react';
import API from "../../api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import DeleteConnectionForm from "./DeleteConnectionForm";
import Container from "react-bootstrap/Container";

const mapStateToProps = state => ({connections: state.connections})

export class ConnectionsOverview extends React.Component {

    constructor() {
        super();
        this.state = {
            connections: null,
            isLoading: true
        }
        this.refresh = this.refresh.bind(this);
    }

    fetchConnections() {
        API.get("/rest/connections/all").then(response => {
            return response.data;
        }).then(data => {
            this.setState({
                connections: data,
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.fetchConnections()
    }

    refresh() {
        this.setState({isLoading: true})
        this.fetchConnections()
    }

    render() {

        let connectionsView;
        if (this.state.isLoading) {
            connectionsView = <div>Loading...</div>
        } else {
            connectionsView = this.state.connections.map(app => {
                const {formGenRepositoryUrl, formGenServiceUrl, appRepositoryUrl, connectionName} = app;

                return <div key={connectionName}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}><p className="font-weight-bold"> Connection Name </p></Col>
                                    <Col>{connectionName}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}><p className="font-weight-bold"> FormGen Repository URl</p></Col>
                                    <Col>{formGenRepositoryUrl}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}><p className="font-weight-bold"> Service URL </p></Col>
                                    <Col>{formGenServiceUrl}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}><p className="font-weight-bold"> App Repository URL </p></Col>
                                    <Col>{appRepositoryUrl}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <Button variant="outline-secondary">Change</Button>{' '}
                                        <DeleteConnectionForm connectionName={connectionName} refreshCallBack={this.refresh}/>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <br/>
                </div>
            });
        }

        return (
            <Container>
                <br/>
                <h3>
                    Connections
                </h3>
                <br/>
                <div>
                    <Button as={Link} to="/connections/add" variant="outline-success">Add new</Button>{' '}
                </div>
                <br/>
                <div>
                    {connectionsView}
                </div>
            </Container>
        );
    }
}

export default connect(mapStateToProps)(ConnectionsOverview);