var fetch = require('node-fetch');
var fs = require('fs');

var url = 'https://www.zhihu.com/api/v4/members/dancerphil/followers?include=data%5B*%5D.answer_count%2Carticles_count%2Cgender%2Cfollower_count%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=0&limit=20'

var headers = {
  'Host': 'www.zhihu.com',
  'Connection': 'keep-alive',
  'accept': 'application/json, text/plain, */*',
  'X-UDID': 'AJBCgAXoEwyPTuH8h0rDdJW6O07XHC0kVcU=',
  'authorization': 'Bearer 2|1:0|10:1510227175|4:z_c0|92:Mi4xMzRqMEFnQUFBQUFBa0VLQUJlZ1REQ1lBQUFCZ0FsVk41NHJ4V2dEQVJZVEpIR3M0UDhtbXkxa3NuTFVLZFBqV1B3|34e0d0d04ebc338e6739e32a72408c957a027cf2e7f2d5537b65853080c60ad7',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
  'Referer': 'https://www.zhihu.com/people/dancerphil/followers?page=4',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
  'Cookie': 'aliyungf_tc=AQAAAMVzTANzEwgA87CvtB9upzezoR5K; _zap=339ed883-d450-4e6c-a207-bb3a96d80eea; d_c0="AJBCgAXoEwyPTuH8h0rDdJW6O07XHC0kVcU=|1500274321"; acw_tc=596c5e94|fd599c4fb4bc40efc5df3ea9f1bef870; q_c1=19938b8b03864fd283b37858831ea613|1506317730000|1499420134000; q_c1=19938b8b03864fd283b37858831ea613|1509427891000|1499420134000; s-q=%E7%9F%A5%E4%B9%8E%E7%88%AC%E8%99%AB; s-i=6; sid=6a22908g; s-t=autocomplete; l_cap_id="MTNjYjZjODQyYjBlNDcxOWJiNWYxMDA5YjZmOWVjNmM=|1510224570|ff2860f8ef4279acec88db273e739c8ecd608406"; r_cap_id="M2M5ZTRkNThhZDg1NGQ4Njk2OTNkOTNhY2JjOTliYzA=|1510224570|fde21cbcfb141d5232dbd97202205d52d84930ec"; cap_id="YTNhMTg0YTQ1YmRmNDZhYmE4ZGQwZWQxNDA4YTkwNzE=|1510224570|aa06f60a93090092c91713f08f3505407a02034e"; __utma=155987696.1622718577.1510224573.1510224573.1510224573.1; __utmc=155987696; __utmz=155987696.1510224573.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); capsion_ticket="2|1:0|10:1510227164|14:capsion_ticket|44:ZjFmNmU3ODk3YzJmNDQ0M2I2NTA3ODNkODUyNTIwZTU=|06332a79831840591467f95f97fb3cb91b63be8bbc2ba9ce45e1c57579d28c8e"; z_c0="2|1:0|10:1510227175|4:z_c0|92:Mi4xMzRqMEFnQUFBQUFBa0VLQUJlZ1REQ1lBQUFCZ0FsVk41NHJ4V2dEQVJZVEpIR3M0UDhtbXkxa3NuTFVLZFBqV1B3|34e0d0d04ebc338e6739e32a72408c957a027cf2e7f2d5537b65853080c60ad7"; _xsrf=865026e3-be43-49ab-bff9-3241d8ef77c5'
}

var store = [];

function loop(url) {
  if(url){
    return fetch(url, { headers }).then(function (res) {
      return res.text();
    }).then(function (body) {
      var r = JSON.parse(body)
      var data = r.data;
      console.log('.')
      store = store.concat(data);
      var paging = r.paging;
      if (paging.is_end) { return Promise.resolve();}
      return loop(paging.next);
    })
  }
  return Promise.resolve()
}
loop(url).then(() => {
  fs.writeFile('data.txt', JSON.stringify(store), 'utf8', function () {
    console.log('write file done')
  });
})
