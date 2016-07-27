# Markdown Object Markup Language Parser (MOML Parser)

Status: [![CircleCI](https://circleci.com/gh/AntJanus/MOML-parser/tree/master.svg?style=svg)](https://circleci.com/gh/AntJanus/MOML-parser/tree/master)

A markdown file parser based on the [MOML spec](https://github.com/AntJanus/MOML).

## Installation

```
npm install moml-parser
```

### Usage

The MOML parser includes not just the parser but a compiler as well.

#### Parser

The parser API has a few different methods available to it. To use the Parser, simply import it:

```
import { Parser } from 'moml-parser';

const parser = new Parser;
```

You can set a variety of options to customize the parser:

```
const parser = new Parser({
  split: /regexgoeshere/g,
  varSplit: /anotherregex/,
  arraySplit: /lastregex/
});
```

The three different regex options are used to split the markdown file in several steps:

- **split** splits the file into variables and definitions such as `myVar: content`. An array of these is then subsequently run through a variable parser
- **varSplit** - splits the array of variable definitions into the variable name and content. So in the case of `myVar: content`, it'd create an entry in the final object with `myVar` as the key and `content` as its value
- **arraySplit** - tests a variable name to see if it's an array. If it is, the entry in the final object will be an array and content will get appended as the parser goes through the markdown file. An example of an array is `myArr[]: first entry`.

The API for the parser is largely hidden and only one method is worth mentioning, the `parseString` method which takes a markdown input and exports an object.

It turns:

```
title: My new post
----
tags: post, special, first
----
content:

My content
```

into:

```
{
  title: 'My new post',
  tags: 'post, special, first',
  content: 'My content'
}
```

The other methods that are available on the Parser object are:

```js
const parser = new Parser;

parser.options(); //if supplied with an object, extends internal options. Always returns an options object

parser.parseVariable(varString); //parses a variable string like 'myVar: content' into a variable object

parser.isArray(varString); //checks if variable string may be an array definition
```

#### Compiler

The compiler has a similar API to the Parser but obviously reversed. There are several caveats.

The compiler takes in a similar options object as the Parser:

```
{
  split: '---',
  varSplit: ':',
  arraySplit: '[]',
  inlineLimit: 70
}
```

The `split` property defines the split between variable definitions such as between a `title` and a `body` of a markdown string. Both `varSplit` and `arraySplit` decide how a property and its value is stored basically using the following template:

```
var varString = `${varName}${isArray ? arraySplit: ''}${varSplit} ${varValue}`;
```

The last property `inlineLimit` checks the size of the content of a variable definition. If it is larger than the limit, it adds extra newlines so that instead of having this:

```
myVar: content
```

The markdown string ends up with:

```
myVar:

content
```

which is ideal for larger bodies of text such as the body of a text post.
