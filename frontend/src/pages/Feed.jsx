import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getFeed, resetFeed, searchFeed } from '../features/feed/feedSlice';
import FeedItem from '../components/FeedItem';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import Spinner from '../components/Spinner';

function Feed() {
  const dispatch = useDispatch();

  const { listings, isLoading, isError, message, page } = useSelector(
    (state) => state.feed
  );

  const observer = useRef(null);

  const [sortTerm, setSortTerm] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  console.log(listings.length);
  console.log('search term', searchTerm);
  console.log('page', page);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(resetFeed());
    dispatch(searchFeed({ query: searchTerm }));
    setSortTerm('');
  };

  const handleSortTerm = (event, newTerm) => {
    setSortTerm(newTerm);
    dispatch(getFeed({ requiredSkill: newTerm }));

    // window.history.pushState(
    //   null,
    //   '',
    //   `?requiredSkill=${encodeURIComponent(newTerm)}`
    // );
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    // const queryParams = new URLSearchParams(window.location.search);
    // const sortParam = queryParams.get('requiredSkill');

    // if (sortParam) {
    //   setSortTerm(sortParam);
    //   dispatch(getFeed({ requiredSkill: sortParam }));
    // }
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isError, message, dispatch, page]);

  useEffect(() => {
    dispatch(getFeed({ page: page }));
  }, [dispatch]);

  useEffect(() => {
    if (observer.current && page > 1) {
      observer.current.observe(
        document.getElementById('infinite-scroll-trigger')
      );
    }
  }, [page, searchTerm]);

  const handleObserver = (entries) => {
    if (entries[0].isIntersecting && !isLoading) {
      if (searchTerm) {
        dispatch(resetFeed());
        dispatch(searchFeed({ query: searchTerm, page: page }));
      } else {
        dispatch(getFeed({ page: page }));
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetFeed());
    };
  }, [dispatch]);

  const content = listings.map((listing) => {
    return <FeedItem key={listing._id} listing={listing} />;
  });

  return (
    <>
      <Container maxWidth='lg'>
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <Stack spacing={3}>
              <label htmlFor='searchTerm'>Filter:</label>
              <ToggleButtonGroup
                orientation='vertical'
                value={sortTerm}
                exclusive
                onChange={handleSortTerm}
              >
                <ToggleButton
                  value='fullstack developer'
                  variant='outlined'
                  color='secondary'
                >
                  Fullstack Developer
                </ToggleButton>
                <ToggleButton
                  value='frontend developer'
                  variant='outlined'
                  color='secondary'
                >
                  Front-End Developer
                </ToggleButton>
                <ToggleButton
                  value='backend developer'
                  variant='outlined'
                  color='secondary'
                >
                  Back-End Developer
                </ToggleButton>
                <ToggleButton
                  value='UX designer'
                  variant='outlined'
                  color='secondary'
                >
                  UX Designer
                </ToggleButton>
                <ToggleButton
                  value='copywriter'
                  variant='outlined'
                  color='secondary'
                >
                  Copywriter
                </ToggleButton>
              </ToggleButtonGroup>
              <form noValidate autoComplete='off' onSubmit={handleSearch}>
                <TextField
                  label='search'
                  onChange={(e) => setSearchTerm(e.target.value)}
                >
                  Search
                </TextField>
                <Button variant='outlined' color='secondary' type='submit'>
                  Search
                </Button>
              </form>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack spacing={2}>{content}</Stack>
          </Grid>
        </Grid>
        {isLoading ? <Spinner /> : <div id='infinite-scroll-trigger'></div>}
      </Container>
    </>
  );
}

export default Feed;
