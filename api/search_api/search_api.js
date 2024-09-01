import request from "../../utils/request"

export const getSearchList  = (params) => {
	console.log(params)
	return request({
		url: '/search/getSearchList',
		method: 'get',
		data: params
	})
}