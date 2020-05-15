function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})

buildMetadata('940');
buildCharts('940');

}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    Object.entries(result).forEach(([key, value]) =>
    {PANEL.append("h6").text(key + ": " + value);});
  });
}

function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var barBubble = data.samples;
    var resultArray = barBubble.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    var sample_values = result.sample_values;
    console.log(sample_values);
    
    var otuIds = result.otu_ids
    console.log(otuIds);
    
    var otuLabels = result.otu_labels;

    // bar chart
    var trace = {
      x: sample_values.sort((a,b) =>
      b - a).slice(0, 10).reverse(),
      y: otuIds.map(otu_ids => `OTU ${otu_ids}`).slice(0, 10).reverse(),
      text: otuLabels,
      type: "bar",
      orientation: "h"
    };

    var data = [trace];

    var layout = {
      title: '<b>Top 10 OTU IDs</b>'
    };
    Plotly.newPlot("bar", data, layout);
  
    // bubble chart
    var trace1 = {
      x: otuIds,
      y: sample_values,
      text: otuLabels,
      mode: 'markers',
      marker: {
        color: otuIds,
        colorscale: 'Earth',
        opacity: [1, 0.8, 0.6, 0.4],
        size: sample_values
      }
    };
    var data = [trace1];
    var layout = {
      title: '<b>All OTU ids</b>',
      showlegend: false,
      height: 600,
      width: 1200
    };
    Plotly.newPlot('bubble', data, layout);
  });


  // gauge chart (adapted from https://codepen.io/plotly/pen/rxeZME)
  d3.json("samples.json").then((data) => {
    var gauge = data.metadata;
    var resultArray = gauge.filter(sampleObj => sampleObj.id == sample);
    var wfreq = resultArray[0].wfreq; 

  // Trig to calculate meter point based on wash frequency data
  var degrees = 180 - (wfreq * 20),
      radius = .5;
      var radians = degrees * Math.PI / 180;
      var x = radius * Math.cos(radians);
      var y = radius * Math.sin(radians);
      
      // Path: may have to change to create a better triangle
      var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
         pathX = String(x),
         space = ' ',
         pathY = String(y),
         pathEnd = ' Z';
      var path = mainPath.concat(pathX,space,pathY,pathEnd);

  var data = [{ type: 'scatter',
    x: [0], y:[0],
      marker: {size: 28, color:'850000'},
      showlegend: false,
      name: 'times per week',
      text: wfreq,
      hoverinfo: 'text+name'},
    { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors: ['rgba(127, 180, 133 .5)', 'rgba(132, 187, 138, .5)',
                      'rgba(134, 191, 127, .5)', 'rgba(182, 204, 138, .5)',
                      'rgba(212, 228, 148, .5)', 'rgba(228, 232, 175, .5)',
                      'rgba(232, 230, 200, .5)', 'rgba(243, 240, 228, .5)',
                      'rgba(247, 242, 235, .5)',
                      'rgba(255, 255, 255, 0)']},
   hoverinfo: 'text',
    hole: .5,
    type: 'pie',
    showlegend: false
  }];

  var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
    title: '<b>Belly Button Washing Frequency</b><br> Scrubs per Week',  
    height: 500,
    width: 500,
    xaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]}
  };

  Plotly.newPlot('gauge', data, layout);  
});

}