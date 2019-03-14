exports.formatPages = (array, page, perPage) => {
    if (perPage == undefined) {
        perPage = Object.keys(array).length;
    }
    if (page == undefined || page < 0) {
        page = 0;
    }
    return array.slice(page * perPage, (page + 1) * perPage);
}

exports.getPages = (array, perPage) => {
    if (perPage == undefined || perPage <= 0) {
        return 1;
    }
    const pages = Math.round(Object.keys(array).length / perPage);
    if (pages == 0) {
        return 1;
    }
    return pages;
}

exports.formatPagination = (array, page, perPage) => {
    return {
        items : this.formatPages(array, page,perPage),
        totalPages: this.getPages(array, perPage),
        totalEntries: Object.keys(array).length
    };
}