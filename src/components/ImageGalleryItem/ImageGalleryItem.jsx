export const ImageGalleryItem = ({ image, setModalImg }) => {
  const { webformatURL, largeImageURL, tags } = image;
  return (
    <>
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          onClick={() => setModalImg({ tags, largeImageURL })}
          src={webformatURL}
          data-src={largeImageURL}
          alt={tags}
        />
      </li>
    </>
  );
};
