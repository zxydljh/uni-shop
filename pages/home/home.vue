<template>
	<view>
		<!-- 使用自定义的搜索组件 -->
		<view class="search-box">
			<my-search @click="gotoSearch"></my-search>
		</view>

		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goodsId">
					<image :src="item.imageUrl"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-list" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
				<view class="nav-item">
					<image :src="item.iconUrl" class="nav-img"></image>
					<view class="cata-nav-name">{{ item.name }}</view>
				</view>
			</view>
		</view>

		<!-- 楼层 -->
		<view class="floor-list">
			<!-- 楼层 item 顶 -->
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">
				<!-- 楼层标题 -->
				<view class="floor-title">{{ item.categoryItemVO.name }}</view>
				<!-- 楼层图片区域 -->
				<view class="floor-img-grid">
					<navigator v-for="(item2, index2) in item.commodityVOList" :key="index2" :url="item2.linkUrl">
						<image :src="item2.imageUrl" mode="aspectFill" class="commodity-img"></image>
						<view class="commodity-name">{{ item2.name }}</view>
					</navigator>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	// 导入自己封装的 mixin 模块
	import badgeMix from '@/mixins/tabbar-badge.js';
	import {
		getSwiperList,
		getNavList,
		getFloorList
	} from '../../api/home_api/home_api';
	export default {
		// 将 badgeMix 混入到当前的页面中进行使用
		mixins: [badgeMix],
		data() {
			return {
				// 1.1 轮播图的数据列表，默认为空数组
				swiperList: [],
				// 2.1 分类导航数据列表
				navList: [],
				// 3.1 楼层数据
				floorList: []
			};
		},
		onLoad() {
			// 1.2 调用方法，获取轮播图数据
			this.getSwiperListData();
			// 2.2 调用方法，获取分类导航数据
			this.getNavListData();
			// 3.2 调用方法，获取楼层数据
			this.getFloorListData();
		},
		methods: {
			// 点击搜索触发事件
			gotoSearch() {
				console.log('ok');
				// 跳转到search、页面
				uni.navigateTo({
					url: '/subpkg/search/search'
				});
			},

			// 1.3. 获取轮播图数据的方法
			async getSwiperListData() {
				// 1.4 发起请求
				const res = await getSwiperList();
				// console.log('轮播图数据:', res);
				// 1.5 请求失败
				if (res.code !== 1) {
					//  return uni.showToast({
					//  	title: '数据请求失败！',
					// duration: 1500,
					// icon: 'none'
					//  })
					return this.$showMsg();
				}
				// 1.6 请求成功，为 data 中的数据赋值
				this.swiperList = res.data;

				// this.$showMsg('数据加载成功！')
			},


			// 2.3. 获取主页分类导航数据
			async getNavListData() {
				// 2.4 发起请求
				const res = await getNavList();
				console.log('分类导航数据:', res);
				// 2.5 请求失败
				if (res.code !== 1) return this.$showMsg();
				// 2.6 请求成功，为 data 中的数据赋值
				this.navList = res.data;
			},

			// 分类跳转
			navClickHandler(item) {
				console.log('点击分类导航的数据', item);

				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					});
				}
			},


			// 3.3 获取楼层数据的方法
			async getFloorListData() {
				// 3.4 调接口
				const res = await getFloorList();
				console.log('楼层数据', res);
				// 3.5 失败
				if (res.code !== 1) return this.$showMsg();
				// 3.7 对数据进行处理
				res.data.forEach(cate => {
					cate.commodityVOList.forEach(comm => {
						comm.linkUrl = '/subpkg/goods_list/goods_list?query=' + comm.name + '&cid=' +
							comm.id;
					});
				});
				// 3.6 成功 => 赋值
				this.floorList = res.data;
			}
		}
	}
</script>

<style lang="scss">
	// 轮播图
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	// 分类导航
	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-item {
			display: flex;
			flex-direction: column;

			.nav-img {
				width: 128rpx;
				height: 140rpx;
			}

			.cata-nav-name {
				text-align: center;
			}
		}
	}

	/* 楼层列表样式 */
	.floor-list {
		padding: 10px;
	}

	.floor-item {
		margin-bottom: 20px;
	}

	/* 楼层标题样式 */
	.floor-title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	/* 图片网格布局样式 */
	.floor-img-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		/* 两列布局 */
		gap: 10px;
	}

	/* 商品图片样式 */
	.commodity-img {
		width: 100%;
		height: 100px;
		/* 设置固定高度 */
		border-radius: 8px;
	}

	/* 商品名称样式 */
	.commodity-name {
		text-align: center;
		margin-top: 5px;
		font-size: 14px;
		color: #333;
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
</style>