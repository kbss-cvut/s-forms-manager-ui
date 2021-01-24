import React from 'react';
import API from "../../api";
import Alert from "react-bootstrap/Alert";
import {FormGenLine} from "./FormGenLine";

export class FormGenList extends React.Component {

    constructor() {
        super();
        this.state = {
            formGenSaves: []
        }
        this.requestFormGens = this.requestFormGens.bind(this)
    }

    componentDidMount() {
        this.requestFormGens()
    }

    requestFormGens() {
        API.get("/rest/formGen/latestSaves", {
            params: {
                "connectionName": this.props.connectionName
            }
        }).then(response => {
            return response.data;
        }).then(data => {
            this.setState({
                formGenSaves: data,
            });
        });
    }

    render() {
        if (!this.state.formGenSaves || this.state.formGenSaves.length == 0) {
            return <Alert variant={"light"} className={"h-10"}>
                Loading forms...
            </Alert>
        }

        let i = 0;
        let formGenSaves = this.state.formGenSaves.map((formGenSaveGroupInfo) => {
            i++;
            return <FormGenLine key={i}
                                saveHash={formGenSaveGroupInfo.saveHash}
                                connectionName={this.props.connectionName}
                                numberOfSaves={formGenSaveGroupInfo.count}
                                lastSaved={formGenSaveGroupInfo.lastSaved}
                                contextUri={formGenSaveGroupInfo.contextUri}
                                clickHandler={this.props.updateActiveContextUri}/>;
        });

        if (formGenSaves && formGenSaves.length == 0) {
            formGenSaves = <Alert variant={"light"} className={"h-10"}>
                The list is empty.
            </Alert>
        }

        return <div>
            {formGenSaves}
        </div>

    }
}
