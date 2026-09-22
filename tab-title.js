// Mintlify formats the browser tab title as "Page - Site" and offers no way
// to change the separator. Replace the dash with the bullet the ThinkOut site
// uses, and keep doing so when client-side navigation swaps the title.
(function () {
  var separator = " - ThinkOut Developers";
  var replacement = " • ThinkOut Developers";

  function fix() {
    if (document.title.indexOf(separator) !== -1) {
      document.title = document.title.replace(separator, replacement);
    }
  }

  fix();

  // React updates the title's text node in place (a characterData mutation)
  // and may replace the element entirely, so watch the whole head.
  new MutationObserver(fix).observe(document.head, {
    childList: true,
    subtree: true,
    characterData: true,
  });
})();
