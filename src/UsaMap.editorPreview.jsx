import React, { Component, createElement } from "react";
import Mendix_USA_Map from "./components/mendix-usa-map";
import { parseInlineStyle } from "@mendix/pluggable-widgets-tools";

export class preview extends Component {
    render() {
        return (
            <div ref={this.parentInline}>
                <Mendix_USA_Map {...this.transformProps(this.props)}></Mendix_USA_Map>
            </div>
        ); 
    }

    parentInline(node) {
        // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
        if (node && node.parentElement && node.parentElement.parentElement) {
            node.parentElement.parentElement.style.display = "inline-block";
        }
    }

    transformProps(props) {
        return {
            type: props.usamapType,
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            clickable: false,
            style: parseInlineStyle(props.style),
        };
    }
}

export function getPreviewCss() {
    return require("./ui/UsaMap.css");
}
