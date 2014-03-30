function onGraphsReady() {
alert('hola');
    initCanvas();


 var canvas = document.getElementById('chartCanvas'); // Use the created element
    var ctx = canvas.getContext("2d");


var data = [
    {
        value: 30,
        color:"#F38630"
    },
    {
        value : 50,
        color : "#E0E4CC"
    },
    {
        value : 100,
        color : "#69D2E7"
    }           
]


    new Chart(ctx).Pie(data,{animation: false});

}

function initCanvas() {
    var elementID = 'chartCanvas'; // Unique ID
    $('#chart_div canvas').remove();
    $('#legend').remove();

    $('<canvas>').attr({
        id: elementID,
        //width: document.getElementById("selectMunGraphs").offsetWidth,
        //height: document.getElementById("selectMunGraphs").offsetWidth*0.7
    }).css({
            background: "#FFFFFF"
        }).appendTo('#chart_div');

    $('<div>').attr({
        id: 'legend'
    }).css({
            background: "#FFFFFF"
        }).appendTo('#chart_div');
}
