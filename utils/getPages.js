import _size from "lodash.size";

const getPages = (items, itemsPerPage, page) => {
    const pageCount = Math.ceil(_size(items) / itemsPerPage);
    const startIndex = !items?.length ? 0 : page * itemsPerPage + 1;
    const endIndex = !items?.length ? 0 : page * itemsPerPage + _size(items);
    return { pageCount, startIndex, endIndex };
}

export default getPages;
