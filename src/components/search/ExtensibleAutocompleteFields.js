import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {SearchAutocompleteTextField} from "./SearchAutocompleteTextField";

export class ExtensibleAutocompleteFields extends React.Component {

    constructor() {
        super();
        this.state = {
            autocompleteQuestions: [""]
        }
        this.handleQuestionChanged = this.handleQuestionChanged.bind(this)
        this.handleAddQuestion = this.handleAddQuestion.bind(this)

    }

    handleQuestionChanged = (evt, idx) => {
        let newQuestions = this.state.autocompleteQuestions
        newQuestions[idx] = evt.target.value
        this.setState({autocompleteQuestions: newQuestions});
    };

    handleAddQuestion = () => {
        this.setState({
            autocompleteQuestions: this.state.autocompleteQuestions.concat("")
        });
    };


    render() {
        let autocompleteQuestionFields = this.state.autocompleteQuestions.map((v, idx) => (
            <SearchAutocompleteTextField type="text"
                                         placeholder="question origin"
                                         key={idx}
                                         parentOnChangeCallback={this.handleQuestionChanged}
                                         projectName={this.props.projectName}
                                         depth={idx}
                                         questionOrigins={this.state.autocompleteQuestions}
            />
        ));


        return <div>
            <Button
                variant="link" size="sm" className="float-right"
                onClick={this.handleAddQuestion}>
                <FontAwesomeIcon style={{position: "absolute"}} color="blue" icon={faPlus}/>
            </Button>
            <Form.Group controlId="autocompleteFormGroup">
                {autocompleteQuestionFields}
            </Form.Group>
        </div>
    }
}