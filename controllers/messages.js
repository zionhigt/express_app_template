const Messages = require('../models/messages/messages');

exports.getMessages = (req, res) => {
    Messages.getPostedMessages()
    .then(data => {
        res.status(200).json(data.sort(function(a, b) {
            return b.writeAt - a.writeAt;
        }));
        
    })
    .catch(err => {
        res.status(404).json(err);

    })
};
exports.postMessages = (req, res) => {
    Messages.getPostedMessages()
    .then(async data => {
        const name = req.body.name.trim();
        const message = req.body.message.trim();
        const rate = Number.parseInt(req.body.rate);
        const postedMessage = {
            name: name,
            message: message,
            writeAt: Date.now(),
            rate: rate
        }
        
        if(!!name && !!message) {
            try {
                await Messages.create(postedMessage);
                res.status(201).json({message: "Message posté"});
            }
            catch(err) {
                console.log(err)
                throw new Error(err);
            }
        } else {
            throw new Error("Bad request");
        }
    })
    .catch(err => {
        res.status(400).json(err);

    })
}; 