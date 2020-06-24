const TRIP_ORDERS_CLIENT = (state, response) => {
    state.ordersClient = response
}

const TRIP_LOADING_SITE = (state, response) => {
    state.ordersLoadingSite = response
}

export {
    TRIP_ORDERS_CLIENT
}

