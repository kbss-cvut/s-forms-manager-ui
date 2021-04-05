import React from 'react';
import API from "../../api";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

export class AnswersCompareBoard extends React.Component {

    constructor() {
        super();
        this.state = {
            isInitialized: false,
            leftAnswers: null,
            rightAnswers: null,
            changedAnswers: null,
            numberOfUnchangedAnswers: "?"
        }
    }

    componentDidMount() {
        this.requestRecordSnapshotsAnswersCompare()
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (prevProps !== this.props) {
            console.log("old")
            console.log(prevProps)
            console.log("new")
            console.log(this.props)
            this.requestRecordSnapshotsAnswersCompare()
        } else {
            console.log("could not")
        }
    }

    requestRecordSnapshotsAnswersCompare() {

        API.get("/rest/record/snapshot/compare", {
            params: {
                "projectName": this.props.projectName,
                "contextUri1": this.props.comparedSnapshotUri1,
                "contextUri2": this.props.comparedSnapshotUri2
            }
        }).then(response => {
            return response.data
        }).then(data => {
            console.log(data)

            this.setState({
                leftAnswers: data.leftAnswers,
                rightAnswers: data.rightAnswers,
                changedAnswers: data.changedAnswers,
                numberOfUnchangedAnswers: data.numberOfUnchangedAnswers,
                isInitialized: true
            })


        }).catch(error => {
            console.log(error)
        });
    }

    getAnswersTable(answers) {
        if (!answers || answers.length == 0) {
            return <Alert variant={"light"} className={"h-10"}>
                The list is empty.
            </Alert>
        }

        const answerLines = answers.sort((a, b) => a.question > b.question ? 1 : -1).map((item, index) => {
            return <tr key={index}>
                <td>{item.question}</td>
                <td><b>{item.answerValue}</b></td>
            </tr>;
        });

        return <Table>
            <thead>
            <tr>
                <th>Question</th>
                <th>Answer</th>
            </tr>
            </thead>
            <tbody>
            {answerLines}
            </tbody>
        </Table>
    }

    getChangedAnswersTable(changedAnswers) {
        if (!changedAnswers || changedAnswers.length == 0) {
            return <Alert variant={"light"} className={"h-10"}>
                The list is empty.
            </Alert>
        }

        const answerLines = changedAnswers.sort((a, b) => a.question > b.question ? 1 : -1).map((item, index) => {
            return <tr key={index}>
                <td>{item.question}</td>
                <td><p className="text-warning">{item.leftAnswerValue}</p></td>
                <td><p className="text-success">{item.rightAnswerValue}</p></td>
            </tr>
        });

        return <Table>
            <thead>
            <tr>
                <th>Question</th>
                <th>Old answer</th>
                <th>New answer</th>
            </tr>
            </thead>
            <tbody>
            {answerLines}
            </tbody>
        </Table>
    }


    render() {
        if (!this.state.isInitialized) {
            return <Alert variant={"light"} className={"h-10"}>
                Parameters for comparation not specified.
            </Alert>
        }

        const changedAnswersTable = this.getChangedAnswersTable(this.state.changedAnswers);
        const leftAnswersTable = this.getAnswersTable(this.state.leftAnswers);
        const rightAnswersTable = this.getAnswersTable(this.state.rightAnswers);

        return <div>
            <h3>Compared answers</h3>
            <br/>
            <span>Record snapshot 1: {this.props.comparedSnapshotUri1} </span>
            <br/>
            <span>Record snapshot 2: {this.props.comparedSnapshotUri2} </span>
            <br/>
            <span>There is <b>{this.state.numberOfUnchangedAnswers}</b> unchanged answers. </span>
            <br/>
            <br/>
            <h5>Changed answers ({this.state.changedAnswers.length})</h5>
            {changedAnswersTable}
            <br/>
            <h5>New answers ({this.state.rightAnswers.length})</h5>
            {rightAnswersTable}
            <br/>
            <h5>Removed old answers ({this.state.leftAnswers.length})</h5>
            {leftAnswersTable}
        </div>
    }
}
