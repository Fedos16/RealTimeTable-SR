<template>
  <AppModal @close="close">
    <select v-model="dataId">
      <option v-for="item in data" :key="item._id" :value="item._id">
        {{ item.name }}
      </option>
    </select>
    <button @click="onSubmit">Remove Row</button>
  </AppModal>
</template>

<script lang="ts" setup>
import AppModal from '@/components/AppModal.vue'
import type { Socket } from 'socket.io-client'
import { ref } from 'vue'
import { ETableEvents } from '@/api/table/table.types'
import type { AnyObject } from '@/stores/table/table.types'

const props = defineProps<{
  io: Socket
  data: AnyObject[]
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const dataId = ref<AnyObject['_id']>('')

const close = () => {
  emit('close')
}

const onSubmit = () => {
  props.io.emit(ETableEvents.REMOVE_ROW, dataId.value)
  close()
}
</script>

<style lang="scss" scoped></style>
