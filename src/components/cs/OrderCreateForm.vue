<template>
  <form @submit.prevent="submit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer (Entity) *</label>
        <select
          v-model.number="form.entity_id"
          required
          class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option :value="0">Select customer</option>
          <option v-for="e in entities" :key="e.id" :value="e.id">{{ e.name }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Order number</label>
        <input
          v-model="form.order_number"
          type="text"
          placeholder="Leave blank to auto-generate"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact</label>
        <select
          v-model.number="form.contact_id"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option :value="0">Select contact</option>
          <option v-for="c in contactsForEntity" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Owner</label>
        <select
          v-model.number="form.owner_id"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option :value="0">—</option>
          <option v-for="u in usersForOwner" :key="u.id" :value="u.id">{{ u.first_name }} {{ u.last_name }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Order date *</label>
        <input
          v-model="form.order_date"
          type="date"
          required
          class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Requested delivery</label>
        <input
          v-model="form.requested_delivery_date"
          type="date"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency *</label>
        <select
          v-model.number="form.currency_id"
          required
          class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option :value="0">Select currency</option>
          <option v-for="c in currencies" :key="c.id" :value="c.id">
            {{ c.currency_name }} ({{ c.symbol }})
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
        <select
          v-model="form.status"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="draft">Draft</option>
          <option value="confirmed">Confirmed</option>
        </select>
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer PO / Reference</label>
      <input
        v-model="form.customer_po_number"
        type="text"
        placeholder="Customer PO number or reference"
        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery instructions</label>
      <textarea
        v-model="form.delivery_instructions"
        rows="2"
        placeholder="Delivery address, notes, etc."
        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
      <textarea
        v-model="form.notes"
        rows="3"
        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>
    <div class="flex gap-3">
      <button
        type="submit"
        :disabled="store.loading"
        class="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
      >
        {{ store.loading ? 'Creating...' : 'Create Order' }}
      </button>
      <slot name="cancel" />
    </div>
    <p v-if="store.error" class="text-red-600 dark:text-red-400 text-sm">{{ store.error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useSalesOrdersStore } from '../../store/sales-orders.store'
import { useEntityStore } from '../../store/entity.store'
import { useCurrenciesStore } from '../../store/currencies.store'
import { useEntityContactPersonStore } from '../../store/entity-contact-person.store'
import { useUserStore } from '../../store/user.store'
import { useAuthStore } from '../../store/auth.store'
import feathersClient from '../../api/feathers'
import type { SalesOrder } from '../../api/models/sales-order.model'

const props = withDefaults(
  defineProps<{ opportunityId?: string }>(),
  { opportunityId: '' }
)
const emit = defineEmits<{ (e: 'created', order: SalesOrder): void }>()

const store = useSalesOrdersStore()
const entityStore = useEntityStore()
const currenciesStore = useCurrenciesStore()
const entityContactPersonStore = useEntityContactPersonStore()
const userStore = useUserStore()
const authStore = useAuthStore()

const entities = computed(() => entityStore.entities || [])
const currencies = computed(() => currenciesStore.currencies || [])
const contactsForEntity = computed(() => entityContactPersonStore.contactPersons || [])
const usersForOwner = computed(() => userStore.users || [])

const form = ref({
  entity_id: 0,
  contact_id: 0,
  owner_id: 0,
  order_number: '',
  order_date: new Date().toISOString().slice(0, 10),
  requested_delivery_date: '',
  currency_id: 0,
  status: 'draft' as const,
  notes: '',
  customer_po_number: '',
  delivery_instructions: '',
  opportunity_id: 0 as number | undefined
})

watch(
  () => form.value.entity_id,
  (entityId) => {
    form.value.contact_id = 0
    if (entityId) entityContactPersonStore.fetchContactPersons(entityId)
  },
  { immediate: true }
)

onMounted(async () => {
  await entityStore.fetchEntities()
  await currenciesStore.fetchCurrencies()
  await userStore.fetchUsers()
  if (authStore.user?.id) form.value.owner_id = authStore.user.id
  if (props.opportunityId) {
    try {
      const opp = await feathersClient.service('crm/opportunities').get(Number(props.opportunityId))
      if (opp) {
        form.value.entity_id = opp.entity_id || 0
        form.value.contact_id = opp.contact_id || 0
        form.value.currency_id = opp.currency_id || 0
        form.value.opportunity_id = opp.id
        form.value.notes = (form.value.notes ? form.value.notes + '\n' : '') + `From opportunity: ${opp.title || ''}`
        if (form.value.entity_id) entityContactPersonStore.fetchContactPersons(form.value.entity_id)
      }
    } catch (_) {}
  }
})

async function submit() {
  if (form.value.entity_id === 0 || !form.value.order_date || form.value.currency_id === 0) return
  try {
    const payload: any = {
      entity_id: form.value.entity_id,
      order_date: form.value.order_date,
      requested_delivery_date: form.value.requested_delivery_date || undefined,
      currency_id: form.value.currency_id,
      total_amount: 0,
      status: form.value.status,
      notes: form.value.notes || undefined,
      customer_po_number: form.value.customer_po_number?.trim() || undefined,
      delivery_instructions: form.value.delivery_instructions?.trim() || undefined
    }
    if (authStore.user?.company_id != null) payload.company_id = authStore.user.company_id
    if (form.value.order_number?.trim()) payload.order_number = form.value.order_number.trim()
    if (form.value.contact_id) payload.contact_id = form.value.contact_id
    if (form.value.owner_id) payload.owner_id = form.value.owner_id
    if (form.value.opportunity_id) payload.opportunity_id = form.value.opportunity_id
    const created = await store.createSalesOrder(payload)
    const order = await store.fetchSalesOrder(created.id)
    emit('created', order)
  } catch (e: any) {
    // error shown via store.error
  }
}
</script>
