
function printChartJs(data){

    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels : moment.months(),
            datasets: [{
                label: 'Vendite',
                data: data,
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
                    fontSize :15,
                    fontStyle : "bold"
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
    });
}

function getData(){

    $.ajax({
        url:"getLineData.php",
        method:"GET",
        success : function(data){
            console.log("data",data);
            printChartJs(data);
        },
        error: function(err){
            console.log("error",err)
        }
    })
}

function init(){
    getData();
}

$(document).ready(init);