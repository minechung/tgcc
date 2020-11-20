// 公共数据请求路
BURL = 'http://139.9.149.109:4103/api/'




// 这个是头部的最新的
  //初始化数据+自动加载
  $(function() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        url:  BURL+`v2/blocks?limit=1`,
    }).done(res => {
      console.log('object');
      console.log(res.data);
      var latestBlockOfHead = res.data[0].id;
      console.log(latestBlockOfHead);
      $(".latestBlockOfHead").html(latestBlockOfHead);
      
    }).fail(err => {
        console.log(err);
    })
});

