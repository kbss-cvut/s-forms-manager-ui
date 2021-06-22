import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import API from "../../api";
import {UncategorizedTicketsList} from "./UncategorizedTicketsList";

export class TicketsOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tickets: null,
        }
    }

    componentDidMount() {
        this.requestTickets();
    }

    requestTickets() {
        API.post("/rest/ticket/project", null, {
            params: {
                "projectName": this.props.match.params.projectName,
            }
        }).then(response => {
            console.log(response.data);
            this.setState({tickets: response.data});
        });
    }

    render() {

        return (
            <Container fluid>
                <Container>
                    <br/>
                    <h4>
                        Tickets: {this.props.match.params.projectName}
                    </h4>
                    <Row>
                        <Col>
                            <div>
                                <UncategorizedTicketsList projectName={this.props.match.params.projectName}/>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </Container>)
    }
}
