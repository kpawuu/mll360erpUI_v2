<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="mb-6 flex items-center gap-4">
      <router-link
        to="/cs/orders"
        class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </router-link>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ isNew ? 'New Order' : (order?.order_number || 'Order') }}
      </h1>
    </div>

    <!-- New order form (used for direct URL /cs/orders/new) -->
    <div v-if="isNew" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 max-w-2xl">
      <OrderCreateForm :opportunity-id="opportunityId" @created="onOrderCreated">
        <template #cancel>
          <router-link to="/cs/orders" class="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300">Cancel</router-link>
        </template>
      </OrderCreateForm>
    </div>

    <!-- Existing order (used for direct URL /cs/orders/:id) -->
    <OrderDetailPanel v-else-if="orderIdNum" :order-id="orderIdNum" />
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSalesOrdersStore } from '../../store/sales-orders.store'
import { useToastStore } from '../../store/toast.store'
import OrderCreateForm from '../../components/cs/OrderCreateForm.vue'
import OrderDetailPanel from '../../components/cs/OrderDetailPanel.vue'
import type { SalesOrder } from '../../api/models/sales-order.model'

const route = useRoute()
const router = useRouter()
const store = useSalesOrdersStore()
const toastStore = useToastStore()

const idParam = computed(() => route.params.id as string)
const isNew = computed(() => idParam.value === 'new')
const opportunityId = computed(() => (route.query.opportunityId as string) || '')
const orderIdNum = computed(() => {
  const id = idParam.value
  if (id === 'new' || !id) return 0
  const n = Number(id)
  return isNaN(n) ? 0 : n
})

const order = ref<SalesOrder | null>(null)
watch(orderIdNum, async (id) => {
  if (!id) {
    order.value = null
    return
  }
  order.value = await store.fetchSalesOrder(id)
}, { immediate: true })

function onOrderCreated(createdOrder: SalesOrder) {
  toastStore.success('Order created.')
  router.replace(`/cs/orders/${createdOrder.id}`)
  order.value = createdOrder
}

onMounted(() => {
  // Ensure order is loaded when landing on /cs/orders/:id
  if (orderIdNum.value && !order.value) {
    store.fetchSalesOrder(orderIdNum.value).then((o) => {
      order.value = o
    })
  }
})
</script>
