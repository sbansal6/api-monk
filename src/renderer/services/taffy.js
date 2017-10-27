/**
 * Module that abstracts actual making rest api call using Axois
 */

import axios from 'axios'
import is from 'is'

/**
 * Makes http call using axios as underlying service
 * @param method
 * @param url
 * @param data
 * @param options
 * @return {Promise}
 */
function go(method,url, data ,options){
    "use strict";
    return new Promise(function(resolve, reject){
        axios({
                method:method,
                url:url,
                data:data
            })
            .then(function(response){
              //handleAxiosResponse(response)
              resolve(response)
            })
            .catch(function(err){
                //handleAxiosError(err)
                reject(err)
            })
    })
}

function handleAxiosError(error){
    "use strict";
    let data = error.response.data
    let status = error.response.status
    let statusText = error.response.statusText
}


function handleAxiosResponse(response){
    "use strict";
    let data = response.data || []
    data = data.data
    let status = response.status
    let statusText = response.statusText
    let responseHeaders = response.headers
}

export default {
    go
}