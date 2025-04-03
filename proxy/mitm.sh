#!/bin/bash

# This starts up the mitm proxy server and listens on port 8888
# It is used for looking at all the frsot data that we are pull.

# To Download
# brew install mitmproxy

# To Start
# mitmweb - start Web UI

# To install the mitm cert in Java use the following command.
# sudo keytool -importcert -alias mitmproxy -storepass changeit -keystore $JAVA_HOME/lib/security/cacerts -trustcacerts -file ~/.mitmproxy/mitmproxy-ca-cert.pem

# To get it working with MVN and Spring add the following to the run.
# -Dspring-boot.run.jvmArguments="-Dhttps.proxyHost=localhost -Dhttps.proxyPort=8888 -Dhttp.proxyHost=localhost -Dhttp.proxyPort=8888"

mitmweb --set listen_port=8888
