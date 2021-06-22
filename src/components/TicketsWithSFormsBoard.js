import React from "react";
import {CategorizedTicketsList} from "./ticket/CategorizedTicketsList";
import {SFormsDisplay} from "./SFormsDisplay";
import {CreateTicketForm} from "./ticket/CreateTicketForm";

export class TicketsWithSFormsBoard extends React.Component {

    constructor() {
        super();
    }

    render() {
        return <div>
            <h5>Tickets</h5>
            <CategorizedTicketsList projectName={this.props.projectName} contextUri={this.props.contextUri}/>
            <br/>
            <CreateTicketForm/>
            <br/>
            <h5>Form display</h5>
            <SFormsDisplay projectName={this.props.projectName} contextUri={this.props.contextUri}/>
        </div>;
    }
}

