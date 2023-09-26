import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getFeed,
  resetFeed,
  searchFeed,
  sortFeed,
} from '../features/feed/feedSlice';
import FeedItem from '../components/FeedItem';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Spinner from '../components/Spinner';
import Box from '@mui/material/Box';

function Feed() {
  const dispatch = useDispatch();

  const { listings, isLoading, isError, message, totalPages } = useSelector(
    (state) => state.feed
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [sortTerm, setSortTerm] = useState('All Listings');

  const [searchTerm, setSearchTerm] = useState('');

  console.log(listings.length);
  console.log('search term', searchTerm);
  console.log('page', currentPage);
  console.log('sort term', sortTerm);
  console.log('total pages:', totalPages);

  const handleSearch = (e) => {
    e.preventDefault();
    setSortTerm('All Listings');
    // dispatch(resetFeed());
    dispatch(searchFeed({ query: searchTerm, page: 1 }));
  };

  const handleSort = (selectedTerm) => {
    setSortTerm(selectedTerm);
    setSearchTerm('');
    // dispatch(resetFeed());
    if (selectedTerm === 'All Listings') {
      dispatch(getFeed({ page: 1 }));
    } else {
      dispatch(sortFeed({ requiredSkill: selectedTerm, page: 1 }));
    }
  };

  // const getMoreListings = (sortTerm, searchTerm) => {
  //   if (sortTerm && sortTerm !== 'All Listings') {
  //     dispatch(sortFeed({ requiredSkill: sortTerm, page: page }));
  //   } else if (searchTerm) {
  //     dispatch(searchFeed({ query: searchTerm, page: page }));
  //   } else {
  //     dispatch(getFeed({ page: page }));
  //   }
  // };

  const handleNextPage = (sortTerm, searchTerm, currentPage) => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      if (sortTerm && sortTerm !== 'All Listings') {
        dispatch(sortFeed({ requiredSkill: sortTerm, page: currentPage + 1 }));
      } else if (searchTerm) {
        dispatch(searchFeed({ query: searchTerm, page: currentPage + 1 }));
      } else {
        dispatch(getFeed({ page: currentPage + 1 }));
      }
    }
  };

  const handlePreviousPage = (sortTerm, searchTerm, currentPage) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (sortTerm && sortTerm !== 'All Listings') {
        dispatch(sortFeed({ requiredSkill: sortTerm, page: currentPage - 1 }));
      } else if (searchTerm) {
        dispatch(searchFeed({ query: searchTerm, page: currentPage - 1 }));
      } else {
        dispatch(getFeed({ page: currentPage - 1 }));
      }
    }
  };

  // Fetch all listings on component mount
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getFeed({ page: 1 }));
  }, [dispatch, message, isError]);

  // Cleanup on component unmount
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
        <Grid container spacing={5} justifyContent='center'>
          <Grid item xs={9}>
            <Stack spacing={3} direction='row' justifyContent='space-between'>
              <Box>
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
              </Box>
              <Box>
                <Select
                  name='requiredSkill'
                  id='requiredSkill'
                  value={sortTerm}
                  label='Select the Skill required for this listing'
                  onChange={(e) => handleSort(e.target.value)}
                >
                  <MenuItem value='All Listings'>All Listings</MenuItem>
                  <MenuItem value='fullstack developer'>
                    Fullstack developer
                  </MenuItem>
                  <MenuItem value='frontend developer'>
                    Frontend developer
                  </MenuItem>
                  <MenuItem value='backend developer'>
                    Backend developer
                  </MenuItem>
                  <MenuItem value='UX designer'>UX designer</MenuItem>
                  <MenuItem value='copywriter'>Copywriter</MenuItem>
                </Select>
              </Box>
            </Stack>
            {isLoading ? <Spinner /> : <Stack spacing={2}>{content}</Stack>}
          </Grid>
        </Grid>
        <Button
          variant='secondary'
          onClick={() => {
            handleNextPage(sortTerm, searchTerm, currentPage);
          }}
        >
          Next
        </Button>
        <Button
          variant='secondary'
          onClick={() => {
            handlePreviousPage(sortTerm, searchTerm, currentPage);
          }}
        >
          Previous
        </Button>
      </Container>
    </>
  );
}

export default Feed;
