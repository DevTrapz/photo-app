interface props {
  src?: string;
  id: number;
}

export default function Image({ src, id }: props) {
  return (
    <img
      key={id}
      id={id.toString()}
      className="max-w-md w-full mx-auto mb-8"
      src={`${import.meta.env.VITE_PHOTO_DATA_DIR}${src}`}
    />
  );
}
