
// The onClicked callback function.
function onClickHandler(info, tab) {
    
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));

};

chrome.contextMenus.onClicked.addListener(onClickHandler);



// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
  var contexts = ["page","selection","link","editable","image","video",
                  "audio"];
  //for (var i = 0; i < contexts.length; i++) {
//    var context = contexts[i];
  //  var title = "Test '" + context + "' menu item";
    var id = chrome.contextMenus.create({"type": "normal","title": "Title", "contexts": ["page"],
                                         "id": "context"});
 //   console.log("'" + context + "' item:" + id);
//  }

  // Create a parent item and two children.
  chrome.contextMenus.create({"title": "Test parent item", "id": "parent"});

});