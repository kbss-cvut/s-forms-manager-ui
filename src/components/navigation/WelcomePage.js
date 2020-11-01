import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

export class WelcomePage extends React.Component {
    render() {
        return (
            <Jumbotron fluid>
                <Container>
                    <h1>Welcome to SForms Manager!</h1>
                    <p>
                        This is a modified jumbotron that occupies the entire horizontal space of
                        its parent.
                    </p>
                </Container>
            </Jumbotron>
        );
    }
}