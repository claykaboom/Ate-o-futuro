<template>
  <layout-default><div class="box"> 
      
      <model-gltf :src='pt'  :backgroundAlpha=".5"
         backgroundColor="#FF0000"></model-gltf> 
      <!-- -->
         
     aqui esta    {{pt}}
       </div>  </layout-default>
</template>
<script>
// Option 1: Import the entire three.js core library.
   import { ModelGltf } from 'vue-3d-model' 
 
    export default {
        components: {
            ModelGltf
                 
        },
        computed:{pt(){
            return "https://firebasestorage.googleapis.com/v0/b/ate-o-futuro.appspot.com/o/3D-models%2Fphoenix.gltf?alt=media&token=9aa5b68e-6ded-418f-8198-a3d2e7c176ab";
        }}
    }
</script>