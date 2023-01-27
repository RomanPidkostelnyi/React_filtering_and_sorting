import _isEqual from "lodash.isequal";

export const optionCreator = (options) => {
    return {
        ...options,
        option: options.option || 'includes',
    }
};

export const filterInRange =  ({items, fieldName, value}) => {
    if(typeof value[0] !== 'number' || typeof value[1] !== 'number') {
        throw new Error('incorrect value for in range filter')
    }
    return items.filter(el => {
        return el[fieldName] < value[1] && el[fieldName] >= value[0]
    });
};

export const filterBasic = ({items, fieldName, value, useOrFilter, compareFn}) => {
    if (useOrFilter) {
        return items.filter(el => value.filter(val => compareFn(el[fieldName], val)).length)
    }
    return items.filter(el => compareFn(el[fieldName], value))
};

export const filterContains = ({items, fieldName, value, useOrFilter}) => {
    return filterBasic({items, fieldName, value, useOrFilter, compareFn: (el, val) => el?.includes(val)})
};

export const filterExact = ({items, fieldName, value, useOrFilter}) => {
    return filterBasic({items, fieldName, value, useOrFilter, compareFn: (el, val) => _isEqual(el, val)})

};

export const filterMethodSelector = (items, fieldName, options) => {
    switch (true) {
        case options.value === null | undefined:
            return items;
        case options.useRangeFilter:
            return filterInRange({items, fieldName, value: options.value})
        case options.option === 'exact':
            return filterExact({items, fieldName, value: options.value, useOrFilter: options.useOrFilter});
        case options.option === 'includes':
            return filterContains({items, fieldName, value: options.value, useOrFilter: options.useOrFilter});
    }

}

export const filterItems = (originalItems, options) => {
    const parsedOptions = Object.entries(options);
    return parsedOptions.reduce((acc, cur) => filterMethodSelector(acc, cur[0], optionCreator(cur[1])), originalItems);
}
