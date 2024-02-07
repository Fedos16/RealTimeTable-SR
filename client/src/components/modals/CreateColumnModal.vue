<template>
  <AppModal @close="close">
    <input type="text" placeholder="name" v-model="column.name" />
    <select v-model="column.field">
      <option v-for="field in dataFields" :key="field">{{ field }}</option>
    </select>
    <button @click="onSubmit">Create Column</button>
  </AppModal>
</template>

<script lang="ts" setup>
import AppModal from '@/components/AppModal.vue'
import type { Socket } from 'socket.io-client'
import { reactive } from 'vue'
import type { IColumn } from '@/api/column'
import { ETableType } from '@/api/column'
import { ETableEvents } from '@/api/table/table.types'

const props = defineProps<{
  io: Socket
  dataFields: string[]
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const column = reactive<Omit<IColumn, '_id'>>({
  name: '',
  field: '',
  tableType: ETableType.USER,
})

const close = () => {
  emit('close')
}

const onSubmit = () => {
  props.io.emit(ETableEvents.ADD_COLUMN, column)
  close()
}
</script>

<style lang="scss" scoped></style>
