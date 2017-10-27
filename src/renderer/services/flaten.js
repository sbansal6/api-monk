/**
 * Flat-ens json to csv
 */
const _ = require('underscore')
const json2csv = require('json2csv');
const is = require('is');



/**
 * Parse field names and unwind objects out of json
 * objects that are array , and items of array are objects need to be in this unwinded array
 */
function parseProperties(data){

    const fields = []
    const unwind = []

    if (is.string(data)){
        try {
            data = JSON.parse(JSON.stringify(data))
        }
        catch(err) {
            throw new Error("Cannot convert to valid json object")
        }

    }

    // data can be of type object or array
    if (is.object(data)){
        parseObjectType("",data,fields,unwind)
    } else if (is.array(data)){
        parseArrayType("",data,fields,unwind)
    } else {
        throw new Error("Not a valid json")
    }

    return {
        fields,unwind
    }
}

/**
 * Recursive function to loop over array type property
 * @param parentKey
 * @param array
 * @param fields
 * @param unwind
 */
function parseArrayType(parentKey,array,fields,unwind){
    "use strict";
    addToFields(parentKey,unwind)
    array.forEach(function(item){
        if (is.object(item)) {
            parseObjectType(parentKey,item,fields,unwind)
        } else if (is.array(item)) {

        } else {
            addToFields(parentKey,fields)
        }
    })
}


/**
 * Recursive function to loop over objects
 * @param parentKey
 * @param object
 * @param fields
 */
function parseObjectType(parentKey,object,fields,unwind){
    for (let key in object){
        if (is.object(object[key])) {
            parseObjectType(keyName([parentKey,key]),object[key],fields,unwind)
        }
        else if (is.array(object[key])){
            parseArrayType(keyName([parentKey,key]),object[key],fields,unwind)
        }
        else {
            addToFields(keyName([parentKey,key]),fields)
        }
    }
    return fields
}

/**
 * Add key to field if doesn't exists already
 * @param keyName
 * @param fields
 */
function addToFields(keyName,fields){
    "use strict";
    let field = _.find(fields,function(f){return f === keyName})
    if (!field){
        fields.push(keyName)
    }
}

/**
 * Return keys joined by delimiter
 * Removed empty keys
 * @param keys
 * @returns {string}
 */
function keyName(keys) {
    const nonEmpty = _.filter(keys, function (k) {
        return (k != '')
    })
    return nonEmpty.join('.')
}

/**
 * Function to parse json into csv
 */
function parseJson(data){
    let properties = parseProperties(data)
    let csv = json2csv({ data: data, fields: properties.fields, unwindPath:properties.unwind });
    return csv
}

export {
    parseJson,parseProperties
}