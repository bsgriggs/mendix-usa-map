import React, { Component, createElement } from "react";

import Mendix_USA_Map from "./components/mendix-usa-map";
import "./ui/UsaMap.css";

export default class UsaMap extends Component {
    constructor(props) {
        super(props);
    }

    validateProps() {
        console.log("props: ", this.props)
        let valid = true;
        if (this.props.useHeatMap) {
            if (this.props.hRange === undefined){
                valid = false;
                this.props.printLogs && console.error("USA Map - H Range is required for Heat Maps");
            }
            if (this.props.hOffset === undefined){
                valid = false;
                this.props.printLogs && console.error("USA Map - H Offset is required for Heat Maps");
            }
            if (this.props.hRange !== undefined && this.props.hOffset !== undefined && this.props.hOffset + this.props.hRange > 240){
                valid = false;
                this.props.printLogs && console.error("USA Map - The SUM of H Range and H Offset MUST be <= 240");
            }

            if (this.props.s === undefined){
                valid = false;
                this.props.printLogs && console.error("USA Map - HSLA value S is required for Heat Maps");
            } else if (this.props.s < 0 || this.props.h > 100) {
                valid = false;
                this.props.printLogs && console.error("USA Map - HSLA value S must be between 0 and 100");
            }
            if (this.props.l === undefined){
                valid = false;
                this.props.printLogs && console.error("USA Map - HSLA value L is required for Heat Maps");
            } else if (this.props.l < 0 || this.props.l > 100) {
                valid = false;
                this.props.printLogs && console.error("USA Map - HSLA value L must be between 0 and 100");
            }
            if (this.props.heatPercent === undefined){
                valid = false;
                this.props.printLogs && console.error("USA Map - Heat Percent is required for Heat Maps");
            }
        } else {
            if (this.props.stateColor === undefined){
                valid = false;
                this.props.printLogs && console.error("USA Map - State Color is required if you're not using the Heat Map");
            }
        }
        if (this.props.states.totalCount === 0){
            valid = false;
            this.props.printLogs && console.error("USA Map - No State list provided, check your data source");
        }
        return valid;
    }

    render() {
        if (this.props.states.status === "available") {
            if (this.validateProps()){
                console.log('Props: ',this.props)
                return (
                    <Mendix_USA_Map
                        title={this.props.title.value}
                        width={this.props.width.value}
                        height={this.props.height.value}
                        defaultFill={this.props.defaultFill.value}
                        states={this.props.states}
                        stateName={this.props.stateName}
                        stateColor={this.props.stateColor}
                        useHeatMap={this.props.useHeatMap}
                        heatPercent={this.props.heatPercent}
                        hRange={this.props.hRange}
                        hOffset={this.props.hOffset}
                        s={this.props.s}
                        l={this.props.l}
                        showGradient={this.props.showGradient}
                        printLogs={this.props.printLogs}
                        onStateClick={this.props.stateClick}
                        className={this.props.class}
                        style={this.props.style}
                    />
                );                
            } else if (this.props.printLogs){
                return <span className="mx-text text-danger">USA Map Widget was not passed valid data. Please check the browser console.</span>
            } else {
                return <span className="mx-text text-danger">There was a problem getting the data for the USA Map.</span>
            }
        } else {
            return null; 
        }
    }
}
