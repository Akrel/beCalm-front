<template>
  <div id="conteiner">
    <div>
      <TopMenuBar></TopMenuBar>
    </div>
    <div id="main">
      <MenuNav></MenuNav>
      <div id="div-loader">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import MenuNav from "./navigation/MenuNav";
import TopMenuBar from "./navigation/TopMenuBar";


export default {
  components: {  TopMenuBar, MenuNav }
};
</script>

<style scoped>
* {
  overflow: hidden;
}
#div-loader {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.87);
  display: flex;
  flex-direction: row;
}

#div-loader > div {
  /* these are the flex items */
  flex: 1;

  display: flex;
  justify-content: center;
  flex-direction: column;
}

#main {
  display: flex;
  width: 100%;
  height: 95%;
}

#conteiner {
  display: inline-block;
  width: 100%;
  height: 100%;
}

#view-main {
  position: relative;
}
</style>
