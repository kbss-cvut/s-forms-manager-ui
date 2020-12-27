import SForms from "s-forms";
import React from "react";
import API from "../api";
import Alert from "react-bootstrap/Alert";

// TODO: should we have one component for displaying and just changing the state or new component for each of the contexts

export class SFormsDisplay extends React.Component {

    constructor() {
        super();
        this.state = {
            isFormValid: false,
            rawJsonForm: null
        };
        this.refForm = React.createRef();
    }

    componentDidMount() {
        if (this.props.contextUri) {
            API.post("/rest/formGen", null, {
                params: {
                    "connectionName": this.props.connectionName,
                    "contextUri": this.props.contextUri
                }
            }).then(response => {
                return response.data;
            }).then(data => {
                return JSON.parse(data);
            }).then(data => {
                this.setState({rawJsonForm: data});
            });
        }
    }

    fetchTypeAheadValues = (query) => {
        const possibleValues = require('../__mocks__/possibleValues.json');
        return new Promise((resolve) => setTimeout(() => resolve(possibleValues), 1500));
    };

    render() {
        if (!this.props.contextUri) {
            return <Alert variant={"light"} className={"h-10"}>
                Context not specified...
            </Alert>
        }

        const modalProps = {
            onHide: () => {
            },
            show: true,
            title: 'SForm'
        };

        const options = {
            i18n: {
                'wizard.next': 'Next',
                'wizard.previous': 'Previous'
            },
            intl: {
                locale: 'cs'
            },
            modalView: false,
            modalProps,
            horizontalWizardNav: true
        };
        if (this.props.contextUri && this.state.rawJsonForm) {
            return <SForms
                ref={this.refForm}
                form={this.state.rawJsonForm}
                options={options}
                fetchTypeAheadValues={this.fetchTypeAheadValues}
                isFormValid={(isFormValid) => this.setState({isFormValid})}
                enableForwardSkip={true}
            />;
        } else {
            return <Alert variant={"light"} className={"h-10"}>
                Wait...
            </Alert>;
        }


    }
}

