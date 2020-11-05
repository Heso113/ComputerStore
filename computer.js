class Computer {
    constructor(name, desc, features, img, price) {
        this.name = name;
        this.desc = desc;
        this.features = features;
        this.img = img;
        this.price = price;
    }

    getName() {
        return this.name;
    }

    getDesc() {
        return this.desc;
    }

    getFeatures() {
        return this.features;
    }

    getImg() {
        return this.img;
    }

    getPrice() {
        return this.price;
    }
}