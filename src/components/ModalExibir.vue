<template>
    <div class="modal" :class="{ 'is-active': mostrar}" v-if="mostrar">
    <div class="modal-background"></div>
    <div class="modal-card">
      <slot> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
    name:'ModalExibir',
    props: {
        mostrar: {
            type: Boolean, require: true
        }
    }
})

</script>