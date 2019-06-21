import Vue from 'vue'
import VueTouch from 'vue-touch'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
// 引入CSS样式库
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/light-theme.css'
// 引入JS脚本库
import './assets/font-size.js'
import 'bootstrap/dist/js/bootstrap.min.js'

VueTouch.config.swipe = {
  threshold: 100
}
Vue.use(VueTouch, {name: 'v-touch'})

Vue.config.productionTip = false
// 将router、touch和App挂载到#app下
var app = new Vue({
	router,
	VueTouch,
	axios,
	render: h => h(App)
}).$mount('#app')

// jquery脚本
$(function () {
	// 折叠组件：工具栏
	var screenCollapse = $('#screen-collapse');
	// 筛选面板展开时按钮变色、隐藏筛选信息
	screenCollapse.on('show.bs.collapse', function () {
		app.screenHidden = false;
	});

	// 筛选面板收起后按钮变色、显示筛选信息、隐藏更多标签；若有更多标签被激活则不隐藏
	screenCollapse.on('hidden.bs.collapse', function () {
		app.screenHidden = true;
		app.moreHidden = true;
		if (app.activeTags.length > 0) {
			let i, len;
			for (i = 17, len = app.tags.length; i < len; i++) {
				if (app.tags[i].isActive) {
					app.moreHidden = false;
				}
			}
		}
	});

	// 点击其他位置收起筛选面板；若搜索文本为空也收起搜索框
	var nToolbar = $('#all-header, #full-mode, #mini-mode, #series-mode, #to-top, #to-bottom, #footer');
	nToolbar.on('click', foldUp);
	function foldUp() {
		screenCollapse.collapse('hide');
		if (app.searchText.length == 0) {
			app.hideSearch();
		}
	}

	// 页面滚动条效果
	var toTop = $('#to-top'),
	toBottom = $('#to-bottom'),
	seriesNav = $('#series-nav');

	// 回到顶部
	toTop.on('click', function () {
		$('html, body').animate({ scrollTop: 0 }, 300, 'linear');		
		app.headerHidden = false;
		seriesNav.animate({ scrollTop: 0 }, 300, 'linear');
	});

	// 直达底部
	toBottom.on('click', function () {
		var height = $(document).height();
		$('html, body').animate({ scrollTop: height }, 300, 'linear');
		app.headerHidden = false;

		var snHeight = seriesNav.height();
		seriesNav.animate({ scrollTop: snHeight }, 300, 'linear');
	});

	// 页面滚动时收起筛选面板及搜索框，快到顶部时显示顶部导航栏；在顶部时隐藏向上和刷新按钮，在底部时隐藏向下按钮
	$(document).on('scroll', function () {
		foldUp();
		var scrollTop = $(document).scrollTop();
		console.log(scrollTop);
		if (scrollTop < 100) {
			app.headerHidden = false;
		}

		if (scrollTop == 0) {
			toTop.fadeOut('fast');
		} else {
			toTop.fadeIn();
		}

		var height = $(document).height() - $(window).height();
		if (scrollTop == height) {
			toBottom.fadeOut('fast');
		} else {
			toBottom.fadeIn();
		}
	});
});