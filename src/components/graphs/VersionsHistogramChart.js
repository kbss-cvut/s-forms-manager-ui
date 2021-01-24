import React from "react";
import {Line} from "react-chartjs-2";
import {MDBContainer} from "mdbreact";
import API from "../../api";
import 'chartjs-plugin-colorschemes';


class VersionsHistogramChart extends React.Component {

    state = {
        dataLine: {
            labels: [],
            datasets: []
        }
    }

    options: {
        plugins: {
            colorschemes: {
                scheme: 'brewer.Paired12'
            }
        }
    }

    componentDidMount() {
        this.requestHistogram();
    }

    requestHistogram() {
        API.get("/rest/formGenVersion/histogram", {
            params: {
                "connectionName": this.props.connectionName,
            }
        }).then(response => {
            const {earliestYear, earliestMonth, latestYear, latestMonth, histogramData} = response.data;
            const labels = this.setDateLabels(earliestYear, earliestMonth, latestYear, latestMonth);

            let datasets = [];
            for (const version in histogramData) {
                const dataset = this.createNewDataset(version, histogramData[version]);
                datasets.push(dataset)
            }

            this.setState({
                dataLine: {
                    labels: labels,
                    datasets: datasets
                }
            });
        });
    }

    createNewDataset(name, data) {
        return {
            label: name,
            data: data
        };
    }

    setDateLabels(earliestYear, earliestMonth, latestYear, latestMonth) {
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const labels = [];
        let datesRange = (latestYear - earliestYear) * 12 + (latestMonth - earliestMonth) + 1;

        for (let i = 0; i <= datesRange; i++) {
            const monthString = month[(earliestMonth + i - 1) % 12];
            const yearString = (earliestYear + Math.floor((earliestMonth + i - 1) / 12));
            labels.push(monthString + " " + yearString);
        }
        return labels;
    }

    render() {
        return (
            <MDBContainer>
                <h3 className="mt-5">Versions histogram</h3>
                <Line data={this.state.dataLine} options={{responsive: true}}/>
            </MDBContainer>
        );
    }
}

export default VersionsHistogramChart;