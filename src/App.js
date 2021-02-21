import React from 'react';

import 's-forms/css/s-forms.min.css'
import 'react-datepicker/dist/react-datepicker.css';
import {ContextOverview} from "./components/context/ContextOverview";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {WelcomePage} from "./components/navigation/WelcomePage";
import HeaderNavigationBar from "./components/navigation/HeaderNavigationBar";
import {connect} from "react-redux";
import {ConnectionsOverview} from "./components/connections/ConnectionsOverview";
import AddConnectionForm from "./components/connections/AddConnectionForm";
import {FormGenOverview} from "./components/form/FormGenOverview";
import {SearchOverview} from "./components/search/SearchOverview";

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
                        <Route exact path="/browse/forms/:connectionName" component={FormGenOverview}>
                        </Route>
                        <Route exact path="/browse/contexts/:connectionName" component={ContextOverview}>
                        </Route>
                        <Route path="/connections/add"> {/* has to be in front of /connections */}
                            <AddConnectionForm/>
                        </Route>
                        <Route path="/connections">
                            <ConnectionsOverview/>
                        </Route>
                        <Route exact path="/search/forms/:connectionName" component={SearchOverview}>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default connect()(App);
