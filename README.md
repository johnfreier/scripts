# Scripts
Useful scripts

## Neo4J
./neo4j/scotty.sh
This is a NEO4J start up wrapper that provides more options. Below is a list of arguments.
 - backup - creates a backup of the current database.
 - restore - restores the database using the backup file.
 - destroy - clears out the database
 - all start commands - All of the current ./neo4j actions. 

## GIT
./git/git-watch.js
This is a script to help watch a git repository.  When ran it will query a folders git repository for any changes every 5 mins.  This is a job that is ment to be ran in the background.
```
$ node git-watch.js &
```
