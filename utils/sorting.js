export const sortItems = ({items, fieldName, direction, compareFn}) => {
    if(direction !== 'ASC' && direction !== 'DESC') {
        throw new Error('incorrect value for sorting params')
    }
    return items.sort((a, b) => {
        const aField = a[fieldName];
        const bField = b[fieldName]
        return compareFn
            ? compareFn(aField, bField)
            : direction === 'ASC'
                ? aField > bField ? 1 : -1
                : aField > bField ? -1 : 1
    });
}
