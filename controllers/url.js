const nanoid = require("nano-id");
const URL = require("../models/url");


async function generateURLid(req, res) {
    const body = req.body;

    if (!body || !body.url) return res.status(400).json({ msg: "URL is required!" });

    const shortID = nanoid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortID })
}

async function redirect(req, res) {
    const shortid = req.params.shortid;
    const entry = await URL.findOneAndUpdate(
        { shortid },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        {new: true}
    );

    if(!entry) return res.status(404).json({msg: "URL not found!", entry});

    res.redirect(entry.redirectURL);


}


module.exports = {
    generateURLid,
    redirect,
}