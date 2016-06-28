var dataStoreUrl = 'http://jsonblob.com', 
    dataToken = '57725733e4b01190df7ca1fd',
    restify = require(restify),
    client = restify.createJsonClient({
      url: dataStoreUrl
    }),
    iaData = []


client.get('/' + dataToken, function(err, req, res, obj) {
    if(err) {
        console.log('Error while retrieving data from ' + dataStoreUrl)
    }
    
    if(obj) {
        iaData = obj
        console.log('data retrieved from  ' + dataStoreUrl)
        console.log(iaData)
    }
});

module.exports = {
    list : function (req, res, next) {
        /*res.send([{
            id:'1',
            name:'toto',
            author:'moi',
            behavior:'la balb a'
        }, {
            id:'2',
            name:'toto',
            author:'moi',
            behavior:'la balb a'
        }])*/
        res.send(iaData)
        
        return next()
    },
    getById : function (req, res, next) {
        /*res.send({
            id:req.params.id,
            name:'tata',
            author:'toi',
            behavior:'la balb a'
        })*/
        var id = req.params.id,
        
        res.send(    
            iaData.find(function (item) {
                return item.id === id
            })
        )
        
        return next()
    },
    add : function (req, res, next) {
        res.send({
            id:'666',
            name:req.params.name || 'null',
            author:req.params.author || 'null',
            behavior:req.params.behavior || 'null'
        })
        
        return next()
    },
    setById : function (req, res, next) {
        
        
        //return next(new restify.NotImplementedError)
        return next()
    },
    deleteById : function (req, res, next) {
        
        
        //return next(new restify.NotImplementedError)
        return next()
    }

    
}