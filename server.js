var express    = require('express');     
var app        = express();               
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'node'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var port = process.env.PORT || 8080;
var router = express.Router();

app.get('/articles',function (req,res) {

	connection.query('SELECT * FROM articles', function (error, results, fields) {
		if (error) throw error;
		
		res.json(results);
	});
})


app.post('/sendMail', function(req, res, next) {
	var mailOptions = req.body;
	
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			/*user: 'YourGmailAddress',
			pass: 'yourPassword'*/
			user: 'vissarut.ly@gmail.com',
			pass: 'Link*starT!2301'
		}
	});
	
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
			res.json({code:500,data:error});
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
		res.json({code:200,data:info});
	});
});

app.listen(port);
console.log('server launch on localhost:' + port);