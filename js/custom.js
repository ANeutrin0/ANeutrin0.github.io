// custom.js  |  解决 Butterfly + PJAX 下 video 不加载
console.log("✅ custom.js 已加载");

// 把所有 video 重新克隆并显式 load()
function reloadVideos () {
  document.querySelectorAll('video').forEach(old => {
    if (!old.querySelector('source')) return;        // 没 src 不管
    const nv = old.cloneNode(true);
    old.parentNode.replaceChild(nv, old);

    nv.load();                                       // ✨ 关键：强制开始加载
    // 避免被主题 CSS 压扁
    nv.style.minHeight = '200px';
  });
}

// 首次渲染 + PJAX 跳转后执行
['DOMContentLoaded','pjax:success','pjax:complete','pjax:end']
  .forEach(ev => document.addEventListener(ev, reloadVideos));


// 首次渲染 & PJAX 完成后都执行
document.addEventListener('DOMContentLoaded', reloadVideos);
document.addEventListener('pjax:success',   reloadVideos);  // ← 新增
document.addEventListener('pjax:complete',  reloadVideos);
