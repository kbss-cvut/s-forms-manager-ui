import React from 'react';
import Alert from "react-bootstrap/Alert";
import API from "../../api";
import {TicketLine} from "./TicketLine";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

function createTicketLines(tickets) {
    return (tickets && tickets.length !== 0) ? tickets.map((ticket, i) => {
        return <TicketLine key={i}
                           name={ticket.name}
                           description={ticket.description}
                           url={ticket.url}
                           relations={ticket.relations}
        />;
    }) : <Alert variant={"light"} className={"h-10"}>
        The list is empty.
    </Alert>;
}

export class CategorizedTicketsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formTickets: null,
            formVersionTickets: null,
            questionTickets: null
        }
    }

    componentDidMount() {
        this.requestTickets();
    }

    requestTickets() {
        API.post("/rest/ticket/category", null, {
            params: {
                "projectName": this.props.projectName,
                "contextUri": this.props.contextUri,
            }
        }).then(response => {
            return response.data;
        }).then(ticketsInCategories => {
            console.log(ticketsInCategories)
            this.setState({
                formTickets: ticketsInCategories.formTickets,
                formVersionTickets: ticketsInCategories.formVersionTickets,
                questionTickets: ticketsInCategories.questionTickets
            });
        });
    }

    render() {

        const formTickets = this.state.formTickets
        const formVersionTickets = this.state.formVersionTickets
        const questionTickets = this.state.questionTickets

        if (!(formTickets && formVersionTickets && questionTickets)) {
            return <Alert variant={"light"} className={"h-10"}>
                Loading tickets...
            </Alert>
        }

        const formTicketsLines = createTicketLines(formTickets);
        const versionTicketsLines = createTicketLines(formVersionTickets);
        const questionTicketsLines = createTicketLines(questionTickets);

        return <div>
            <Tabs defaultActiveKey="#" transition={false} id="ticket-tabs">
                <Tab eventKey="form" title={"Form related (" + formTickets.length + ")"}>
                    <br/>
                    {formTicketsLines}
                </Tab>
                <Tab eventKey="formVersion" title={"Form version related (" + formVersionTickets.length + ")"}>
                    <br/>
                    {versionTicketsLines}
                </Tab>
                <Tab eventKey="question" title={"Question related (" + questionTickets.length + ")"}>
                    <br/>
                    {questionTicketsLines}
                </Tab>
            </Tabs>
        </div>
    }
}
