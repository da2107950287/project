<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
mounted(){
}
};

</script>
<style>
html,body{
  padding: 0;
  margin:0;
  width: 100%;
  /* height:100%; */

}
body{
  /* overflow: hidden; */
}
#app{
  height: 100%;
}
</style>
