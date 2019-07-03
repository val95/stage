var express = require('express');
var bodyparser = require('body-parser');
var app = express() ; 
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var session = require('express-session')

var co = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "",
  database : "stage"
});

app.use(bodyparser.urlencoded({ extended: true }));
 
app.get('/', function(request, response) {
  fs.readFile("page.html" , "UTF-8" , function(error, html)
  { 
    response.writeHead(200, {"Content-Type" : "text/html"});
    response.end(html);    
  });
});

app.get('/css', function(request, response) {
 fs.readFile("style.css" , "UTF-8" , function(error, css)
  { 
    response.writeHead(200, {"Content-Type" : "text/css"});
    response.end(css);    
  });

});

app.get('/css2', function(request, response) {
 fs.readFile("style2.css" , "UTF-8" , function(error, css)
  { 
    response.writeHead(200, {"Content-Type" : "text/css"});
    response.end(css);    
  });

});


app.get('/mdpo',function(request,response){

  response.writeHead(200 , {"Content-Type": "text/plain"});
  response.end("ta oublié ton mot de passe , ah c'est dommage xD");
});



app.get('/logo', function(req,res ){
  var image = "img/flogo.png" ; 
  var f = fs.createReadStream(image);
  res.writeHead(200, {"Content-Type" : "image/png"});
  f.pipe(res);
});



app.get('/arbre', function(req,res ){
  var image = "arbrelogo.jpg" ; 
  var f = fs.createReadStream(image);
  res.writeHead(200, {"Content-Type" : "image/png"});
  f.pipe(res);
});




app.post('/post.html', function(request, response) {
  var N= request.body.nom;
  var P= request.body.prenom;
  var E = request.body.email ; 
  var M = request.body.mdp ; 
  var T = request.body.tel ;
  co.query("INSERT INTO formulaire (nom,prenom,email,mdp,tel) values ('" + N + "', '" +P +"', '" +E +"', '" +M +"', '" +T +"')",function ( error ,resul)
  {
  	console.log("envoie en cours");
  	if (error) throw error ;
  });
   fs.readFile("page2.html" , "UTF-8" , function(error, html)
  {
  console.log("envoie réussi")  
    response.writeHead(200, {"Content-Type" : "text/html"});
    response.end(html);

  }); 
});

app.post('/selection', function(request, response) {
	var choix = request.body.box;
	if (choix.length <= 5 ) {
	co.query("INSERT INTO thematiques(thematique) values ('" +choix+ "');  ",function(error , resul ){
		if (error) throw ( " probleme Mysql "); 
		});
	fs.readFile("page3.html" , "UTF-8" , function(error, html)
	  {
	  console.log("envoie réussi")  
	    response.writeHead(200, {"Content-Type" : "text/html"});
	    response.end(html);
	});
}
	else
		response.end("error");

	
	console.log(choix);
});

app.get('/page4.html/', function(request, response) {
  fs.readFile("page4.html" , "UTF-8" , function(error, html)
  { 
    response.writeHead(200, {"Content-Type" : "text/html"});
    response.end(html);    
  });
});

app.listen(3000);