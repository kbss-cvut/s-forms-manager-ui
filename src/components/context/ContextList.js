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
        console.log(offset)
        console.log(limit + ".")
        API.get("/rest/contexts/paginated", {
            params: {
                "connectionName": this.props.connectionName,
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

        let i = 0;
        const contexts = this.state.contexts.filter((context) => {
            if (this.props.filterProcessed) {
                return !context.processed
            } else {
                return true;
            }
        }).map((context) => {
            i++;
            return (
                <ContextLine key={i}
                             context={context}
                             connectionName={this.props.connectionName}
                             clickHandler={this.props.updateActiveContextUri}/>);
        });

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
