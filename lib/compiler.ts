import 'core-js';

interface IMomlVariable {
    exists: boolean,
    isArray: boolean,
    name: string,
    content: string
};

interface IOptions {
    split?: any,
    varSplit?: any,
    arraySplit?: any,
    inlineLimit?: number
}

export class Compiler {
    private globalOptions = {
        split: '---',
        varSplit: ':',
        arraySplit: '[]',
        inlineLimit: 70
    };

    private newLine = '\r\n';

    constructor(options?: IOptions) {
        if (options) {
            this.options(options);
        }
    }

    options(options?: IOptions): Object {
        if (options) {
            Object.assign(this.globalOptions, options);
        }

        return this.globalOptions;
    }

    compileString(momlObject: any): string {
        var compiledContent = '';

        if (momlObject.title) {
            compiledContent += this.compileVariable('title', momlObject.title);

            compiledContent += this.sectionSplit();

            delete momlObject.title;
        }

        var propArr = Object.keys(momlObject);

        for (var propName in momlObject) {
            var prop = momlObject[propName];

            if (Object.prototype.toString.call(prop) == '[object Array]') {
                compiledContent += this.compileArray(propName, prop);
            } else {
                compiledContent += this.compileVariable(propName, prop);
            }

            if (propArr.indexOf(propName) < propArr.length - 1) {
                compiledContent += this.sectionSplit();
            }
        }

        return compiledContent;
    }

    compileVariable(name: string, content: string): string {
        var output = `${name}${this.globalOptions.varSplit} `;

        if (content.length > this.globalOptions.inlineLimit) {
          output += `${this.newLine}${this.newLine}`;
        }

        output += content;

        return output;
    }

    compileArray(name: string, content: string[]): string {
        var outputName = `${name}${this.globalOptions.arraySplit}`;
        var output = content.reduce((out, current, idx) => {
            out += this.compileVariable(outputName, current);

            if ((idx + 1) !== content.length) {
                out += this.sectionSplit();
            }

            return out;
        }, '');

        return output;
    }

    sectionSplit(): string {
      return `${this.newLine}${this.globalOptions.split}${this.newLine}`;
    }

}
