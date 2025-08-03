const pagination = (pagination, query, totalProducts, objectSearch) => {
    const totalPage  = Math.ceil(totalProducts / pagination.limit);
    pagination.totalPage = totalPage;
    if (query.page) {
        pagination.currentPage = parseInt(query.page);
        if (pagination.currentPage > 1) {
            pagination.previousPage = pagination.currentPage - 1;
        }
        else {
            pagination.previousPage = 1;
        }
    }
    const skipProducts = parseInt(pagination.currentPage - 1) * pagination.limit;
    pagination.skipProducts = skipProducts;
    return pagination;
}

module.exports = pagination;