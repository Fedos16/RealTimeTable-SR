<template>
  <div>
    <div>
      <button @click="addColumn">Add Column</button>
      <button @click="removeColumn">Remove Column</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>№</th>
          <th v-for="column in columns" :key="column.field">
            <input type="text" :value="column.name" @change="editColumn(column, $event)" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="row._id">
          <td>
            {{ index }}
          </td>
          <td v-for="column in columns" :key="column.field">
            <input
              type="text"
              :value="row[column.field] || ''"
              @change="editRow(row, column.field, $event)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <button @click="addRow">Add Row</button>
      <button @click="removeRow">Remove Row</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IColumn } from '@/api/column'
import type { AnyObject } from '@/stores/table/table.types'

defineProps<{
  columns: IColumn[]
  data: AnyObject[]
}>()

const emit = defineEmits<{
  (event: 'add-column'): void
  (event: 'edit-column', column: IColumn, newValue: string): void
  (event: 'remove-column'): void
  (event: 'add-row'): void
  (event: 'edit-row', row: AnyObject, field: string, newValue: string): void
  (event: 'remove-row'): void
}>()

const addColumn = () => {
  emit('add-column')
}

const editColumn = (column: IColumn, event: Event) => {
  if (!event.currentTarget) return
  emit('edit-column', column, event.currentTarget.value)
}

const removeColumn = () => {
  emit('remove-column')
}

const addRow = () => {
  emit('add-row')
}

const editRow = (row: any, field: string, event: Event) => {
  if (!event.currentTarget) return
  emit('edit-row', row, field, event.currentTarget.value)
}

const removeRow = () => {
  emit('remove-row')
}
</script>

<style scoped></style>
