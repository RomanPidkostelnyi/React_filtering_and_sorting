import React, { useMemo } from 'react';
import _isEqual from 'lodash.isequal';

// const option = {
//     'fieldName': {
//         option: 'exact | includes | null',
//         useOrFilter: 'Boolean', this option will work if you pass array and will try to find where at least on element in array satisfy condition
//         useRangeFilter: 'Boolean', if this equal true your should pass array which consist from 2 number start included, adn finish not included
//         value: 'string | number | array | null',
//         sort: 'ASC | DESC'
//     }
// };

const optionCreator = (options) => {
    return {
        ...options,
        option: options.option || 'includes',
    }
};


const sortItems = ({items, fieldName, direction}) => {
    if(direction !== 'ASC' || direction !== 'DESC') {
        throw new Error('incorrect value for sorting params')
    }
    return items[fieldName].filter((el) => typeof el === "number").sort((a, b) => direction === 'ASC'
        ? a > b ? 1 : -1
        : a > b ? -1 : 1);
}

const filterInRange =  ({items, fieldName, value}) => {
    if(typeof value[0] !== 'number' || typeof value[1] !== 'number') {
        throw new Error('incorrect value for in range filter')
    }
    return items.filter(el => el[fieldName] < value[1] && el[fieldName] >= value[0])
};

const filterBasic = ({items, fieldName, value, useOrFilter, compareFn}) => {
    if (useOrFilter) {
        return items.filter(el => value.filter(val => compareFn(el[fieldName], val)).length)
    }
    return items.filter(el => compareFn(el[fieldName], value))
};

const filterContains = ({items, fieldName, value, useOrFilter}) => {
    return filterBasic({items, fieldName, value, useOrFilter, compareFn: (el, val) => el.contains(val)})
};

const filterExact = ({items, fieldName, value, useOrFilter}) => {
    return filterBasic({items, fieldName, value, useOrFilter, compareFn: (el, val) => _isEqual(el, val)})

};

const filterMethodSelector = (items, fieldName, options) => {
    switch (true) {
        case options.value === null | undefined:
            return items;
        case options.option === 'exact':
            return filterExact({items, fieldName, value: options.value, useOrFilter: options.useOrFilter});
        case options.option === 'includes':
            return filterContains({items, fieldName, value: options.value, useOrFilter: options.useOrFilter});
        case options.useRangeFilter:
            return filterInRange({items, fieldName, value: options.value})
    }

}

const filterItems = (originalItems, options) => {
    const parsedOptions = Object.entries(options);
    return parsedOptions.reduce((cur, acc) => filterMethodSelector(acc, cur[0], optionCreator(cur[1])), originalItems)
}

const useFilterAndSorting = (originalItems, options) => {
    const filteredAndSortedItems = useMemo(() => {
        const filteredItems = filterItems(originalItems, options);
        const sortBy = Object.entries(options).find(el => el[1].sort);
        return sortBy ? sortItems({items: filteredItems, fieldName: sortBy[0], direction: sortBy[1].sort}) : filteredAndSortedItems
    }, [options, originalItems]);

    return filteredAndSortedItems;
}

export default useFilterAndSorting;
