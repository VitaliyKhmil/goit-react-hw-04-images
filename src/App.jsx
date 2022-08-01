import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { PrimaryButton } from './components/Button/PrimaryButton.styled';
import { CorrectSearch } from './components/CorrectSearch/CorrectSearch';
import Loader from './components/Loader/Loader';
import { fetchQuery } from './API/fetchQuery';

export function App () {
  const [q, setQ] = useState('');
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [status, setStatus] = useState('idle');
  const [lastPage, setLastPage] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function onFetch() {
      try {
        const {
          data: { hits, totalHits },
        } = await fetchQuery({ page, q });

        if (q === '') {
          return;
        }

        if (page >= 1) {
          setHits(prevHits => (page === 1 ? hits : [...prevHits, ...hits]));
          setTotalHits(totalHits);
          setLastPage(Math.ceil(totalHits / 12));
          setStatus('resolved');
        }
      } catch (error) {
        setTotalHits(null);
        setHits([]);
        setStatus('rejected');
        toast.info(`Something went wrong ${error}`);
      }
    }
    onFetch();
  }, [page, q]);

   const handlerSearchbarSubmit = async value => {
    setStatus('loading');
    setQ(value);
    setPage(1);
    try {
      const responce = await fetchQuery({ q, page });
      setLastPage(Math.ceil(responce.data.totalHits / 12));
      setHits([...responce.data.hits]);
      setTotalHits(responce.data.totalHits);
      setStatus('resolved');
    } catch (error) {
      toast.error(`Something went wrong ${error}`);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  }; 

  return (
    <>
      <Searchbar onSubmit={handlerSearchbarSubmit} />
      {status === 'resolved' && totalHits === 0 && <CorrectSearch />}
      {totalHits > 0 && <ImageGallery items={hits} />}
      {status === 'loading' && <Loader />}
      {totalHits > 12 && page !== lastPage && (
        <PrimaryButton type="button" onClick={loadMore}>
          Load more
        </PrimaryButton>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
  }
