$(document).ready(init);

function init() {

   getAjax();
}

function getRandomColor() {
   const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
   const randomByte = () => randomNumber(0, 255);
   console.log(randomByte);
   const randomPercent = () => (randomNumber(50, 100) * 0.01).toFixed(2);
   const randomCssRgba = () => `rgba(${[randomByte(), randomByte(), randomByte(), randomPercent()].join(',')})`;

   return randomCssRgba;
}

function printChart(wherePrint, chartType, labels, label, data,bgColor,bordColor) {
   var ctx = $('#' + wherePrint);
   new Chart(ctx, {
      type: chartType,
      data: {
         labels: labels,
         datasets: [
            datasets(label, data, bgColor,bordColor)
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

function datasets(label,data, bgC, bdC){
   var object={
         label: label,
         data: data,
         backgroundColor: bgC,
         borderColor: bdC,
         borderWidth: 1
      }
   return object
}
function printLineFatturato(data) {
   printChart('myChartLine', data["type"], moment.months(), "Vendite", data["data"], 'rgba(255, 206, 86, 0.2)', 'rgba(255, 159, 64, 1)')

}

function printPieFatturatoAgent(data) {
   var keys = Object.keys(data["data"]);
   var values = Object.values(data["data"]);
   printChart('myChartPie', data["type"], keys, "", values, getRandomColor(),"grey")
}


function printEfficiency(data) {
   var keys = Object.keys(data["data"]);
   var values = Object.values(data["data"]);
   var ctx = $('#myChartEfficiency');
   new Chart(ctx, {
      type: data["type"],
      data: {
         labels: moment.months(),
         
         datasets: [
            datasets(keys[0], values[0], 'rgba(255, 16, 86, 0.3)', 'rgba(255, 16, 64, 1)'),
            datasets(keys[1], values[1], 'rgba(138, 182, 255, 0.4)', 'rgba(138, 190, 255, 1)'),
            datasets(keys[2], values[2], 'rgba(43, 900, 126, 0.7)', 'rgba(43, 159, 64, 1)')
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
   var elem = url.split("http://localhost/step3/?level=");
   console.log("elemento:", elem);
   var liv = elem[1];
   console.log("questo è il log di liv " + liv);

   $.ajax({
      url: "getAllChart.php",
      method: "GET",
      data: {
         level: liv
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