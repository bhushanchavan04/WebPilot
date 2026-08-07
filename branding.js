/* Keeps the compiled extension UI aligned with the WebPilot product name. */
(function () {
  var oldName = 'AI Browser Agent';
  var newName = 'WebPilot';

  function replaceBranding() {
    if (document.title.indexOf(oldName) !== -1) {
      document.title = document.title.replace(oldName, newName);
    }

    var walker = document.createTreeWalker(document.body || document.documentElement, NodeFilter.SHOW_TEXT);
    var textNode;
    while ((textNode = walker.nextNode())) {
      if (textNode.nodeValue.indexOf(oldName) !== -1) {
        textNode.nodeValue = textNode.nodeValue.replace(oldName, newName);
      }
    }
  }

  replaceBranding();
  new MutationObserver(replaceBranding).observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });
}());
