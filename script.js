var pop = Math.round(Math.floor(Math.random() * 50000) + 100000);
var percent = Math.round((Math.floor(Math.random() * 10) + 4));
var inf = Math.round((percent / 100) * pop);
var infRate = 10000; // people infected per day
var day = 1
var popularity = 85;

function wait() {
	console.log("waited");
}

document.getElementById("prompt") // listen for the enter key
    .addEventListener("keyup", function(event) {
    event.preventDefault();
if (event.keyCode === 13) {
  sendCommand();
    }
})


// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);

function getRandom(input) {
  prob = input / 50 // gives the player a chance of being voted out only if their popularity is less than 50%
  random = Math.random();
	// console.log(random, " ", prob)
  if (random > prob) {
    return 1;
  } else {
    return 0;
  }
}

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
		width: 440,
		height: 440,
		colors: ['red', 'green'],
		backgroundColor: '#000000',
		is3d: true
	});
	// draw gauge
	var data = google.visualization.arrayToDataTable([
		['Label', 'Value'],
		['Popularity', popularity],
	]);

	var options = {
		width: 320, height: 320,
		redFrom: 0, redTo: 25,
		yellowFrom: 25, yellowTo: 60,
		greenFrom: 60, greenTo: 100,
		minorTicks: 5
	};
	var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
	chart.draw(data, options);
	console.log("redrew all charts");
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
			document.getElementById("chart_div").style.opacity = 1;
			setTimeout(function() {
				document.getElementById("typing").innerHTML = "You are appointed as the head of the World Health Organization."
			}, 5000);
			setTimeout(function() {
				document.getElementById("typing").innerHTML = "A new virus is on the horizon, called COVID-19."
			}, 10000);
			setTimeout(function() {
				document.getElementById("typing").innerHTML = "It affects the respiratory system and is highly contagious."
			}, 15000);
			setTimeout(function() {
				document.getElementById("typing").innerHTML = "You can command health officials to enforce any law..."
			}, 20000);
			setTimeout(function() {
				document.getElementById("typing").innerHTML = "Simply by typing it. Use this power wisely,"
			}, 25000);
			setTimeout(function() {
				document.getElementById("typing").innerHTML = "As you can be voted out of office at any point. Type help for help. Good luck."
			}, 30000);
			setTimeout(function() {
				document.getElementById("typing").innerHTML = ('Day '+ day.toString()+" - people infected per day: "+ infRate.toString());
			}, 35000);
		}, 1000);
	}
}

typeWriter();

var commandsused = []; // logs all commands that have been entered

function reset() {
	document.getElementById("typing").innerHTML = ('Day '+ day.toString()+" - people infected per day: "+ infRate.toString());
}

function display(message, command) {
	document.getElementById("typing").innerHTML = message;
	
	commandsused.push(command);
	// console.log(commandsused);
	setTimeout(reset, 5000);
	console.log("pop ", popularity);
	
}


function sendCommand() {
	command = (document.getElementById("prompt").value);
	document.getElementById("prompt").value = '';
	if (Math.random() > 0.5) { // advances the day by 1 every so often
		day += 1;
		reset();
		console.log("begin day ", day);
		inf += infRate;
	}
	prob = popularity / 70 // gives the player a chance of being voted out only if their popularity is less than 50%
	if (Math.random() > prob) { // loses the game if they get voted out
		window.location.href = "lost.html";
	}
	if (pop - inf < 1) {
		document.getElementById("piechart").style.opacity = 0;
		window.location.href = "infected.html";
	}
	if (infRate < 5) {
		console.log("game won");
		window.location.href = 'won.html'; // wins the game
	}
	if (commandsused.includes(command) && command != "help") { // prevents commands from beings used twice
		display("you already said to do that, silly!");
	} else if (command.includes("help")) {
		window.open('help.html', '_blank');
	} else if (command.includes("wash hands")) {
		display("Washing hands once an hour is now law in 44 countries.", "wash hands");
		popularity += 5;
		infRate -= 100;
	} else if (command.includes("ban restaurants")) {
		display("Restaurants are shuttered across the globe. Their owners are not too happy.", "ban restaurants");
		popularity -= 10;
		infRate -= 750;
	} else if (command.includes("ban gatherings")) {
		display("All over the world, congregations of more than 15 people are outlawed. Hosts of parties are disappointed.", "ban gatherings");
		popularity -= 5;
		infRate -= 400;
	} else if (command.includes("close school") || command.includes("cancel school")) {
		display("Schools are now restricted to online learning. Kids are overjoyed, but parents are not thrilled.", "cancel school");
		popularity -= 20;
		infRate -= 1000;
	} else if (command.includes("close work") || command.includes("cancel work")) {
		display("Working away from home has been banned worldwide, and paid leave is required. Everyone is ecstatic, except for employers.", "cancel work");
		popularity += 20;
		infRate -= 5000;
	} else if (command.includes("ban pets")) {
		display("All pets are banned and put in shelters, devastating their owners. However, most of them never were able to carry COVID-19 anyway", "ban pets");
		popularity -= 50;
	} else if (command.includes("wear masks")) {
		display("Everyone is required to wear masks in public.")
		infRate -= 500;
	} else if (command.includes("vaccine") || command.includes("develop vaccine")) {
		display("The vaccine won't be here soon, but your efforts put people's faith in you.", "make vaccine");
		popularity += 20;
	} else if (command.includes("study virus") || command.includes("research virus")) {
		display("You've ordered the virus to be studied. This doesn't slow infection, but your good decisions don't go unnoticed.", "research");
		popularity += 10;
	} else if (command.includes("close stores")) {
		display("Grocery stored are shuttered globally. How will people get food now?", "close stores");
		popularity -= 70;
		infRate -= 3000;
	} else if (command.includes("quarantine")) {
		display("People are forced to stay in their homes except in case of absolute emergency.", "quarantine");
		popularity -= 10;
		infRate -= 3000;
	} else if (command.includes("close airport")) {
		display("All civilian airports are closed everywhere.", "close airports");
		popularity += 5;
		infRate -= 1000;
	} else if (command.includes("build hospitals")) {
		display("WHO money is used to build hospitals around the globe. This costs quite a bit of money, but helps treat patients well.");
		infRate -= 1000;
		popularity += 10;
	} else if (command.includes("ask for money") || command.includes("ask for donations")) {
		display("You ask the world to donate to the WHO to help with the virus. Most people kindly oblige.", "ask for money");
		popularity += 10;
	} else if (command.includes("step down") || command.includes("resign") || command.includes("quit")) {
		window.location.href = 'lost.html';
	} else if (command.includes("deport")) {
		display("You deported everyone who was diagnosed. They now live in Antarctica?", "deport")
		popularity -= 70;
	} else if (command.includes("hand sanitizer")) {
		display("Using hands sanitizer is now required every 15 minutes.");
		popularity += 5;
		infRate -= 500;
	}
		else {
		display("Sorry boss, we can't do that...");
	}
	console.log(commandsused);
	if (popularity < 0) {
		popularity = 0; // makes sure no negatives get put into the chart
	}
	if (infRate < 0) {
		infRate = 0;
		window.location.href="won.html"
	}
	if (inf < 0) {
		inf = 0;
	}
	drawChart(); // updates the charts after the values change
}

// command ideas:
// 
// 
// 
// 
// 
// 
// 
// 