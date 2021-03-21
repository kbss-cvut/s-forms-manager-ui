import React from 'react';
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";

export class SearchResultList extends React.Component {

    render() {
        const searchResults = this.props.searchResults

        if (!searchResults) {
            return <Alert variant={"light"} className={"h-10"}>
                Loading forms...
            </Alert>
        } else if (searchResults.length == 0) {
            return <Alert variant={"light"} className={"h-10"}>
                The list is empty.
            </Alert>
        }


        const searchResultsTableRows = searchResults.map((record, i) => {
            if (typeof record === 'object' && record !== null) {
                return <tr key={i}>{record.map((property, index) => <td key={index}>{property}</td>)}</tr>
            } else {
                return <tr key={i}>
                    <td>{record}</td>
                </tr>;
            }
        });

        const firstRecord = this.props?.searchResults[0];
        const tableHeadLine = (typeof firstRecord === 'object' && firstRecord !== null) ?
            firstRecord.map((p, i) => <th key={i}><b>{i}</b></th>) : <th></th>;

        return <div>
            <span>There is <b>{searchResultsTableRows.length}</b> results.</span>
            <Table>
                <thead>
                <tr>{tableHeadLine}</tr>
                </thead>
                <tbody>
                {searchResultsTableRows}
                </tbody>
            </Table>
        </div>
    }
}