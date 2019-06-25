<template>
	<div class="container-fluid p-0">
		<!-- 顶部导航栏 -->
		<nav class="navbar navbar-expand-lg border-bottom fixed-top header" :class="{'header-up': headerHidden}" @click.passive="onFold">
			<span class="navbar-text mb-0 h4">全部影片</span>
			<!-- 模式切换 -->
			<ul class="nav nav-pills">
				<li class="nav-item ml-3">
					<a class="nav-link rounded-0 px-0 active" data-toggle="pill" href="#full-mode">全览模式</a>
				</li>
				<li class="nav-item ml-3">
					<a class="nav-link rounded-0 px-0" data-toggle="pill" href="#mini-mode">简约模式</a>
				</li>
				<li class="nav-item ml-3">
					<a class="nav-link rounded-0 px-0" data-toggle="pill" href="#series-mode">系列模式</a>
				</li>
			</ul>
		</nav>

		<!-- 工具栏 -->
		<nav class="navbar navbar-expand-lg border-bottom toolbar" :class="{'toolbar-up': headerHidden}">
			<!-- 筛选器 -->
			<div class="toolbar-toggler" data-toggle="collapse" data-target="#screen-collapse">
				<button class="navbar-toggler pl-0 pr-1" :class="{active: !screenHidden}" type="button">
					<i class="fas fa-sort-amount-down"></i>
				</button>
				<!-- 筛选信息 -->
				<template v-if="screenHidden">
					<span v-show="sortOrder === 1 && !isReverse">最早上映</span>
					<span v-show="sortOrder === 1 && isReverse">最近上映</span>
					<span v-show="sortOrder === 2 && !isReverse">最高评分</span>
					<span v-show="sortOrder === 2 && isReverse">最低评分</span>
					<span v-show="sortOrder === 3 && !isReverse">最近更新</span>
					<span v-show="sortOrder === 3 && isReverse">最早更新</span>
					<span v-for="(item, index) in activeTags" :key="'activeTag_' + index"> · {{ item }}</span>
				</template>
			</div>
			<!-- 搜索框 -->
			<form class="toolbar-form">
				<transition name="stretch">
					<input class="form-control rounded-pill" :style="[isFocus ? '' : {width: searchText.length + 4 + 'rem'}]" type="text" placeholder="输入关键词搜索" v-if="showSearch" id="search-input" v-model.trim="searchText" @focus.passive="isFocus = true" @blur.passive="isFocus = false" v-focus>
				</transition>
				<button class="navbar-toggler" :class="{active: isFocus}" type="button" @mousedown.prevent @click.passive="onSearch">
					<i class="fas fa-times-circle" v-if="searchText.length > 0" key="times-icon"></i>
					<i class="fas fa-search" v-else key="search-icon"></i>
				</button>
			</form>

			<!-- 筛选面板 -->
			<div class="collapse navbar-collapse px-1 pt-3 pb-1" id="screen-collapse">
				<div class="row no-gutters justify-content-between">
					<!-- 排序按钮 -->
					<div class="col-4 px-1" v-for="(item, index) in sorts" :key="'sort_' + index">
						<v-touch class="btn btn-sm rounded-pill px-2" :class="{active: sortOrder === index + 1}" @tap="sortOrder = index + 1; isReverse = !isReverse">按{{ item }}排序<span>
							<i class="fas fa-caret-left" :class="{disabled: !isReverse}"></i>
							<i class="fas fa-caret-right" :class="{disabled: isReverse}"></i>
						</span></v-touch>
					</div>
					<div class="w-100"><hr></div>
					<!-- 过滤标签 -->
					<div class="col-2 p-1" v-for="(item, index) in filterTags" :key="'filterTag_' + index">
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
		</nav>

		<!-- 更新状态栏 -->
		<transition name="pull">
			<div class="divider" v-if="showStatus">
				<template v-if="isSuccess">
					<hr>&nbsp;&nbsp; 更新成功 <i class="fas fa-check-circle"></i> &nbsp;&nbsp;<hr>
				</template>
				<template v-else-if="isError">
					<hr>&nbsp;&nbsp; 更新失败 <i class="fas fa-exclamation-circle"></i> &nbsp;&nbsp;<hr>
				</template>
				<template v-else>
					<hr>&nbsp;&nbsp; 正在更新 <i class="fas fa-sync-alt"></i> &nbsp;&nbsp;<hr>
				</template>
			</div>
		</transition>

		<!-- 电影列表 -->
		<v-touch class="tab-content" @tap="onFold">
			<!-- 全览模式 -->
			<v-touch class="tab-pane active" id="full-mode" @swipeup="swipeUp" @swipedown="swipeDown">
				<v-touch class="film-card my-1 p-3" v-for="item in filterFilms" :key="'filterFilm_' + item.id" @press="filmOrder = item.id">
					<div class="d-flex">
						<!-- 海报 -->
						<div class="film-card-poster">
							<img :src="baseUrl + item.posterUrl" :alt="item.transName" width="100%" height="100%" @click.passive="posterOrder = item.id">
							<!-- 评分 -->
							<a class="badge" :style="{'background-color': getColor(item)}" :href="item.doubanUrl" target="_blank">{{ item.score }}</a>

							<!-- 查看大图 -->
							<div class="film-card-poster-large p-3 pb-1" v-show="posterOrder === item.id" @click.self="posterOrder = 0">
								<img :src="baseUrl + item.posterUrl" :alt="item.transName" width="100%" @click.passive="posterOrder = 0">
								<br><br>
								<a class="btn mb-1" :href="baseUrl + item.posterUrl" :download="item.transName" @click.passive="onSave">保存图片</a>
								<br>
								<p :class="{show: showSaved}">图片 <span>{{ item.transName }}</span> 已保存到手机相册</p>
							</div>
						</div>
						<!-- 信息 -->
						<div class="film-card-info pl-2">
							<h5>{{ item.transName }}</h5>
							<h6>{{ item.offiName }}</h6>
							<div class="d-flex">
								<p>类型：</p>
								<p>{{ item.type }}</p>
							</div>
							<div class="d-flex">
								<p>年份：</p>
								<p>{{ item.year }}</p>
							</div>
							<div class="d-flex">
								<p>地区：</p>
								<p>{{ item.country }}</p>
							</div>
							<div class="d-flex">
								<p>导演：</p>
								<p>{{ item.director }}</p>
							</div>
							<div class="d-flex">
								<p>主演：</p>
								<p>{{ item.star }}</p>
							</div>
						</div>
					</div>
					<!-- 评语 -->
					<div class="d-flex mt-2 px-2 film-card-comment">
						<p><i class="fas fa-comment-dots mr-2"></i></p>
						<p>{{ item.comment }}</p>
					</div>
					<!-- 选项 -->
					<div class="d-flex justify-content-center film-card-options" v-if="filmOrder === item.id">
						<v-touch class="option mx-3" @tap="onOption(1)">
							<a class="btn px-0"><i class="fas fa-plus"></i></a>
							<br>
							加入待看
						</v-touch>
						<v-touch class="option mx-3" @tap="onOption(2)">
							<a class="btn px-0"><i class="fas fa-check"></i></a>
							<br>
							标记已看
						</v-touch>
						<v-touch class="option mx-3" @tap="onOption(3)">
							<a class="btn px-0"><i class="fas fa-thumbtack"></i></a>
							<br>
							添加笔记
						</v-touch>
						<v-touch class="option mx-3" @tap="onOption(4)">
							<a class="btn px-0"><i class="fas fa-pen"></i></a>
							<br>
							撰写长评
						</v-touch>
					</div>
				</v-touch>
				<!-- 底部分割线 -->
				<div class="divider" v-if="films.length > 0">
					<template v-if="filterFilms.length > 0">
						<hr>&nbsp;&nbsp; 已到底部 <i class="fas fa-hourglass-end"></i> &nbsp;&nbsp;<hr>
					</template>
					<template v-else>
						<hr>&nbsp;&nbsp; 暂无匹配 <i class="fas fa-ban"></i> &nbsp;&nbsp;<hr>
					</template>
				</div>
			</v-touch>

			<!-- 简约模式 -->
			<v-touch class="tab-pane accordion" id="mini-mode" @swipeup="swipeUp" @swipedown="swipeDown">
				<v-touch class="film-card m-1" v-for="item in filterFilms" :key="'filterFilm_' + item.id" @press="filmOrder = item.id">
					<!-- 主体 -->
					<div class="accordion-toggler px-3 shadow-sm collapsed" data-toggle="collapse" :data-target="'#info_' + item.id">
						<h5><a class="badge mr-2" :style="{'background-color': getColor(item)}" :href="item.doubanUrl" target="_blank">{{ item.score }}</a>{{ item.transName }} <small>({{ item.year }})</small></h5>
						<p><i class="fas fa-tag mr-2 mb-0"></i>{{ item.type }}</p>
					</div>
					<!-- 展开详情 -->
					<div class="collapse shadow-sm" :id="'info_' + item.id" data-parent="#mini-mode">
						<div class="d-flex p-3">
							<!-- 海报 -->
							<div class="film-card-poster">
								<img :src="baseUrl + item.posterUrl" :alt="item.transName" width="100%" height="100%" @click.passive="posterOrder = item.id">

								<!-- 查看大图 -->
								<div class="film-card-poster-large p-3 pb-1" v-show="posterOrder === item.id" @click.self="posterOrder = 0">
									<img :src="baseUrl + item.posterUrl" :alt="item.transName" width="100%" @click.passive="posterOrder = 0">
									<br><br>
									<a class="btn mb-1" :href="baseUrl + item.posterUrl" :download="item.transName" @click.passive="onSave">保存图片</a>
									<br>
									<p :class="{show: showSaved}">图片 <span>{{ item.transName }}</span> 已保存到手机相册</p>
								</div>
							</div>
							<!-- 信息 -->
							<div class="film-card-info pl-2">
								<h6>{{ item.offiName }}</h6>
								<div class="d-flex">
									<p>地区：</p>
									<p>{{ item.country }}</p>
								</div>
								<div class="d-flex">
									<p>导演：</p>
									<p>{{ item.director }}</p>
								</div>
								<div class="d-flex">
									<p>主演：</p>
									<p>{{ item.star }}</p>
								</div>
								<div class="film-card-comment mt-2 pl-2">
									<i class="fas fa-comment-dots mr-2"></i>{{ item.comment }}
								</div>
							</div>
						</div>
					</div>
					<!-- 选项 -->
					<div class="film-card-options" v-if="filmOrder === item.id">
						<div class="row no-gutters">
							<v-touch class="col-3 p-auto" @tap="onOption(1)">
								<a class="btn px-0"><i class="fas fa-plus"></i></a>
								<br>
								加入待看
							</v-touch>
							<v-touch class="col-3 p-auto" @tap="onOption(2)">
								<a class="btn px-0"><i class="fas fa-check"></i></a>
								<br>
								标记已看
							</v-touch>
							<v-touch class="col-3 p-auto" @tap="onOption(3)">
								<a class="btn px-0"><i class="fas fa-thumbtack"></i></a>
								<br>
								添加笔记
							</v-touch>
							<v-touch class="col-3 p-auto" @tap="onOption(4)">
								<a class="btn px-0"><i class="fas fa-pen"></i></a>
								<br>
								撰写长评
							</v-touch>
						</div>
					</div>
				</v-touch>
				<!-- 底部分割线 -->
				<div class="divider" v-if="films.length > 0">
					<template v-if="filterFilms.length > 0">
						<hr>&nbsp;&nbsp; 已到底部 <i class="fas fa-hourglass-end"></i> &nbsp;&nbsp;<hr>
					</template>
					<template v-else>
						<hr>&nbsp;&nbsp; 暂无匹配 <i class="fas fa-ban"></i> &nbsp;&nbsp;<hr>
					</template>
				</div>
			</v-touch>

			<!-- 系列模式 -->
			<div class="tab-pane" id="series-mode">
				<div class="row no-gutters">
					<div class="col-4">
						<!-- 导航 -->
						<div class="list-group border-right" :class="{'series-up': headerHidden}" id="series-nav">
							<a class="list-group-item list-group-item-action p-2 rounded-0 border-left-0 border-right-0" :href="'#series_' + item.seriesId" v-for="item in filterSeries" :key="'filterSeries_' + item.seriesId">
								<!-- 有系列 -->
								<template v-if="item.filmList.length > 1">
									<span><i class="fas fa-caret-right"></i> {{ item.seriesName }}</span> <span class="badge badge-pill">{{ item.filmList.length }}</span>
									<br>
									{{ item.firstYear }} - {{ item.filmList[item.filmList.length - 1].year }}
									<br>
									系列最佳 {{ item.topScore }} 分
								</template>
								<!-- 无系列 -->
								<template v-else>
									<span>{{ item.seriesName }}</span>
									<br>
									{{ item.firstYear }} / {{ item.topScore }}
								</template>
							</a>
						</div>
					</div>
					<div class="col-8">
						<!-- 内容 -->
						<v-touch class="series-content" @swipeup="swipeUp" @swipedown="swipeDown">
							<div class="film-card my-1" v-for="item in filterSeries" :key="'filterSeries_' + item.seriesId">
								<div class="series-id" :id="'series_' + item.seriesId"></div>
								<div class="row no-gutters p-2">
									<v-touch class="col-6 my-2 position-relative" v-for="(film, index) in item.filmList" :key="'film_' + film.id" @press="detailOrder = 0; filmOrder = film.id">
										<!-- 海报 -->
										<div class="film-card-poster mx-auto mb-2">
											<img :src="baseUrl + film.posterUrl" :alt="film.transName" width="100%" height="100%" @click.passive="detailOrder = film.id">
											<a class="badge" :style="{'background-color': getColor(film)}" :href="film.doubanUrl" target="_blank">{{ film.score }}</a>
										</div>
										<!-- 标题 -->
										<h6 class="mx-auto" @click.passive="detailOrder = film.id">{{ film.transName }} <span>({{ film.year }})</span></h6>
										<!-- 编号 -->
										<span class="badge rounded-0"><span>No.</span>{{ index + 1 }}</span>
										<!-- 选项 -->
										<div class="film-card-options" v-if="filmOrder === film.id">
											<v-touch class="option my-3" @tap="onOption(1)">
												<a class="btn px-0 mr-2"><i class="fas fa-plus"></i></a>加入待看
											</v-touch>
											<v-touch class="option my-3" @tap="onOption(2)">
												<a class="btn px-0 mr-2"><i class="fas fa-check"></i></a>标记已看
											</v-touch>
											<v-touch class="option my-3" @tap="onOption(3)">
												<a class="btn px-0 mr-2"><i class="fas fa-thumbtack"></i></a>添加笔记
											</v-touch>
											<v-touch class="option my-3" @tap="onOption(4)">
												<a class="btn px-0 mr-2"><i class="fas fa-pen"></i></a>撰写长评
											</v-touch>
										</div>

										<!-- 查看详情 -->
										<transition name="slide">
											<div class="series-content-detail" :class="{'detail-up': showPoster}" v-if="detailOrder === film.id">
												<!-- 底图 -->
												<img :class="{scale: showPoster}" :src="baseUrl + film.posterUrl" :alt="film.transName" width="100%" @click.passive="showPoster = !showPoster">
												<!-- 信息 -->
												<transition name="slide">
													<v-touch class="film-card-info p-3" v-if="!showPoster" @tap="detailOrder = 0">
														<h5>{{ film.transName }}</h5>
														<h6>{{ film.offiName }}</h6>
														<p>类型：{{ film.type }}</p>
														<p>年份：{{ film.year }}</p>
														<p>地区：{{ film.country }}</p>
														<p>导演：{{ film.director }}</p>
														<p>主演：{{ film.star }}</p>
														<div class="d-flex px-2 film-card-comment">
															<p><i class="fas fa-comment-dots mr-2"></i></p>
															<p>{{ film.comment }}</p>
														</div>
													</v-touch>
												</transition>

												<!-- 查看大图 -->
												<div class="film-card-poster-large px-3 mb-1" v-show="showPoster" @click.self="detailOrder = 0">
													<a class="btn mb-1" :href="baseUrl + film.posterUrl" :download="film.transName" @click.passive="onSave">保存图片</a>
													<br>
													<p :class="{show: showSaved}">图片 <span>{{ film.transName }}</span> 已保存到手机相册</p>
												</div>
											</div>
										</transition>
									</v-touch>
								</div>
							</div>
							<!-- 底部分割线 -->
							<div class="divider" v-if="series.length > 0">
								<template v-if="filterSeries.length > 0">
									<hr>&nbsp;&nbsp; 已到底部 <i class="fas fa-hourglass-end"></i> &nbsp;&nbsp;<hr>
								</template>
								<template v-else>
									<hr>&nbsp;&nbsp; 暂无匹配 <i class="fas fa-ban"></i> &nbsp;&nbsp;<hr>
								</template>
							</div>
						</v-touch>
					</div>
				</div>
			</div>
		</v-touch>

		<!-- 快捷按钮 -->
		<v-touch @tap="onFold">
			<v-touch class="shortcut" id="to-top" @tap="onTop">
				<i class="fas fa-chevron-up"></i>
			</v-touch>
			<v-touch class="shortcut" @tap="onReload">
				<i class="fas fa-sync-alt" v-if="isReload" key="sync-icon"></i>
				<i class="fas fa-redo-alt" v-else key="redo-icon"></i>
			</v-touch>
			<v-touch class="shortcut" id="to-bottom" @tap="onBottom">
				<i class="fas fa-chevron-down"></i>
			</v-touch>
		</v-touch>

		<!-- 遮罩 -->
		<div class="poster-backdrop" v-if="posterOrder > 0 || showPoster"></div>
		<v-touch class="detail-backdrop" v-if="detailOrder > 0 && !showPoster" @tap="detailOrder = 0"></v-touch>
	</div>
</template>

<script>
	import $ from 'jquery'
	import axios from 'axios'
	import getData from '../api/index'

	export default {
		name: 'AllRcmd',
		components: {},
		directives: {
    // 自定义指令：元素自动获得焦点
    focus: {
    	inserted (el) {
    		el.focus()
    	}
    }
},
data () {
	return {
		films: [],
		series: [],
		headerHidden: false,
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
		moreHidden: true,
		showStatus: false,
		isSuccess: false,
		isError: false,
		baseUrl: axios.defaults.baseURL,
		showSaved: false,
		filmOrder: 0,
		posterOrder: 0,
		detailOrder: 0,
		showPoster: false,
		isReload: false
	}
},
computed: {
    // 标签过滤：默认只显示前17个，点击“更多”后全部显示
    filterTags () {
    	var moreHidden = this.moreHidden
    	return this.tags.filter(function (item, index) {
    		if (moreHidden) {
    			return index < 17
    		} else {
    			return true
    		}
    	})
    },
    // 电影排序：年份/评分/更新
    sortFilms () {
    	var sortOrder = this.sortOrder
    	var isReverse = this.isReverse

    	return this.films.sort(function (a, b) {
    		if (sortOrder === 1) {
    			if (a.year === b.year) {
    				return a.id - b.id
    			} else {
    				return isReverse ? b.year - a.year : a.year - b.year
    			}
    		} else if (sortOrder === 2) {
    			if (a.score === b.score) {
    				return a.id - b.id
    			} else {
    				return isReverse ? a.score - b.score : b.score - a.score
    			}
    		} else {
    			return isReverse ? a.id - b.id : b.id - a.id
    		}
    	})
    },
    // 电影过滤：评分级别/类型标签/搜索文本
    filterFilms () {
    	var activeTags = this.activeTags
    	var searchText = this.searchText

    	return this.sortFilms.filter(function (item) {
    		if (activeTags.length > 0) {
          // 标签：遍历每一个选中标签，返回包含至少一个标签的所有项
          let i, len
          for (i = 0, len = activeTags.length; i < len; i++) {
          	if (item.type.includes(activeTags[i])) {
          		return true
          	}
          }
      } else if (searchText.length > 0) {
          // 搜索：将搜索文本按空格分割为关键词，清除数据文本的所有标点符号，返回包含至少一个关键词的所有项
          var stArr = searchText.split(' ')
          var keys = [item.transName, item.year, item.offiName, item.country, item.type, item.director, item.star, item.comment]

          let i, lenI, j, lenJ
          for (i = 0, lenI = stArr.length; i < lenI; i++) {
          	for (j = 0, lenJ = keys.length; j < lenJ; j++) {
          		if (keys[j].replace(/[ / ·，“”……：]+/g, '').toLowerCase().includes(stArr[i].toLowerCase())) {
          			return true
          		}
          	}
          }
      } else {
      	return true
      }
  })
    },
    // 系列排序：年份/评分/更新
    sortSeries () {
    	var sortOrder = this.sortOrder
    	var isReverse = this.isReverse

    	return this.series.sort(function (a, b) {
    		if (sortOrder === 1) {
    			if (a.firstYear === b.firstYear) {
    				return a.seriesId - b.seriesId
    			} else {
    				return isReverse ? b.firstYear - a.firstYear : a.firstYear - b.firstYear
    			}
    		} else if (sortOrder === 2) {
    			if (a.topScore === b.topScore) {
    				return a.seriesId - b.seriesId
    			} else {
    				return isReverse ? a.topScore - b.topScore : b.topScore - a.topScore
    			}
    		} else {
    			return isReverse ? a.seriesId - b.seriesId : b.seriesId - a.seriesId
    		}
    	})
    },
    // 系列过滤：类型标签/搜索文本
    filterSeries () {
    	var activeTags = this.activeTags
    	var searchText = this.searchText

    	return this.sortSeries.filter(function (item) {
    		var filmList = item.filmList
    		if (activeTags.length > 0) {
          // 标签：遍历每一个选中标签，返回包含至少一个标签的所有项
          let i, lenI, j, lenJ
          for (i = 0, lenI = activeTags.length; i < lenI; i++) {
          	for (j = 0, lenJ = filmList.length; j < lenJ; j++) {
          		if (filmList[j].type.includes(activeTags[i])) {
          			return true
          		}
          	}
          }
      } else if (searchText.length > 0) {
          // 搜索：将搜索文本按空格分割为关键词，清除数据文本的所有标点符号，返回包含至少一个关键词的所有项
          var stArr = searchText.split(' ')

          let i, lenI, j, lenJ, k, lenK
          for (i = 0, lenI = stArr.length; i < lenI; i++) {
          	for (j = 0, lenJ = filmList.length; j < lenJ; j++) {
          		var keys = [filmList[j].transName, filmList[j].year, filmList[j].offiName, filmList[j].country, filmList[j].type, filmList[j].director, filmList[j].star, filmList[j].comment]
          		for (k = 0, lenK = keys.length; k < lenK; k++) {
          			if (keys[k].replace(/[ / ·，“”……：]+/g, '').toLowerCase().includes(stArr[i].toLowerCase())) {
          				return true
          			}
          		}
          	}
          }
      } else {
      	return true
      }
  })
    }
},
watch: {
    // 排序方式变化时复位倒序属性
    sortOrder () {
    	this.isReverse = false
    },
    // 系列详情变化时复位海报底图
    detailOrder () {
    	if (this.detailOrder === 0) {
    		this.showPoster = false
    	}
    }
},
created () {
    // 初始化数据
    this.loadData()
},
mounted () {
	var self = this
    // jquery脚本
    var screenCollapse = $('#screen-collapse')
    // 筛选面板展开时按钮变色、隐藏筛选信息
    screenCollapse.on('show.bs.collapse', function () {
    	self.screenHidden = false
    })
    // 筛选面板收起后按钮变色、显示筛选信息、隐藏更多标签；若有更多标签被激活则不隐藏
    screenCollapse.on('hidden.bs.collapse', function () {
    	self.screenHidden = true
    	self.moreHidden = true
    	if (self.activeTags.length > 0) {
    		let i, len
    		for (i = 17, len = self.tags.length; i < len; i++) {
    			if (self.tags[i].isActive) {
    				self.moreHidden = false
    			}
    		}
    	}
    })

    var toTop = $('#to-top')
    var toBottom = $('#to-bottom')
    // 页面滚动时收起筛选面板及搜索框，快到顶部时显示顶部导航栏；在顶部时隐藏向上和刷新按钮，在底部时隐藏向下按钮
    $(document).on('scroll', function () {
    	self.onFold()

    	let scrollTop = $(document).scrollTop()
    	console.log(scrollTop)
    	if (scrollTop < 100) {
    		self.headerHidden = false
    	}

    	if (scrollTop === 0) {
    		toTop.fadeOut('fast')
    	} else {
    		toTop.fadeIn()
    	}

    	let height = $(document).height() - $(window).height()
    	if (scrollTop === height) {
    		toBottom.fadeOut('fast')
    	} else {
    		toBottom.fadeIn()
    	}
    })
},
methods: {
    // 加载数据并显示状态：若成功则清除筛选信息，然后收起状态栏；否则显示错误提示
    loadData () {
    	var self = this
    	console.log('baseUrl:', axios.defaults.baseURL)
    	axios.all([getData.getFilms(), getData.getSeries()])
    	.then(axios.spread(function (resFilms, resSeries) {
    		self.clearTags()
    		self.hideSearch()
    		console.log('getRes:', resFilms, resSeries)
    		self.films = resFilms.data
    		console.log('getFilms:', self.films)
    		self.series = resSeries.data
    		console.log('getSeries:', self.series)
    		self.isReload = false
    		self.isSuccess = true
    		setTimeout(function () {
    			self.showStatus = false
    		}, 1500)
    	}))
    	.catch(function (error) {
    		console.error('catchError:', error)
    		self.isReload = false
    		self.isError = true
    		self.showStatus = true
    	})
    	.then(function () {
    		console.log('finalData:', self.films, self.series)
    	})
    },
    // 清空所有选中的标签
    clearTags () {
    	let i, len
    	for (i = 0, len = this.tags.length; i < len; i++) {
    		this.tags[i].isActive = false
    	}

    	this.activeTags.splice(0)
    },
    // 清空搜索文本，收起并隐藏搜索框
    hideSearch () {
    	this.searchText = ''
    	this.isFocus = false
    	this.showSearch = false
    },
    // 收起筛选面板；若搜索文本为空也收起搜索框
    onFold () {
    	$('#screen-collapse').collapse('hide')
    	if (this.searchText.length === 0) {
    		this.hideSearch()
    	}
    },
    // 点击按钮展开搜索框/清除搜索文本
    onSearch () {
    	if (!this.showSearch) {
    		this.clearTags()
    		this.showSearch = true
    	}

    	if (this.searchText.length > 0) {
    		$('#search-input').focus()
    		this.searchText = ''
    	}
    },
    // 点击切换标签激活状态；若选中则添加到筛选信息中，否则从中删除；激活时关闭搜索框
    onTag (item) {
    	item.isActive = !item.isActive
    	if (item.isActive) {
    		this.hideSearch()
    		this.activeTags.push(item.tag)
    	} else {
    		var atIndex = this.activeTags.indexOf(item.tag)
    		this.activeTags.splice(atIndex, 1)
    	}
    },
    // 上滑时隐藏导航栏
    swipeUp () {
    	var scrollHeight = document.body.scrollHeight
    	var viewportHeight = document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight
    	var bottomHeight = document.querySelector('.divider').offsetHeight

    	if (!this.headerHidden && scrollHeight - bottomHeight > viewportHeight) {
    		this.headerHidden = true
    	}
    },
    // 下滑时显示导航栏；顶部下滑时触发下拉刷新
    swipeDown () {
    	if (this.headerHidden) {
    		this.headerHidden = false
    	}

    	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    	if (scrollTop === 0) {
    		this.pullReload()
    	}
    },
    // 复位所有状态信息并展开更新栏，然后重新加载数据
    pullReload () {
    	this.isSuccess = false
    	this.isError = false
    	this.showStatus = true

    	var self = this
    	setTimeout(function () {
    		self.loadData()
    	}, 1000)
    },
    // 点击保存1s后显示提示信息，显示1s后消失
    onSave () {
    	var self = this
    	setTimeout(function () {
    		self.showSaved = true
    		setTimeout(function () {
    			self.showSaved = false
    		}, 2000)
    	}, 1000)
    },
    // 评分七个级别显示不同颜色
    getColor (item) {
    	var colors = ['#912cee', '#0000cd', '#00cdcd', '#00cd00', '#cdcd00', '#cd8500', '#cd0000']
    	var scoreIndex = 9 - Math.floor(item.score)

    	return colors[scoreIndex]
    },
    // 点击添加影片内容到对应列表
    onOption (order) {
    	this.filmOrder = 0
    },
    // 点击滚动到顶部
    onTop () {
    	$('html, body, #series-nav').animate({ scrollTop: 0 }, 300, 'linear')
    	this.headerHidden = false
    },
    // 点击直接刷新数据；在顶部时点击触发下拉刷新
    onReload () {
    	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    	if (scrollTop > 0) {
    		this.isReload = true

    		var self = this
    		setTimeout(function () {
    			self.loadData()
    		}, 1000)
    	} else {
    		this.pullReload()
    	}
    },
    // 点击滚动到底部
    onBottom () {
    	var height = $(document).height()
    	$('html, body').animate({ scrollTop: height }, 300, 'linear')
    	this.headerHidden = false

    	var snHeight = $('#series-nav').height()
    	$('#series-nav').animate({ scrollTop: snHeight }, 300, 'linear')
    }
}
}
</script>