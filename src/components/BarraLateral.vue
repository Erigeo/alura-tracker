
<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <button class=" button " @click="ativarModoNoturno"> {{ textoButton }}</button>
        <nav class="panel mt-5">
          <ul> 
            <li>
              <router-link to="/" class="link">
                <i class="fas fa-task"></i>
                tarefas
              </router-link>
            </li>
            <li>
              <router-link to="/projetos" class="link"> 
                <i class="fas fa-project-diagram"></i>
                projetos
              </router-link>
            </li>
          </ul>
        </nav>
    </header>

</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
    name: 'BarraLateral',
    emits: ['altereTema'],
    data() {
        return {
            modoNoturno: false
        };
    },
    computed: {
        textoButton() {
            if (this.modoNoturno) {
                return 'Desativar Dark Mode';
            }
            else {
                return 'Ativar Dark Mode';
            }
        }
    },
    methods: {
        ativarModoNoturno() {
            this.modoNoturno = !this.modoNoturno;
            this.$emit('altereTema', this.modoNoturno);
        }
    },
    components: { RouterLink }
});

</script>


<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}

.panel li {
    margin: 8px 0;
}
.link {
    color: #fff;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}

</style>