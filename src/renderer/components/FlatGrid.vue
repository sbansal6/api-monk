<template>
    <!--http://www.rent-a-hero.de/wp/wp-content/uploads/2017/04/vuegrid/#/-->
    <div style="overflow-x: scroll;">
        <vuetable ref="vuetable"
                  :data="vData"
                  :fields="vColumns"
                  :api-mode="false"
                  :css="css"
        ></vuetable>
    </div>
</template>

<script>
    const flaten  =  require('../services/flaten')
    import Vuetable from 'vuetable-2'
    const is = require('is');
    import {parseJson} from '../services/flaten'
    const csvjson = require('csvjson');
    const csvOptions = {
        delimiter : ',', // optional
        quote     : '"', // optional
    };

    export default {
        props:['response','dataKey','paginationKey'],
        data(){
            return {
                css :{
                    tableClass: 'ui dark grey selectable celled stackable attached table',
                    loadingClass: 'loading',
                    ascendingIcon: 'blue chevron up icon',
                    descendingIcon: 'blue chevron down icon',
                    detailRowClass: 'vuetable-detail-row',
                    sortHandleIcon: 'grey sidebar icon',
                    width: '100%'
                }
            }
        },
        method:{
          getData:function () {
              return this.vData
          }
        },
        computed:{
            vColumns(){
                let columns = []
                if (this.vData.length > 0) {
                    if (is.array(this.response.data)) {
                        for (let key in this.response.data[0]) {
                            columns.push(key)
                        }
                    }
                    if (is.object(this.response.data) && this.dataKey && this.paginationKey){
                        columns =  flaten.parseProperties(this.response.data[this.dataKey]).fields
                    }
                }
                return columns
            },
            vData() {
                let data = []
                if (this.response) {
                    if (is.array(this.response.data)) {
                        data =  this.response.data
                    }
                    if (is.object(this.response.data) && this.dataKey && this.paginationKey){
                        data =  csvjson.toObject(parseJson(this.response.data[this.dataKey]),csvOptions)
                    }
                }
                this.$parent.flatData = data
                return data
            }
        },
        components: {
            Vuetable
        }
    }
</script>

<style>

</style>