# Mendix USA Map with Heat Map
Mendix Pluggable Widget to provide an interface for https://www.npmjs.com/package/react-usa-map. 

# Features
This widget has 2 primary use cases
### Standard
Shows a map of the USA with each state having it's own defined color. You can specify an on-click action that will trigger an action using the provided state object (i.e. you can click on Indiana and the action executed will be specific for Indiana).

### Heat Map
Shows a map of the USA with each state with a variable color to show how it compares to other States. You can specify an on-click action that will trigger an action using the provided state object (i.e. you can click on Indiana and the action executed will be specific for Indiana).

# Configuration
The following is an explaination of each configurable field.

### General Tab
SVG Map Title - The value that gets set on the SVG <title> tag. If you'd like a title to be rendered on the page, then use the Mendix 'text' widget.  
Width - The CSS width of the entire graph. Values can be px, em, % etc.  
Height - The CSS hieght of the entire graph. Values can be px, em, % etc.  
Default State Color - The CSS color for a state as if no color is specific in the data source.  
Print Error Logs? - A boolean attribute to print user errors to browser console with console.error(). This includes validation of the widget configuration settings. If you run into an issue with the widget, be sure to check the browser console.   
  
### Data Source Tab
List of States - A Mendix datasource (Database, Association, Nanoflow, Microflow, XPath). I recommend using a microflow that translates your persistent data to a non-persistent entity with the State Appreviation and State Color (required if not using a heatmap). If you plan to have an on click action, then you can use the non-persisten entity to retrieve your persistent records for the particular State the user clicked on.  
State Abbreviation - The two character official abbreviation for a USA State (i.e. IN = Indiana, NY = New York).  
State Color - The Hex Value or CSS Color to fill the State (i.e. #2E2EFF or blue). This is required if you're not using a Heat Map.  
On click - Action performed when a particular State is clicked. This will return the object type that is specified in the List of States datasource.  

### Heat Map Tab
#### General
#### Heat Map Colors (HSLA)

# Setup



# Demo project
[link to sandbox]

# Issues, suggestions and feature requests
[link to GitHub issues]

# Development and contribution
[specify contribute]
