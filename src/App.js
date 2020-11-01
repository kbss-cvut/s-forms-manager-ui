import React from 'react';

import 's-forms/css/s-forms.min.css'
import 'react-datepicker/dist/react-datepicker.css';
import {ContextList} from "./components/ContextList";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {WelcomePage} from "./components/navigation/WelcomePage";
import HeaderNavigationBar from "./components/navigation/HeaderNavigationBar";
import {connect} from "react-redux";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.refForm = React.createRef();
    }

    render() {
        return (
            <div>
                <Router>
                    <HeaderNavigationBar store={this.props.store}/>

                    <Switch>
                        <Route exact path="/">
                            <WelcomePage/>
                        </Route>
                        <Route path="/browse/:connectionName">
                            <ContextList/>
                        </Route>
                        <Route path="/dashboard">
                            asdasdasda
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default connect()(App);
