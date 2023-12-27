<template>
    <section class="column is-flex is-align-items-center is-justify-content-space-between">
      <CronometroExibir :tempoRegistradoEmSegundos="tempoEmSegundos"/>
      <ButtonsControle @clicado="iniciar" icone="fas fa-play" texto="play" :desabilitado="cronometroRodando" />
      <ButtonsControle @clicado="finalizar" icone="fas fa-stop" texto="stop" :desabilitado="!cronometroRodando" />
    </section>
  </template>
  



<script lang="ts">
import { defineComponent } from 'vue';
import ButtonsControle from './ButtonsControle.vue';
import CronometroExibir from './CronometroExibir.vue';

export default defineComponent({
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        };
    },
    emits: ['AoFinalizarEvento'],
    methods: { iniciar() {
            console.log('iniciando');
            this.cronometroRodando = true;
            this.cronometro = setInterval(() => { this.tempoEmSegundos += 1; }, 1000);
        },
        finalizar() {
            this.cronometroRodando = false;
            clearInterval(this.cronometro);
            this.$emit('AoFinalizarEvento', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        } },
    components: { ButtonsControle, CronometroExibir }
})



</script>