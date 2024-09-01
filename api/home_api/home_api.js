import request from "../../utils/request"

export const getSwiperList  = () => {
	return request({
		url: '/home/getSwiperList',
		method: 'GET'
	})
}

export const getNavList  = () => {
	return request({
		url: '/home/getNavList',
		method: 'GET'
	})
}

export const getFloorList  = () => {
	return request({
		url: '/home/getFloorList',
		method: 'GET'
	})
}