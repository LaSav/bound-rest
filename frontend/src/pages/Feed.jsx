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

  const [sortTerms, setSortTerms] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [activeButtons, setActiveButtons] = useState([]);

  const handleActiveButtons = (event, newActiveButtons) => {
    setActiveButtons(newActiveButtons);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getFeed({ searchText: searchTerm }));
    setSearchTerm('');
    setSortTerms([]);
    setActiveButtons([]);
  };

  const handleClick = (newTerm) => {
    if (sortTerms.includes(newTerm)) {
      setSortTerms(sortTerms.filter((sortTerm) => sortTerm !== newTerm));
    } else {
      setSortTerms([...sortTerms, newTerm]);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    console.log(sortTerms);
    dispatch(getFeed({ requiredSkills: sortTerms }));
  }, [isError, message, dispatch, sortTerms]);

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
                value={activeButtons}
                onChange={handleActiveButtons}
              >
                <ToggleButton
                  value='fullstack developer'
                  variant='outlined'
                  color='secondary'
                  onClick={() => handleClick('fullstack developer')}
                >
                  Fullstack Developer
                </ToggleButton>
                <ToggleButton
                  value='frontend developer'
                  variant='outlined'
                  color='secondary'
                  onClick={() => handleClick('frontend developer')}
                >
                  Front-End Developer
                </ToggleButton>
                <ToggleButton
                  value='backend developer'
                  variant='outlined'
                  color='secondary'
                  onClick={() => handleClick('backend developer')}
                >
                  Back-End Developer
                </ToggleButton>
                <ToggleButton
                  value='UX designer'
                  variant='outlined'
                  color='secondary'
                  onClick={() => handleClick('UX designer')}
                >
                  UX Designer
                </ToggleButton>
                <ToggleButton
                  value='copywriter'
                  variant='outlined'
                  color='secondary'
                  onClick={() => handleClick('copywriter')}
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
