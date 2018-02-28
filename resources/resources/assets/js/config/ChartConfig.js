/**
 * Created by FG0003 on 17/03/2017.
 */

export default function ChartConfig(Chart) {
    // Define a plugin to provide data labels
    Chart.plugins.register({
        afterDatasetsDraw: function(chartInstance, easing) {
            // To only draw at the end of animation, check for easing === 1
            var ctx = chartInstance.chart.ctx;
            chartInstance.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.getDatasetMeta(i);
                var options = chartInstance.options.dataLabels || {};
                var display = options.display !== false;
                if (!meta.hidden && display) {
                    meta.data.forEach(function(element, index) {
                        // Draw the text in black, with the specified font

                        var fillStyle = 'rgb(0, 0, 0)';
                        var fontSize = 9;
                        var fontStyle = 'normal';
                        var fontFamily = "'Roboto','Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
                        var labelCallback = function(data){ return data; };
                        var padding = 0;

                        if(options != null){
                            options = options || {};
                            fillStyle = options.fillStyle || fillStyle;
                            fontSize = options.fontSize || fontSize;
                            fontFamily = options.fontFamily || fontFamily;
                            padding = options.padding || padding;
                            labelCallback = options.labelCallback || labelCallback;
                        }

                        ctx.fillStyle = fillStyle;
                        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                        // Just naively convert to string for now
                        var value = labelCallback(dataset.data[index]);
                        var dataString = value.toString();

                        // Make sure alignment settings are correct
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';

                        var position = element.tooltipPosition();
                        ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                    });
                }
            });
        }
    });
    // Define a plugin to provide data labels
    Chart.plugins.register({
        beforeDraw: function(chartInstance, easing) {
            var ctx = chartInstance.chart.ctx,
                chartArea = chartInstance.chart.canvas;
            ctx.fillStyle = chartInstance.options.backgroundColor || 'rgba(255,255,255, 1)'; // config option for color
            ctx.fillRect(chartArea.clientLeft, chartArea.clientTop, chartArea.clientWidth, chartArea.clientHeight);
        }
    });
}