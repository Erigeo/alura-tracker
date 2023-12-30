<template>
    <div class="projetos">
        <RouterView> </RouterView>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

    
    export default defineComponent({
    name: 'ProjetosPage',
})
</script>

<style>
.projetos {
    padding: 1.25rem;
}

</style>
