/* eslint-disable */

const state = () => ({
    alerts: []
})

const getters = {
    alerts: (state, getters, rootState) => {
        return state.alerts;
    }
}
const actions = {
    addAlert ({state, commit}, alert) {
        commit('pushAlert', alert);
    }
}
const mutations = {
    pushAlert (state, alert) {
        state.alerts.push({
            ...alert,
            modified_flag: true
        });
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
