// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */


/***************************************
 * CPSC473 Section 1 - Assignment 3
 * Eric Donaldson + Kyle Meyerhardt
 * FizzBuss Assignment, with bootstrap for grid
 * Sources: Assignment 1 nudge submission, https://gist.github.com/Zaephor/485b52c7ae860ed922bb
 ***************************************
*/

"use strict";

var http = require("http");

function writeCSS(res) {
  res.writeHead(200, {
    "Content-Type": "text/css"
  });
  res.write("/* style.css - because this was a good idea */\n");
  res.write("div.row div { border-style: solid; border-color: black; }\n");
  res.end();
}

function beginPage(res, title) {
  res.write("<!DOCTYPE html>\n");
  res.write("<html lang='en'>\n");
  res.write("<head>\n");
  res.write("<meta charset='utf-8'>\n");
  res.write("<title>" + title + "</title>\n");
  res.write("<link rel='stylesheet' href='style.css' type='text/css'>\n");
  res.write(
    "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css' type='text/css'>\n"
  );
  res.write(
    "<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'></script>\n"
  );
  res.write(
    "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js'></script>\n"
  );
  res.write("</head>\n");
  res.write("<body>\n");
}

function fizzbuzzContainerWrapper(res, content) {
  res.write("<div class='col-md-2'>\n" + content + "</div>\n");
}

function fizzbuzz_1() {
  var output = "";
  for (var i = 1; i <= 100; i++) {
    if (i % 3 === 0) {
      output += "Fizz";
    }
    if (i % 5 === 0) {
      output += "Buzz";
    }
    if (i % 3 !== 0 && i % 5 !== 0) {
      output += i.toString();
    }
    output += "<br />\n";
  }
  return output;
}

function fizzbuzz_2(start, end) {
  var output = "";
  for (var i = start; i <= end; i++) {
    if (i % 3 === 0) {
      output += "Fizz";
    }
    if (i % 5 === 0) {
      output += "Buzz";
    }
    if (i % 3 !== 0 && i % 5 !== 0) {
      output += i.toString();
    }
    output += "<br />\n";
  }
  return output;
}

function fizzbuzz_3(arrayList) {
  var output = "";
  for (var i in arrayList) {
    if (arrayList.hasOwnProperty(i)) {
      if (arrayList[i] % 3 === 0) {
        output += "Fizz";
      }
      if (arrayList[i] % 5 === 0) {
        output += "Buzz";
      }
      if (arrayList[i] % 3 !== 0 && arrayList[i] % 5 !== 0) {
        output += arrayList[i].toString();
      }
      output += "<br />\n";
    }
  }
  return output;
}

function fizzbuzz_4(someObject) {
  var output = "";
  for (var i = 1; i <= 100; i++) {
    if (i % 3 === 0) {
      output += someObject.divisibleByThree;
    }
    if (i % 5 === 0) {
      output += someObject.divisibleByFive;
    }
    if (i % 3 !== 0 && i % 5 !== 0) {
      output += i.toString();
    }
    output += "<br />\n";
  }
  return output;
}

function fizzbuzz_5(arrayList, someObject) {
  var output = "";
  for (var i in arrayList) {
    if (arrayList.hasOwnProperty(i)) {
      if (arrayList[i] % 3 === 0) {
        output += someObject.divisibleByThree;
      }
      if (arrayList[i] % 5 === 0) {
        output += someObject.divisibleByFive;
      }
      if (arrayList[i] % 3 !== 0 && arrayList[i] % 5 !== 0) {
        output += arrayList[i].toString();
      }
      output += "<br />\n";
    }
  }
  return output;
}

function runFizzbuzz(req, res) {
  var title = "CPSC473 - Assiment 3 - FizzBuzz";

  if (req.url === "/style.css") {
    writeCSS(res);
  } else {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });

    beginPage(res, title);

    res.write("<div class='container-fluid'>\n");
    res.write("<div class='row'>\n");
    fizzbuzzContainerWrapper(res, fizzbuzz_1());
    fizzbuzzContainerWrapper(res, fizzbuzz_2(200, 300));
    fizzbuzzContainerWrapper(res, fizzbuzz_3([
      101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115
    ]));
    fizzbuzzContainerWrapper(res, fizzbuzz_4({
      divisibleByThree: "foo",
      divisibleByFive: "bar"
    }));
    fizzbuzzContainerWrapper(res, fizzbuzz_5([
      101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115
    ], {
      divisibleByThree: "foo",
      divisibleByFive: "bar"
    }));
    res.write("</div>\n");
    res.write("</div>\n");

    res.write("</body>\n");
    res.write("</html>\n");
    res.end();
  }
}

var server = http.createServer(runFizzbuzz);
server.listen(9000, "0.0.0.0");
console.log(server);
//var address = server.address();
//console.log("fizzbuzz is listening at http://localhost:" + address.port + "/");
