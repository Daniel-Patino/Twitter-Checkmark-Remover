// ==UserScript==
// @name                Twitter: Checkmark Cleansing
// @version             1.0.0
// @description         Removes all Checkmark Posts
// @author              Panzer
// @include             https://twitter.com/*
// @grant               none
// ==/UserScript==

/* jshint esversion: 6 */

(function() {
    'use strict';

    const blueCheckLabel = '[aria-label="Verified account"]';
    const blockQuoteLabel = '[role="blockquote"]';
    const foundParentOfPost = "css-1dbjc4n r-16y2uox r-1wbh5a2 r-1ny4l3l r-1udh08x r-1yt7n81 r-ry3cjt";
    const foundCheckOfParent = "css-901oao r-jwli3a r-18u37iz r-1q142lx r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-qvutc0";
    const foundCheckOfQuote = "css-1dbjc4n r-18bvks7 r-1ylenci r-rs99b7 r-1loqt21 r-dap0kf r-1ny4l3l r-1udh08x r-o7ynqc r-6416eg";
    let currentUrl = document.location.href;
    let updating = false;

    init(10);

    locationChange();

    window.addEventListener("scroll", update);

    function init(times) {
        for (let i = 0; i < times; i++) {
            setTimeout(findBlueChecks1, 500 * i);
        }
    }

    function findBlueChecks1() {
        document.getElementsByClassName(foundParentOfPost).forEach(parent => {
            if(!parent.querySelector(blockQuoteLabel)) {
                parent.getElementsByClassName(foundCheckOfParent).forEach(theChild => {
                    if(theChild.querySelector(blueCheckLabel)){
                        parent.remove();
                    }
                })
            }
            else {
                parent.getElementsByClassName(foundCheckOfQuote).forEach(theChild => {
                    if(theChild.querySelector(blueCheckLabel)){
                        theChild.remove();
                    }
                })
            }
        })
    }

    function update() {
        if (updating) return;
        updating = true;
        init(3);
        setTimeout(() => { updating = false; }, 250);
    }

    function locationChange() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(() => {
                if (currentUrl !== document.location.href) {
                    currentUrl = document.location.href;
                    init(10);
                }
            });
        });
        const target = document.body;
        const config = { childList: true, subtree: true };
        observer.observe(target, config);
    }

})();
