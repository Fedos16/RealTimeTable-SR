<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { api } from '@/api'
import { ETableType, IColumn } from '@/api/column'
import { io } from 'socket.io-client'
import AppTable from '@/components/AppTable.vue'
import { useTableStore } from '@/stores/table/table.store'
import CreateColumnModal from '@/components/modals/CreateColumnModal.vue'
import { ETableEvents } from '@/api/table/table.types'
import RemoveColumnModal from '@/components/modals/RemoveColumnModal.vue'
import type { AnyObject } from '@/stores/table/table.types'
import AddRowModal from '@/components/modals/AddRowModal.vue'
import RemoveRowModal from '@/components/modals/RemoveRowModal.vue'

const tableStore = useTableStore()

const socket = io('http://localhost:5000')

onMounted(async () => {
  tableStore.setColumns(await api.column.getColumnsByType(ETableType.USER))
  tableStore.setData(await api.user.getUsers())

  socket.on(ETableEvents.COLUMN_ADDED, (column: IColumn) => {
    tableStore.addColumn(column)
  })
  socket.on(ETableEvents.COLUMN_REMOVED, (columnId: string) => {
    tableStore.removeColumn(columnId)
  })
  socket.on(ETableEvents.COLUMN_EDITED, (column: IColumn) => {
    tableStore.editColumn(column)
  })
  socket.on(ETableEvents.ROW_ADDED, (row: AnyObject) => {
    tableStore.addRow(row)
  })
  socket.on(ETableEvents.ROW_REMOVED, (rowId: string) => {
    tableStore.removeRow(rowId)
  })
  socket.on(ETableEvents.ROW_EDITED, (row: AnyObject) => {
    tableStore.editRow(row)
  })
})

const dataFields = computed<string[]>(() => Object.keys(tableStore.data?.[0] || {}))

const createColumnModalActive = ref<boolean>(false)
const closeCreateColumnModal = () => {
  createColumnModalActive.value = false
}
const openCreateColumnModal = () => {
  createColumnModalActive.value = true
}

const removeColumnModalActive = ref<boolean>(false)
const closeRemoveColumnModal = () => {
  removeColumnModalActive.value = false
}
const openRemoveColumnModal = () => {
  removeColumnModalActive.value = true
}

const addRowModalActive = ref<boolean>(false)
const closeAddRowModal = () => {
  addRowModalActive.value = false
}
const openAddRowModal = () => {
  addRowModalActive.value = true
}

const removeRowModalActive = ref<boolean>(false)
const closeRemoveRowModal = () => {
  removeRowModalActive.value = false
}
const openRemoveRowModal = () => {
  removeRowModalActive.value = true
}

const onEditColumn = (column: IColumn, newName: string) => {
  socket.emit(ETableEvents.EDIT_COLUMN, {
    ...column,
    name: newName,
  })
}

const onEditRow = (row: AnyObject, field: string, newValue: string) => {
  socket.emit(ETableEvents.EDIT_ROW, {
    ...row,
    [field]: newValue,
  })
}
</script>

<template>
  <div>
    <CreateColumnModal
      v-if="createColumnModalActive"
      @close="closeCreateColumnModal"
      :data-fields="dataFields"
      :io="socket"
    />
    <RemoveColumnModal
      v-if="removeColumnModalActive"
      @close="closeRemoveColumnModal"
      :columns="tableStore.columns"
      :io="socket"
    />
    <AddRowModal v-if="addRowModalActive" @close="closeAddRowModal" :io="socket" />
    <RemoveRowModal
      v-if="removeRowModalActive"
      @close="closeRemoveRowModal"
      :io="socket"
      :data="tableStore.data"
    />
    <AppTable
      :columns="tableStore.columns"
      :data="tableStore.data"
      @add-column="openCreateColumnModal"
      @remove-column="openRemoveColumnModal"
      @add-row="openAddRowModal"
      @remove-row="openRemoveRowModal"
      @edit-column="onEditColumn"
      @edit-row="onEditRow"
    />
  </div>
</template>

<style lang="scss" scoped></style>
