import React from 'react'

import "intelligent-tree-select/lib/styles.css"
import 'bootstrap/dist/css/bootstrap.css';
import API from "../../api";
import {IntelligentTreeSelect} from 'intelligent-tree-select';
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";
import Collapse from "react-bootstrap/Collapse";

export class IntelligentQuestionSelector extends React.Component {

    constructor() {
        super();
        this.state = {
            activeLabel: "",
            activeQuestionOrigin: "",
            activeQuestionOriginPath: "",
            detailCollapseOpen: false,
        }
        this.getAutocompleteValues = this.getAutocompleteValues.bind();
        this.refSelector = React.createRef();
    }

    getAutocompleteValues = async () => {

        const endpoint = this.props.singleFormOnly ? "/rest/search/select/options/version" : "/rest/search/select/options/all";
        return API.get(endpoint, {
            params: {
                projectName: this.props.projectName,
                recordContextUri: this.props?.contextUri
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

                if (opt) {
                    this.setState({
                        activeLabel: opt["label"],
                        activeQuestionOrigin: opt["questionOrigin"],
                        activeQuestionOriginPath: opt["questionOriginPath"]
                    })

                }
            }}
        />;


        return <div>
            {dagSelectorComponent}
            <div>
                <Button
                    variant="link" size="sm" className="float-right"
                    onClick={() => this.setState({detailCollapseOpen: !this.state.detailCollapseOpen})}
                    aria-controls="example-collapse-text"
                    aria-expanded={this.state.detailCollapseOpen}
                >
                    Show detail <FontAwesomeIcon color="black" icon={faCaretDown}/>
                </Button>
                <Collapse in={this.state.detailCollapseOpen}>
                    <div id="example-collapse-text">
                        <br/>
                        <span>Label: <b>{this.state.activeLabel}</b></span>
                        <br/>
                        <span>Question origin: {this.state.activeQuestionOrigin}</span>
                        <br/>
                        <span>Question origin path: {this.state.activeQuestionOriginPath}</span>
                    </div>
                </Collapse>
            </div>
        </div>;
    }
}