const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const DataFunctions =require('./controllers/Data.js')



// Create a new express application called 'app'
const app = express();

app.set('view engine','hbs');
// Set up the CORs middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(express.static(__dirname+'/views'))

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// // This application level middleware prints incoming requests to the servers console
// app.use((req, res, next) => {
//     console.log(`Request_Endpoint: ${req.method} ${req.url}`);
//     next();
// });


app.get('/',(req,res)=>{
  // DataFunctions.AddUser(/);
  res.path=path.join(__dirname + '/views/index.hbs');
  DataFunctions.saydemo(req,res)
}
);


app.post('/api/adduser',DataFunctions.AddUser);

app.get('/api/:name',DataFunctions.FindUser);



app.post('/app/addquiz',DataFunctions.AddQuiz);

app.post('/api/addans',DataFunctions.AddAns);

app.put('/api/:userid/updatequestion',DataFunctions.UpdateQuestion);

app.delete('/api/:userid/deletQuestion',DataFunctions.DeleteQuiz);

app.put('/api/:userid/upvote',DataFunctions.UpVoteQuestion);


// app.post('/api/AddUser',DataFunction.AddUser);




// Set up the bodyParser middleware





app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});



app.listen(port,()=>{
  console.log('app runing on Prot:',port)
})