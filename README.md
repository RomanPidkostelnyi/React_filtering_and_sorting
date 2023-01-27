### _fsp-react_ **stands for filtering, sorting, pagination.**

It is a ligtweight library that provides tools to work with pagination,
filtering, and sorting data on the frontend side

We provide 3 hooks `useFilters, usePagination, useSorting`

`useFilters` takes 2 arguments `originalItems, options` and returns filtered data;

- `originalItems` it is a list of any objects which you want to filter
- `options` it is a special object that consist of key-value pair where `key` it is fieldName where we want to apply 
our filtering, and `value` it options for filtering. Let`s take a look on example
  

     'fieldName': {
        option: 'exact | includes | null', exact will tell to psf that we need to find only exact match, when includes that we need find any value that includes value
        useOrFilter: 'Boolean', this option will work if you pass to value  array and will try to find where at least on element in array satisfy condition
        useRangeFilter: 'Boolean', if this equal true your should pass array which consist from 2 number [start(included), finish(not included)]
        value: 'string | number | array | null',
    }
};`

**Be carefull because if you pass useRangeFilter, then useOrFilter will not work and vice versa**

`usePagination` takes 2 arguments `items, itemsPerPage` and returns obj
```
{
    pageItems: Array,
    setPage: () => void function to set desired page    
    page: number // index of current page
    pageCount: number // number of all pages
    startIndex: number // index of first item on the page
    endIndex: number // index of last item on the page
}
```

`useSorting` takes akes 2 arguments `originalItems, options` and returns sorted data;

`options ` it is a obj that looks like this 

```
const sortOptions = {
  fieldName: 'string', // the field on the basis of which the comparison will take place
  direction: 'ASC | DESC' // sorting directionб
  compareFn: (a, b) => {...} // compare fn if needed 
}
```
