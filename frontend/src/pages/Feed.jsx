import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFeed, resetFeed } from '../features/feed/feedSlice';
import Spinner from '../components/Spinner';
import FeedItem from '../components/FeedItem';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function Feed() {
  const dispatch = useDispatch();

  const { listings, isLoading, isError, message } = useSelector(
    (state) => state.feed
  );

  const [sortTerms, setSortTerms] = useState([]);

  console.log(sortTerms);

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

  // const filteredListings = listings.filter((listing) => {
  //   return listing.requiredSkill
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  // });

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  if (isLoading) {
    return <Spinner />;
  }

  const content = listings.map((listing) => {
    return <FeedItem key={listing._id} listing={listing} />;
  });

  return (
    <>
      <Container maxWidth='md'>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Stack spacing={3}>
              <label htmlFor='searchTerm'>Filter:</label>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => handleClick('frontend developer')}
              >
                Front-End Developer
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => handleClick('backend developer')}
              >
                Back-End Developer
              </Button>
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
