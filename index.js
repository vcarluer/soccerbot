var restify = require('restify')

var server = restify.createServer()
server.use(restify.queryParser())
server.use(restify.bodyParser( {mapParams : true} ))

/*function send(req, res, next) {
   res.send('hello ' + req.params.name + req.params)
   return next()
 }

 server.post('/hello', function create(req, res, next) {
   res.send(201, Math.random().toString(36).substr(3, 8))
   return next()
 });
 server.put('/hello', send)
 server.get('/hello/:name', send)
 server.head('/hello/:name/', send)
 server.del('hello/:name', function rm(req, res, next) {
   res.send(204);
   return next();
 });
 
server.listen(8081, function(){
 console.log("Server listening on port 8081 !")
})*/
