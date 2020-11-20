APIURL = 'http://124.70.148.13:4103/api/';

const username = {
    'Seo3py1GDjaUSbKXdbzpNnHQWjLKfnNUt4': 'SGU',
};

// 获取URL参数
function getAddressUsername(address, isFull = false) {
    var name = username[address]
        // console.log(name)
    if (name) {
        return name + '<img style="margin-left:5px;" src="assets/images/verify.png" width=18 height=18>';
    } else {
        if (isFull) {
            return address;
        } else {
            return address.slice(0, 6) + '...' + address.slice(-6);
        }
    }
}

function getAddressUsername2(address) {
    var name = username[address]
        // console.log(name)
    if (name) {
        return name + '<img style="margin-left:5px;" src="assets/images/verify.png" width=18 height=18>';
    } else {
        return '--'
    }
}


(function($) {

    // 获取URL参数
    $.getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    // inspired by http://jsfiddle.net/arunpjohny/564Lxosz/1/
    $('.table-responsive-stack').find("th").each(function(i) {

        $('.table-responsive-stack td:nth-child(' + (i + 1) + ')').prepend('<span class="table-responsive-stack-thead">' + $(this).text() + ':</span> ');
        $('.table-responsive-stack-thead').hide();
    });


    $('.table-responsive-stack').each(function() {
        var thCount = $(this).find("th").length;
        var rowGrow = 100 / thCount + '%';
        //console.log(rowGrow);
        $(this).find("th, td").css('flex-basis', rowGrow);
    });


    if (typeof ClipboardJS != 'undefined') {
        var clipboard = new ClipboardJS('.copy-button', {
            text: function(trigger) {
                return trigger.getAttribute('aria-label');
            }
        });

        clipboard.on('success', function(e) {
            layer.msg('复制成功');
        });

        clipboard.on('error', function(e) {
            layer.msg('复制成功,请重试');
        });

    }


    // 搜索框--
    $(document).on('click', '.search-btn', function() {
        var address = $(".search-box").val()
        console.log(address);

        console.log(address.length);
        console.log(address.length === 34);
        if (address.length === 64) { //----->获取交易ID
            $.ajax({
                //请求方式
                type: "GET",
                //请求的媒体类型
                contentType: "application/json;charset=UTF-8",
                //请求地址
                url: BURL + `v2/transactions/${address}`,
                // 传参就可以去了
                // data: {
                //     id: address
                // },
                async: false,

            }).done(function(res) {
                console.log(res.data.id);
                // 这个是真实获取的
                window.location.href = `transaction-detail.html?id=${res.data.id}`
                localStorage.setItem("id", res.data.id);
            }).fail(function(err) {
                console.log(err)
            })

        } else if (address.length === 20 || address.length === 19) { //=这个是区块ID
            $.ajax({
                //请求方式
                type: "GET",
                //请求的媒体类型
                contentType: "application/json;charset=UTF-8",

                //请求地址---❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️  ---- 用这个数据输入框  15447090855222023348
                url: BURL + `v2/blocks/${address}`,


                // 这个是api的数据能拿到的id
                // url: BURL+`v2/blocks/15447090855222023348`,
                // 传参就可以去了
                // data: {
                //     id: address
                // },
                async: false,
            }).done(function(res) {
                console.log(res.data.id);
                // var wangID = res.data.id;
                // 这个是真实获取的-❤️❤️❤️❤️❤️ 15447090855222023348
                window.location.href = `block-detail.html?id=${res.data.id}`
                localStorage.setItem("blockId", res.data.id);
                //api接口的真确的数据
                // window.location.href = `newestOne.html?id=15447090855222023348`
                // localStorage.setItem("blockId", "15447090855222023348");
            }).fail(function(err) {
                console.log(err)
            })

        } else if (address.length === 34) {
            $.ajax({
                //请求方式
                type: "GET",
                //请求的媒体类型
                contentType: "application/json;charset=UTF-8",

                //请求地址---❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️   用这个去输入  AKdr5d9AMEnsKYxpDcoHdyyjSCKVx3r9Nj
                url: BURL + `v2/wallets/${address}`,

                // 这个是api的数据能拿到的id
                // url: BURL+`v2/wallets/AKdr5d9AMEnsKYxpDcoHdyyjSCKVx3r9Nj`,
                async: false,
            }).done(function(res) {
                console.log(res.data.address);
                // return false;
                // var wangID = res.data.id;
                localStorage.setItem("addressId", res.data.address);
                // 这个是真实获取的-❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️  AKdr5d9AMEnsKYxpDcoHdyyjSCKVx3r9N
                window.location.href = `wallet-detail.html?id=${res.data.address}`


                //api接口的真确的数据
                // window.location.href = `wallet-detail.html?id=AKdr5d9AMEnsKYxpDcoHdyyjSCKVx3r9Nj`
                // localStorage.setItem("addressId", "AKdr5d9AMEnsKYxpDcoHdyyjSCKVx3r9Nj");

            }).fail(function(err) {
                console.log(err)
            })
        } else {
            console.log('错误')
            layer.msg('未查询到相关内容');
        }
    });

    // // 语言切换
    var defaultLang = 'cn';

    function setCookie(name, value, myDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + myDay);
        document.cookie = name + '=' + value + '; expires=' + oDate;
    };

    function getCookie(name) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
            var arr1 = arr[i].split('=');
            if (arr1[0] == name) {
                return arr1[1];
            }
        }
        return '';
    };

    var cookieLang = getCookie("i18n_lang");

    if (cookieLang != "" && cookieLang != "undefined" && cookieLang != null) {

        setLang(cookieLang);

    } else {
        setLang(defaultLang);
    }

    function setLang(lang, reload = false) {
        $("[i18n]").i18n({
            lang: lang,
            filePath: "assets/js/i18n/",
            filePrefix: "i18n_",
            fileSuffix: "",
            forever: true,
            callback: function(res) {
                if (lang == 'en') {
                    $('.selected img').attr("src", 'assets/images/flags/en.png');
                } else {
                    $('.selected img').attr("src", 'assets/images/flags/china.png');
                }
            }
        });

        if (reload) {
            window.location.reload();
        }

    }

    $.refreshLang = function() {
        var cookieLang = getCookie("i18n_lang");

        if (cookieLang != "" && cookieLang != "undefined" && cookieLang != null) {

            setLang(cookieLang);

        } else {
            setLang(defaultLang);
        }
    }

    $.getLang = function() {
        var cookieLang = getCookie("i18n_lang");

        if (cookieLang != "" && cookieLang != "undefined" && cookieLang != null) {

            return cookieLang;

        } else {
            return defaultLang;
        }
    }


    $('.trans-en .english-language').click(function() {
        let textEnglish = $(this).text().trim();
        console.log(textEnglish)
        if (textEnglish == 'English') {
            // defaultLang = 'en';
            setLang('en', true);
            $('.trans-en').hide();
            // $("[i18n]").i18n({defaultLang:"en"})；
        }
    })

    $('.trans-en .chinese-language').click(function() {
        let textChinese = $(this).text().trim();
        console.log(textChinese)
        if (textChinese == '简体中文') {
            // defaultLang = 'cn';
            setLang('cn', true);
            $('.trans-en').hide();
        }
    })

})(jQuery);