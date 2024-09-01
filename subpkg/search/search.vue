<template>
	<view class="search-box">
		<!--  focus页面上没有自动聚焦，手机上面可以 -->
		<uni-search-bar @input="input" focus=true cancelButton="none" radius="18">
		</uni-search-bar>

		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.id)">
				<view class="goods-name">{{ item.description }}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>

		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<!-- 使用计算属性的 historys 来渲染数据 -->
			<view class="history-list">
				<uni-tag inverted :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getSearchList
	} from '../../api/search_api/search_api';
	export default {
		data() {
			return {
				// 延时器的 timerId
				timer: null,

				// 搜索关键词
				kw: '',

				// 搜索结果数据
				searchResults: [],

				// 搜索关键词的历史记录
				historyList: []
			};
		},
		onLoad() {
			// 加载本地存储的搜索历史记录
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]');
		},
		methods: {
			// 点击搜索历史，跳转页面
			gotoGoodsList(kw) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + kw
				});
			},
			// 点击搜索建议，跳转到该商品
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item
				});
			},

			input(e) {
				// console.log(e)

				// 防抖（防止每输入一个字符就发送一次请求）
				clearTimeout(this.timer)

				this.timer = setTimeout(() => {
					this.kw = e
					// 根据关键词，查询搜索建议列表
					this.getSearchListData();
				}, 500)
			},

			// 搜索商品建议列表方法
			async getSearchListData() {
				// 判断搜索关键词是否为空
				if (this.kw === '') {
					this.searchResults = [];
					return;
				}

				// 调接口
				const res = await getSearchList({
					keyword: this.kw
				});
				console.log(res);

				if (res.code !== 1) return this.$showMsg();

				this.searchResults = res.data;

				// 查询到搜索建议后，调用 saveSearchHistory 方法报错搜索关键词
				this.saveSearchHistory();
			}, // 保存搜索关键词为历史记录
			saveSearchHistory() {
				// 把搜索关键词 push 到 historyList 数组中
				// this.historyList.push(this.kw); // 更改如下 ⬇
				// 解决历史记录重复问题！！！！！！！！！
				// 1. 讲 Array 数组转化为 Set 对象
				const set = new Set(this.historyList);
				// 2. 调用 Set 对象的 delete 方法，移除对应的元素
				console.log('set', set);
				set.delete(this.kw);
				// 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
				set.add(this.kw);
				// 4. 将 set 对象转化为 Array 数组
				this.historyList = Array.from(set);

				// 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
				uni.setStorageSync('kw', JSON.stringify(this.historyList));
			},
			// 清空搜索历史
			clean() {
				// 清空 data 中保存的搜索历史
				this.historyList = [];
				// 清空本地存储中记录的搜索历史
				uni.setStorageSync('kw', '[]');
			}
		},
		computed: {
			historys() {
				// 注意：由于数组是引用类型，所以不要直接基于原数组调用reverse方法，以免修改原数组中元素的顺序
				// 而是应该新建一个内存无关的数组，再进行 reverse 翻转
				return [...this.historyList].reverse();
			}
		}
	};
</script>

<style lang="scss">
	// 覆盖源码的配置
	.uni-searchbar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		position: relative;
		padding: 16rpx;
		/* 将默认的 #FFFFFF */
		background-color: #f79c1f;
	}

	// 搜索页面吸顶
	.search-box {
		// 定位
		position: sticky;
		// 定位的位置
		top: 0;
		// 层级
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-name {
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 文本溢出后，使用 ... 代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	// 搜索历史样式
	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
</style>