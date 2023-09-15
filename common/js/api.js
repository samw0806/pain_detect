//测试模糊搜索
const universityList = [{
		id: 1,
		name: "北京大学"
	},
	{
		id: 2,
		name: "北京邮电大学"
	},
	{
		id: 3,
		name: "北京师范大学"
	},
	{
		id: 4,
		name: "北京理工大学"
	},
	{
		id: 5,
		name: "北京航空航天大学"
	},
	{
		id: 6,
		name: "北京工业大学"
	},
	{
		id: 7,
		name: "北京交通大学"
	},
	{
		id: 8,
		name: "北京科技大学"
	},
	{
		id: 9,
		name: "北京外国语大学"
	},
	{
		id: 10,
		name: "北京联合大学 "
	}
]

/**生成随机值 */
const getRandomNumber = () => Math.random().toString(16).slice(2);


export function httpGetList(params) {
	const {
		pageNum,
		pageSize,
		keyword
	} = params
	return new Promise((resovle) => {
		let data = []
		for (let i = 0; i < pageNum; i++) {
			let list = universityList.map(item => ({
				name: item.name,
				id: getRandomNumber()
			}))
			data = [...data, ...list]
		}
		data = data.filter(item => item.name.includes(keyword))
		resovle({
			code: 200,
			msg: 'success',
			data
		})
	})
}
