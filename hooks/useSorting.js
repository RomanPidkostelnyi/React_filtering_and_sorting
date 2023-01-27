import {useMemo} from "react";
import {sortItems} from "../utils/sorting";

// const sortOptions = {
//     fieldName: 'string',
//     direction: 'ASC | DESC'
// }

const useSorting = (items, sortOptions) => {
    const sortedItems = useMemo(() => {
        return sortItems({items: items, fieldName: sortOptions.fieldName, direction: sortOptions.direction, compareFn: sortOptions.compareFn})
    }, [sortOptions, items]);
    return sortedItems;
}

export default useSorting;
