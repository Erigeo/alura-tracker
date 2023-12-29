import ProjetosPage from "@/views/ProjetosPage.vue";
import Tarefas from "@/views/Tarefas.vue"
import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router"

const rotas: RouteRecordRaw[] = [{ 
    path: '/',
    name: 'Tarefas',
    component: Tarefas,
    
}, {path: '/projetospage',
name: 'ProjetosPage',
component: ProjetosPage}
]


const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;