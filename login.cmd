echo "Logging in"

curl --insecure -v -d "@login.json" POST -H "Content-Type:application/json" https://tyronemartin.cit270.com/login
@REM  curl --insecure -v -d "@login.json" POST -H "Content-Type:application/json" http://localhost:3000/login

@REM  curl -v -d "@login.json" POST -H "Content-Type:application/json" https://dev.stedi.me/login

@REM curl https://dev.stedi.me/validate/781942c6-934b-4a9c-88d1-a93dfea4079b


