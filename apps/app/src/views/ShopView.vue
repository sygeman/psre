<template>
  <BackLayout title="Магазин">
    <template #rightContent>
      <div class="px-2">
        <ResourceDisplay icon="💎" :value="diamond" />
      </div>
    </template>

    <div class="flex h-full flex-col">
      <!-- Категории -->
      <div class="flex border-b border-slate-700/25">
        <button
          v-for="category in SHOP_CATEGORIES"
          :key="category.id"
          :class="[
            'flex-1 p-4 text-sm transition-colors',
            activeCategory === category.id
              ? 'border-b-2 border-blue-500 font-medium'
              : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200',
          ]"
          @click="() => setActiveCategory(category.id)"
        >
          {{ category.label }}
        </button>
      </div>

      <!-- Список товаров -->
      <div class="hide-scrollbar flex-1 overflow-y-auto">
        <div class="grid gap-4 p-4">
          <div
            v-for="item in filteredItems"
            :key="item.id"
            class="flex items-center justify-between rounded-lg bg-slate-800 p-4"
          >
            <div class="flex flex-col gap-1">
              <div class="font-medium">{{ item.name }}</div>
              <div class="text-sm text-slate-400">{{ item.description }}</div>
              <div class="text-sm text-slate-400">
                Стоимость: 💎 {{ item.price }}
              </div>
            </div>
            <button
              class="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
              @click="() => handleBuy(item)"
            >
              {{ formatter.format(item.price) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </BackLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BackLayout from '@/layouts/BackLayout.vue'
import ResourceDisplay from '@/components/ResourceDisplay.vue'

type ShopCategory = {
  id: string
  label: string
}

type ShopItem = {
  id: string
  name: string
  description: string
  price: number
  amount: number
  category: string
}

const SHOP_CATEGORIES: ShopCategory[] = [
  { id: 'diamonds', label: 'Алмазы' },
  { id: 'resources', label: 'Ресурсы' },
  { id: 'items', label: 'Предметы' },
  { id: 'special', label: 'Особое' },
]

const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})

const SHOP_ITEMS: ShopItem[] = [
  // Алмазы
  {
    id: 'diamonds_100',
    name: '100 алмазов',
    description: 'Малый набор алмазов',
    price: 79,
    amount: 100,
    category: 'diamonds',
  },
  {
    id: 'diamonds_500',
    name: '500 алмазов',
    description: 'Средний набор алмазов',
    price: 349,
    amount: 500,
    category: 'diamonds',
  },
  {
    id: 'diamonds_1000',
    name: '1000 алмазов',
    description: 'Большой набор алмазов',
    price: 649,
    amount: 1000,
    category: 'diamonds',
  },

  // Ресурсы
  {
    id: 'food_pack',
    name: 'Пакет еды',
    description: 'Содержит 1000 единиц еды',
    price: 29,
    amount: 1000,
    category: 'resources',
  },
  {
    id: 'wood_pack',
    name: 'Пакет дерева',
    description: 'Содержит 1000 единиц дерева',
    price: 29,
    amount: 1000,
    category: 'resources',
  },
  {
    id: 'steel_pack',
    name: 'Пакет стали',
    description: 'Содержит 1000 единиц стали',
    price: 49,
    amount: 1000,
    category: 'resources',
  },
  {
    id: 'fuel_pack',
    name: 'Пакет топлива',
    description: 'Содержит 1000 единиц топлива',
    price: 69,
    amount: 1000,
    category: 'resources',
  },

  // Предметы
  {
    id: 'ap_potion',
    name: 'Зелье действия',
    description: 'Восстанавливает 50 AP',
    price: 19,
    amount: 1,
    category: 'items',
  },
  {
    id: 'sp_potion',
    name: 'Зелье выносливости',
    description: 'Восстанавливает 50 SP',
    price: 19,
    amount: 1,
    category: 'items',
  },
  {
    id: 'exp_boost',
    name: 'Усилитель опыта',
    description: '+50% к получаемому опыту на 1 час',
    price: 99,
    amount: 1,
    category: 'items',
  },

  // Особое
  {
    id: 'name_change',
    name: 'Смена имени',
    description: 'Позволяет изменить имя персонажа',
    price: 299,
    amount: 1,
    category: 'special',
  },
  {
    id: 'avatar_frame',
    name: 'Рамка аватара',
    description: 'Уникальная рамка для аватара',
    price: 499,
    amount: 1,
    category: 'special',
  },
]

// Реактивные данные
const activeCategory = ref('diamonds')
const diamond = ref(1234)

// Вычисляемые свойства
const filteredItems = computed(() =>
  SHOP_ITEMS.filter((item) => item.category === activeCategory.value),
)

const setActiveCategory = (categoryId: string) => {
  activeCategory.value = categoryId
}

const handleBuy = (item: ShopItem) => {
  console.log('Buying item:', item)
}
</script>
