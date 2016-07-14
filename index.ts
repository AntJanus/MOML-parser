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

export default class Parser {
    private globalOptions = {
        split: /-{3,}(\r\n|\r|\n)/g,
        varSplit: /^(\w+)(\[\])?:/,
        arraySplit: /\[\]/
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

    parseString(momlString: string): any {
        var parts = momlString.split(this.globalOptions.split);

        return parts.reduce((data: Object, part: string) => {
            var parsed = this.parseVariable(part);

            if (!!parsed) {
                if (parsed.isArray) {
                    if (!data[parsed.name]) {
                        data[parsed.name] = [];
                    }

                    data[parsed.name].push(parsed.content);
                } else {
                    data[parsed.name] = parsed.content;
                }
            }

            return data;
        }, {});
    }

    parseVariable(varString: string): IMomlVariable {

        var name = varString.match(this.globalOptions.varSplit);

        if (!name || name.length === 0) {
            return {
                exists: false,
                isArray: false,
                name: '',
                content: ''
            };
        }

        return {
            exists: true,
            isArray: this.isArray(name[0]),
            name: name[0].slice(0, this.isArray(name[0]) ? -3 : -1).trim(),
            content: varString.replace(this.globalOptions.varSplit, '').trim()
        };
    }

    isArray(varString: string): boolean {
        var match = varString.match(this.globalOptions.arraySplit);

        return !!match;
    }
}
