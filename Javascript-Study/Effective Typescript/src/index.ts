const obj1 = {
    key1: 'val1',
    key2: {
        a: 'A'
    }
}
const obj2 = {
    key1: 'val2',
    key2: {
        b: 'B'
    }
}

const merged1 = {...obj1, ...obj2}; 
const merged2 = Object.assign({}, obj1, obj2);
// 둘 모두 { key1: 'val2', key2: { b: 'B' }}

