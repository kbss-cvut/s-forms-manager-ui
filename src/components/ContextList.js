import React from 'react';
import API from "../api";
import {FormGenView} from "./FormGenView";

export const DEFAULT_CONTEXT = "http://vfn.cz/ontologies/study-manager/formGen1601802887303";

export class ContextList extends React.Component {

    constructor() {
        super();
        this.state = {
            contexts: [],
            activeContext: null
        }
        this.updateActiveContextUri = this.updateActiveContextUri.bind(this)
    }

    componentDidMount() {
        API.get("/rest/contexts", {
            params: {
                "connectionName": "study-manager"
            }
        }).then(response => {
            return response.data;
        }).then(data => {
            this.setState({contexts: data});
        });
    }



    updateActiveContextUri(contextUri) {
        this.setState({activeContext: contextUri})
    }

    render() {

        let i = 0;
        const contexts = this.state.contexts.map((contextUri) => {
            i++;
            return (<Context key={i} contextUri={contextUri} connectionName="study-manager"
                             clickHandler={this.updateActiveContextUri}/>);
        });

        let formGenView;
        if(this.state.activeContext){
            formGenView = <FormGenView key={this.state.activeContext} contextUri={this.state.activeContext} connectionName={"study-manager"}></FormGenView>
        } else {
            formGenView = <div>Context not specified...</div>
        }

        return (
            <div>
                <h4>
                    Contexts
                </h4>
                <div>
                    {contexts}
                </div>
                <div>
                    {formGenView}
                </div>

            </div>)
    }
}

class Context extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        formInfo: null
    }

    requestGet(endpoint) {
        API.post(endpoint, null, {
            params: {
                "connectionName": this.props.connectionName,
                "contextUri": this.props.contextUri
            }
        }).then(response => {
            this.setState({formInfo: response.data})
        });
    }

    requestUpdate(endpoint) {
        API.post(endpoint, null, {
            params: {
                "connectionName": this.props.connectionName,
                "contextUri": this.props.contextUri
            }
        });
    }

    render() {
        return <div>
            <button onClick={() => this.props.clickHandler(this.props.contextUri)}>display s-form and persist info for
                '{this.props.contextUri}'
            </button>
            <button onClick={() => this.requestGet("/rest/formGen/info/get")}>show info</button>
            <button onClick={() => this.requestUpdate("/rest/formGen/info/update")}>update info</button>
            <span>Version:{this.state.formInfo != null ? this.state.formInfo.version : "  "}</span>
            <span>InstanceVersion:{this.state.formInfo != null ? this.state.formInfo.instance : "  "}</span>
        </div>
    }
}

// export default connect(mapStateToProps, null)(TermsList);
