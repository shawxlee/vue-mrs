// 利用js计算当前设备的DPR，动态设置html的font-size，利用css的选择器根据DPR来设置不同DPR下的字体大小
!(function (win, lib) {
  var timer
  var doc = win.document
  var docElem = doc.documentElement
  var vpMeta = doc.querySelector('meta[name="viewport"]')
  var dpr = 0
  var scale = 0
  var flexible = lib.flexible || (lib.flexible = {})

  if (vpMeta) {
    var initial = vpMeta.getAttribute('content').match(/initial-scale=([\d.]+)/)
    if (initial) {
      scale = parseFloat(initial[1])
      dpr = parseInt(1 / scale)
    }
  }

  function setFontSize () {
    var winWidth = docElem.getBoundingClientRect().width
    if (winWidth / dpr > 540) {
      winWidth = 540 * dpr
    }

    var baseSize = winWidth / 25
    docElem.style.fontSize = baseSize + 'px'
    flexible.rem = win.rem = baseSize
  }

  win.addEventListener('resize', function () {
    clearTimeout(timer)
    timer = setTimeout(setFontSize, 300)
  }, false)

  win.addEventListener('orientationchange', function () {
    clearTimeout(timer)
    timer = setTimeout(setFontSize, 300)
  }, false)

  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(timer)
      timer = setTimeout(setFontSize, 300)
    }
  }, false)

  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = 12 * dpr + 'px'
  } else {
    doc.addEventListener('DOMContentLoaded', function () {
      doc.body.style.fontSize = 12 * dpr + 'px'
    }, false)
  }

  setFontSize()
  flexible.dpr = win.dpr = dpr
  flexible.refreshRem = setFontSize
  flexible.rem2px = function (d) {
    var c = parseFloat(d) * this.rem
    if (typeof d === 'string' && d.match(/rem$/)) {
      c += 'px'
    }
    return c
  }

  flexible.px2rem = function (d) {
    var c = parseFloat(d) / this.rem
    if (typeof d === 'string' && d.match(/px$/)) {
      c += 'rem'
    }
    return c
  }
}(window, window.lib || (window.lib = {})))
