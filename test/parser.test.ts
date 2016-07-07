var should = require('should');
var Parser = require('../index');

var parser = new Parser();

const fileString = 'title: Something \r\n\ -----\r\n\ content: something else.';

const fileStringArray = 'title: Something \r\n\ -----\r\n\ myarray[]: first element. \r\n\ -----\r\n\ myarray[]: second element.';

const varString = 'title: Something';

describe('Parser', function() {
    describe('parseVariable', function() {
        var parsedString = parser.parseVariable(varString);
    });
});
