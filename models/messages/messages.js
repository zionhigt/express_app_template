const fs = require("fs");
const path = require('path')

class Messages {
    constructor() {
        this.data_root = path.join(__basedir, process.env.DATA_PATH);
        this._modelName = "messages";
    }

    get path() {
        return path.join(this.data_root, this._modelName + ".json")
    }

    async readJSONFile(path) {
        return await new Promise((resolve, reject) => {
            fs.readFile(path, {encoding: "utf-8"}, (err, data) => {
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

    async createRootDataPath() {
        try {
            if (fs.existsSync(this.data_root)) return;
            if (this.data_root) {
                fs.mkdir(this.data_root, {recursive: true}, (err) => {
                    if (err && err.code != 0) throw err;
                })
            }
        } catch(err) {
            throw err;
        }
    }
    async getPostedMessages() {
        try {
            if (fs.existsSync(this.path)) {
                return this.readJSONFile(this.path);
            } else {
                await this.createRootDataPath();
                fs.writeFileSync(this.path, JSON.stringify([]));
                return this.getPostedMessages();
            }
        } catch(err) {
            throw err;
        }
        
        
    
    }

    async create(entity) {
        return await new Promise(async (resolve, reject) => {
            const entities = await this.getPostedMessages();
            entities.push(entity);
            fs.writeFile(this.path, JSON.stringify(entities), {encoding: "utf-8"}, err => {
                if(err && err.errno !== 0) reject(err);
                resolve();
            });
        })
    }
}

module.exports = new Messages();