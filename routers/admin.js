var express = require('express');
var router = express.Router();

router.get('/user',function(request,response,next){
	response.send('User');
});

module.exports = router;
