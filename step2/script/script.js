$(document).ready(init);

function init() {
    
    getAjax();
}

function printChart(wherePrint,chartType,labels,label,data){
    var ctx = $('#' + wherePrint);
    new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                labels: {
                    fontColor: 'black',
                    fontSize: 15,
                    fontStyle: "bold"
                }
            },

            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
}

function printLineFatturato(data){
    printChart('myChartLine', data["type"], moment.months(),"Vendite", data["data"])
  
}

function printPieFatturatoAgent(data){
    var keys = Object.keys(data["data"]);
    var values = Object.values(data["data"]);
    printChart('myChartPie', data["type"], keys,"",values)
    
}

function getAjax() {

    $.ajax({

        url: "getChartData.php",
        method: "GET",
        success: function (data) {
            printLineFatturato(data["fatturato"]);
            printPieFatturatoAgent(data["fatturato_by_agent"]);
        },
        error: function (err) {
            console.log("error", err)
        }
    });
}








