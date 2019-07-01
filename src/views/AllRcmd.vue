<template>
	<div class="container-fluid">
		<!-- 顶部导航栏 -->
		<BaseNavbar class="header" :class="{upward: headerHidden}" @click.native="onFold">
			<BaseNavbarTitle v-show="!headerHidden" titleText="全部推荐"/>
			<!-- 切换模式 -->
			<TabNav v-show="!headerHidden">
				<TabNavItem tabId="#full-mode" tabName="全览模式" isTrue/>
				<TabNavItem tabId="#mini-mode" tabName="简约模式"/>
				<TabNavItem tabId="#series-mode" tabName="系列模式"/>
			</TabNav>
			<!-- 小标题 -->
			<transition name="fade">
				<BaseNavbarTitle class="header-min" v-show="headerHidden" titleText="全部推荐"/>
			</transition>
		</BaseNavbar>

		<!-- 工具栏 -->
		<BaseNavbar class="toolbar" :class="{upward: headerHidden}">
			<!-- 筛选器 -->
			<BaseNavbarToggler tarId="#screen-collapse">
				<IconBtn class="pl-0 pr-1" :class="{active: !screenHidden}" iconClass="fa-sort-amount-down"/>
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
			</BaseNavbarToggler>
			<!-- 搜索框 -->
			<BaseNavbarForm>
				<transition name="stretch">
					<SearchInput :style="[isFocus ? '' : {width: searchText.length + 4 + 'rem'}]" v-if="showSearch" v-model.trim="searchText" @focus.native="isFocus = true" @blur.native="isFocus = false" v-focus/>
				</transition>
				<IconBtn :class="{active: isFocus}" :iconClass="searchText.length > 0 ? 'fa-times-circle' : 'fa-search'" @mousedown.native.prevent @click.native="onSearch"/>
			</BaseNavbarForm>

			<!-- 筛选面板 -->
			<BaseNavbarCollapse id="screen-collapse">
				<div class="row no-gutters justify-content-between">
					<!-- 排序按钮 -->
					<div class="col-4 px-1">
						<ToggleBtn :class="{active: sortOrder === 1}" sortName="年份" :isTrue="isReverse" @click.native="onSort(1)"/>
					</div>
					<div class="col-4 px-1">
						<ToggleBtn :class="{active: sortOrder === 2}" sortName="评分" :isTrue="isReverse" @click.native="onSort(2)"/>
					</div>
					<div class="col-4 px-1">
						<ToggleBtn :class="{active: sortOrder === 3}" sortName="更新" :isTrue="isReverse" @click.native="onSort(3)"/>
					</div>
					<div class="w-100"><hr></div>
					<!-- 过滤标签 -->
					<div class="col-2 p-1" v-for="(item, index) in filterTags" :key="'filterTag_' + index">
						<BaseBtn :class="{active: item.isActive}" :btnText="item.tag" @click.native="onTag(item)"/>
					</div>
					<div class="col-2 p-1" v-show="moreHidden">
						<BaseBtn class="btn-more" btnText="更多" @click.native="moreHidden = false"/>
					</div>
					<div class="w-100 mt-1 text-center">
						<IconBtn :class="{invisible: activeTags.length === 0}" iconClass="fa-times-circle mt-1" @click.native="clearTags"> 清空标签</IconBtn>
					</div>
				</div>
			</BaseNavbarCollapse>
		</BaseNavbar>

		<!-- 更新状态栏 -->
		<transition name="pull">
			<template v-if="showStatus">
				<TipDivider v-if="isSuccess" tipText="更新成功" iconClass="fa-check-circle"/>
				<TipDivider v-else-if="isError" tipText="更新失败" iconClass="fa-exclamation-circle"/>
				<TipDivider v-else tipText="正在更新" iconClass="fa-sync-alt"/>
			</template>
		</transition>

		<!-- 电影列表 -->
		<TabContent @click.native="onFold">
			<!-- 全览模式 -->
			<TabContentPane id="full-mode" isTrue>
				<v-touch @swipeup="swipeUp" @swipedown="swipeDown">
					<BaseCard class="my-1 p-3" v-for="item in filterFilms" :key="'filterFilm_' + item.id">
						<v-touch @press="filmOrder = item.id">
							<FlexBox>
								<!-- 海报 -->
								<ImgBox>
									<img :src="baseUrl + item.posterUrl" width="100%" height="100%" @click="posterOrder = item.id">
									<!-- 评分 -->
									<LinkBadge :style="{'background-color': getColor(item)}" :webUrl="item.doubanUrl" :badgeText="item.score"/>
								</ImgBox>
								<!-- 信息 -->
								<InfoBox class="pl-2">
									<h5>{{ item.transName }}</h5>
									<h6>{{ item.offiName }}</h6>
									<InfoBoxItem infoTitle="类型" :infoCont="item.type"/>
									<InfoBoxItem infoTitle="年份" :infoCont="item.year"/>
									<InfoBoxItem infoTitle="地区" :infoCont="item.country"/>
									<InfoBoxItem infoTitle="导演" :infoCont="item.director"/>
									<InfoBoxItem infoTitle="主演" :infoCont="item.star"/>
								</InfoBox>
							</FlexBox>
							<!-- 评语 -->
							<BgBox>
								<FlexBox>
									<p><i class="fas fa-comment-dots mr-2"></i></p>
									<p>{{ item.comment }}</p>
								</FlexBox>
							</BgBox>

							<!-- 查看大图 -->
							<ImgModal v-show="posterOrder === item.id" :isTrue="showTip" :imgName="item.transName" @click.native.self="posterOrder = 0">
								<img :src="baseUrl + item.posterUrl" width="100%" @click="posterOrder = 0">
								<br><br>
								<LinkBtn :class="{active: isSave}" :imgUrl="baseUrl + item.posterUrl" :imgName="item.transName" @click.native="onSave"/>
							</ImgModal>
							<!-- 弹出选项 -->
							<OptionModal v-if="filmOrder === item.id">
								<OptionModalItem iconClass="fa-plus" optText="加入待看" @click.native="onOption(1)"/>
								<OptionModalItem iconClass="fa-check" optText="标记已看" @click.native="onOption(2)"/>
								<OptionModalItem iconClass="fa-thumbtack" optText="添加笔记" @click.native="onOption(3)"/>
								<OptionModalItem iconClass="fa-pen" optText="撰写影评" @click.native="onOption(4)"/>
							</OptionModal>
						</v-touch>
					</BaseCard>

					<!-- 底部分割线 -->
					<template v-if="films.length > 0">
						<TipDivider v-if="filterFilms.length > 0" tipText="已到底部" iconClass="fa-hourglass-end"/>
						<TipDivider v-else tipText="暂无匹配" iconClass="fa-ban"/>
					</template>
				</v-touch>
			</TabContentPane>

			<!-- 简约模式 -->
			<TabContentPane class="accordion" id="mini-mode">
				<v-touch @swipeup="swipeUp" @swipedown="swipeDown">
					<BaseCard class="m-1 rounded-lg overflow-hidden" v-for="item in filterFilms" :key="'filterFilm_' + item.id">
						<v-touch @press="filmOrder = item.id">
							<!-- 主体 -->
							<AccordionToggler :tarId="'#info_' + item.id">
								<h5><LinkBadge :style="{'background-color': getColor(item)}" :webUrl="item.doubanUrl" :badgeText="item.score"/> {{ item.transName }} <small>({{ item.year }})</small></h5>
								<p><i class="fas fa-tag mr-2 mb-0"></i>{{ item.type }}</p>
							</AccordionToggler>
							<!-- 展开详情 -->
							<AccordionCollapse :id="'info_' + item.id" parId="#mini-mode">
								<FlexBox>
									<!-- 海报 -->
									<ImgBox>
										<img :src="baseUrl + item.posterUrl" width="100%" height="100%" @click="posterOrder = item.id">
									</ImgBox>
									<!-- 信息 -->
									<InfoBox class="pl-2">
										<h6>{{ item.offiName }}</h6>
										<InfoBoxItem infoTitle="地区" :infoCont="item.country"/>
										<InfoBoxItem infoTitle="导演" :infoCont="item.director"/>
										<InfoBoxItem infoTitle="主演" :infoCont="item.star"/>
										<BgBox><i class="fas fa-comment-dots mr-2"></i>{{ item.comment }}</BgBox>
									</InfoBox>
								</FlexBox>
							</AccordionCollapse>

							<!-- 查看大图 -->
							<ImgModal v-show="posterOrder === item.id" :isTrue="showTip" :imgName="item.transName" @click.native.self="posterOrder = 0">
								<img :src="baseUrl + item.posterUrl" width="100%" @click="posterOrder = 0">
								<br><br>
								<LinkBtn :class="{active: isSave}" :imgUrl="baseUrl + item.posterUrl" :imgName="item.transName" @click.native="onSave"/>
							</ImgModal>
							<!-- 弹出选项 -->
							<OptionModal v-if="filmOrder === item.id">
								<OptionModalItem iconClass="fa-plus" optText="加入待看" @click.native="onOption(1)"/>
								<OptionModalItem iconClass="fa-check" optText="标记已看" @click.native="onOption(2)"/>
								<OptionModalItem iconClass="fa-thumbtack" optText="添加笔记" @click.native="onOption(3)"/>
								<OptionModalItem iconClass="fa-pen" optText="撰写影评" @click.native="onOption(4)"/>
							</OptionModal>
						</v-touch>
					</BaseCard>

					<!-- 底部分割线 -->
					<template v-if="films.length > 0">
						<TipDivider v-if="filterFilms.length > 0" tipText="已到底部" iconClass="fa-hourglass-end"/>
						<TipDivider v-else tipText="暂无匹配" iconClass="fa-ban"/>
					</template>
				</v-touch>
			</TabContentPane>

			<!-- 系列模式 -->
			<TabContentPane id="series-mode">
				<div class="row no-gutters">
					<div class="col-4">
						<!-- 导航 -->
						<ScrollspyNav :class="{upward: headerHidden}" id="series-nav">
							<ScrollspyNavItem v-for="item in filterSeries" :key="'filterSeries_' + item.seriesId" :scrId="'#series_' + item.seriesId">
								<!-- 有系列 -->
								<template v-if="item.filmList.length > 1">
									<span><i class="fas fa-caret-right"></i> {{ item.seriesName }}</span>
									<BaseBadgePill :badgeNumber="item.filmList.length"/>
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
							</ScrollspyNavItem>
						</ScrollspyNav>
					</div>
					<!-- 内容 -->
					<v-touch class="col-8" @swipeup="swipeUp" @swipedown="swipeDown">
						<BaseCard class="my-1 p-2" v-for="item in filterSeries" :key="'filterSeries_' + item.seriesId">
							<IdAnchor :id="'series_' + item.seriesId"/>
							<div class="row no-gutters">
								<v-touch class="col-6 my-2 position-relative" v-for="(film, index) in item.filmList" :key="'film_' + film.id" @press="detailOrder = 0; filmOrder = film.id">
									<!-- 海报 -->
									<ImgBox class="mx-auto mb-2">
										<img :src="baseUrl + film.posterUrl" width="100%" height="100%" @click="detailOrder = film.id">
										<!-- 评分 -->
										<LinkBadge :style="{'background-color': getColor(film)}" :webUrl="film.doubanUrl" :badgeText="film.score"/>
									</ImgBox>
									<!-- 标题 -->
									<h6>{{ film.transName }} <span>({{ film.year }})</span></h6>
									<!-- 编号 -->
									<BaseBadge :badgeNumber="index + 1"/>

									<!-- 选项 -->
									<OptionModal class="flex-wrap" v-if="filmOrder === film.id">
										<OptionModalItem iconClass="fa-plus" @click.native="onOption(1)">加入<br>待看</OptionModalItem>
										<OptionModalItem iconClass="fa-check" @click.native="onOption(2)">标记<br>已看</OptionModalItem>
										<OptionModalItem iconClass="fa-thumbtack" @click.native="onOption(3)">添加<br>笔记</OptionModalItem>
										<OptionModalItem iconClass="fa-pen" @click.native="onOption(4)">撰写<br>影评</OptionModalItem>
									</OptionModal>

									<!-- 查看详情 -->
									<transition name="slide">
										<DetailModal :class="{top: showPoster}" v-show="detailOrder === film.id">
											<!-- 底图 -->
											<img :class="{scale: showPoster}" :src="baseUrl + film.posterUrl" width="100%" @click="showPoster = !showPoster">
											<!-- 信息 -->
											<transition name="slide">
												<InfoBox class="pt-3 px-3" v-show="!showPoster" @click.native="detailOrder = 0">
													<h5>{{ film.transName }}</h5>
													<p>{{ film.offiName }}</p>
													<p>类型：{{ film.type }}</p>
													<p>年份：{{ film.year }}</p>
													<p>地区：{{ film.country }}</p>
													<p>导演：{{ film.director }}</p>
													<p>主演：{{ film.star }}</p>
													<!-- 评语 -->
													<BgBox>
														<FlexBox>
															<p><i class="fas fa-comment-dots mr-2"></i></p>
															<p>{{ film.comment }}</p>
														</FlexBox>
													</BgBox>
												</InfoBox>
											</transition>

											<!-- 查看大图 -->
											<ImgModal v-show="showPoster" :isTrue="showTip" :imgName="film.transName" @click.native.self="detailOrder = 0">
												<LinkBtn :class="{active: isSave}" :imgUrl="baseUrl + film.posterUrl" :imgName="film.transName" @click.native="onSave"/>
											</ImgModal>
										</DetailModal>
									</transition>
								</v-touch>
							</div>
						</BaseCard>

						<!-- 底部分割线 -->
						<template v-if="series.length > 0">
							<TipDivider v-if="filterSeries.length > 0" tipText="已到底部" iconClass="fa-hourglass-end"/>
							<TipDivider v-else tipText="暂无匹配" iconClass="fa-ban"/>
						</template>
					</v-touch>
				</div>
			</TabContentPane>
		</TabContent>

		<!-- 快捷按钮 -->
		<ShortcutBtn id="to-top" iconClass="fa-chevron-up" @click.native="onTop"/>
		<ShortcutBtn v-show="showReload" :iconClass="isReload ? 'fa-sync-alt' : 'fa-redo-alt'" @click.native="onReload"/>
		<ShortcutBtn id="to-bottom" iconClass="fa-chevron-down" @click.native="onBottom"/>

		<!-- 遮罩 -->
		<BaseBackdrop :class="{bottom: detailOrder > 0 && !showPoster}" v-show="posterOrder > 0 || detailOrder > 0" @click.native="detailOrder = 0"/>
	</div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import api from '../api/index'

import BaseNavbar from '../components/BaseNavbar'
import BaseNavbarTitle from '../components/BaseNavbarTitle'
import TabNav from '../components/TabNav'
import TabNavItem from '../components/TabNavItem'
import BaseNavbarToggler from '../components/BaseNavbarToggler'
import BaseNavbarForm from '../components/BaseNavbarForm'
import IconBtn from '../components/IconBtn'
import SearchInput from '../components/SearchInput'
import BaseNavbarCollapse from '../components/BaseNavbarCollapse'
import ToggleBtn from '../components/ToggleBtn'
import BaseBtn from '../components/BaseBtn'
import TipDivider from '../components/TipDivider'
import TabContent from '../components/TabContent'
import TabContentPane from '../components/TabContentPane'
import BaseCard from '../components/BaseCard'
import FlexBox from '../components/FlexBox'
import ImgBox from '../components/ImgBox'
import LinkBadge from '../components/LinkBadge'
import ImgModal from '../components/ImgModal'
import LinkBtn from '../components/LinkBtn'
import InfoBox from '../components/InfoBox'
import InfoBoxItem from '../components/InfoBoxItem'
import BgBox from '../components/BgBox'
import OptionModal from '../components/OptionModal'
import OptionModalItem from '../components/OptionModalItem'
import AccordionToggler from '../components/AccordionToggler'
import AccordionCollapse from '../components/AccordionCollapse'
import ScrollspyNav from '../components/ScrollspyNav'
import ScrollspyNavItem from '../components/ScrollspyNavItem'
import BaseBadgePill from '../components/BaseBadgePill'
import IdAnchor from '../components/IdAnchor'
import BaseBadge from '../components/BaseBadge'
import DetailModal from '../components/DetailModal'
import ShortcutBtn from '../components/ShortcutBtn'
import BaseBackdrop from '../components/BaseBackdrop'

export default {
  name: 'AllRcmd',
  components: {
    BaseNavbar,
    BaseNavbarTitle,
    TabNav,
    TabNavItem,
    BaseNavbarToggler,
    BaseNavbarForm,
    IconBtn,
    SearchInput,
    BaseNavbarCollapse,
    ToggleBtn,
    BaseBtn,
    TipDivider,
    TabContent,
    TabContentPane,
    BaseCard,
    FlexBox,
    ImgBox,
    LinkBadge,
    ImgModal,
    LinkBtn,
    InfoBox,
    InfoBoxItem,
    BgBox,
    OptionModal,
    OptionModalItem,
    AccordionToggler,
    AccordionCollapse,
    ScrollspyNav,
    ScrollspyNavItem,
    BaseBadgePill,
    IdAnchor,
    BaseBadge,
    DetailModal,
    ShortcutBtn,
    BaseBackdrop
  },
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
      showStatus: true,
      isSuccess: false,
      isError: false,
      baseUrl: axios.defaults.baseURL,
      isSave: false,
      filmOrder: 0,
      posterOrder: 0,
      detailOrder: 0,
      showPoster: false,
      showTip: false,
      showReload: false,
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
  	console.log('baseUrl:', this.baseUrl)
  },
  mounted () {
  	var toTop = $('#to-top')
    var toBottom = $('#to-bottom')
  	toTop.fadeOut('fast')
  	toBottom.fadeOut('fast')
  	// 初始化数据
    this.loadData()

    var screenCollapse = $('#screen-collapse')
    var self = this
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
    	axios.all([api.getFilms(), api.getSeries()])
    	.then(axios.spread(function (resFilms, resSeries) {
    		self.clearTags()
    		self.hideSearch()
    		console.log('response:', resFilms, resSeries)
    		self.films = resFilms.data
    		console.log('getFilms:', self.films)
    		self.series = resSeries.data
    		console.log('getSeries:', self.series)
    		self.isSuccess = true
    		self.isReload = false
    		setTimeout(function () {
    			self.showStatus = false
    			$('#to-top, #to-bottom').fadeIn()
    			self.showReload = true
    		}, 1500)
    	}))
    	.catch(function (error) {
    		console.error('catchError:', error)
    		self.isError = true
    		self.isReload = false
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
    		document.getElementsByTagName('input')[0].focus()
    		this.searchText = ''
    	}
    },
    // 不同点击切换排序方式；同一按钮点击切换正倒序
    onSort (order) {
    	this.sortOrder = order
    	this.isReverse = !this.isReverse
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
    	var bottomHeight = document.querySelector('.tip-divider').offsetHeight

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
    	$('#to-top, #to-bottom').fadeOut()
    	this.showReload = false

    	var self = this
    	setTimeout(function () {
    		self.loadData()
    	}, 1500)
    },
    // 点击保存1s后显示提示信息，显示1s后消失
    onSave () {
    	this.isSave = true

    	var self = this
    	setTimeout(function () {
    		self.showTip = true
    		setTimeout(function () {
    			self.showTip = false
    			self.isSave = false
    		}, 2000)
    	}, 1500)
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
    	this.onFold()
    	$('html, body, #series-nav').animate({ scrollTop: 0 }, 300, 'linear')
    	this.headerHidden = false
    },
    // 点击直接刷新数据；在顶部时点击触发下拉刷新
    onReload () {
    	this.onFold()

    	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    	if (scrollTop > 0) {
    		this.isReload = true
    		$('#to-top, #to-bottom').fadeOut()

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
    	this.onFold()

    	var height = $(document).height()
    	$('html, body').animate({ scrollTop: height }, 300, 'linear')
    	this.headerHidden = false

    	var seriesNav = $('#series-nav')
    	var sHeight = seriesNav.height()
    	seriesNav.animate({ scrollTop: sHeight }, 300, 'linear')
    }
  }
}
</script>
