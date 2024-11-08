var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/dynamic_view', function(req, res){
   res.render('dynamic', {
	user: {name: "Ayush", age: "20"}
   });
});

app.listen(3000);
