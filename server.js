var util = require('util'),
    connect = require('connect'),
    serveStatic = require('serve-static');
    port = 3000;

var app = connect();
app.use(serveStatic(__dirname));
app.listen(3000);


util.puts('Listening on ' + port + '...');
util.puts('Press Ctrl + C to stop.');
