# Learning blockchain Ethereum

Backend: `nodeJS 14.x.x`
Cloud Database: `MongoDB`

### Database
Try free in [mongodb.com](https://www.mongodb.com/)
```
    1. Create project
    2. Network Access > add ip address (If you set 0.0.0.0/0, you should delete it when you deliver it to the customer, otherwise it will be caused and attack the database)
    3. Select Database Access in SECURITY > add new database user (Save the account and password to connect to the database)
    4. Select database in DEPLOYMENT menu > Build a Database (waiting 1-3 minutes)
    5. Select Connect > Connect your application
    6. Copy connection string into your application code  
    mongodb+srv://<username>:<password>@cluster0.9k5jh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

    7. replace the username and password created in 3 into the copied string
```
### Use modules:
    1. express
    2. ejs
    3. body-parse
    4. mongoose
    5. socket.io
    6. web3
    7. web3.js-browser

#### Installed
```
npm install express ejs body-parse mongoose socket.io web3 web3.js-browser
```

### Run nodeJS
```
node server
```
