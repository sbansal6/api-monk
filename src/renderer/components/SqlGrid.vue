<template>
    <div>
        <codemirror v-model="rawData" :options="editorOptions"></codemirror>
        <vuetable ref="vuetable"
                  :data="[]"
                  :fields="[]"
                  :api-mode="false"
                  :css="css"
        ></vuetable>
    </div>
</template>

<script>
    import Vuetable from 'vuetable-2'
    import { codemirror, CodeMirror,  } from 'vue-codemirror'
    require("codemirror/addon/hint/show-hint.css")
    require("codemirror/addon/hint/show-hint.js")
    require('codemirror/addon/hint/sql-hint.js')

    export default {
        props:['response'],
        data() {
            return {
                editorOptions: {
                    mode: 'text/x-sql',
                    theme: 'base16-dark',
                    lineNumbers: true,
                    line: true,
                    autofocus:true,
                    extraKeys: {"Ctrl-Space": "autocomplete"},
                    hint: CodeMirror.hint.sql,
                    hintOptions: this.hintOptionsComputed
                },
                css :{
                    tableClass: 'ui selectable celled stackable attached table',
                    loadingClass: 'loading',
                    ascendingIcon: 'blue chevron up icon',
                    descendingIcon: 'blue chevron down icon',
                    detailRowClass: 'vuetable-detail-row',
                    sortHandleIcon: 'grey sidebar icon',
                    width: '100%'
                }
            }
        },
        methods:{
          onExecuteSqlMe: function(){
              if(this.$refs){
                  console.log('parent refs flatData',this.$parent.flatData)
              }
          },
          populateHints: function(){

          }
        },
        computed: {
            rawData(){
                let startingValue= ""
                for (var i = 0; i < 5; i++) {
                    startingValue += '\n';
                }
                return startingValue

            },
            hintOptionsComputed(){
                return {
                    tables: {
                        "table1": [ "col_A", "col_B", "col_C" ],
                        "table2": [ "other_columns1", "other_columns2" ]
                    }
                }
            }
        },
        components :{
            codemirror,Vuetable
        }
    }
</script>

<style>

</style>