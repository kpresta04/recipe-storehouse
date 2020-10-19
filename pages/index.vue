<template>
  <div>
    <button @click="hello">Test express route</button>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({


    methods:{

      hello: async ()=>{

        // console.log('hello')

        const res = await   fetch('/api/test')

       
        console.log(res)
       
  

      }


    }
    
  })
</script>

<style scoped>
button {
  background-color:rgb(0, 106, 206);
 
}

</style>