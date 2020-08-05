
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const express_graphql = require('express-graphql');
const isAuth = require('./middleware/isAuth')
app.use(cors())
const {User} = require('./database/schema.js')
const fs = require('fs')
app.use(express.static('public'));
const schema = require('./graph_ql/schema.js');
const {root} = require('./graph_ql/resolvers.js');
var path = require('path');
const port = process.env.PORT || 4000;


app.post('/upload/:folder', (req, res) => {
    let fileName = Math.random().toString('36')
    fileName     = `${fileName}`
    let fileStream = fs.createWriteStream(`public/${req.params.folder}/` + fileName);

    req.pipe(fileStream)
    req.on('end', () =>{
        res.end(fileName)
    })
})


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.use(isAuth);

app.use('/graphql', express_graphql( (req, res) => ({ 
    schema: schema,
    rootValue: root,
    graphiql: true,
})));

app.listen(port, console.log("Listen ### 4000"))

