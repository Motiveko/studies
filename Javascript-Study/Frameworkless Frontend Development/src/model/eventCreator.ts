const EVENT_TYPES = Object.freeze({
  ITEM_ADDED: 'ITEM_ADDED',
  ITEM_UPDATED: 'ITEM_UPDATED',
  ITEM_DELETED: 'ITEM_DELETED',
  ITEM_TOGGLED: 'ITEM_TOGGLED',
  COMPLETED_ITEM_DELETED: 'COMPLETED_ITEM_DELETED',
  FILTER_CHANGED: 'FILTER_CHANGED'
})

export default {
  addItem: (text: string) => ({
    type: EVENT_TYPES.ITEM_ADDED,
    payload: text
  }),
  updateItem: (text: string, index: number) => ({
    type: EVENT_TYPES.ITEM_UPDATED,
    payload: {text, index}
  }),
  deleteItem: (index: number) => ({
    type: EVENT_TYPES.ITEM_DELETED,
    payload: index
  }),
  toggleItem: (index: number) => ({
    type: EVENT_TYPES.ITEM_TOGGLED,
    payload: index
  }),
  clearCompleted: () => ({
    type: EVENT_TYPES.COMPLETED_ITEM_DELETED
  }),
  changeFilter: (filter: 'All' | 'Active' | 'Completed') => ({
    type: EVENT_TYPES.FILTER_CHANGED,
    payload: filter
  })

}