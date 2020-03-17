var pop = Math.round(Math.floor(Math.random() * 500000) + 100000);
var percent = Math.round((Math.floor(Math.random() * 10) + 4));
var inf = (percent / 100) * pop;
console.log(percent + '%')
day = 0
function wait() {
	console.log("waited");
}



console.log(pop, inf)

document.getElementById("prompt") // listen for the enter key
    .addEventListener("keyup", function(event) {
    event.preventDefault();
if (event.keyCode === 13) {
  sendCommand();
    }
})

function sendCommand() {
	command = (document.getElementById("prompt").value);
	document.getElementById("prompt").value = '';
}


// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable([
  ['Type', 'Number of people'],
	['Infected', inf],
	['Healthy', pop - inf],
]);

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, {
		legend: 'none',
		width: 600,
		height: 600,
		colors: ['red', 'green'],
		backgroundColor: '#000000',
		is3d: true
	});
}

var i = 0;
var text = 'CovidJam, by smhsketch and ejparker05';

function typeWriter() { // typing effect
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  } else {
		setTimeout(function() {
			document.getElementById("piechart").style.opacity = 1;
			document.getElementById("typing").innerHTML = ('Day '+ day.toString());
			game();
		}, 1000);
		
	}
}

function game() { // main game loop, interpreting commands and changing infection rates

}

typeWriter();

