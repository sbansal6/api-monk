<template>
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
                    class="input-group--focused"
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

</template>

<script>
    const REST_METHODS = [
      'GET'
    ]

    export default {
      data () {
        return {
          url: '',
          methods: REST_METHODS,
          methodDefault: REST_METHODS[0],
          loader: false,
          loading4: false,
          queryDialog: false,
          headerDialog: false,
          bodyDialog: false,
          parseDialog: false,
          ex11: false,
          grid_toggle: 0,
          response: undefined,
          dataKey: undefined,
          paginationKey: undefined,
          flatData: undefined,
          rawData: undefined
        }
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