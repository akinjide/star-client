<template>
<v-container fluid class="login" >
    <div class="circle"></div>

</v-container>
</template>

<!-- <script>
import { defineComponent } from 'vue'

// Components
import HelloWorld from '../components/HelloWorld.vue'

export default defineComponent({
  name: 'HomeView',

  components: {
    HelloWorld
  }
})
</script> -->
<style scoped>

.login{
  background-color: #2a3672;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

.circle {
      width: 900px; /* Width and height should be equal */
      height: 900px;
      background-color: white;/* Change color as needed */
      border-radius: 50%; /* Makes the div a circle */
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: bold;
      position: absolute; /* Positioning */
      left: -300px; /* Move it half its width to the left */
      top: 50%; /* Vertically center */
      transform: translateY(-50%);
}

</style>
