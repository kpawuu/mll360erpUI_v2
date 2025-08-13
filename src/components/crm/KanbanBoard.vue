<template>
  <div class="kanban-board">
    <!-- Enhanced Kanban Header -->
    <div class="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
      <div class="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-indigo-600/20"></div>
      <div class="relative px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">Kanban Board</h3>
              <p class="text-purple-100 text-sm mt-1">Drag & drop opportunities between stages</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-white font-semibold">{{ opportunities.length }} Opportunities</span>
              </div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                <span class="text-white font-semibold">{{ stages.length }} Stages</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Kanban Board with Drag & Drop -->
    <div class="p-8">
      <div class="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
        <div
          v-for="stage in stages"
          :key="stage.id"
          class="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 rounded-2xl border border-gray-200 dark:border-gray-700"
        >
          <!-- Stage Header -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-bold text-gray-900 dark:text-white">{{ stage.name }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Pipeline Stage</p>
                </div>
              </div>
              <div class="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl px-3 py-1">
                <span class="text-white font-bold text-sm">{{ getOpportunitiesByStage(stage.id).length }}</span>
              </div>
            </div>

            <!-- Stage Progress -->
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Progress</span>
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ getOpportunitiesByStage(stage.id).length }} / {{ opportunities.length }}
                </span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" 
                  :style="{ width: opportunities.length > 0 ? (getOpportunitiesByStage(stage.id).length / opportunities.length * 100) + '%' : '0%' }"
                ></div>
              </div>
            </div>
          </div>
          
          <!-- Opportunities List with Drag & Drop -->
          <div 
            :ref="`stage-${stage.id}`"
            class="p-6 space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto"
            :data-stage-id="stage.id"
          >
            <div
              v-for="opportunity in getOpportunitiesByStage(stage.id)"
              :key="opportunity.id"
              :data-opportunity-id="opportunity.id"
              class="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600 cursor-move hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
              @click="viewOpportunity(opportunity)"
            >
              <!-- Drag Handle -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h5 class="text-sm font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                      {{ opportunity.title }}
                    </h5>
                  </div>
                </div>
                <div v-if="opportunity.service_type" class="ml-2 flex-shrink-0">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300">
                    {{ opportunity.service_type }}
                  </span>
                </div>
              </div>
              
              <!-- Contact Info -->
              <div class="flex items-center space-x-2 mb-3">
                <div class="w-6 h-6 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ opportunity.contact_name }}</span>
              </div>
              
              <!-- Financial Info -->
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-lg p-3 mb-3 border border-blue-200 dark:border-blue-800">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white">
                      {{ formatCurrency(opportunity.amount, opportunity.currency_id) }}
                    </div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">Total Value</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-semibold text-gray-900 dark:text-white">
                      {{ opportunity.probability }}%
                    </div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">Probability</div>
                  </div>
                </div>
                <!-- Progress Bar -->
                <div class="mt-2 flex items-center space-x-2">
                  <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      class="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full transition-all duration-300" 
                      :style="{ width: opportunity.probability + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Company Info -->
              <div class="flex items-center space-x-2 mb-3">
                <div class="w-6 h-6 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ opportunity.company_name }}</span>
              </div>

              <!-- Footer -->
              <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-600">
                <div class="flex items-center space-x-2">
                  <div class="w-6 h-6 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ getUserName(opportunity.owner_id) }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <button @click.stop="viewOpportunity(opportunity)" class="p-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button @click.stop="editOpportunity(opportunity)" class="p-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button @click.stop="showActivitiesModal(opportunity)" class="p-1 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                  <button @click.stop="deleteOpportunity(opportunity)" class="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Empty State for Stage -->
            <div v-if="getOpportunitiesByStage(stage.id).length === 0" class="text-center py-8">
              <div class="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Drop opportunities here</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Drag & Drop Feedback -->
    <div v-if="isDragging" class="fixed inset-0 pointer-events-none z-50">
      <div class="absolute inset-0 bg-blue-500/10 backdrop-blur-sm"></div>
      <div class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
          </svg>
          <span class="font-medium">Drop to move opportunity</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Sortable from 'sortablejs'

interface Opportunity {
  id: number
  title: string
  contact_name: string
  company_name: string
  amount: number
  probability: number
  service_type: string
  stage_id: number
  pipeline_id: number
  owner_id: number
  currency_id: number
  [key: string]: any
}

interface Stage {
  id: number
  name: string
  [key: string]: any
}

interface Props {
  opportunities: Opportunity[]
  stages: Stage[]
  users: any[]
  currencies: any[]
}

interface Emits {
  (e: 'opportunity-moved', opportunityId: number, newStageId: number): void
  (e: 'view-opportunity', opportunity: Opportunity): void
  (e: 'edit-opportunity', opportunity: Opportunity): void
  (e: 'delete-opportunity', opportunity: Opportunity): void
  (e: 'show-activities', opportunity: Opportunity): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isDragging = ref(false)
const sortableInstances = ref<Sortable[]>([])

// Helper functions
const getOpportunitiesByStage = (stageId: number) => {
  return props.opportunities.filter(opp => opp.stage_id === stageId)
}

const formatCurrency = (amount: number, currencyId: number) => {
  const currency = props.currencies.find(c => c.id === currencyId)
  const symbol = currency?.symbol || '$'
  return `${symbol}${amount?.toLocaleString() || '0'}`
}

const getUserName = (userId: number) => {
  const user = props.users.find(u => u.id === userId)
  return user ? `${user.first_name} ${user.last_name}` : 'Unknown'
}

// Event handlers
const viewOpportunity = (opportunity: Opportunity) => {
  emit('view-opportunity', opportunity)
}

const editOpportunity = (opportunity: Opportunity) => {
  emit('edit-opportunity', opportunity)
}

const deleteOpportunity = (opportunity: Opportunity) => {
  emit('delete-opportunity', opportunity)
}

const showActivitiesModal = (opportunity: Opportunity) => {
  emit('show-activities', opportunity)
}

// Drag and drop functionality
const initializeSortable = async () => {
  await nextTick()
  
  props.stages.forEach(stage => {
    const stageElement = document.querySelector(`[data-stage-id="${stage.id}"]`) as HTMLElement
    if (stageElement) {
      const sortable = Sortable.create(stageElement, {
        group: 'opportunities',
        animation: 300,
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        handle: '.cursor-move',
        filter: '.no-drag',
        preventOnFilter: false,
        draggable: '[data-opportunity-id]',
        
        onStart: (evt) => {
          isDragging.value = true
          const draggedElement = evt.item as HTMLElement
          draggedElement.style.transform = 'rotate(5deg) scale(1.05)'
          draggedElement.style.zIndex = '9999'
        },
        
        onEnd: (evt) => {
          isDragging.value = false
          const draggedElement = evt.item as HTMLElement
          draggedElement.style.transform = ''
          draggedElement.style.zIndex = ''
          
          if (evt.to && evt.from !== evt.to) {
            const opportunityId = parseInt(evt.item.getAttribute('data-opportunity-id') || '0')
            const newStageId = parseInt(evt.to.getAttribute('data-stage-id') || '0')
            
            if (opportunityId && newStageId) {
              emit('opportunity-moved', opportunityId, newStageId)
            }
          }
        },
        
        onMove: (evt) => {
          // Prevent dropping in the same stage
          if (evt.from === evt.to) {
            return false
          }
          return true
        }
      })
      
      sortableInstances.value.push(sortable)
    }
  })
}

// Lifecycle
onMounted(() => {
  initializeSortable()
})

onUnmounted(() => {
  sortableInstances.value.forEach(instance => {
    instance.destroy()
  })
})
</script>

<style scoped>
.sortable-ghost {
  opacity: 0.5;
  background: #f3f4f6 !important;
  border: 2px dashed #3b82f6 !important;
}

.sortable-chosen {
  background: #dbeafe !important;
  border-color: #3b82f6 !important;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3) !important;
}

.sortable-drag {
  background: white !important;
  border: 2px solid #3b82f6 !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
}

/* Custom scrollbar for webkit browsers */
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Dark mode scrollbar */
.dark .scrollbar-thin::-webkit-scrollbar-track {
  background: #374151;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
