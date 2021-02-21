import React from 'react';
import Alert from "react-bootstrap/Alert";
import {FormGenLine} from "./FormGenLine";

/**
 * FormGens:
 *  1) are provided in this.state.props.formGenSaves
 *  OR
 *  2) are provided through this.props.requestFormGens callback
 */
export class FormGenList extends React.Component {

    constructor() {
        super();
        this.state = {
            formGenSaves: null
        }
    }

    componentDidMount() {
        this.requestFormGensFromProps();
    }

    requestFormGensFromProps() {
        if (this.props.requestFormGens) {
            this.props.requestFormGens().then(response => {
                return response.data;
            }).then(data => {
                this.setState({
                    formGenSaves: data,
                });
            });
        }
    }

    render() {
        const formGens = this.props?.formGenSaves || this.state.formGenSaves

        if (!formGens) {
            return <Alert variant={"light"} className={"h-10"}>
                Loading forms...
            </Alert>
        }

        let i = 0;
        const formGenLines = formGens ? formGens.map((formGenSaveGroupInfo) => {
            i++;
            return <FormGenLine key={i}
                                saveHash={formGenSaveGroupInfo.saveHash}
                                connectionName={this.props.connectionName}
                                numberOfSaves={formGenSaveGroupInfo.count}
                                created={formGenSaveGroupInfo.created}
                                lastModified={formGenSaveGroupInfo.lastModified}
                                contextUri={formGenSaveGroupInfo.contextUri}
                                clickHandler={this.props.updateActiveContextUri}/>;
        }) : <Alert variant={"light"} className={"h-10"}>
            The list is empty.
        </Alert>; // TODO: create a function for that
        // TODO: introduce this concept to the whole app

        return <div>
            {this.props.displayCount ? (
                <span>There is <b>{formGenLines.length}</b> results. </span>
            ) : (<div></div>)}
            {formGenLines}
        </div>

    }
}
