import { useEffect, useState } from 'react';
import css from './App.module.css';
import { getImagesFromPixabayAPI } from 'functions/pixabayAPI';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';

const App = function () {
  const [searchQuerry, setSearchQuerry] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreShown, setIsLoadMoreShown] = useState(false);

  useEffect(() => {
    const loadImages = async function () {
      try {
        setIsLoading(true);
        setIsLoadMoreShown(false);

        const response = await getImagesFromPixabayAPI(
          searchQuerry,
          pageNumber
        );
        const { hits, total } = response.data;
        if (hits.length !== 0) {
          setItems(prevState => [...prevState, ...hits]);
          setTotal(total);
        } else {
          window.alert(
            `There is no any result on ${searchQuerry} Please, enter valid search querry`
          );
          return;
        }
        if (hits.length >= 12) {
          setIsLoadMoreShown(true);
        }
      } catch {
        window.alert(
          `There is no connetion to server. Check your internet connection or try later`
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuerry !== '') {
      loadImages();
    }
  }, [searchQuerry, pageNumber]);

  const updateSearchQuerry = newSearchQuerry => {
    if (searchQuerry !== newSearchQuerry) {
      setSearchQuerry(newSearchQuerry);
      setPageNumber(1);
      setItems([]);
      setTotal(0);
    }
  };

  const handlerLoadMoreButton = () => {
    setPageNumber(prevState => prevState + 1);
    if (pageNumber >= total / 12 - 1) {
      setIsLoadMoreShown(false);
    }
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={updateSearchQuerry} />
      {items.length > 0 && <ImageGallery items={items} />}
      {isLoading && <Loader />}
      {isLoadMoreShown && (
        <Button text="Load more" onClick={handlerLoadMoreButton} />
      )}
    </div>
  );
};

export default App;
