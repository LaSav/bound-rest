import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFeed, resetFeed } from '../features/feed/feedSlice';
import FeedItem from '../components/FeedItem';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';

function Feed() {
  const dispatch = useDispatch();

  const { listings, isLoading, isError, message } = useSelector(
    (state) => state.feed
  );

  const [sortTerm, setSortTerm] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  console.log(sortTerm);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getFeed({ searchText: searchTerm }));
    setSearchTerm('');
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
    dispatch(getFeed());
  }, [isError, message, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetFeed());
    };
  }, [dispatch]);

  const content = listings.map((listing) => {
    return (
      <FeedItem key={listing._id} listing={listing} isLoading={isLoading} />
    );
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
      </Container>
    </>
  );
}

export default Feed;
