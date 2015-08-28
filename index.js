var changeCase = require('change-case');

var toCamelRecur = function (obj) {
    if (obj instanceof Array) {
        var newArr = [];
        obj.forEach(function (value) {
            newArr.push(toCamelRecur(value));
        });
        return newArr;
    } else if (obj instanceof Object) {
        var newObj = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] instanceof Object) {
                    newObj[changeCase.camel(key)] = toCamelRecur(obj[key]);
                } else {
                    newObj[changeCase.camel(key)] = obj[key];
                }
            }
        }
        return newObj;
    }
    return obj;
};

exports.toCamel = function (obj, flexible) {
    if (flexible) {
        return toCamelRecur(obj);
    } else {
        return toCamelRecur(JSON.parse(JSON.stringify(obj)));
    }
}
