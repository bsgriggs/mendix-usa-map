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
  **SVG Map Title -** The value that gets set on the SVG <title> tag. If you'd like a title to be rendered on the page, then use the Mendix 'text' widget.  
  **Width -** The CSS width of the entire graph. Values can be px, em, % etc.  
  **Height -** The CSS hieght of the entire graph. Values can be px, em, % etc.  
  **Default State Color -** The CSS color for a state as if no color is specific in the data source.  
  **Print Error Logs? -** A boolean to print user errors to browser console with console.error(). This includes validation of the widget configuration settings. If you run into an issue with the widget, be sure to check the browser console.  
  
### Data Source Tab
  **List of States -** A Mendix datasource (Database, Association, Nanoflow, Microflow, XPath). I recommend using a microflow that translates your persistent data to a non-persistent entity with the State Appreviation and State Color (required if not using a heatmap). If you plan to have an on click action, then you can use the non-persisten entity to retrieve your persistent records for the particular State the user clicked on.  
  **State Abbreviation -** The two character official abbreviation for a USA State (i.e. IN = Indiana, NY = New York).  
  **State Color -** The Hex Value or CSS Color to fill the State (i.e. #2E2EFF or blue). This is required if you're not using a Heat Map.  
  **On click -** Action performed when a particular State is clicked. This will return the object type that is specified in the List of States datasource.  

### Heat Map Tab
#### General
  **Use Heat Map? -** A boolean to enable the heat map color calulation.  
  **Heat Percent -** A decimal attribute that should be between 0.00... and 1.00... You should calculate this attibute inside your data source microflow. This value is used to calculate the color used to represent the State. For example with the default color settings, a State with the Heat Percent of 0.1 would show as slightly yellow, 0.4 would show as orange, and 0.8 would show as red.  
  **Show Gradient? -** When enabled, a bar will be displayed below the graph with the full color range available.  
#### Heat Map Colors (HSL)
  **H Range -** The distance bewteen the highest H value and the lowest H value.  
  **H Offset -** A constant increase to the range.  
  **S -** The second parameter in the HSL function. This applies a scew to the function and would best be described by experimenting with the function in CSS.  
  **L -** The third parameter in the HSL function. This applies a scew to the function and would best be described by experimenting with the function in CSS.  
    This widget calculates the variable color for each State using this formula:  
  Math.floor((1.0 - HeatPercent) * H Range + H Offset)  
  For example, configure the widget to use H Range = 50, H Offset = 20, S = 75, and L = 50. This would mean the lowest color (Heat Percent = 0.00) would be hsl(70,75%,50%) which is yellow-green and the highest color (Heat Percent = 1.00) would be hsl(20,75%,50%) which is yellow-orange. You might want to experiment with these using the CSS background-color: hsl(50,75%,50%); and play around with each parameter.
  

# Setup
### Standard
  **1)** In the General tab, Set Width and Height to 100%.  
  **2)** In the Data Source tab, create a microflow that creates a list of non-persistent objects with the State Abbreviation, State Color, and any other data you want to use when the user clicks on that particular State.  
  **3)** Set State Abbreviation and State Color as the respective attributes of your non-persistent entity.  
  **4)** Set an On Click action for what you want to happen when a user clicks on a single State.  
  **5)** Run the project and view the graph. Then, make adjustments to the Width and Height as you see fit.  

### Heat Map
  **1)** In the General tab, Set Width and Height to 100%. Set the Default State Color to hsl(**x**,75%,50%).
  **2)** In the Data Source tab, create a microflow that creates a list of non-persistent objects with the State Abbreviation, HeatPercent, and any other data you want to use when the user clicks on that particular State. Heat Percent should be either how that particular state compares to 0 and the maximum value (i.e. $IteratorState/Value div $MaximumStateValue) or how that particular state compares to the lowest value and the maximum value (i.e. ($IteratorState/Value - $MinimumStateValue) div ($MaximumStateValue - $MinimumStateValue). Be sure not to divide by zero!!  
  **3)** Set State Abbreviation the attribute on your non-persistent entity.  
  **4)** Set an On Click action for what you want to happen when a user clicks on a single State.  
  **5)** In the Heat Map tab, set Use Heat Map to "Yes". Select the HeatPercent on your non-persistent entity. Set Show Gradient to "Yes", so you can see the range of colors even if you don't have all the data.
  **6)** Run the project and view the graph. Then, make adjustments to the Width, Height, and the Heat Map Colors (Check the **Configuration** section to see how the colors are calculated) as you see fit.  

# Demo project
[link to sandbox]

# Issues, suggestions and feature requests
[link to GitHub issues]

# Development and contribution
[specify contribute]
