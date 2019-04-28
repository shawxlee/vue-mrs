<template>
	<div>
		<nav class="navbar navbar-expand-lg bg-light navbar-light fixed-top">
			<button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#tagCollapse">
				<span class="navbar-toggler-icon"></span>
			</button>
			<button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#searchCollapse">
				<i class="fas fa-search"></i>
			</button>
			<div class="collapse navbar-collapse" id="tagCollapse">
				<div class="p-0 m-3">
					<button type="button" class="btn m-1" v-for="item in tags">{{ item.tag }}</button>
				</div>
			</div>
			<div class="collapse navbar-collapse" id="searchCollapse">
				<form class="p-0 m-3">
					<div class="row no-gutters">
						<div class="col-9">
							<input type="search" class="form-control mx-1" placeholder="输入影片名称">
						</div>
						<div class="col-3 px-3">
							<button type="button" class="btn">搜索</button>
						</div>
					</div>
				</form>
			</div>
		</nav>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				tags: [
				{ tag: '动作' },
				{ tag: '惊悚' },
				{ tag: '战争' },
				{ tag: '科幻' },
				{ tag: '科幻' },
				{ tag: '科幻' },
				{ tag: '科幻' },
				{ tag: '动作' },
				{ tag: '惊悚' },
				{ tag: '战争' },
				{ tag: '科幻' },
				{ tag: '科幻' },
				{ tag: '科幻' },
				{ tag: '科幻' },
				]
			}
		}
	}
</script>