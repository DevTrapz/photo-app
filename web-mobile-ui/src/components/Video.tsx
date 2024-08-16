interface props {
  src: string;
  id: number;
}

export default function Video({ src, id }: props) {
  return (
    <>
      <video
        key={id}
        id={id.toString()}
        controls
        preload="metadata"
        loop={true}
        autoPlay={true}
        muted={true}
        className="max-w-md w-full mx-auto mb-1"
      >
        <source src={src} type="video/mp4"></source>
      </video>
    </>
  );
}
