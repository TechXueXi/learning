chrome.runtime.sendMessage({"method": "checkTab"}, {}, function (response) {
    if (response && response.hasOwnProperty("runtime")) {
        if (response.runtime) {
            window.onload = function () {

                // 设置1s
                setTimeout(function() {
                    var item = document.getElementsByClassName("ant-pagination-item");
                    item[item.length - 1].click();
                }, 3000);

                function getNeedAnswer() {
                    var isNextPage = true;
                    Array.from(document.querySelectorAll('.item .right > button')).reverse().forEach(function (e, b, c) {
                        if (isNextPage) {
                            let i = e.innerText;
                            if (i != "" && (i == '开始答题' || i == '继续答题')) {
                                isNextPage = false;
                                e.click();
                                return;
                            }
                        }
                    });

                    if (isNextPage) {
                        var li = document.getElementsByClassName("ant-pagination-prev")[0];
                        if (li.getAttribute("aria-disabled") == "false") {
                            document.querySelector('a.ant-pagination-item-link > i.anticon-left').click();
                            setTimeout(getNeedAnswer, parseInt(Math.random() * 1000 + 2000));
                        } else {
                            chrome.runtime.sendMessage({"method": "paperAskDoes"});
                        }
                    }
                }

                setTimeout(getNeedAnswer, parseInt(Math.random() * 1000 + 5000));
            }
        }
    }
});