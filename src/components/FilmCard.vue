<template>
	<div class="filmDiv" v-for="(item, index) in films" :key="item.id">
		<div class="row no-gutters">
			<div class="col-3">
				<div class="imgDiv">
					<a :href="item.doubanUrl" target="_blank"><img :src="item.imgUrl" width="100%" height="100%"></a>
					<p :style="{color: scoreColor(item)}">{{ item.score }}</p>
				</div>
			</div>
			<div class="col-9">
				<div class="infoDiv" :id="item.filmId">
					<h5>{{ item.translateName }}<small>（{{ item.year }}）</small></h5>
					<div class="seriesDiv" :class="{'d-none': item.noSeries}">
						<button type="button" class="btn btn-outline-info">系列</button>
					</div>
					<p>{{ item.officialName }}</p>
					<br><br>
					<p>地区：{{ item.country }}</p>
					<p>类型：{{ item.type }}</p>
					<p>导演：{{ item.director }}</p>
					<p>主演：{{ item.star }}</p>
				</div>
			</div>
		</div>
		<div class="row no-gutters">
			<div class="col-9">
				<div class="noteDiv">
					<p><i class="fas fa-heart"></i>{{ item.note }}</p>
				</div>
			</div>
			<div class="col-3">
				<div class="sourceDiv">
					<button type="button" class="btn btn-info" data-toggle="modal" :data-target="'#modal_' + item.id" @click.prevent="onModal(item)">播放 <i class="far fa-play-circle"></i></button>
					<div class="modal fade" :id="'modal_' + item.id" tabindex="-1">
						<div class="modal-dialog modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header">选择播放源：</div>
								<div class="modal-body">
									<div class="row justify-content-center no-gutters">
										<div class="col-3" :class="{'d-none': item.noBilibili}">
											<a :href="item.bilibiliUrl" target="_blank"><img src="bilibili.png" width="50%"></a>
											<p>哔哩哔哩</p>
										</div>
										<div class="col-3" :class="{'d-none': item.noTencent}">
											<a :href="item.tencentUrl" target="_blank"><img src="tencent.png" width="50%"></a>
											<p>腾讯视频</p>
										</div>
										<div class="col-3" :class="{'d-none': item.noYouku}">
											<a :href="item.youkuUrl" target="_blank"><img src="youku.png" width="50%"></a>
											<p>优酷视频</p>
										</div>
										<div class="col-3" :class="{'d-none': item.noIqiyi}">
											<a :href="item.iqiyiUrl" target="_blank"><img src="iqiyi.png" width="50%"></a>
											<p>爱奇艺</p>
										</div>
										<div class="col-3" :class="{'d-none': item.noOther}">
											<a :href="item.otherUrl" target="_blank"><img src="other.png" width="50%"></a>
											<p>其他平台</p>
										</div>
										<div class="col-3" :class="{'d-none': item.noDownload}">
											<a :href="item.downloadUrl" target="_blank"><img src="other.png" width="50%"></a>
											<p>资源下载</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import seriesButton from '@/components/Series.vue'

export default {
	data(){
		return {
			publicPath: process.env.BASE_URL
		}
	}
	name: 'home',
	components: {
		HelloWorld
	}
}
</script>
