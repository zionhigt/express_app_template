const fs = require("fs");
const path = require('path')

class Messages {
    constructor() {
        this.data_root = path.join(__basedir, process.env.DATA_PATH);
        this._modelName = "messages";
    }

    getDataPath() {
        return path.join(this.data_root, this._modelName + ".json")
    }

    async getPostedMessages() {
        return await new Promise((resolve, reject) => {
            fs.readFile(this.getDataPath(), {encoding: "utf-8"}, (err, data) => {
                    if(err && err.errno !== 0) {
                        if(err.code === "ENOENT") {
                            return resolve(new Array);
                        } else {
                            return reject(err);
                        }
                    } else {
                        return resolve(JSON.parse(data));
                    }
            });
        })
    
    }

    async create(entity) {
        return await new Promise(async (resolve, reject) => {
            const entities = await this.getPostedMessages();
            entities.push(entity);
            fs.writeFile(this.getDataPath(), JSON.stringify(entities), {encoding: "utf-8"}, err => {
                if(err && err.errno !== 0) reject(err);
                resolve();
            });
        })
    }
}

module.exports = new Messages();