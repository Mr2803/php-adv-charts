$(document).ready(init);

function init() {

    getAjaxLine();
    getAjaxPie();
}

function print(wherePrint, keyGlobal, labels, label, technical_data, data) {
    var revenue = data[keyGlobal];
    var ctx = document.getElementById(wherePrint).getContext('2d');
    new Chart(ctx, {
        type: revenue["type"],
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: technical_data,
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

function getAjaxLine() {

    $.ajax({

        url: "getChartData.php",
        method: "GET",
        success: function (data) {
            var keyGlobal = "fatturato";
            var fatturato = data[keyGlobal];
            var printHere = 'myChartLine';
            var keys = moment.months();
            var label = "Vendite";
            var values = Object.values(fatturato["data"]);
            print(printHere, keyGlobal, keys, label, values, data);

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
            var keyGlobal = "fatturato_by_agent";
            var fatturato_by_agent = data[keyGlobal]
            var printHere = 'myChartPie';
            var label = "";
            var keys = Object.keys(fatturato_by_agent["data"]);
            var values = Object.values(fatturato_by_agent["data"]);
            print(printHere, keyGlobal, keys, label, values, data);
        },
        error: function (err) {
            console.log("error", err)
        }
    });
}






