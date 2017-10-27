<!--Displays Raw text response from api-->
<!--** if api response content type is json then convert it into json-->

<template>
    <div >
        <codemirror ref="rawEditor" v-model="rawData" :options="editorOptions"></codemirror>
    </div>

</template>

<script>
  import { codemirror, CodeMirror } from 'vue-codemirror'
  var minLines = 10;
  var startingValue = '';
  for (var i = 0; i < minLines; i++) {
      startingValue += '\n';
  }
  export default {
      props:['response'],
      data() {
          return {
              editorOptions: {
                  // codemirror options
                  //tabSize: 4,
                  //mode: 'text/javascript',
                  theme: 'base16-dark',
                  lineNumbers: true,
                  line: true,
                  readOnly:true,
                  viewportMargin:10

              }
          }
      },
      computed: {
          rawData(){
              if (this.response){
                  if(this.response.headers["content-type"].includes('json')){
                      return JSON.stringify(this.response.data,null,2)
                  } else {

                      return this.response.data
                  }
              } else {
                  let startingValue= ""
                  for (var i = 0; i < 10; i++) {
                      startingValue += '\n';
                  }
                  return startingValue
              }
          }
      },
      components :{
          codemirror
      },
  }
</script>

<style>
    .CodeMirror {
        border: 1px solid #eee;
        height: auto;
    }

</style>