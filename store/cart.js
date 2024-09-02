// 购物车模块
const moduleCart = {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter(x => x.goods_id !== goods_id);
      // 调用 saveToStorage 方法
      this.commit('m_cart/saveToStorage');
    },
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id);
      if (findResult) {
        findResult.goods_count = goods.goods_count;
        this.commit('m_cart/saveToStorage');
      }
    },
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id);
      if (findResult) {
        findResult.goods_state = goods.goods_state;
        this.commit('m_cart/saveToStorage');
      }
    },
    addToCart(state, goods) {
      const finResult = state.cart.find(x => x.goods_id === goods.goods_id);
      if (!finResult) {
        state.cart.push(goods);
      } else {
        finResult.goods_count++;
      }
      this.commit('m_cart/saveToStorage');
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart));
    },
    updateAllGoodsState(state, newState) {
      state.cart.forEach(x => x.goods_state = newState);
      this.commit('m_cart/saveToStorage');
    }
  },
  getters: {
    total(state) {
      return state.cart.reduce((total, item) => total + item.goods_count, 0);
    },
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total + item.goods_count, 0);
    },
    checkedGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total + item.goods_count * item.goods_price, 0).toFixed(2);
    }
  }
};

export default moduleCart;
