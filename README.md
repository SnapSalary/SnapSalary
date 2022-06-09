# SnapSalary Main Repository
# Server
The server folder contains the server portions of the main SnapSalary application. 

## Running
To run the server, you have two options. Either go into the server directory and run `npm install && npm run start` or using docker, run `sudo docker build -t snapsalary . && sudo docker run snapsalary`

The default port is port 3000, but can be changed with the PORT environment variable.


# Client
The client folder contains the frontend client portions of the main SnapSalary application.

## Running
To run the client, you have to go into the client folder and run `npm install && npm run start`. To tie the client to the backend, set the environment variable `REACT_APP_BASE_URL` to the URL of your server.

# Deployment
To deploy to your own cloud, fork the repo to your github page and add the following environment variables:

`AWS_ACCESS_KEY_ID`
`AWS_ECR_REPOSITORY`
`AWS_S3_BUCKET`
`AWS_SECRET_ACCESS_KEY`

and run the github action. Currently only the frontend deploys. The backend gets stored in ECR, but doesn't get deployed.
