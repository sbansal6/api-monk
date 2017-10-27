<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <div class="page-header">
                            <h1>
                                Api-Monk! <small>Complete api explorer</small>
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1">
                        <input type="button" class="btn btn-primary" value="Hello bootstrap">
                    </div>
                    <div class="col-md-10">
                    </div>
                    <div class="col-md-1">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                    </div>
                    <div class="col-md-4">
                    </div>
                    <div class="col-md-4">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="btn-group btn-group-md">

                            <button class="btn btn-default" type="button">
                                <em class="glyphicon glyphicon-align-left"></em> Left
                            </button>
                            <button class="btn btn-default" type="button">
                                <em class="glyphicon glyphicon-align-center"></em> Center
                            </button>
                            <button class="btn btn-default" type="button">
                                <em class="glyphicon glyphicon-align-right"></em> Right
                            </button>
                            <button class="btn btn-default" type="button">
                                <em class="glyphicon glyphicon-align-justify"></em> Justify
                            </button>
                        </div>
                    </div>
                    <div class="col-md-4">
                    </div>
                    <div class="col-md-4">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Product
                                </th>
                                <th>
                                    Payment Taken
                                </th>
                                <th>
                                    Status
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    1
                                </td>
                                <td>
                                    TB - Monthly
                                </td>
                                <td>
                                    01/04/2012
                                </td>
                                <td>
                                    Default
                                </td>
                            </tr>
                            <tr class="active">
                                <td>
                                    1
                                </td>
                                <td>
                                    TB - Monthly
                                </td>
                                <td>
                                    01/04/2012
                                </td>
                                <td>
                                    Approved
                                </td>
                            </tr>
                            <tr class="success">
                                <td>
                                    2
                                </td>
                                <td>
                                    TB - Monthly
                                </td>
                                <td>
                                    02/04/2012
                                </td>
                                <td>
                                    Declined
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  @import url('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
