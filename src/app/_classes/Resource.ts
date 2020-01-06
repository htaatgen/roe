export class Resource {
    public type: string;
    public name: string;
    public icon;
    public income = 1;

    constructor(type, name, icon) {
        this.type = type;
        this.name = name;
        this.icon = icon;
    }
}