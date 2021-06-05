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
        this.requestFormGenJson()
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (prevProps !== this.props) {
            this.requestFormGenJson()
        }
    }

    requestFormGenJson() {
        if (this.props.contextUri) {
            API.post("/rest/sforms/s-forms-json-ld", null, {
                params: {
                    "projectName": this.props.projectName,
                    "contextUri": this.props.contextUri
                }
            }).then(response => {
                return response.data;
            }).then(data => {
                const jsonLdGraph = JSON.parse(data);
                if (Array.isArray(jsonLdGraph)) {
                    return jsonLdGraph[0];
                } else {
                    return jsonLdGraph;
                }
            }).then(data => {
                this.setState({rawJsonForm: data});
            });
        } else if (this.props.version1 && this.props.version2) {
            API.get("/rest/formGenVersion/compare", {
                params: {
                    "projectName": this.props.projectName,
                    "version1": this.props.version1,
                    "version2": this.props.version2
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

    fetchTypeAheadValues = async (query) => {
        return await API.post("/rest/sforms/s-forms-possible-values", null, {
            params: {
                "query": query
            }
        }).then(response => {
            console.log(response.data)
            return response;
        });
    }

    render() {
        if (!this.props.contextUri && (!this.props.version1 || !this.props.version2)) {
            return <Alert variant={"light"} className={"h-10"}>
                Form not specified...
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
            wizardStepButtons: true,
            enableForwardSkip: true,
            horizontalWizardNav: true
        };
        if ((this.props.contextUri && this.state.rawJsonForm) || (this.props.version1 && this.props.version2 && this.state.rawJsonForm)) {
            return <SForms
                ref={this.refForm}
                form={this.state.rawJsonForm}
                options={options}
                fetchTypeAheadValues={this.fetchTypeAheadValues}
                isFormValid={(isFormValid) => this.setState({isFormValid})}
            />;
        } else {
            return <Alert variant={"light"} className={"h-10"}>
                Wait...
            </Alert>;
        }


    }
}

