/**
 * This script will check for any changes in git.
 * It run every couple minutes right now it is set to 5.
 * 
 * To run the script as a background job execute the following line:
 * # node git-watch &
 * 
 * To run the script as a one time check within n minutes.
 * #node git-watch 5
 * 
 */
var exec = require('child_process').exec;

// Date veriable to keep track of last checked time.
var date = new Date();

// Git command constants
const GIT_GIT = 'git fetch | wait; git log ';
const GIT_BRANCH = 'origin/master ';
const GIT_FORMAT = '--color  --pretty=format:"%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset" --abbrev-commit ';
const GIT_ALL = '--all ';


// Display the results after the git command has been executed.
function display(error, stdout, stderr) {
	if (error) console.log('error:' + error);
	console.log(stdout);
}

// Run the git log command to see if anything has changed.
var runGitWatch = function(minute) {

	var currentDate = new Date();

	// Log when checking git for changes.
	console.log('\n\033[31mRunning GitWatch...\033[0m');

	if (minute) date.setMinutes(date.getMinutes() - minute);

	// Git required ISO date format.
	var strDate = date.toISOString();

	var dateextra = '--since="' + strDate + '" ';

	// Build the git command.
	var command = GIT_GIT + GIT_BRANCH + GIT_FORMAT + dateextra + GIT_ALL;

	//console.log('command:' + command);

	exec(command, display);

	// Reset the date for next run.
	date = new Date();
}

//runGitWatch();

// Check git every n minutes.
var minutes = 5 * 60 * 1000;

if (process.argv.length == 2) {

	// Continuous loop
	setInterval(function() {
		runGitWatch();
	}, minutes);

} else {

	runGitWatch(process.argv[2]);

}
