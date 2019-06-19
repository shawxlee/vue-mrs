<template>
	<nav class="navbar navbar-expand-lg border-bottom toolbar">
		<!-- 筛选器 -->
		<div class="toolbar-toggler" data-toggle="collapse" data-target="#screen-collapse">
			<button class="navbar-toggler px-0" :class="{active: !screenHidden}" type="button">
				<i class="fas fa-sort-amount-down"></i>
			</button>
			<!-- 筛选信息 -->
			<template v-if="screenHidden">
				<span v-show="sortOrder == 1 && !isReverse">最早上映</span>
				<span v-show="sortOrder == 1 && isReverse">最近上映</span>
				<span v-show="sortOrder == 2 && !isReverse">最高评分</span>
				<span v-show="sortOrder == 2 && isReverse">最低评分</span>
				<span v-show="sortOrder == 3 && !isReverse">最近更新</span>
				<span v-show="sortOrder == 3 && isReverse">最早更新</span>
				<span v-for="item in activeTags"> · {{ item }}</span>
			</template>
		</div>
		<!-- 搜索框 -->
		<form class="toolbar-form">
			<transition name="stretch">
				<input class="form-control rounded-pill" :style="[isFocus ? '' : {width: searchText.length + 4 + 'rem'}]" type="text" placeholder="输入关键词搜索" v-if="showSearch" @focus.passive="isFocus = true" @blur.passive="isFocus = false" v-model.trim="searchText" v-focus>
			</transition>
			<button class="navbar-toggler" :class="{active: isFocus}" type="button" @mousedown.prevent @click.passive="onSearch">
				<i class="fas fa-times-circle" v-if="searchText.length > 0"></i>
				<i class="fas fa-search" v-else></i>
			</button>
		</form>

		<!-- 筛选面板 -->
		<div class="collapse navbar-collapse px-1 pt-3 pb-1" id="screen-collapse">
			<div class="container-fluid p-0">
				<div class="row no-gutters justify-content-between">
					<!-- 排序按钮 -->
					<div class="col-4 px-1" v-for="(item, index) in sorts">
						<v-touch class="btn btn-sm rounded-pill px-2" :class="{active: sortOrder == index + 1}" @tap="sortOrder = index + 1; isReverse = !isReverse">按{{ item }}排序<span>
							<i class="fas fa-caret-left mr-0" :class="{disabled: !isReverse}"></i>
							<i class="fas fa-caret-right ml-0" :class="{disabled: isReverse}"></i>
						</span></v-touch>
					</div>
					<div class="w-100"><hr></div>
					<!-- 过滤标签 -->
					<div class="col-2 p-1" v-for="(item, index) in tags" v-if="moreHidden ? index < 17 : true">
						<v-touch class="btn btn-sm" :class="{active: item.isActive}" @tap="onTag(item)">{{ item.tag }}</v-touch>
					</div>
					<div class="col-2 p-1" v-if="moreHidden">
						<v-touch class="btn btn-sm more" @tap="moreHidden = false">更多</v-touch>
					</div>
					<div class="w-100 mt-1 text-center">
						<v-touch class="navbar-toggler" :class="{show: activeTags.length > 0}" @tap="clearTags">
							<i class="fas fa-times-circle mt-1"></i> 清空标签
						</v-touch>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
	export default {
		name: 'tool-bar',
		data() {
			return {
				screenHidden: true,
				sortOrder: 1,
				isReverse: false,
				activeTags: [],
				showSearch: false,
				isFocus: false,
				searchText: '',
				sorts: ['年份', '评分', '更新'],
				tags: [
				{
					tag: '变异',
					isActive: false
				},
				{
					tag: '病毒',
					isActive: false
				},
				{
					tag: '穿越',
					isActive: false
				},
				{
					tag: '怪物',
					isActive: false
				},
				{
					tag: '基因',
					isActive: false
				},
				{
					tag: '末日',
					isActive: false
				},
				{
					tag: '奇幻',
					isActive: false
				},
				{
					tag: '烧脑',
					isActive: false
				},
				{
					tag: '神话',
					isActive: false
				},
				{
					tag: '太空',
					isActive: false
				},
				{
					tag: '探险',
					isActive: false
				},
				{
					tag: '逃生',
					isActive: false
				},
				{
					tag: '外星',
					isActive: false
				},
				{
					tag: '未来',
					isActive: false
				},
				{
					tag: '灾难',
					isActive: false
				},
				{
					tag: '哲学',
					isActive: false
				},
				{
					tag: '罪案',
					isActive: false
				},
				{
					tag: '爱情',
					isActive: false
				},
				{
					tag: '惊悚',
					isActive: false
				},
				{
					tag: '历史',
					isActive: false
				},
				{
					tag: '魔鬼',
					isActive: false
				},
				{
					tag: '人性',
					isActive: false
				},
				{
					tag: '丧尸',
					isActive: false
				},
				{
					tag: '同性',
					isActive: false
				},
				{
					tag: '无限',
					isActive: false
				},
				{
					tag: '血腥',
					isActive: false
				},
				{
					tag: '战争',
					isActive: false
				},
				{
					tag: '致郁',
					isActive: false
				},
				{
					tag: '重口',
					isActive: false
				},
				{
					tag: '宗教',
					isActive: false
				}
				],
				moreHidden: true
			}
		},
		directives: {
			focus: {
				inserted(el) {
					el.focus();
				}
			}
		},
		methods: {
			// 清空所有选中的标签
			clearTags() {
				let i, len;
				for (i = 0, len = this.tags.length; i < len; i++) {
					this.tags[i].isActive = false;
				}

				this.activeTags.splice(0);
			},
			// 清空搜索文本，收起并隐藏搜索框
			hideSearch() {
				this.searchText = '';
				this.isFocus = false;
				this.showSearch = false;
			},
			// 点击按钮展开搜索框/清除搜索文本
			onSearch() {
				if (!this.showSearch) {
					this.clearTags();
					this.showSearch = true;
				}

				if (this.searchText.length > 0) {
					document.getElementsByTagName('input')[0].focus();
					this.searchText = '';
				}
			},
			// 点击切换标签激活状态；若选中则添加到筛选信息中，否则从中删除；激活时关闭搜索框
			onTag(item) {
				item.isActive = !item.isActive;
				if (item.isActive) {
					this.hideSearch();
					this.activeTags.push(item.tag);
				} else {
					var atIndex = this.activeTags.indexOf(item.tag);
					this.activeTags.splice(atIndex, 1);
				}
			}
		}
	}
</script>

<style>
.toolbar {
	position: fixed;
	top: 3rem;
	right: 0;
	left: 0;
	z-index: 9;
	background-color: white;
}
/* 搜索框 */
.toolbar-form {
	position: absolute;
	top: 0;
	right: 0;
	width: calc(100% - 8rem);
	margin: 0;
	padding: 0;
}
.toolbar-form .form-control {
	position: absolute;
	top: .2375rem;
	right: 1rem;
	width: 100%;
	transition: width .2s linear;
}
.toolbar-form .navbar-toggler {
	position: absolute;
	top: .5rem;
	right: 1rem;
}
.toolbar-form .fa-times-circle {
	position: relative;
	bottom: .1rem;
	font-size: 1rem;
}
/* 过渡：展开/收起 */
.stretch-enter,
.stretch-leave-to {
	width: 15%;
	opacity: 0;
}
.stretch-enter-to,
.stretch-leave {
	width: 100%;
	opacity: 1;
}
.stretch-enter-active {
	transition: all .1s linear;
}
.stretch-leave-active {
	transition: all .3s linear;
}
/* 筛选器 */
.toolbar-toggler {
	width: calc(100% - 2.3rem);
	font-size: 1rem;
	color: #4f94cd;
}
.toolbar-toggler .navbar-toggler {
	color: #4f94cd;
}
.toolbar-toggler .active {
	color: #1c1c1c;
}
/* 筛选面板 */
#screen-collapse .btn {
	color: #4f94cd;
}
#screen-collapse .btn-sm {
	font-size: .9rem;
}
#screen-collapse span {
	display: inline-block;
	width: 1rem;
	padding: 0;
	margin: 0;
	font-size: .8rem;
	line-height: 1;
	transform: rotate(90deg);
}
#screen-collapse .active {
	color: white;
}
#screen-collapse .active .disabled {
	color: #a9a9a9;
}
#screen-collapse .more {
	color: #a9a9a9;
	background-color: #e8e8e8;
	border-color: #e8e8e8;
}
#screen-collapse .navbar-toggler {
	font-size: 1rem;
	opacity: 0;
}
#screen-collapse .show {
	opacity: 1;
}
</style>