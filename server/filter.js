const customerFilter  = (searchQuery) => {
    if(!searchQuery){
        throw new Error('Search query is Required')
    }

    return {
        $or: [
            { firstName: { $regex: searchQuery, $options: "i" } },
            { email: { $regex: searchQuery, $options: "i" } },
        ],
    }
}

module.exports = { customerFilter }