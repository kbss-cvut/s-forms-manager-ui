'use strict';

import React from "react";
import {Configuration, WizardGenerator, Question} from "s-forms";

const wizard = require('../sample/form.json');

function onChange(index, change) {
    console.log(change);
}

var wizardStore = {
    initWizard() {
    }
};

class Form extends React.Component {
    constructor(props) {
        super(props);
        Configuration.dateFormat = "YYYY-MM-DD";
        Configuration.intl = {
            locale: navigator.language
        };
        Configuration.wizardStore = wizardStore;
        this.state = {
            step: null
        };
        Configuration.readOnly = false;
        WizardGenerator.createWizard(wizard, null, null, (props) => {
            this.setState({step: props.steps[0].data});
        });
    }

    render() {
        if (!this.state.step) {
            return <div>'Loading wizard...'</div>;
        }
        return <div>
            <Question question={this.state.step} onChange={onChange} indent={0}/>
        </div>;
    }
}

export default Form;
