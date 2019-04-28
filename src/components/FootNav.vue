<template>
	<div class="container-fluid">
		<div id="footNav">
			<nav class="navbar navbar-expand-lg bg-light navbar-light fixed-bottom">
				<router-link to="/" class="nav-item nav-link active"><i class="fab fa-stripe-s"></i> 推荐列表</router-link>
				<router-link to="/to-watch" class="nav-item nav-link"><i class="fas fa-list-alt"></i> 待看</router-link>
				<router-link to="/watched" class="nav-item nav-link"><i class="fas fa-check-square"></i> 已看</router-link>
				<button type="button" class="btn" id="sidebarToggler"><i class="fas fa-cog"></i></button>
			</nav>
			<side-bar></side-bar>
		</div>
	</div>
</template>

<script>
	import SideBar from 'SideBar'
	import $ from 'jquery'

	export default {
		name: 'foot-nav',
		components: {
			SideBar
		},
		mounted: function() {
			$("#sidebarToggler").click(function () {
				var sideBar = $("#sideBar");
				if (!sideBar.hasClass("addWidth")) {
					$("#sideBar").addClass("addWidth");
				} 
				else {
					$("#sideBar").removeClass("addWidth");
				}
			})
		}
	}
</script>

<style>
#footNav nav {
	height: 3.5rem;
	line-height: 2.3rem;
	border-top: 0.1rem solid #E8E8E8;
	font-size: 1.2rem;
}
#footNav button {
	border-color: #f8f9fa;
	background-color: #f8f9fa;
	font-size: 1.2rem;
}
#footNav a {
	color: #696969;
}
/* 侧边栏样式 */
.sidebarClass {
	position: fixed;
	right: -50%;
	width: 50%;
	height: calc(100vh - 3.5rem);
	background: #E8E8E8;
	z-index: 9999;
	transition: width 1s;
}
.addWidth {
	width: 100%;
}
</style>
