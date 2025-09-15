
export const makeLoadingSelector = key=> state=> state.address.loading[key]

export const getAllAddressSelector = state=> state.address.addresses

export const getDefaultAddressSelector = state => state.address.defaultAddress

export const getErrorSelector = state => state.address.error