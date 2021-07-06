import React from "react";
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";

export default class YasguiEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            yasguiEditor: null
        }
    }

    componentDidMount() {
        let yasgui = new Yasgui(document.getElementById("yasgui" + this.props.editorNumber));
        yasgui.getTab().setQuery(this.props.query)

        this.setState({yasguiEditor: yasgui})
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (prevProps.query !== this.props.query) {
            this.state.yasguiEditor.getTab().setQuery(this.props.query)
        }
    }


    render() {
        return <div className={"yasgui-disable-styles"} id={"yasgui" + this.props.editorNumber}/>;
    }
}
