import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFeed, resetFeed } from '../features/feed/feedSlice';
import FeedItem from '../components/FeedItem';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { css } from '@emotion/react';

const buttonStyles = {
  normal: 'secondary',
  active: css`
    background-color: blue;
    color: white;
    border: 1px solid blue;
  `,
};

function Feed() {
  const dispatch = useDispatch();

  const { listings, isLoading, isError, message } = useSelector(
    (state) => state.feed
  );

  const [sortTerms, setSortTerms] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  // const [activeButton, setActiveButton] = useState('false');

  // if (activeButton === 'false') {
  // }

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getFeed({ searchText: searchTerm }));
    setSearchTerm('');
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
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => handleClick('fullstack developer')}
                sx={
                  sortTerms.includes('fullstack developer')
                    ? buttonStyles.active
                    : buttonStyles.normal
                }
              >
                Fullstack Developer
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => handleClick('frontend developer')}
                sx={
                  sortTerms.includes('frontend developer')
                    ? buttonStyles.active
                    : buttonStyles.normal
                }
              >
                Front-End Developer
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => handleClick('backend developer')}
                sx={
                  sortTerms.includes('backend developer')
                    ? buttonStyles.active
                    : buttonStyles.normal
                }
              >
                Back-End Developer
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => handleClick('UX designer')}
                sx={
                  sortTerms.includes('UX designer')
                    ? buttonStyles.active
                    : buttonStyles.normal
                }
              >
                UX Designer
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => handleClick('copywriter')}
                sx={
                  sortTerms.includes('copywriter')
                    ? buttonStyles.active
                    : buttonStyles.normal
                }
              >
                Copywriter
              </Button>
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
