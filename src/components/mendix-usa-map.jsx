import React, { Component, createElement } from "react";
// import USAMap from "react-usa-map";
import USAMap from "./USAMap";

const Mendix_USA_Map = props => {
    const {
        title,
        defaultFill,
        states,
        stateName,
        stateColor,
        onStateClick,
        className,
        style,
        useHeatMap,
        useTerritories,
        useOnlyDC,
        heatPercent,
        hRange,
        hOffset,
        s,
        l,
        showGradient,
        printLogs
    } = props;

    // The Documentation says this global event is MANDATORY
    const mapHandler = event => {
        printLogs && console.log("Clicked State without Data", event.target.dataset);
    };

    function calcHeatColor(hPercent) {
        if (hPercent !== undefined) {
            let calcH = Math.floor((1.0 - hPercent) * hRange + hOffset);
            let hslString = `hsla(${calcH},${s}%,${l}%,100%)`;
            return hslString;
        } else {
            printLogs && console.error("USA Map - Unable to find heatPercent value, please check your data source");
            return "lightred";
        }
    }

    const mapSettings = () => {
        let settingsObj = {};
        if (states.items !== undefined) {
            let items = states.items;
            for (let item of items) {
                const name = stateName.get(item).value;
                const fill = useHeatMap ? calcHeatColor(heatPercent.get(item).value) : stateColor.get(item).value;

                settingsObj[name] = {
                    fill: fill,
                    clickHandler:
                        onStateClick !== undefined && onStateClick.get(item).canExecute
                            ? (event) => {
                                event !== undefined && onStateClick.get(item).execute();
                                printLogs && console.log("Clicked State with Data", event.target.dataset);
                            }
                            : () => {}
                };
            }
        }
        return settingsObj;
    };

    return (
        <div className={"mendix-usa-map " + className} style={style}>
            <USAMap
                title={title}
                defaultFill={defaultFill}
                customize={mapSettings()}
                onClick={mapHandler}
                useTerritories={useTerritories}
                useOnlyDC={useOnlyDC}
            />
            {showGradient && useHeatMap && (
                <div
                    className="gradient"
                    style={{
                        width: "100%",
                        background: `linear-gradient(to right, hsla(${hRange + hOffset},${s}%,${l}%,100%) 0%, hsla(${0 +
                            hOffset},${s}%,${l}%,100%) 100%)`
                    }}
                > 
                    <span className="mx-text">0%</span>
                    <span className="mx-text">100%</span>
                </div>
            )}
        </div>
    );
};

export default Mendix_USA_Map;
