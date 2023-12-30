import ProjetosPage from "@/views/ProjetosPage.vue";
import Tarefas from "@/views/Tarefas.vue"
import CreateProject from "@/views/ViewsProjeto/CreateProject.vue";
import ListaProjeto from "@/views/ViewsProjeto/ListaProjeto.vue";
import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router"

const rotas: RouteRecordRaw[] = [{ 
    path: '/',
    name: 'Tarefas',
    component: Tarefas,
    
}, 
{
    path: '/projetos',
    component: ProjetosPage,
    children: [
        {
            path: '',
            name: 'projetos',
            component: ListaProjeto
        },
        
        {
            path: 'novo',
            name: 'novo projeto',
            component: CreateProject
        },
            {
                path: ':id',
                name: 'Editar projeto',
                component: CreateProject,
                props:true
        }
    ]
},


]


const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;