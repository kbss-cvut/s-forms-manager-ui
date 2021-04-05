import React from 'react';
import API from "../../api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import DeleteProjectForm from "./DeleteProjectForm";
import Container from "react-bootstrap/Container";

const mapStateToProps = state => ({projects: state.projects})

export class ProjectsOverview extends React.Component {

    constructor() {
        super();
        this.state = {
            projects: null,
            isLoading: true
        }
        this.refresh = this.refresh.bind(this);
    }

    fetchProjects() {
        API.get("/rest/projects/all").then(response => {
            return response.data;
        }).then(data => {
            this.setState({
                projects: data,
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.fetchProjects()
    }

    refresh() {
        this.setState({isLoading: true})
        this.fetchProjects()
    }

    render() {

        let projectLines;
        if (this.state.isLoading) {
            projectLines = <div>Loading...</div>
        } else {
            projectLines = this.state.projects.map(app => {
                const {formGenRepositoryUrl, formGenServiceUrl, appRepositoryUrl, projectName: projectName} = app;

                return <div key={projectName}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}><p className="font-weight-bold"> Project Name </p></Col>
                                    <Col>{projectName}</Col>
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
                                        <DeleteProjectForm projectName={projectName}
                                                           refreshCallBack={this.refresh}/>
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
                    Projects
                </h3>
                <br/>
                <div>
                    <Button as={Link} to="/projects/add" variant="outline-success">Add new</Button>{' '}
                </div>
                <br/>
                <div>
                    {projectLines}
                </div>
            </Container>
        );
    }
}

export default connect(mapStateToProps)(ProjectsOverview);