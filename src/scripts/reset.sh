if [ $NODE_ENV == "development" ]
then
	curl -XDELETE 'http://localhost:9200/techdb/'
	curl -XPUT 'http://localhost:9200/techdb/'

	cd ..
	meteor reset
	meteor npm install
	meteor update
	print "Project reset successfully!"
else
	echo "> Can't run reset script outside development environment"
fi