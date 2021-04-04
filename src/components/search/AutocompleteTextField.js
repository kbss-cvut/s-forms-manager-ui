import React from 'react'

import {DagSelect} from 'intelligent-dag-select'
import 'bootstrap/dist/css/bootstrap.css';
import "intelligent-dag-select/lib/styles.css"

function generateFlatItems(optionID) {
    const children = ["a", "b", "c", "d", "e", "f"];
    return children.map((ch) => ({
        "@id": ch,
        "#label": ch,
        "subTerm": children,
    }));
}

// Highly sophisticated communication interface
function echo(value, delayTime) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(value), delayTime)
    });
}

function dumpItems(parentID, parentOption, items) {
    console.groupCollapsed("Loading options for option %o", parentID);
    console.log("Parent option:", parentOption);
    console.log("Loaded items and their children:\n" + items.map(i => " » " + i["@id"] + "\n"
        + i.subTerm.map(s => "    → " + s).join("\n") + "\n").join("\n"));
    console.groupEnd();
}

function loadFlatOptions(parentOption) {
    const parentID = parentOption ? parentOption['@id'] : "/";
    let items = generateFlatItems(parentID);
    dumpItems(parentID, parentOption, items);
    return echo(items, parentOption ? 250 : 100); // Do AJAX here
}

export class DagDemo extends React.Component {
    render() {
        const selectedOption = this.state && this.state.selectedOption;
        return <section>
            <h2>DAG Select</h2>
            <p>The nodes have identical sets of children.</p>
            <DagSelect
                valueKey={"@id"}
                labelKey={"#label"}
                childrenKey={"subTerm"}
                isMenuOpen={true}
                expanded={false}
                maxHeight={0.6 * window.screen.height}
                fetchOptions={loadFlatOptions}
                onChange={opt => {
                    console.log("Selected option:", opt);
                    this.setState({selectedOption: opt["@id"]})
                }}
            />
            <p>Selected option: <code>{selectedOption}</code></p>
        </section>;
    }
}