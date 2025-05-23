import React from "react";
import {ContextLine} from "./ContextLine";
import Alert from "react-bootstrap/Alert";
import {ITEMS_PER_PAGE, Paginator} from "../Paginator";
import API from "../../api";

export class ContextList extends React.Component {

    constructor() {
        super();
        this.state = {
            contexts: null,
            totalItems: null,
            offset: null,
            loading: true
        }
        this.requestPaginatedContexts = this.requestPaginatedContexts.bind(this)
    }

    componentDidMount() {
        this.requestPaginatedContexts(0, ITEMS_PER_PAGE)
    }

    requestPaginatedContexts(offset, limit) {
        this.setState({loading: true})
        API.get("/rest/remote/paginated", {
            params: {
                "projectName": this.props.projectName,
                "offset": offset,
                "limit": limit
            }
        }).then(response => {
            return response.data;
        }).then(data => {
            this.setState({
                contexts: data.items,
                totalItems: data.totalItems,
                offset: data.offset,
                loading: false
            });
        });
    }

    render() {
        if (!this.state.contexts || this.state.contexts.length == 0) {
            return <Alert variant={"light"} className={"h-10"}>
                Loading contexts...
            </Alert>
        }

        let contexts = this.state.contexts.filter((context) => {
            if (this.props.filterProcessed) {
                return !context.processed
            } else {
                return true;
            }
        }).map((context, i) => {
            i++;
            return (
                <ContextLine key={i}
                             context={context}
                             projectName={this.props.projectName}
                             clickHandler={this.props.updateActiveContextUri}/>);
        });

        if (contexts && contexts.length == 0) {
            contexts = <Alert variant={"light"} className={"h-10"}>
                The list is empty.
            </Alert>
        }

        let paginator;
        if (this.state.contexts) {
            paginator = <Paginator totalItems={this.state.totalItems}
                                   offset={this.state.offset}
                                   loading={this.state.loading}
                                   requestItemsHandler={this.requestPaginatedContexts}/>;
        }

        return <div>

            {paginator}
            {contexts}

        </div>

    }
}
