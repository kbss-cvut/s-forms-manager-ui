import React from 'react';
import API from "../../api";
import Alert from "react-bootstrap/Alert";
import {FormGenHistoryLine} from "./FormGenHistoryLine";

export class FormGenHistoryList extends React.Component {

    constructor() {
        super();
        this.state = {
            formGens: []
        }
        this.requestFormGens = this.requestFormGens.bind(this)
    }

    componentDidMount() {
        this.requestFormGens()
    }

    requestFormGens() {
        API.get("/rest/formGen/history", {
            params: {
                "connectionName": this.props.connectionName,
                "saveHash": this.props.saveHash
            }
        }).then(response => {
            this.setState({
                formGens: response.data,
            });
        });
    }

    render() {
        if (!this.state.formGens || this.state.formGens.length == 0) {
            return <Alert variant={"light"} className={"h-10"}>
                Loading history...
            </Alert>
        }

        let i = 0;
        let formGenSaves = this.state.formGens.map((historyFormGen) => {
            i++;
            return <FormGenHistoryLine key={i}
                                       versionName={historyFormGen.versionName}
                                       synonym={historyFormGen.synonym}
                                       created={historyFormGen.created}
                                       modified={historyFormGen.modified}
                                       contextUri={historyFormGen.contextUri}
                                       clickHandler={this.props.clickHandler}/>;
        });

        if (formGenSaves && formGenSaves.length == 0) {
            formGenSaves = <Alert variant={"light"} className={"h-10"}>
                The list is empty.
            </Alert>
        }

        return <div>
            <h5>History</h5>
            {formGenSaves}
        </div>

    }
}
