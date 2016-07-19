interface IMomlVariable {
    exists: boolean,
    isArray: boolean,
    name: string,
    content: string
};

interface IOptions {
    split?: any,
    varSplit?: any,
    arraySplit?: any
}

export class Compiler {
    private globalOptions = {
        split: '---',
        varSplit: ':',
        arraySplit: '[]'
    };

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
        return '';    
    }
}
