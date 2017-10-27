<template>
    <v-dialog v-model="responseDialog" lazy absolute class="right aligned">
        <!--<v-alert slot="activator" success value="true">-->
        <!--This is a success alert.-->
        <!--</v-alert>-->
        <v-chip slot="activator">
            <v-avatar class="teal">{{status}}</v-avatar>
            {{statusHint}}
        </v-chip>
        <v-card>
            <v-toolbar class="teal" dark>
                <v-toolbar-title>Response</v-toolbar-title>
            </v-toolbar>

            <v-list two-line subheader>
                <v-subheader>Headers</v-subheader>
                <v-list-tile v-for="(item, key, index) in responseHeaders">
                    <v-list-tile-content>
                        <v-list-tile-title>{{key}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{item}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-divider></v-divider>

            <v-list two-line subheader>
                <v-subheader>Misc</v-subheader>
            </v-list>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props:['response'],
        data() {
            return {
                responseDialog:false,
            }
        },
        computed:{
            status(){
                if (this.response){
                    return this.response["status"]
                }
            },
            statusHint(){
                if (this.response){
                    return this.response["headers"]["content-type"]
                }
            },
            responseHeaders(){
                if (this.response){
                    return this.response.headers
                }

            },
        }
    }
</script>