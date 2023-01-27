import React, { useMemo } from 'react';
import {filterItems} from "../utils/filtering";

// const option = {
//     'fieldName': {
//         option: 'exact | includes | null',
//         useOrFilter: 'Boolean', this option will work if you pass array and will try to find where at least on element in array satisfy condition
//         useRangeFilter: 'Boolean', if this equal true your should pass array which consist from 2 number start included, adn finish not included
//         value: 'string | number | array | null',
//     }
// };


const useFilters = (originalItems, options) => {
    const filteredAndSortedItems = useMemo(() => {
        const filteredItems = filterItems(originalItems, options);
        return filteredItems;
    }, [options, originalItems]);

    return filteredAndSortedItems;
}

export default useFilters;
