import {useMemo, useState} from 'react';
import _size from "lodash.size";

/**
 * transform array into pages
 * @param items {Array}  - array of items
 * @param itemsPerPage {Number} - number of items in one page
 * @returns ({
 *     pageItems: Array,
 *     setPage: () => void function to set page number implicitly
 *     page: number // index of current page
 *     pageCount: number // number of all pages
       startIndex: number // index of first item on the page
       endIndex: number // index of last item on the page
 * })
 */

const usePagination = (allItems, itemsPerPage) => {
    const [page, setPage] = useState(0);

    const pageCount = allItems.length ? Math.ceil(_size(allItems) / itemsPerPage) : 1;
    const pageItems = (pageCount > 1)
        ? allItems.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
        : allItems;
    const startIndex = allItems.length ? page * itemsPerPage + 1 : 0;
    const currentMaxCount = (page + 1) * itemsPerPage;
    const endIndex = currentMaxCount > allItems.length ? allItems.length : currentMaxCount;

    useMemo(() => {
        if (pageCount && pageCount <= page) {
            setPage(pageCount - 1);
        }
        if (page < 0 ) {
            setPage(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allItems, itemsPerPage]);

    return {
        pageItems,
        setPage,
        page,
        pageCount,
        startIndex,
        endIndex
    };
}

export default usePagination;

