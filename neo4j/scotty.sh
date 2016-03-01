###############################################################################
# "I need more power!"
#
# This is a NEO4J start up wrapper that provides more options. Created by John Freier
# - backup - creates a backup of the current database.
# - restore - restores the database using the backup file.
# - destroy - clears out the database
# - all start commands - All of the current ./neo4j actions. 
#
# export $NEO4J_HOME=/path/to/neo4j
###############################################################################
if [ $1 == 'backup' ]; then
	$NEO4J_HOME/bin/neo4j-shell -c dump > ./backup.cypher
else
	if [ $1 == 'restore' ]; then
		$NEO4J_HOME/bin/neo4j-shell -c "MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r;"
		$NEO4J_HOME/bin/neo4j-shell -file ./backup.cypher
	else
		if [ $1 == 'destroy' ]; then
			$NEO4J_HOME/bin/neo4j-shell -c "MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r;"
		else
			if [ $1 == 'shell' ]; then
				$NEO4J_HOME/bin/neo4j-shell
			else
				$NEO4J_HOME/bin/neo4j $1
			fi
		fi
	fi
fi
