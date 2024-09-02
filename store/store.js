// store/store.js
import { createStore } from 'vuex'
import moduleCart from './cart.js'
import modeleUser from './user.js'

const store = createStore({
  modules: {
    m_cart: moduleCart,
	m_user: modeleUser
  }
})

export default store
