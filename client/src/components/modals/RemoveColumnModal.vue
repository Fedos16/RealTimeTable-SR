<template>
  <AppModal @close="close">
    <select v-model="columnId">
      <option v-for="column in columns" :key="column._id" :value="column._id">
        {{ column.name }}
      </option>
    </select>
    <button @click="onSubmit">Remove Column</button>
  </AppModal>
</template>

<script lang="ts" setup>
import AppModal from '@/components/AppModal.vue'
import type { Socket } from 'socket.io-client'
import { ref } from 'vue'
import type { IColumn } from '@/api/column'
import { ETableEvents } from '@/api/table/table.types'

const props = defineProps<{
  io: Socket
  columns: IColumn[]
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const columnId = ref<Pick<IColumn, '_id'>>('')

const close = () => {
  emit('close')
}

const onSubmit = () => {
  props.io.emit(ETableEvents.REMOVE_COLUMN, columnId.value)
  close()
}
</script>

<style lang="scss" scoped></style>
