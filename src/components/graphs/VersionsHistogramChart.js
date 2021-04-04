import React from "react";
import {Line} from "react-chartjs-2";
import {MDBContainer} from "mdbreact";
import API from "../../api";
import 'chartjs-plugin-colorschemes';
import 'chartjs-plugin-zoom';
import Button from "react-bootstrap/Button";


class VersionsHistogramChart extends React.Component {

    ref = {
        chart: React.createRef()
    }

    state = {
        dataLine: {
            labels: [],
            datasets: []
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            // Container for pan options
            pan: {
                // Boolean to enable panning
                enabled: true,

                // Panning directions. Remove the appropriate direction to disable
                // Eg. 'y' would only allow panning in the y direction
                mode: 'x',
                grab: true,
                speed: 2,
            },

            // Container for zoom options
            zoom: {
                // Boolean to enable zooming
                enabled: true,
                // Zooming directions. Remove the appropriate direction to disable
                // Eg. 'y' would only allow zooming in the y direction
                mode: 'x',
                speed: 500,
                sensitivity: 0.5
            }
        }
    }

    componentDidMount() {
        this.requestHistogram();
    }

    requestHistogram() {
        API.get("/rest/formTemplate/version/histogram", {
            params: {
                "projectName": this.props.projectName,
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

        const chart = <Line data={this.state.dataLine} options={this.state.options}
                            ref={(reference) => (this.ref.chart = reference)}/>

        return (
            <div className="text-center">
                <MDBContainer>
                    <h3 className="mt-5">Versions histogram</h3>
                    <span>The graph shows number of form views per month for recognized form template versions.</span>
                    {chart}
                </MDBContainer>
                <br/>
                <Button variant="outline-secondary" onClick={() => {
                    this.ref.chart.chartInstance.resetZoom()
                }}>Reset zoom</Button>
            </div>
        );
    }
}

export default VersionsHistogramChart;