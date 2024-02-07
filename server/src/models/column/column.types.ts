export enum ETableType {
    USER
}

export interface IColumn {
    _id: string
    name: string
    field: string
    tableType: ETableType
}
