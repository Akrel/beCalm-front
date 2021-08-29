<template>


  <div id="conteiner">
    <div>
      <TopMenuBar></TopMenuBar>
    </div>
    <div id="main">
      <MenuNav></MenuNav>
      <div id="div-loader">

        <Calendar></Calendar>

      </div>
    </div>
  </div>


</template>


<script>


import MenuNav from "@/components/mainView/MenuNav";
import TopMenuBar from "@/components/mainView/TopMenuBar";
import Calendar from "@/components/activity/Calendar";

export default {
  components: {Calendar, TopMenuBar, MenuNav}
}
</script>

<style scoped>
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
