var http = require("http");
var url = require("url");
var fs = require("fs");
var nodemailer = require("nodemailer");
var messages = [];

function handleRequest(request, response) {
  var urlData = url.parse(request.url, true);
  var filename = "." + urlData.pathname;
  var parameters = urlData.query;
  var page2 = "";

  if (filename == "./history.html") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    for (var i = messages.length - 20; i <= messages.length - 1; i++) {
      if (messages[i] !== undefined && messages[i] != "") {
        page2 += "<div>" + messages[i] + "</div>\n";
      } else {
        page2 += "<div>&nbsp;</div>\n";
      }
    }
    // console.log("it work");
    response.end(page2);
  } else {
    fs.readFile(filename, function (error, data) {
      if (error) {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("Error 404: " + urlData.pathname + " not found!");
        response.end();
      } else {
        if (/.html$/.test(filename)) {
          if (urlData.pathname == "/forum.html") {
            response.writeHead(200, { "Content-Type": "text/html" });
            if (parameters.nick !== undefined && parameters.nick != "") {
              if (parameters.msg !== undefined && parameters.msg != "")
                messages.push(parameters.nick + ":\n" + parameters.msg);
              /*for(var i = 0;i < messages.length;i++){
                    console.log(messages[i]);
                  }*/
            }
          } else if (urlData.pathname == "/index.html") {
            response.writeHead(200, { "Content-Type": "text/html" });
            console.log(parameters.email);
            if (parameters.email !== undefined && parameters.email != "") {
              var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "officialppgaming@gmail.com",
                  pass: "napisemo@neka#slova2",
                },
              });

              var mailOptions = {
                from: "officialppgaming@gmail.com",
                to: parameters.email,
                subject: "Thank you for subscribeing to our news letter.",
                text: "Dear :placeholder:\n" + "Test TEXT",
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
            }
          }
        } else if (/.css$/.test(filename))
          response.writeHead(200, { "Content-Type": "text/css" });
        else if (/.png$/.test(filename))
          response.writeHead(200, { "Content-Type": "image/png" });
        else response.writeHead(200, { "Content-Type": "text/plain" });

        response.write(data);
        response.end();
      }
    });
  }
}

var server = http.createServer(handleRequest);
server.listen(8080);
console.log("GET STRONG MAN!");
