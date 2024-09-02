// store/store.js
import { createStore } from 'vuex'
import moduleCart from './cart.js'

const store = createStore({
  modules: {
    m_cart: moduleCart,
  }
})

export default store
