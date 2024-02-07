<template>
  <AppModal @close="close">
    <input type="text" placeholder="name" v-model="user.name" />
    <input type="text" placeholder="surname" v-model="user.surname" />
    <input type="number" placeholder="age" v-model="user.age" />
    <button @click="onSubmit">Create Row</button>
  </AppModal>
</template>

<script lang="ts" setup>
import AppModal from '@/components/AppModal.vue'
import type { Socket } from 'socket.io-client'
import { reactive } from 'vue'
import { ETableEvents } from '@/api/table/table.types'
import type { IUser } from '@/api/user'

const props = defineProps<{
  io: Socket
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const user = reactive<Omit<IUser, '_id'>>({
  name: '',
  surname: '',
  age: 0,
})

const close = () => {
  emit('close')
}

const onSubmit = () => {
  props.io.emit(ETableEvents.ADD_ROW, user)
  close()
}
</script>

<style lang="scss" scoped></style>
