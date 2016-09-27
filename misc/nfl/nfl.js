#!/usr/bin/env node
var request = require('request');
var parseString = require('xml2js').parseString;
var Promise = require('promise');

var args = process.argv.slice(2);

if (args.length > 0) {
	getNFLTeam(args[0]);
} else {
	getNFLCurrent();
}

return 0;

function getNFLCurrent() {
	getCurrentWeek().then(function(week) {
		week = week + 1;
		console.log('week: ' + week);
		getNFLJSON(week).then(function(results) {
			var games = results.ss.gms[0].g;
			games.forEach(function(game) {
				var display = '';
				display = game.$.hnn + '    \t vs\t' + game.$.vnn + '    \t' + game.$.d + ' ' + game.$.t;
				console.log(display);
			});
		});
	}).catch(function(error) {
  	console.error(error.stack);
	});
}


function getNFLTeam(team) {

	var schedule = {};

	// Get all the data, need to use Promises for async requests.
	var promises = [];
	var week;
	for (week = 1; week <= 16; week++) {
		var promise = getNFLJSON_D(week, function(json, week, resolve) {
			var games = json.ss.gms[0].g;
			games.forEach(function(game) {
				if (game.$.hnn == team || game.$.vnn == team) {
					schedule[week] = {
						team1: (game.$.hnn == team) ? game.$.hnn : game.$.vnn,
						team2: (game.$.hnn != team) ? game.$.hnn : game.$.vnn,
						score1: (game.$.hnn == team) ? game.$.hs : game.$.vs,
						score2: (game.$.hnn != team) ? game.$.hs : game.$.vs,
						home: (game.$.hnn == team) ? true : false,
						time: game.$.d + ' ' + game.$.t
					};
				}
			});
			resolve('done');
		});
		promises.push(promise);
	}

	// After all the data is collect display it.
	Promise.all(promises).then(function() {
		if(Object.keys(schedule).length == 0) {
			console.log('No team found: ' + args[0]);
			return 0;
		}
		for (var x = 1; x <= 16; x++) {
			var display = 'Week ' + x + ':';
			if (schedule[x]) {
				display += schedule[x].team1
				//display += '(' + ((schedule[x].home) ? 'h' : 'a') + ')'
				if (schedule[x].score1 != '') {
					display += '(' + schedule[x].score1 + ')';
				} else {
					display += '   ';
				}
				display += '\t vs\t ' + schedule[x].team2;
				if (schedule[x].score2 != '') {
					display += '(' + schedule[x].score2 + ')';
				} else {
					display += '   ';
				}
				if (schedule[x].score1 == '') {
					display += '\t' + schedule[x].time;
				}
			} else {
				display += ' Bye';
			}
			console.log(display);
		}
		console.log('done');
	});

}

function getNFLJSON_D(week, callback) {
	return new Promise(function(resolve) {
		var url = 'http://www.nfl.com/ajax/scorestrip?season=2016&seasonType=REG&week=' + week;
		request(url, function (error, response, xml) {
				if (!error && response.statusCode == 200) {
					parseString(xml, function (err, result) {
						callback(result, week, resolve);
					});
				} else {
					console.log('1:Error fetching data: ' + error + response.statusCode);
				}
		});
	});
}

function getNFLJSON(week) {
	return new Promise(function(resolve) {
		var url = 'http://www.nfl.com/ajax/scorestrip?season=2016&seasonType=REG&week=' + week;
		request(url, function (error, response, xml) {
				if (!error && response.statusCode == 200) {
					parseString(xml, function (err, result) {
						resolve(result);
					});
				} else {
					console.log('1:Error fetching data: ' + error + response.statusCode);
				}
		});
	});
}

function getCurrentWeek() {
	return new Promise(function(resolve, reject) {
		var url = 'http://www.nfl.com/liveupdate/scorestrip/ss.json'
		request(url, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var json = JSON.parse(body);
				resolve(json.w);
			} else {
				console.log('2:Error fetching data: ' + error + response.statusCode);
			}
		});
	});
}
