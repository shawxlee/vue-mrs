<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>

    <ul class="nav nav-justified fixed-bottom border-top footer">
      <li class="nav-item">
        <router-link class="nav-link" to="/all-rcmd"><i class="fas fa-star"></i><br>推荐</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/to-watch"><i class="fas fa-play-circle"></i><br>待看</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/my-review"><i class="fas fa-pen-square"></i><br>影记</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/app-setting"><i class="fas fa-cog"></i><br>设置</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style>
.footer {
  height: 3.8rem;
  background-color: white;
}
.footer .nav-link {
  padding-top: .6rem;
  font-size: .8rem;
  color: #a9a9a9;
}
.footer .nav-link i {
  font-size: 1.5rem;
}
.footer .nav-link.active {
  color: #4f94cd;
}
</style>
