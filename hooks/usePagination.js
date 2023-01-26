import { useState } from 'react';
import _size from 'lodash.size';
import {getPages} from "../utils";

/**
 * transform array into pages
 * @param {Array}  - array of items
 * @param {Number} - number of items in one page
 * @returns ({
 *     pageItems: Array,
 *     setPage: () => void function to set page number implicitly
 *     page: number // index of current page
 *     pageCount: number // number of all pages
       startIndex: number // index of first item on the page
       endIndex: number // index of last item on the page
 * })
 */

const usePagination = (items, itemsPerPage) => {
    const [page, setPage] = useState(0);

    const {pageCount, startIndex, endIndex}  = getPages(items, itemsPerPage, page)

    return {
        pageItems: items,
        setPage,
        page,
        pageCount,
        startIndex,
        endIndex
    };
}

export default usePagination;

