Project Utopia: an online community for campus students to learn, chat online and connect

Currently: backend is setup

Development:
cd backend
mvn clean install
cd ..
docker-compose build --no-cache
docker-compose up
Test if the server is up by testing loclahost:8080
Test CRUD for example: loclahost:8080/getComments

To turn down docker contaienrs:
docker-compsoe down
