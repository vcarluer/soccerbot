//var restify = require(restify)
module.exports = {
    list : function (req, res, next) {
        res.send([{
            id:'1',
            name:'toto',
            author:'moi',
            behavior:'la balb a'
        }, {
            id:'2',
            name:'toto',
            author:'moi',
            behavior:'la balb a'
        }])
        
        return next()
    },
    getById : function (req, res, next) {
        res.send({
            id:req.params.id,
            name:'tata',
            author:'toi',
            behavior:'la balb a'
        })
        
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