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
 
*/

var ia = require('./controllers/ia')(restify)

server.get('/api/ia', ia.list) 
server.post('/api/ia', ia.add)
server.get('/api/ia/:id', ia.getById) 
 
server.put('/api/ia/:id', ia.setById) 
server.del('/api/ia/:id', ia.deleteById) 
 
//redirect every request that does not begin with /api/ to the static folder
server.get(/^(?!\/api\/).*/, restify.serveStatic({
    'directory': 'web',
    'default': 'index.html'
 }))
server.listen(8081, function(){
 console.log("Server listening on port 8081 !")
})