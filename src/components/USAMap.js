import React, { createElement } from "react";
import PropTypes from "prop-types";
import { territoryData, stateData } from "./usa-map-dimensions";
import USAState from "./USAState";

class USAMap extends React.Component {
    clickHandler = stateAbbreviation => {
        this.props.onClick(stateAbbreviation);
    };

    fillStateColor = state => {
        if (this.props.customize && this.props.customize[state] && this.props.customize[state].fill) {
            return this.props.customize[state].fill;
        }

        return this.props.defaultFill;
    };

    stateClickHandler = state => {
        if (this.props.customize && this.props.customize[state] && this.props.customize[state].clickHandler) {
            return this.props.customize[state].clickHandler;
        }
        return this.clickHandler;
    };

    buildPaths = data => {
        let paths = [];
        let dataStates = data();
        for (let stateKey in dataStates) {
            const state = dataStates[stateKey];
            if (state) {
                const path = (
                    <USAState 
                        key={stateKey}
                        stateName={state.name}
                        dimensions={state.dimensions}
                        state={stateKey}
                        fill={this.fillStateColor(stateKey)}
                        onClickState={this.stateClickHandler(stateKey)}
                    />
                );
                paths.push(path);
            }
        }
        return paths;
    };

    buildPathDCOnly = () => {
      let paths = [];
        const state = territoryData()["DC"];
        if (state) {
            const path = (
                <USAState 
                    key={"DC"}
                    stateName={state.name}
                    dimensions={state.dimensions}
                    state={"DC"}
                    fill={this.fillStateColor("DC")}
                    onClickState={this.stateClickHandler("DC")}
                />
            );
            paths.push(path);
        }
      return paths;
  };

    render() {
        return (
            <div className="full-map">
                <svg
                    className="us-state-map"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 959 593"
                >
                    <title>{this.props.title}</title>
                    <g className="outlines">{this.buildPaths(stateData)}</g>
                </svg>
                {this.props.useTerritories && (
                    <svg
                        className="us-territories-map"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20%"
                        height="100%"
                        viewBox="0 0 250 700"
                    >
                        <title>Territories</title>
                        <g className="outlines">{this.buildPaths(territoryData)}</g>
                    </svg>
                )}
                {this.props.useOnlyDC && (
                    <svg
                        className="us-territories-map"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20%"
                        height="100%"
                        viewBox="0 0 250 700"
                    >
                        <title>Territories</title>
                        <g className="outlines">{this.buildPathDCOnly()}</g>
                    </svg>
                )}
            </div>
        );
    }
}

USAMap.propTypes = {
    onClick: PropTypes.func.isRequired,
    useOnlyDC: PropTypes.bool,
    useTerritories: PropTypes.bool,
    title: PropTypes.string,
    defaultFill: PropTypes.string,
    customize: PropTypes.object
};

USAMap.defaultProps = {
    onClick: () => {},
    width: 959,
    height: 593,
    defaultFill: "#D3D3D3",
    title: "Blank US states map",
    customize: {}
};

export default USAMap;
