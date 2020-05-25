class ASBDocument {
    public type:string;
    public year:number;
    public number:number;
    public title:string;
    public file:string;
    public constructor (type:string, year:number, number:number, title:string, file:string) {
        this.type = type;
        this.year = year;
        this.number = number;
        this.title = title;
        this.file = file;
    }
}

export {ASBDocument};