# Java
export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_25*`

# Node
export NODE_HOME=/usr/local/developer/node/node-v0.10.29-darwin-x64
export PATH=$PATH:$NODE_HOME/bin

# Gradle
export GRADLE_HOME=/usr/local/developer/gradle/gradle-2.2.1
export PATH=$PATH:$GRADLE_HOME/bin

# Mongo DB
export MONGO_HOME=/usr/local/developer/mongodb/mongodb-osx-x86_64-2.6.7
export PATH=$PATH:$MONGO_HOME/bin

# Maven
export M2_HOME=/usr/local/developer/maven/apache-maven-3.3.1
export PATH=$PATH:$M2_HOME/bin
export MAVEN_OPTS="-Xmx6048M -XX:MaxPermSize=3024M"

# Neo4J
export NEO4J_HOME=/Users/john/Applications/neo4j-enterprise-2.3.2

# Alias
alias tomcat='cd /usr/local/developer/tomcat/apache-tomcat-8.0.20'

# Helper Functions
findme() { find ./ -type f -iname $1; }

##
# Your previous /Users/john/.bash_profile file was backed up as /Users/john/.bash_profile.macports-saved_2014-06-18_at_17:18:33
##

# MacPorts Installer addition on 2014-06-18_at_17:18:33: adding an appropriate PATH variable for use with MacPorts.
export PATH=/opt/local/bin:/opt/local/sbin:$PATH
# Finished adapting your PATH environment variable for use with MacPorts.

