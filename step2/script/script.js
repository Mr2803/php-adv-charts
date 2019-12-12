$(document).ready(init);

function init() {
    
    getAjaxLine();
    getAjaxPie();
}

function printLineFatturato(revenue,data){
    var revenue = data["fatturato"];
    console.log(revenue)
    var ctx = document.getElementById('myChartLine').getContext('2d');
    new Chart(ctx, {
        type: revenue["type"],
        data: {
            labels: moment.months(),
            datasets: [{
                label: 'Vendite',
                data: revenue["data"],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [

                    'rgba(255, 159, 64, 1)'
                ],

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

function printPieFatturatoAgent(revenueAgents,keys,values,data){
    var revenueAgents = data["fatturato_by_agent"]
    console.log(revenueAgents)
    var ctx = document.getElementById('myChartPie').getContext('2d');
    new Chart(ctx, {
        type: revenueAgents["type"],
        data: {
            labels: keys,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [

                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                ],

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

function getAjaxLine() {

    $.ajax({

        url: "getChartData.php",
        method: "GET",
        success: function (data) {
            var fatturato = data["fatturato"];
            printLineFatturato(fatturato,data);
            
        },
        error: function (err) {
            console.log("error", err)
        }
    });
}

function getAjaxPie() {

    $.ajax({

        url: "getChartData.php",
        method: "GET",
        success: function (data) {
            var fatturato_by_agent = data["fatturato_by_agent"]
            var keys = Object.keys(fatturato_by_agent["data"]);
            var values = Object.values(fatturato_by_agent["data"]);
            console.log(values, keys)
            printPieFatturatoAgent(fatturato_by_agent,keys,values,data);
        },
        error: function (err) {
            console.log("error", err)
        }
    });
}






