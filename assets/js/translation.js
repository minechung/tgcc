$(document).ready(function () {
  var defaultLang = 'cn';
  function getLang() {
    if (document.cookie.indexOf('grycan.cn.bLang') != -1) {
      var arrCookie = document.cookie.split(';')
      for (let i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split('=');
        if ('grycan.cn.bLang' == arr[0].trim()) {
          defaultLang = arr[1];
          languageSelect(defaultLang);
          // if (defaultLang == 'en') {
          // 	$('.trans-en .english-language').text('English')
          // } else if (defaultLang == 'cn') {
          // 	$('.trans-en .chinese-language').text('简体中文')
          // }
          break;
        }
      }
    }
  }
  getLang();
  /*调用语言包*/
  function languageSelect(defaultLang) {
    $("[i18n]").i18n({
      defaultLang: defaultLang,
      filePath: "assets/js/i18n/",
      filePrefix: "i18n_",
      fileSuffix: "",
      forever: true,
      callback: function (res) {

      }
    });
  }
  languageSelect(defaultLang)
  // 设置cookie
  function setLang(name, value, path) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    var paths = ";path=" + path;
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + paths;
  }

  $('.trans-en .english-language').click(function(){
    debugger;
    let textEnglish = $(this).text().trim();
    console.log(textEnglish)
    if(textEnglish=='English'){
      defaultLang = 'en';
      setLang('grycan.cn.bLang', 'en', '/')
    }
    getLang();
  })

  $('.trans-en .chinese-language').click(function(){
    let textChinese = $(this).text().trim();
    console.log(textChinese)
    if(textChinese=='简体中文'){
      defaultLang = 'cn';
      setLang('grycan.cn.bLang', 'cn', '/')
    }
    getLang();
  })
})