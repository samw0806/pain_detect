<template>
	<view class="index">
		<view class="search" v-if="show">
			<scroll-view class="list" scroll-y v-if="list.length > 0" :lower-threshold="10" @scrolltolower="scrolltolower">
				<view
					v-for="item in list"
					:key="item[valueName]"
					class="item"
					:style="[setItemStyle]"
					hover-class="item-hover"
					hover-start-time="0"
					hover-stay-time="100"
					@click="click(item)"
				>
					{{ item[labelName] }}
				</view>
			</scroll-view>
			<view class="empty" v-else>{{ noData }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		/** 展示整体组件 */
		show: {
			type: Boolean,
			default: false
		},
		/** 需要展示的列表 */
		list: {
			type: Array,
			default: () => []
		},
		/** 自定义label */
		labelName: {
			type: String,
			default: 'label'
		},
		/** 自定义value */
		valueName: {
			type: String,
			default: 'value'
		},
		/** 无内容时显示的内容  */
		noData: {
			type: String,
			default: '暂无匹配内容...'
		},
		/** item的对齐样式 */
		align: {
			type: String,
			default: 'left',
			validator: value => {
				return ['left', 'center', 'right'].includes(value);
			}
		},
		/** 自定义item展示样式 */
		customStyle: {
			type: Object,
			default: () => ({})
		}
	},
	computed: {
		/** 设置item的样式 */
		setItemStyle() {
			const { align, customStyle } = this;
			return {
				textAlign: align,
				...customStyle
			};
		}
	},
	methods: {
		/** item点击事件 */
		click(item) {
			this.$emit('select', { ...item });
		},
		/** 触底加载下一页 */
		scrolltolower() {
			this.$emit('scrolltolower');
		}
	}
};
</script>

<style lang="scss" scoped>
.index {
	width: 100%;
	position: absolute;
	z-index: 9;
}

.search {
	.list,
	.empty {
		padding: 10rpx;
		background-color: #fff;
		box-shadow: 0 0 10rpx #888;
		border-radius: 10rpx;
	}

	.list {
		box-sizing: border-box;
		max-height: 300rpx;
		overflow: hidden;

		.item {
			padding: 8rpx 0;
			font-size: 26rpx;
			margin: 5rpx 0;

			&-hover {
				background-color: #f5f5f5;
			}
		}
	}
	.empty {
		height: 80rpx;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>