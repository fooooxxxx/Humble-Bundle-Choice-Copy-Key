// ==UserScript==
// @name         Humble Choice Copy Key
// @description  在donwload页面自动复制Humble月包的key
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       fox
// @grant        none
// @include      https://www.humblebundle.com/downloads*
// @icon         https://humblebundle-a.akamaihd.net/static/hashed/46cf2ed85a0641bfdc052121786440c70da77d75.png
// ==/UserScript==
(function () {
    'use strict';
    // 获取Key和游戏名的组合列表[{name: '',key: ''}]
    const getKeyList = () => {
        const keyList = []
        const keyNodeList = document.getElementsByClassName('key-redeemer')
        for (let keyNode of keyNodeList) {
            const name = keyNode.querySelector('h4').innerText
            const key = keyNode.querySelector('div.keyfield-value').innerText
            keyList.push({
                'name': name,
                'key': key
            })
        }
        return keyList
    }
    // 展现key
    const showKeyList = () => {
        const keyList = getKeyList()
        let keyListText = ''
        keyList.forEach((keyObj, index) => {
            keyListText += `${keyObj.name}: ${keyObj.key}\n`
        })
        const keyListTextArea = document.querySelector('#keyListTextArea')
        keyListTextArea.replaceChildren(document.createTextNode(keyListText))
    }

    // 页面完全加载后执行
    window.addEventListener('load', () => {
        let keyListDivElem = document.getElementsByClassName('key-list').item(0)
        if (keyListDivElem === null) return
        // 插入复制按钮
        const copyBtnElem = document.createElement('button')
        copyBtnElem.addEventListener('click', showKeyList)
        copyBtnElem.appendChild(document.createTextNode('刷新获取的Key'))
        keyListDivElem.before(copyBtnElem)
        // 插入空白的key显示区域
        const keyListTextArea = document.createElement('textarea')
        keyListTextArea.id = 'keyListTextArea'
        keyListTextArea.setAttribute('style', 'width: 770px;height: 270px;')
        keyListDivElem.before(keyListTextArea)
        // 初始化完成后直接显示
        showKeyList()
    })
})();