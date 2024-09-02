import request from "../../utils/request"

export const getSearchList  = (params) => {
	console.log(params)
	return request({
		url: '/search/getSearchList',
		method: 'get',
		data: params
	})
}

export const getSearchPageList  = (params) => {
	console.log(params)
	return request({
		url: '/search/getSearchPageList',
		method: 'get',
		data: params
	})
}