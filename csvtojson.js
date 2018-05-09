const fs = require("fs");

const csvToJsonFormatter = (filePath) => {
	if (filePath == null) {
		console.log("File path is null");
		return false;
	}
	console.log(`File path: ${filePath}`);
	
	fs.readFile(filePath, "utf-8", function(error, data){
		// console.log(data);
		parseCSVtoJSON(data);
	});
	
	const parseCSVtoJSON = (data) => {
		var JSON = "";
		var lines = data.split(/\r?\n/);
		
		// Get header names
		var columnNames = lines[0].split(",");
		
		var str = "";
		for (var row = 1; row < lines.length - 1; row++) {
			var values = lines[row].split(",");
			
			// Wrap the string with open curly brace
			str = str + "\t{\r\n";
			
			// Construct
			for (var col = 0; col < values.length; col++) {
				str = str + `\t\t"${columnNames[col]}": "${values[col]}",\r\n`;
			}
			// Remove last comma, and re-append new line
			if (str.length != 0) {
				str = str.substring(0, str.length - 3);
				str = str + "\r\n";
			}
			
			// Wrap the string with curly brace
			str = str + "\t},\r\n";
		}
		// Remove last comma, and re-append new line
		if (str.length != 0) {
			str = str.substring(0, str.length - 3);
			str = str + "\r\n";
		}
		
		// Wrap the string with square brace
		str = `[\r\n${str}]`;
		console.log(str);
	}
}

csvToJsonFormatter("customer-data.csv");