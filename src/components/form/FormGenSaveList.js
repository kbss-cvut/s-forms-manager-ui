import React from 'react';
import API from "../../api";
import Alert from "react-bootstrap/Alert";
import {FormGenSaveLine} from "./FormGenSaveLine";

export class FormGenSaveList extends React.Component {

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
        API.get("/rest/formGen/grouped", {
            params: {
                "connectionName": this.props.connectionName,
            }
        }).then(response => {
            return response.data;
        }).then(data => {
            console.log(data)
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
            return <FormGenSaveLine key={i}
                                    saveHash={formGenSaveGroupInfo.saveHash}
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
