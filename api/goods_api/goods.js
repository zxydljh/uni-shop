import request from "../../utils/request"

export const getProductById = (id) => {
	return request({
		url: `/product/getProductById/${id}`,
		method: 'GET'
	})
}