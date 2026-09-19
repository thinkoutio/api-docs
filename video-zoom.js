// Mintlify opens images in a lightbox on click but has nothing for videos.
// This gives inline recordings the same behaviour: a click opens the clip
// in a full-window overlay, and a click anywhere or Escape closes it.
(function () {
  function open(source) {
    var overlay = document.createElement("div");
    overlay.className = "video-zoom-overlay";

    var video = document.createElement("video");
    video.src = source.currentSrc || source.src;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.currentTime = source.currentTime;
    overlay.appendChild(video);

    function close() {
      overlay.remove();
      document.removeEventListener("keydown", onKey);
      source.currentTime = video.currentTime;
      source.play().catch(function () {});
    }
    function onKey(event) {
      if (event.key === "Escape") close();
    }

    overlay.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    document.body.appendChild(overlay);
    video.play().catch(function () {});
  }

  document.addEventListener("click", function (event) {
    var video = event.target.closest && event.target.closest("video");
    if (!video || video.controls || video.closest(".video-zoom-overlay")) return;
    event.preventDefault();
    open(video);
  });
})();
