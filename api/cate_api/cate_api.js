import request from "../../utils/request"

export const getCateMultiDirList  = () => {
	return request({
		url: '/category/getCateMultiDirList',
		method: 'GET'
	})
}