import { useEffect } from "react";

interface props {
  src: string;
  id: number;
}

export default function Video({ src, id }: props) {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: [0.2],
  };

  var playVideo = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(function (entry) {
      if (entry.target.buffered.length < 1) return;
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  };

  useEffect(() => {
    const video = document.getElementById(id.toString());
    var observer = new IntersectionObserver(playVideo, options);
    observer.observe(video);
  }, []);

  return (
    <>
      <video
        key={id}
        id={id.toString()}
        controls
        preload="metadata"
        loop={true}
        autoPlay={false}
        muted={true}
        playsInline
        className="max-w-md w-full mx-auto mb-1"
      >
        <source src={src} type="video/mp4"></source>
      </video>
    </>
  );
}
