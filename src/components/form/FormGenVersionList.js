import React from 'react';
import API from "../../api";
import Alert from "react-bootstrap/Alert";
import {FormGenVersionLine} from "./FormGenVersionLine";

export class FormGenVersionList extends React.Component {

    constructor() {
        super();
        this.state = {
            versions: []
        }
        this.requestVersions = this.requestVersions.bind(this)
    }

    componentDidMount() {
        this.requestVersions()
    }

    requestVersions() {
        API.get("/rest/formGenVersion", {
            params: {
                "connectionName": this.props.connectionName,
            }
        }).then(response => {
            return response.data;
        }).then(data => {
            console.log(data)
            this.setState({
                versions: data,
            });
        });
    }

    render() {
        if (!this.state.versions || this.state.versions.length == 0) {
            return <Alert variant={"light"} className={"h-10"}>
                Loading versions...
            </Alert>
        }

        let i = 0;
        let versions = this.state.versions.map((version) => {
            i++;
            return <FormGenVersionLine key={i}
                                       version={version.version}
                                       internalUri={version.internalUri}
                                       sampleContextUri={version.sampleContextUri}
                                       connectionName={this.props.connectionName}
                                       numberOfInstances={version.numberOfInstances}
                                       clickHandler={this.props.updateActiveContextUri}/>;
        });

        if (versions && versions.length == 0) {
            versions = <Alert variant={"light"} className={"h-10"}>
                The list is empty.
            </Alert>
        }

        return <div>
            {versions}
        </div>

    }
}
