$(document).ready(init);

function init() {
    getAjaxLine();
    getAjaxPie();
}

function printLineFatturato(data){
    var fatturato = data["fatturato"];//parse.fatturato
    var ctx = document.getElementById('myChartLine').getContext('2d');
    new Chart(ctx, {
        type: fatturato["type"],
        data: {
            labels: moment.months(),
            datasets: [{
                label: 'Vendite',
                data: fatturato["data"],
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

function printPieFatturatoAgent(data){
    var fatturato_by_agent = data["fatturato_by_agent"];//data.fatturato_by_agent
    /* console.log(fatturato_by_agent.type)
    console.log(fatturato_by_agent.data.Marco) */
    var keys = Object.keys(fatturato_by_agent["data"]);
    var values = Object.values(fatturato_by_agent["data"]);
    console.log(values)
    var ctx = document.getElementById('myChartPie').getContext('2d');
    new Chart(ctx, {
        //il mio type in questo caso sara il parse della chiave fatturato con chiave type
        type: fatturato_by_agent["type"],

        // The data for our dataset
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
            
            printLineFatturato(data);
            
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
            printPieFatturatoAgent(data);
        },
        error: function (err) {
            console.log("error", err)
        }
    });
}






