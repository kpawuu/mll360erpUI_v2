<template>
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
        <TopNav />
        <!-- Sidebar -->
        <SideBar />
        <main class="p-4 md:ml-64 min-h-screen pt-20">
            <router-view />
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from '../components/app/SideBar.vue';
import TopNav from '../components/app/TopNav.vue';
export default defineComponent({
    name: 'CRMLayout',
    components: {
        SideBar,
        TopNav,
    },
});
</script>

<style scoped>
/* Add your styles here */
</style>