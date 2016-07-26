//testing
import test from 'ava';

import { Parser } from '../';

const parser = new Parser();

const fileString = 'title: Something\r\n-----\r\ncontent: something else.';

const fileStringArray = 'title: Something\r\n-----\r\nmyarray[]: first element.\r\n\-----\r\n\myarray[]: second element.';

const varString = 'title: Something';

test('parseVariable', t => {
    var parsedString = parser.parseVariable(varString);

    t.truthy(!!parsedString.name, 'Parsed String should have a name');
    t.truthy(!!parsedString.content, 'Parsed String should have content');

    t.is(parsedString.name, 'title');
    t.is(parsedString.content, 'Something');
});

test('parseFile', t => {
    var parsedFile = parser.parseString(fileString);

    t.truthy(!!parsedFile.title, 'Parsed File should have a title');
    t.truthy(!!parsedFile.content, 'Parsed File should have content');
});

test('parseArray', t => {
    var parsedFile = parser.parseString(fileStringArray);

    t.truthy(!!parsedFile.title, 'Parsed File should have a title');
    t.truthy(!!parsedFile.myarray, 'Parsed File should have a myarray');

    t.is(parsedFile.myarray.length, 2);
});

test('existing options', t => {
    var testParser = new Parser();
    var opts = testParser.options();

    var options = {
        split: /-{3,}\r\n|\r|\n/g,
        varSplit: /^(\w+)(\[\])?:/,
        arraySplit: /\[\]/
    }

    t.deepEqual(opts, options);
});

test('options extension', t => {
    var testParser = new Parser();
    var opts = testParser.options();

    var options = {
        split: /-{3,}\r\n|\r|\n/g,
        varSplit: /^(\w+)(\[\])?:/,
        arraySplit: /\[\]/
    };

    t.deepEqual(opts, options);

    var newOpts = {
        split: /,/g,
        test: 1
    };

    var newOptions = {
        split: /,/g,
        varSplit: /^(\w+)(\[\])?:/,
        arraySplit: /\[\]/,
        test: 1
    };

    opts = testParser.options(newOpts);

    t.deepEqual(opts, newOptions);
});
