//testing
import test from 'ava';

import { Compiler } from '../';

const compiler = new Compiler();

test('compileVariable with content under 70 characters', t => {
    var variableName = 'myVar';
    var variableContent = 'variable content';

    var compiledString = compiler.compileVariable(variableName, variableContent);
    
    t.is(compiledString, 'myVar: variable content');
});

test('compileVariable with content over 70 characters', t => {
    var variableName = 'myBigVar';
    var variableContent = 'This long string of text should be over seventy characters long and satisfy test conditions.';

    var compiledString = compiler.compileVariable(variableName, variableContent);

    t.is(compiledString, 'myBigVar: \r\n\r\nThis long string of text should be over seventy characters long and satisfy test conditions.');
});

test('compileArray', t => {
    var variableName = 'myArr';
    var variableArray = [
        'test1',
        'test2',
        'This long string of text should be over seventy characters long and satisfy test conditions.'
    ];

    var compiledString = compiler.compileArray(variableName, variableArray);

    t.is(compiledString, 'myArr[]: test1\r\n---\r\nmyArr[]: test2\r\n---\r\nmyArr[]: \r\n\r\nThis long string of text should be over seventy characters long and satisfy test conditions.');
});

test('compileString', t => {
  var momlObj = {
    main: 'one',
    secondary: 'two',
    testArr: [
      'three',
      'four'
    ]
  };

  var compiledString = compiler.compileString(momlObj);

  t.is(compiledString, 'main: one\r\n---\r\nsecondary: two\r\n---\r\ntestArr[]: three\r\n---\r\ntestArr[]: four');
});

test('compileString puts title on top', t => {
  var momlObj = {
    main: 'one',
    secondary: 'two',
    testArr: [
      'three',
      'four'
    ],
    title: 'my title'
  };

  var compiledString = compiler.compileString(momlObj);

  t.is(compiledString, 'title: my title\r\n---\r\nmain: one\r\n---\r\nsecondary: two\r\n---\r\ntestArr[]: three\r\n---\r\ntestArr[]: four');
});
