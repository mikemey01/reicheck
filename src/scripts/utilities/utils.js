let hasOwnProperty = Object.prototype.hasOwnProperty;
let get = require('lodash.get');

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

let isNullUndefinedEmpty = function(str){
    if(str === undefined || str === null || str === ""){
        return true;
    }
    return false
}

let isEmpty = function(obj){
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

let formatAsCurrency = function(str){
    if(!isNullUndefinedEmpty(str))
        return formatter.format(str);

    return formatter.format(0);
}

let getDeep = function(obj, str, def){
    return get(obj, str, def);
}

// makes sure the object exists, AND is a number/ not null
// otherwise returns false.
let getDeepNumber = function(obj, str, def){
    let el = getDeep(obj, str, def);
    if(isNaN(el) || el == null){
        return def;
    }else{
        return el;
    }
}

export default { 
    isNullUndefinedEmpty, 
    isEmpty, 
    formatAsCurrency, 
    getDeep,
    getDeepNumber
};