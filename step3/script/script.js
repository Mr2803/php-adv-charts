$(document).ready(init);

function init() {
   
   getAjax();
}

function printLineFatturato(data){
   
   var ctx = document.getElementById('myChartLine').getContext('2d');
   new Chart(ctx, {
      type: data["type"],
      data: {
         labels: moment.months(),
         datasets: [{
               label: 'Vendite',
               data: data["data"],
               backgroundColor:'rgba(255, 206, 86, 0.2)',
               borderColor:'rgba(255, 159, 64, 1)',
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
   var keys = Object.keys(data["data"]);
   var values = Object.values(data["data"]);
   var ctx = document.getElementById('myChartPie').getContext('2d');
   new Chart(ctx, {
      type: data["type"],
      data: {
         labels: keys,
         datasets: [{
               data: values,
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

function printEfficiency(data) {
   var keys = Object.keys(data["data"]);
   console.log(keys)
   var values = Object.values(data["data"]);
   var ctx = document.getElementById('myChartEfficiency').getContext('2d');
   new Chart(ctx, {
      type: data["type"],
      data: {
         labels: moment.months(),
         datasets: [
               {
               label: keys[0],
               data: values[0],
               backgroundColor: 'rgba(255, 16, 86, 0.3)',
               borderColor: 'rgba(255, 16, 64, 1)',
               borderWidth: 1
               },
               {
               label: keys[1],
               data: values[1],
               backgroundColor: 'rgba(138, 182, 255, 0.4)',
               borderColor: 'rgba(138, 190, 255, 1)',
               borderWidth: 1
               },
               {
               label: keys[2],
               data: values[2],
               backgroundColor: 'rgba(43, 900, 126, 0.7)',
               borderColor: 'rgba(43, 159, 64, 1)',
               borderWidth: 1
               }
         ]
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

function getAjax() {
   var url = window.location.href;
   console.log("Url:", url);

   var elem = url.split("=");
   console.log("elemento:", elem)

   var liv = elem[1];
   
   console.log("questo è il log di liv " + liv);

   $.ajax({

      url: "getAllChart.php",
      method: "GET",
      data : {
         level : liv
      },
      success: function (data) {
         console.log(data)
         printLineFatturato(data[0]);
         printPieFatturatoAgent(data[1]);
         printEfficiency(data[2]);
      },
      error: function (err) {
         console.log("error", err)
      }
   });
}








