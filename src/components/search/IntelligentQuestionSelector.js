import React from 'react'

import "intelligent-tree-select/lib/styles.css"
import 'bootstrap/dist/css/bootstrap.css';
import API from "../../api";
import {IntelligentTreeSelect} from 'intelligent-tree-select';

export class IntelligentQuestionSelector extends React.Component {

    constructor() {
        super();
        this.state = {
            activeLabel: "",
            activeQuestionOrigin: "",
            activeQuestionOriginPath: ""
        }
        this.getAutocompleteValues = this.getAutocompleteValues.bind();
        this.refSelector = React.createRef();
    }

    getAutocompleteValues = async () => {
        return API.get("/rest/search/select/options", {
            params: {
                projectName: this.props.projectName
            }
        }).then((response) => {
            return response.data;
        }).catch((error) => {
                console.log(error)
            }
        );
    }

    render() {
        // TODO: remove "Create new option"

        let dagSelectorComponent = <IntelligentTreeSelect
            ref={this.refSelector}
            fetchOptions={this.getAutocompleteValues}
            valueKey={"questionOriginPath"}
            labelKey={"label"}
            childrenKey={"subTerm"}
            simpleTreeData={true}
            isMenuOpen={true}
            multi={false}
            renderAsTree={true}
            onChange={opt => {
                this.refSelector.current._addSelectedOption(opt);

                this.setState({
                    activeLabel: opt["label"],
                    activeQuestionOrigin: opt["questionOrigin"],
                    activeQuestionOriginPath: opt["questionOriginPath"]
                })
            }}
        />;


        return <div>
            {dagSelectorComponent}
            <div>
                <br/>
                <span>Label: <b>{this.state.activeLabel}</b></span>
                <br/>
                <span>Question origin: {this.state.activeQuestionOrigin}</span>
                <br/>
                <span>Question origin path: {this.state.activeQuestionOriginPath}</span>

            </div>
        </div>;
    }
}