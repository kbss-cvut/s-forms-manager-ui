import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import API from "../../api"
import {removeProjectsFromStore} from "../../actions";

const mapStateToProps = state => {
    return ({projects: state.projects})
}

const mapDispatchToProps = dispatch => {
    return ({
        removeProject: (name) => {
            dispatch(removeProjectsFromStore(name))
        }
    })
}

class DeleteProjectForm extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false
        }
        this.deleteProject = this.deleteProject.bind(this);
    }

    deleteProject() {
        API.delete("/rest/projects", {
            data: this.props.projectName
        }).then(response => {
            this.props.removeProject(this.props.projectName)
            this.props.refreshCallBack()
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        if (this.state.show) {
            return (
                <div>
                    <br/>
                    <Alert variant="danger" onClose={() => this.setState({show: false})} dismissible>
                        <Alert.Heading>Warning!</Alert.Heading>
                        <p>
                            You are about to delete a project. Are you sure want to do it?
                        </p>
                        <Button variant="outline-danger"
                                onClick={() => this.deleteProject()}>Delete</Button>
                    </Alert>
                </div>
            );
        }
        return <Button variant="outline-danger" onClick={() => this.setState({show: true})}>Delete</Button>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProjectForm);