# plotly_deploy

## Project Overview
The synthetic meat producer, Improbable Beef, is looking to identify species of bacteria found in human belly-buttons which could be used for manufacturing synthetic beef.

The following repository includes files for creating a website which displays the *Belly Button Biodiversity Dashboard*. The *Belly Button Biodiversity Dashboard* is an interactive experience for viewing visual representations of the bacteria found in each test subject's belly-button. These visualizations will help Improbable Beef to identify the quanity of each species which will help to determine whether or not it is a successful candidate for manufacturing synthetic beef.

Users can select a test subject's ID from the **Test Subject ID No.** drop-down, and the dashboard will render the following:
* Demographics panel
* Horizontal bar chart
* Gauge chart
* Bubble chart

The demographics panel includes the following information as it pertains to the test subject:
* ID number (which corresponds to the drop-down value)
* ethnicity
* gender
* age
* location
* belly-button type
* belly-button wash frequency (per week)

The horizonal bar chart displays the top 10 bacteria species found in the test subjects belly-button, based on quanity.

The gauge chart displays the test subject's belly-button wash frequency.

Finally, the bubble chart renders all the bacteria found in the test subject's belly-button. This gives a more holistic view into the number of types found as well as their relative quantities.

Click the following link to view the dashboard:
https://karenbennis.github.io/plotly_deploy/

## Resources
* Data Sources: samples.json
* Languages: JavaScript ES6+,  HTML5, CSS, Bootstrap
* Libraries: Plotly
* Software: Visual Studio Code 1.43.0, Chrome 81.0.4044.138

## Recommendations
Recommendations for future enhancements to this dashboard would be to create other views where users could search by OTU ID to see how many test subjects had the given bacterial species present in their belly-buttons and the quantity in which it is present.