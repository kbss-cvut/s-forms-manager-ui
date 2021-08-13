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
                        You can manager SForms data with this app!
                    </p>
                </Container>
            </Jumbotron>
        );
    }
}