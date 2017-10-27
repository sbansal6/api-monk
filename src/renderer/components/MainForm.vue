<template>
    <v-container ref="refHome">

        <!--select input and go button-->
        <v-layout row wrap>
            <v-flex xs1>
                <v-select
                        v-bind:items="methods"
                        v-model="methodDefault"
                        label="Select"
                        single-line
                        required
                ></v-select>
            </v-flex>
            <v-flex xs10>
                <v-text-field
                        v-model="url"
                        name="input-1-3"
                        label="http://api.com"
                        single-line
                        class="ƒinput-group--focused"
                ></v-text-field>
            </v-flex>
            <v-flex xs1>
                <v-btn info
                       :loading="loading4"
                       @click.native="onGo"
                       :disabled="loading4"
                >Go
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                </v-btn>
            </v-flex>
        </v-layout>

        <!-- header | query |  body dialogs-->
        <v-layout row wrap>
            <v-flex xs12>
                <div ui buttons>
                    <v-dialog v-model="queryDialog" lazy absolute>
                        <v-btn primary dark slot="activator">Query</v-btn>
                        <v-card>
                            <v-card-title>
                                <div class="headline">Use Google's location service?</div>
                            </v-card-title>
                            <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                                <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="headerDialog" lazy absolute>
                        <v-btn primary dark slot="activator">Header</v-btn>
                        <v-card>
                            <v-card-title>
                                <div class="headline">Use Google's location service?</div>
                            </v-card-title>
                            <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                                <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="bodyDialog" lazy absolute>
                        <v-btn primary dark slot="activator">Body</v-btn>
                        <v-card>
                            <v-card-title>
                                <div class="headline">Use Google's location service?</div>
                            </v-card-title>
                            <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="green--text darken-1" flat="flat" @click.native="bodyDialog = false">Disagree</v-btn>
                                <v-btn class="green--text darken-1" flat="flat" @click.native="bodyDialog = false">Agree</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </v-flex>
        </v-layout>

        <!--grids button-->
        <v-layout row wrap>
            <v-flex xs7>
                <div ui buttons>
                    <v-btn-toggle v-model="grid_toggle">
                        <v-btn flat>Raw</v-btn>
                        <v-btn @click.stop="onShowFlatGrid" flat>Flat</v-btn>
                        <v-btn flat>Sql</v-btn>
                        <v-btn flat>Charts</v-btn>
                    </v-btn-toggle>
                    <v-dialog v-model="parseDialog" lazy absolute>
                        <v-btn icon class="primary--text" slot="activator">
                            <v-icon>settings</v-icon>
                        </v-btn>
                        <v-card>
                            <v-card-title>
                          <span class="headline">Parse
                          <v-switch v-model="ex11"></v-switch>
                           </span>
                            </v-card-title>
                            <v-card-text>
                                <v-select v-model="dataKey"
                                          label="Data"
                                          required
                                          :items="dataProperties"
                                ></v-select>
                                <v-select v-model="paginationKey"
                                          label="Pagination"
                                          required
                                          :items="dataProperties"
                                ></v-select>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="blue--text darken-1" flat @click.native="parseDialog = false">Close</v-btn>
                                <v-btn class="blue--text darken-1" flat @click.native="onParseSave">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-btn @click.stop="onExecuteSql" v-tooltip:bottom="{ html: 'Execute Sql' }" icon class="success--text" slot="activator">
                        <v-icon>rotate_right</v-icon>
                    </v-btn>
                </div>
            </v-flex>
            <v-flex xs5>
                <response-bar :response="response"></response-bar>
            </v-flex>
        </v-layout>

        <!--GRID COMPONENTS-->
        <!--raw grid-->
        <v-layout row wrap>
            <v-flex xs12>
                <raw-grid v-if="showRawGrid" :response="response"></raw-grid>
            </v-flex>
        </v-layout>

        <!--flat grid-->
        <v-layout row wrap >
            <v-flex xs12>
                <flat-grid ref="refFlatGrid" v-if="showFlatGrid" :response="response" :dataKey="dataKey" :paginationKey="paginationKey"></flat-grid>
            </v-flex>
        </v-layout>
        <!--END GRID COMPONENTS-->

        <v-layout row wrap >
            <v-flex xs12>
                <sql-grid ref="refSqlGrid" v-if="showSqlGrid"></sql-grid>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    const flaten  =  require('../services/flaten')
    import taffy from '../services/taffy'
    import RawGrid from '../components/RawGrid.vue'
    import FlatGrid from '../components/FlatGrid.vue'
    import SqlGrid from '../components/SqlGrid.vue'
    import ResponseBar from '../components/ResponseBar.vue'

    const is = require('is');
    const REST_METHODS = [
        "GET","POST"
    ];

    export default {
        data () {
            return {
                url:"",
                methods:REST_METHODS,
                methodDefault:REST_METHODS[0],
                loader: false,
                loading4: false,
                queryDialog:false,
                headerDialog:false,
                bodyDialog: false,
                parseDialog: false,
                ex11: false,
                grid_toggle: 0,
                response:undefined,
                dataKey:undefined,
                paginationKey:undefined,
                flatData:undefined,
                rawData:undefined
            }
        },
        mounted () {
        },
        methods :{
            onGo:function () {
                const self = this
                if(this.url.length > 0){
                    this.loading4 = true
                    taffy.go('GET',this.url,null,{})
                        .then(
                            function(response){
                                self.response = response
                                self.loading4  = false
                            }
                        )
                        .catch(function(error){
                            self.data = JSON.stringify(error.response.data,null,4)
                            self.status = JSON.stringify(error.response.status)
                            self.statusText = JSON.stringify(error.response.statusText)
                            self.loading4  = false
                        })
                }
            },
            onParseSave:function(){
                this.parseDialog = false
                this.showFlatGrid = true
                if (this.$refs["refFlatGrid"]) {
                    this.$refs["refFlatGrid"].$refs['vuetable'].reload()
                    this.$refs["refFlatGrid"].$refs['vuetable'].normalizeFields()
                }
            },
            onShowFlatGrid(){
                // if response result is an array just grid right away
                if (this.response && is.array(this.response.data)){
                    this.showFlatGrid = true
                }
                // if response is an object, show dialog to user to select data property
                else {
                    this.parseDialog = true
                }

            },
            onExecuteSql: function(){
                if (this.$refs["refSqlGrid"]) {
                    this.$refs["refSqlGrid"].onExecuteSqlMe()
                }
            }
        },
        computed: {
            // parse all properties in the response object
            dataProperties() {
                let properties = []
                if (this.response){
                    if (is.object(this.response.data)){
                        console.log('keys',Object.keys(this.response.data))
                        for (let key in this.response.data){
                            //console.log(`test ${key}`,flaten.parseProperties(this.response.data[key]))
                            properties.push(key)
                        }
                    }
                }
                return properties
            },
            showRawGrid(){
                return this.grid_toggle === 0
            },
            showFlatGrid(){
                return this.grid_toggle === 1
            },
            showSqlGrid(){
                return this.grid_toggle === 2
            }
        },
        components :{
            RawGrid,FlatGrid,ResponseBar,SqlGrid
        }
    }
</script>

<style>

    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>