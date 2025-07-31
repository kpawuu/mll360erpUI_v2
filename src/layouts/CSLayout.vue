<template>
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
        <topNav />
        <!-- Sidebar -->
        <sideBar />
        <main class="p-4 md:ml-64 h-auto pt-20">
            <router-view />
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import sideBar from '../components/app/sideBar.vue';
import topNav from '../components/app/TopNav.vue';
export default defineComponent({
    name: 'MainLayout',
    components: {
        sideBar,
        topNav,
    },
});
</script>

<style scoped>
/* Add your styles here */
</style>