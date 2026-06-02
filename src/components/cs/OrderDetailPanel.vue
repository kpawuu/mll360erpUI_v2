<template>
  <div>
    <div v-if="store.loading && !order" class="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
      <div class="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent mx-auto"></div>
    </div>
    <div v-else-if="order" class="space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex justify-between items-start mb-6">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Order number</p>
            <p class="text-xl font-semibold text-gray-900 dark:text-white">{{ order.order_number }}</p>
          </div>
          <span :class="['px-3 py-1 rounded-full text-sm font-medium', statusClass(order.status)]">{{ order.status }}</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div><span class="text-gray-500 dark:text-gray-400">Customer</span><p class="font-medium text-gray-900 dark:text-white">{{ order.entity?.name || '—' }}</p></div>
          <div><span class="text-gray-500 dark:text-gray-400">Order date</span><p class="font-medium text-gray-900 dark:text-white">{{ formatDate(order.order_date) }}</p></div>
          <div><span class="text-gray-500 dark:text-gray-400">Requested delivery</span><p class="font-medium text-gray-900 dark:text-white">{{ formatDate(order.requested_delivery_date) || '—' }}</p></div>
          <div><span class="text-gray-500 dark:text-gray-400">Total</span><p class="font-medium text-gray-900 dark:text-white">{{ order.currency?.symbol || '' }} {{ Number(order.total_amount).toLocaleString() }}</p></div>
          <div v-if="order.opportunity"><span class="text-gray-500 dark:text-gray-400">Opportunity</span><p class="font-medium text-gray-900 dark:text-white">{{ order.opportunity.title }}</p></div>
          <div v-if="order.customer_po_number"><span class="text-gray-500 dark:text-gray-400">Customer PO / Reference</span><p class="font-medium text-gray-900 dark:text-white">{{ order.customer_po_number }}</p></div>
        </div>
        <div v-if="order.delivery_instructions" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span class="text-gray-500 dark:text-gray-400">Delivery instructions</span>
          <p class="text-gray-900 dark:text-white mt-1 whitespace-pre-wrap">{{ order.delivery_instructions }}</p>
        </div>
        <div v-if="order.notes" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span class="text-gray-500 dark:text-gray-400">Notes</span>
          <p class="text-gray-900 dark:text-white mt-1">{{ order.notes }}</p>
        </div>
        <div class="mt-6 flex flex-wrap gap-2">
          <button @click="printOrder" class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2h-2m-4-1v8"/></svg>
            Print
          </button>
          <button @click="downloadPdf" class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Download PDF
          </button>
          <button v-if="!editing" @click="editing = true" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors">Edit order</button>
          <template v-else>
            <button @click="saveOrder" :disabled="store.loading" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50">Save</button>
            <button @click="editing = false; patchForm = { ...patchFormFromOrder(order) }" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">Cancel</button>
          </template>
        </div>
      </div>

      <div v-if="editing" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Update order</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select v-model="patchForm.status" class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="draft">Draft</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_fulfillment">In fulfillment</option>
              <option value="partially_shipped">Partially shipped</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Requested delivery</label>
            <input v-model="patchForm.requested_delivery_date" type="date" class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer PO / Reference</label>
          <input v-model="patchForm.customer_po_number" type="text" class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery instructions</label>
          <textarea v-model="patchForm.delivery_instructions" rows="2" class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
          <textarea v-model="patchForm.notes" rows="3" class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
        </div>
      </div>

      <!-- Attachments section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div class="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
            </span>
            Attachments
          </h3>
          <label class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium cursor-pointer transition-colors shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <input type="file" class="hidden" multiple @change="onAttachmentFileSelect" />
            Add file
          </label>
        </div>
        <div class="p-6">
          <div v-if="orderAttachmentsLoading" class="flex items-center justify-center gap-2 py-12 text-gray-500 dark:text-gray-400">
            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            <span class="text-sm">Loading attachments…</span>
          </div>
          <div v-else-if="!orderAttachments.length" class="flex flex-col items-center justify-center py-12 text-center">
            <span class="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 mb-3">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </span>
            <p class="text-sm text-gray-500 dark:text-gray-400">No attachments yet</p>
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">Upload invoices, packing lists, or other documents</p>
          </div>
          <div v-else class="grid gap-3 sm:grid-cols-2">
            <div v-for="f in orderAttachments" :key="f.id" class="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-900/30 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
              <span class="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-amber-600 dark:text-amber-400 shadow-sm">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              </span>
              <div class="min-w-0 flex-1">
                <a :href="f.file_url" target="_blank" rel="noopener" class="block font-medium text-gray-900 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{{ f.file_name }}</a>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Click to open or download</p>
              </div>
              <div class="flex items-center gap-1 flex-shrink-0">
                <a :href="f.file_url" target="_blank" rel="noopener" class="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors" title="Download">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                </a>
                <button type="button" @click="removeAttachment(f.id)" class="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Remove">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Line items section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div class="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
            </span>
            Line items
          </h3>
          <button @click="openLineModal()" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add line
          </button>
        </div>
        <div class="p-6 overflow-x-auto">
          <div v-if="!order.line_items?.length" class="flex flex-col items-center justify-center py-14 text-center">
            <span class="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 mb-3">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            </span>
            <p class="text-sm text-gray-500 dark:text-gray-400">No line items yet</p>
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">Add products or services to this order</p>
            <button @click="openLineModal()" class="mt-4 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              Add first line
            </button>
          </div>
          <table v-else class="w-full text-sm text-left">
            <thead>
              <tr class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b-2 border-gray-200 dark:border-gray-600">
                <th class="py-3.5 pr-4 whitespace-nowrap">#</th>
                <th class="py-3.5 pr-4">Description</th>
                <th class="py-3.5 pr-4 text-right whitespace-nowrap">Qty</th>
                <th class="py-3.5 pr-4 text-right whitespace-nowrap">Alloc.</th>
                <th class="py-3.5 pr-4 text-right whitespace-nowrap">Shipped</th>
                <th class="py-3.5 pr-4 text-right whitespace-nowrap">Unit price</th>
                <th class="py-3.5 pr-4 text-right whitespace-nowrap">Total</th>
                <th class="py-3.5 pr-4 whitespace-nowrap">Currency</th>
                <th class="py-3.5 pr-4 whitespace-nowrap">Shipment</th>
                <th class="py-3.5 pr-4 w-24 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="text-gray-900 dark:text-white divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-for="(line, idx) in order.line_items" :key="line.id" class="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors">
                <td class="py-3 pr-4 font-medium text-gray-600 dark:text-gray-400">{{ line.line_number }}</td>
                <td class="py-3 pr-4 font-medium">{{ line.description }}</td>
                <td class="py-3 pr-4 text-right tabular-nums">{{ line.quantity }} {{ line.unit }}</td>
                <td class="py-3 pr-4 text-right tabular-nums text-gray-600 dark:text-gray-400">{{ lineQuantityAllocated(line) }} {{ line.unit }}</td>
                <td class="py-3 pr-4 text-right tabular-nums text-gray-600 dark:text-gray-400">{{ lineQuantityShipped(line) }} {{ line.unit }}</td>
                <td class="py-3 pr-4 text-right tabular-nums">{{ lineCurrencySymbol(line) }}{{ Number(line.unit_price).toLocaleString() }}</td>
                <td class="py-3 pr-4 text-right tabular-nums font-medium">{{ lineCurrencySymbol(line) }}{{ Number(line.total_amount).toLocaleString() }}</td>
                <td class="py-3 pr-4 text-gray-600 dark:text-gray-400">{{ line.currency?.currency_code || order?.currency?.currency_code || line.currency?.currency_name || order?.currency?.currency_name || '—' }}</td>
                <td class="py-3 pr-4 text-gray-600 dark:text-gray-400 text-xs">{{ shipmentLabel(line.shipment_id) }}</td>
                <td class="py-3 pr-4">
                  <div class="flex items-center justify-center gap-0.5">
                    <button @click="openLineModal(line)" class="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors" title="Edit">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button @click="openRemoveLineConfirm(line.id)" class="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Delete">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Line item modal -->
    <div v-if="showLineModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showLineModal = false">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ editingLine ? 'Edit line' : 'Add line' }}</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
            <input v-model="lineForm.description" type="text" required class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity *</label>
              <input v-model.number="lineForm.quantity" type="number" min="0" step="any" class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit</label>
              <input v-model="lineForm.unit" type="text" placeholder="EA" class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency</label>
            <select v-model.number="lineForm.currency_id" class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option v-for="c in currencies" :key="c.id" :value="c.id">{{ (c as any).currency_code || c.currency_name }} ({{ c.symbol }})</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit price *</label>
              <input v-model.number="lineForm.unit_price" type="number" min="0" step="0.01" class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total</label>
              <p class="py-2 text-gray-900 dark:text-white font-medium">{{ lineFormCurrencySymbol }}{{ lineTotalAmount.toLocaleString() }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity allocated</label>
              <input v-model.number="lineForm.quantity_allocated" type="number" min="0" step="any" class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity shipped</label>
              <input v-model.number="lineForm.quantity_shipped" type="number" min="0" step="any" class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
          </div>
          <div v-if="shipments.length">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shipment</label>
            <select v-model.number="lineForm.shipment_id" class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option :value="0">— None —</option>
              <option v-for="s in shipments" :key="s.id" :value="s.id">{{ s.client?.name || 'Shipment' }} #{{ s.id }}</option>
            </select>
          </div>
        </div>
        <div class="mt-6 flex gap-2">
          <button @click="saveLine" :disabled="lineSaving" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm">Save</button>
          <button @click="showLineModal = false; editingLine = null" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">Cancel</button>
        </div>
      </div>
    </div>

    <ConfirmModal v-model="showRemoveLineModal" title="Remove line" message="Remove this line item?" confirm-label="Remove" :danger="true" @confirm="doRemoveLine" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useSalesOrdersStore } from '../../store/sales-orders.store'
import { useShipmentStore } from '../../store/shipment.store'
import { useFileStore } from '../../store/file.store'
import { useToastStore } from '../../store/toast.store'
import { useCurrenciesStore } from '../../store/currencies.store'
import { salesOrderLinesControllers } from '../../api/controllers/sales-order-lines.controllers'
import ConfirmModal from '../ui/ConfirmModal.vue'
import type { SalesOrder } from '../../api/models/sales-order.model'
import type { SalesOrderLine } from '../../api/models/sales-order-line.model'
import { jsPDF } from 'jspdf'

const props = defineProps<{ orderId: number }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const store = useSalesOrdersStore()
const shipmentStore = useShipmentStore()
const fileStore = useFileStore()
const toastStore = useToastStore()
const currenciesStore = useCurrenciesStore()
const currencies = computed(() => currenciesStore.getCurrencies || [])

const order = ref<SalesOrder | null>(null)
const editing = ref(false)
const patchForm = ref<{ status?: string; requested_delivery_date?: string; notes?: string; customer_po_number?: string; delivery_instructions?: string }>({})
const orderAttachments = ref<{ id: number; file_name: string; file_url: string }[]>([])
const orderAttachmentsLoading = ref(false)
const showRemoveLineModal = ref(false)
const removeLineId = ref<number | null>(null)
const showLineModal = ref(false)
const editingLine = ref<SalesOrderLine | null>(null)
const lineSaving = ref(false)
const lineForm = ref({
  description: '',
  quantity: 1,
  unit: 'EA',
  unit_price: 0,
  currency_id: 0 as number,
  quantity_allocated: 0 as number,
  quantity_shipped: 0 as number,
  shipment_id: 0 as number
})
const lineTotalAmount = computed(() => Math.round((lineForm.value.quantity || 0) * (lineForm.value.unit_price || 0) * 100) / 100)
function lineCurrencySymbol(line: SalesOrderLine) {
  const sym = (line as any).currency?.symbol || order.value?.currency?.symbol
  return sym ? `${sym} ` : ''
}
const lineFormCurrencySymbol = computed(() => {
  const c = currencies.value.find((x: any) => x.id === lineForm.value.currency_id)
  return c?.symbol ? `${c.symbol} ` : ''
})
const shipments = computed(() => shipmentStore.shipments || [])

function formatDate(d: string | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString()
}
function statusClass(status: string) {
  const map: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    in_fulfillment: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    partially_shipped: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
    shipped: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }
  return map[status] || 'bg-gray-100 text-gray-800'
}
function patchFormFromOrder(o: SalesOrder) {
  return {
    status: o.status,
    requested_delivery_date: o.requested_delivery_date ? o.requested_delivery_date.slice(0, 10) : '',
    notes: o.notes || '',
    customer_po_number: o.customer_po_number || '',
    delivery_instructions: o.delivery_instructions || ''
  }
}
function lineQuantityAllocated(line: SalesOrderLine) {
  return line.quantity_allocated ?? 0
}
function lineQuantityShipped(line: SalesOrderLine) {
  return line.quantity_shipped ?? 0
}
function shipmentLabel(shipmentId: number | undefined) {
  if (!shipmentId) return '—'
  const s = shipments.value.find((x: any) => x.id === shipmentId)
  return s ? `${s.client?.name || 'Shipment'} #${s.id}` : `#${shipmentId}`
}

const ORDER_ATTACHMENTS_ENTITY = 'oms_sales_orders'
async function loadOrder() {
  const id = props.orderId
  if (!id || isNaN(id)) return
  order.value = await store.fetchSalesOrder(id)
  if (order.value) {
    patchForm.value = patchFormFromOrder(order.value)
    await Promise.all([
      shipmentStore.fetchShipments({ query: { $limit: 200 } }),
      currenciesStore.fetchCurrencies()
    ])
    loadOrderAttachments()
  }
}
async function loadOrderAttachments() {
  const id = order.value?.id
  if (!id) return
  orderAttachmentsLoading.value = true
  try {
    const res = await fileStore.getFilesForEntity(ORDER_ATTACHMENTS_ENTITY, Number(id), { limit: 100 })
    const list = Array.isArray(res) ? res : (res?.data ?? [])
    const files = (list || []).map((f: any) => ({
      id: f.id,
      file_name: f.file_name || f.fileName || 'file',
      file_url: f.file_url || f.url || '#'
    }))
    orderAttachments.value = files
  } catch (_) {
    orderAttachments.value = []
  } finally {
    orderAttachmentsLoading.value = false
  }
}
async function onAttachmentFileSelect(ev: Event) {
  const target = ev.target as HTMLInputElement
  const files = target.files
  if (!files?.length || !order.value?.id) return
  try {
    for (let i = 0; i < files.length; i++) {
      await fileStore.uploadFile(files[i], ORDER_ATTACHMENTS_ENTITY, order.value.id)
    }
    // Refetch after backend has committed the file record
    await new Promise((r) => setTimeout(r, 300))
    await loadOrderAttachments()
    toastStore.success('File(s) uploaded.')
  } catch (e: any) {
    toastStore.error(e?.message || 'Upload failed.')
  }
  target.value = ''
}
async function removeAttachment(fileId: number) {
  try {
    await fileStore.deleteFile(fileId)
    await loadOrderAttachments()
    toastStore.success('Attachment removed.')
  } catch (e: any) {
    toastStore.error(e?.message || 'Failed to remove.')
  }
}
function printOrder() {
  window.print()
}
function downloadPdf() {
  const o = order.value
  if (!o) return
  const doc = new jsPDF()
  const pageW = doc.internal.pageSize.getWidth()
  const margin = 20
  let y = 18

  // —— Header ——
  doc.setFillColor(41, 98, 255) // blue-600
  doc.rect(0, 0, pageW, 28, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('SALES ORDER', margin, 18)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(`Order #${o.order_number}`, pageW - margin, 18, { align: 'right' })
  doc.setTextColor(0, 0, 0)
  y = 38

  // —— Order details block ——
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Order details', margin, y)
  y += 7
  doc.setFont('helvetica', 'normal')
  doc.setDrawColor(220, 220, 220)
  doc.setLineWidth(0.2)
  doc.line(margin, y - 2, pageW - margin, y - 2)
  const col1 = margin
  const col2 = margin + 85
  doc.text('Customer:', col1, y)
  doc.text(String(o.entity?.name || '—').slice(0, 50), col2, y)
  y += 6
  doc.text('Order date:', col1, y)
  doc.text(formatDate(o.order_date), col2, y)
  y += 6
  doc.text('Requested delivery:', col1, y)
  doc.text(formatDate(o.requested_delivery_date) || '—', col2, y)
  y += 6
  if (o.customer_po_number) {
    doc.text('Customer PO / Reference:', col1, y)
    doc.text(String(o.customer_po_number).slice(0, 40), col2, y)
    y += 6
  }
  doc.text('Status:', col1, y)
  doc.text(String(o.status || '—'), col2, y)
  y += 10

  // —— Line items table ——
  if (o.line_items?.length) {
    doc.setFont('helvetica', 'bold')
    doc.text('Line items', margin, y)
    y += 6
    const tableTop = y
    const colNum = margin
    const colDesc = margin + 12
    const colQty = margin + 95
    const colUnit = margin + 108
    const colPrice = margin + 128
    const colTotal = pageW - margin - 32
    const colCur = pageW - margin - 28
    // Header row
    doc.setFillColor(248, 250, 252)
    doc.rect(margin, y - 4, pageW - 2 * margin, 8, 'F')
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text('#', colNum, y + 2)
    doc.text('Description', colDesc, y + 2)
    doc.text('Qty', colQty, y + 2)
    doc.text('Unit', colUnit, y + 2)
    doc.text('Unit price', colPrice, y + 2)
    doc.text('Total', colTotal, y + 2)
    doc.text('Cur.', colCur, y + 2)
    y += 10
    doc.setFont('helvetica', 'normal')
    doc.setDrawColor(200, 200, 200)
    for (const line of o.line_items) {
      if (y > 270) {
        doc.addPage()
        y = 20
        doc.setFontSize(9)
      }
      const sym = (line as any).currency?.symbol || o.currency?.symbol || ''
      const desc = String(line.description || '').slice(0, 42)
      doc.text(String(line.line_number), colNum, y + 2)
      doc.text(desc, colDesc, y + 2)
      doc.text(String(line.quantity), colQty, y + 2)
      doc.text(String(line.unit || 'EA').slice(0, 4), colUnit, y + 2)
      doc.text(`${sym}${Number(line.unit_price).toLocaleString()}`, colPrice, y + 2)
      doc.text(`${sym}${Number(line.total_amount).toLocaleString()}`, colTotal, y + 2)
      doc.text((line as any).currency?.currency_code || o.currency?.currency_code || '', colCur, y + 2)
      doc.line(margin, y + 4, pageW - margin, y + 4)
      y += 8
    }
    doc.line(margin, tableTop - 4, margin, y)
    doc.line(colDesc - 2, tableTop - 4, colDesc - 2, y)
    doc.line(colQty - 2, tableTop - 4, colQty - 2, y)
    doc.line(colUnit - 2, tableTop - 4, colUnit - 2, y)
    doc.line(colPrice - 2, tableTop - 4, colPrice - 2, y)
    doc.line(colTotal - 2, tableTop - 4, colTotal - 2, y)
    doc.line(colCur - 2, tableTop - 4, colCur - 2, y)
    doc.line(pageW - margin, tableTop - 4, pageW - margin, y)
    y += 8
  }

  // —— Order total ——
  doc.setDrawColor(180, 180, 180)
  doc.setLineWidth(0.5)
  doc.line(margin, y, pageW - margin, y)
  y += 8
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  const totalStr = `Order total: ${o.currency?.symbol || ''} ${Number(o.total_amount).toLocaleString()}`
  doc.text(totalStr, pageW - margin, y, { align: 'right' })
  y += 10

  // —— Delivery / notes (if any) ——
  if (o.delivery_instructions || o.notes) {
    if (y > 250) { doc.addPage(); y = 20 }
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    if (o.delivery_instructions) {
      doc.text('Delivery instructions:', margin, y)
      y += 5
      doc.text(doc.splitTextToSize(String(o.delivery_instructions).slice(0, 200), pageW - 2 * margin)[0] || '', margin, y)
      y += 8
    }
    if (o.notes) {
      doc.text('Notes:', margin, y)
      y += 5
      doc.text(doc.splitTextToSize(String(o.notes).slice(0, 200), pageW - 2 * margin)[0] || '', margin, y)
      y += 8
    }
  }

  // —— Footer on first page ——
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  doc.text(`Generated on ${new Date().toLocaleString()} · Order #${o.order_number}`, pageW / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' })
  doc.setTextColor(0, 0, 0)

  doc.save(`order-${o.order_number}.pdf`)
  toastStore.success('PDF downloaded.')
}
async function saveOrder() {
  if (!order.value) return
  const payload: any = {
    status: patchForm.value.status,
    notes: patchForm.value.notes,
    customer_po_number: patchForm.value.customer_po_number || undefined,
    delivery_instructions: patchForm.value.delivery_instructions || undefined
  }
  if (patchForm.value.requested_delivery_date) payload.requested_delivery_date = patchForm.value.requested_delivery_date
  else payload.requested_delivery_date = null
  try {
    await store.updateSalesOrder(order.value.id, payload)
    order.value = await store.fetchSalesOrder(order.value.id)
    editing.value = false
    toastStore.success('Order updated.')
  } catch (e: any) {
    toastStore.error(e?.message || 'Failed to update order.')
  }
}
function openLineModal(line?: SalesOrderLine) {
  editingLine.value = line || null
  const orderCurrencyId = order.value?.currency_id || 0
  if (line) {
    lineForm.value = {
      description: line.description,
      quantity: line.quantity,
      unit: line.unit || 'EA',
      unit_price: line.unit_price,
      currency_id: line.currency_id || orderCurrencyId,
      quantity_allocated: line.quantity_allocated ?? 0,
      quantity_shipped: line.quantity_shipped ?? 0,
      shipment_id: line.shipment_id || 0
    }
  } else {
    lineForm.value = { description: '', quantity: 1, unit: 'EA', unit_price: 0, currency_id: orderCurrencyId, quantity_allocated: 0, quantity_shipped: 0, shipment_id: 0 }
  }
  showLineModal.value = true
}
async function saveLine() {
  if (!order.value || !lineForm.value.description.trim()) return
  lineSaving.value = true
  try {
    const total = lineTotalAmount.value
    const currencyId = lineForm.value.currency_id || order.value.currency_id
    const num = (v: unknown) => (v != null && v !== '') ? Number(v) : 0
    const payload = {
      description: lineForm.value.description,
      quantity: num(lineForm.value.quantity),
      unit: lineForm.value.unit || 'EA',
      unit_price: num(lineForm.value.unit_price),
      total_amount: total,
      currency_id: Number(currencyId) || order.value.currency_id,
      quantity_allocated: num(lineForm.value.quantity_allocated),
      quantity_shipped: num(lineForm.value.quantity_shipped),
      shipment_id: (lineForm.value.shipment_id > 0) ? lineForm.value.shipment_id : undefined
    }
    if (editingLine.value) {
      await salesOrderLinesControllers.patch(editingLine.value.id, payload)
    } else {
      const lineNumber = (order.value.line_items?.length ?? 0) + 1
      await salesOrderLinesControllers.create({
        sales_order_id: order.value.id,
        line_number: lineNumber,
        ...payload
      })
    }
    toastStore.success(editingLine.value ? 'Line updated.' : 'Line added.')
    showLineModal.value = false
    editingLine.value = null
    order.value = await store.fetchSalesOrder(order.value.id)
  } catch (e: any) {
    toastStore.error(e?.message || 'Failed to save line.')
  } finally {
    lineSaving.value = false
  }
}
function openRemoveLineConfirm(lineId: number) {
  removeLineId.value = lineId
  showRemoveLineModal.value = true
}
async function doRemoveLine() {
  const lineId = removeLineId.value
  removeLineId.value = null
  if (!lineId || !order.value) return
  try {
    await salesOrderLinesControllers.remove(lineId)
    order.value = await store.fetchSalesOrder(order.value.id)
    toastStore.success('Line removed.')
  } catch (e: any) {
    toastStore.error(e?.message || 'Failed to remove line.')
  }
}

watch(() => props.orderId, (id) => {
  order.value = null
  if (id && !isNaN(Number(id))) loadOrder()
}, { immediate: true })
onMounted(() => {
  if (props.orderId && !order.value) loadOrder()
})
</script>
