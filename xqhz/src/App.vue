<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{
  padding: 0;
  margin:0;
  width: 100%;
  height:100%;
   /* background-image: url('../src/assets/img/bgc.jpg');
  background-size: cover;
  background-attachment: fixed; */
  background-color: #f0f0f0;
  color:#333;
}
#app{
  height: 100%;
 
}
</style>
