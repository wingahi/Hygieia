/**
 * Chartist.js plugin to display a title for 1 or 2 axises.
 *
 */
/* global Chartist */
(function (window, document, Chartist) {
    'use strict';

    var defaultOptions = {
        //axisY: {
        //    labels: [],
        //    labelClass: 'ct-y-label'
        //},
        axisX: {
            labels: [],
            labelClass: 'ct-label',
            offset: {
                x: 0,
                y: 20
            },
            textAnchor: 'middle'
        }
    };

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.axisLabels = function (options) {

        options = Chartist.extend({}, defaultOptions, options);

        return function axisLabels(chart) {

            chart.on('created', function (data) {

                var labelCount = options.axisX.labels.length;

                for(var x=0; x<labelCount;x++) {
                    var factor = 1.4;

                    var text = options.axisX.labels[x],
                        xPos = (data.axisX.axisLength * factor / (labelCount + 1)) * (x+1) + (1-factor)/2*data.axisX.axisLength+ data.options.axisY.offset + data.options.chartPadding.left,
                        yPos = data.options.chartPadding.top + data.axisY.axisLength;

                    var label = new Chartist.Svg('text');
                    label.addClass(options.axisX.labelClass);
                    label.text(text);

                    label.attr({
                        x: xPos + options.axisX.offset.x,
                        y: yPos + options.axisX.offset.y,
                        'text-anchor': options.axisX.textAnchor
                    });

                    data.svg.append(label, true);
                }
            });
        };
    };

}(window, document, Chartist));