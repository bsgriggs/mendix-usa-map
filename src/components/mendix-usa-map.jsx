import React, { Component, createElement } from "react";
import USAMap from "react-usa-map";

const Mendix_USA_Map = props => {
    const {
        title,
        width,
        height,
        defaultFill,
        states,
        stateName,
        stateColor,
        onStateClick,
        className,
        style,
        useHeatMap,
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
            let hslString = `hsl(${calcH},${s}%,${l}%)`;
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
                width={width.trim() !== "" ? width.trim() : "100%"}
                height={height.trim() !== "" ? height.trim() : "100%"}
                defaultFill={defaultFill}
                customize={mapSettings()}
                onClick={mapHandler}
            />
            {showGradient && (
                <div
                    className="gradient"
                    style={{
                        width: width.trim() !== "" ? width.trim() : "100%",
                        background: `linear-gradient(to right, hsl(${hRange + hOffset}, ${s}%, ${l}%) 0%, hsl(${0 +
                            hOffset}, ${s}%, ${l}%) 100%)`
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
