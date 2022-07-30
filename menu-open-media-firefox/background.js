'use strict';

const LABEL_ID = "label_open_media";

browser.menus.create({
  id: LABEL_ID,
  title: "Open",
  contexts: ["image", "video", "frame", "audio"]
});

browser.menus.onClicked.addListener(function(info, tab){
  if (info.menuItemId === LABEL_ID) {
    browser.tabs.update(tab.id, {
      url: info.srcUrl
    });
  }
});

browser.menus.onShown.addListener(function(info){
  if (!info.srcUrl) {
    return;
  }
  let a = document.createElement("a");
  a.href = info.srcUrl;
  update_menu(info.mediaType);
});

function update_menu(mediaType) {
  browser.menus.update(LABEL_ID, {
    title: "Open " + mediaType
  });
  browser.menus.refresh();
};
