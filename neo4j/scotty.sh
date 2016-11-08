###############################################################################
# "I need more power!"
#
# This is a NEO4J start up wrapper that provides more options. Created by John Freier
# - backup - creates a backup of the current database.
# - restore - restores the database using the backup file.
# - destroy - clears out the database
# - change {database} - change the database file.
# - all start commands - All of the current ./neo4j actions. 
#
# export $NEO4J_HOME=/path/to/neo4j
###############################################################################
if [ $1 == 'backup' ]; then
	$NEO4J_HOME/bin/neo4j-shell -c dump > ./backup.cypher
elif [ $1 == 'restore' ]; then
	$NEO4J_HOME/bin/neo4j-shell -c "MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r;"
	$NEO4J_HOME/bin/neo4j-shell -file ./backup.cypher
elif [ $1 == 'destroy' ]; then
	$NEO4J_HOME/bin/neo4j-shell -c "MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r;"
elif [ $1 == 'change' ]; then
	cp $NEO4J_HOME/conf/neo4j-server.properties $NEO4J_HOME/conf/neo4j-server.properties.bak
	sed "s/.*org.neo4j.server.database.location.*/org.neo4j.server.database.location=data\/$2.db/" $NEO4J_HOME/conf/neo4j-server.properties.bak > $NEO4J_HOME/conf/neo4j-server.properties
else
	if [ $1 == 'shell' ]; then
		$NEO4J_HOME/bin/neo4j-shell
	else
		$NEO4J_HOME/bin/neo4j $1
	fi
fi
