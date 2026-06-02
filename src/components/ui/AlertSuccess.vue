<template>
    <div id="alert-3"
        class="flex items-center p-4 mb-4 text-sm rounded-xl border bg-green-50 border-green-200 text-green-800 dark:bg-emerald-950/40 dark:border-emerald-800/60 dark:text-emerald-200"
        role="alert">
        <svg class="shrink-0 w-4 h-4 text-green-600 dark:text-emerald-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 20 20">
            <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div class="ms-3 text-sm font-medium">
            {{ successMessages }}
        </div>
        <button type="button"
            class="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 inline-flex items-center justify-center h-8 w-8 text-green-600 hover:bg-green-100 dark:text-emerald-400 dark:hover:bg-emerald-900/40"
            data-dismiss-target="#alert-3" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';

// Props
interface Props {
    successMessages?: string;
}

const props = defineProps<Props>();

// Use toRefs to create reactive references to the props
const successMessages = toRef(props, 'successMessages', '');

const emit = defineEmits(['close']);

const closeAlert = () => {
    emit('close');
};
</script>