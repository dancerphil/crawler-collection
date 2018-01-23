const fs = require('fs');

const file = fs.readFileSync('data.txt', 'utf8');

const store = JSON.parse(file);

const list = store.filter(item => item.follower_count > 20 && item.answer_count > 5).sort(function (a, b) {
  return b.follower_count - a.follower_count;
});

const html = list.map(item => {
  let icon = '';
  if(item.gender === 0)icon = '♀';
  if(item.gender === 1)icon = '♂';
  return `
<div class="card">
  <img width="60" height="60" src="${item.avatar_url}" style="margin-right: 10px;">
  <div>
    <a href="https://www.zhihu.com/people/${item.url_token}">${item.name}</a>
    <div style="margin-top: 6px; font-size: 15px; color: #555;">${item.headline || '-'}</div>
    <div style="margin-top: 5px; display: flex; flex-direction: row; font-size: 14px; color: #88a;">
      <div> | ${item.answer_count} 回答 | </div>
      <div> | ${item.articles_count} 文章 | </div>
      <div> | ${item.follower_count} 关注者 | </div>
      <div style="font-family: serif"> ${icon}</div>
    </div>
  </div>
</div>`;
})

const header = `
<meta charset="utf-8">
<link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" rel="stylesheet" >
<style type="text/css">
body { background: #f3f3f3; display: flex; flex-direction: column; align-items: center; font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif; }
a { font-size: 18px; color: #175199; text-decoration: none;} a:hover { color: pink; }
.card { background: white; display: flex; flex-direction: row; align-items: center; padding: 10px; margin: 10px; border-radius: 3px; width: 800px; }
</style>
`

fs.writeFileSync('index.html', header + html.join(''), 'utf8');
