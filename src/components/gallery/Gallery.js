import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import style from "./Gallery.module.scss";
import { photosSelectors } from "../../redux/photo";
import GalleryItem from "../galleryItem/GalleryItem";
import Pagination from "../pagination/Pagination";

const Gallery = function () {
  const gallery = useSelector(photosSelectors.getGallery);
  const loading = useSelector(photosSelectors.getLoading);
  const [itemsPerPage] = useState(12);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(1);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    if (gallery.length > 0) {
      setCurrentItems(gallery.slice(itemOffset, endOffset));
    }

    setPageCount(Math.ceil(gallery.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, gallery]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % gallery.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ul className={style.imageGallery}>
        {currentItems.map((photo) => (
          <GalleryItem
            id={photo.id}
            key={photo.id}
            title={photo.title}
            imageUrl={photo.url}
            album={photo.albumId}
          />
        ))}
      </ul>
      {loading && (
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={80}
          width={80}
          className={style.loader}
        />
      )}
      <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
    </>
  );
};

export default Gallery;
