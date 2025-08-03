const formSearch = (req) => {
    const object = {
        keyword: ""
    }
    if (req.keyword) {
        object.keyword = req.keyword;
        const regex = new RegExp(object.keyword, "i");
        object.regex = regex;
    }
    return object;
}

module.exports = formSearch;