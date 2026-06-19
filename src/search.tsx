import React, { useState, useEffect } from 'react';
import { api } from './services/apiClient.ts';
import { useApi } from './hooks/useApi.ts';
import { Product } from './models/product.ts';
import Grid from '@mui/material/Grid2';
import {
  TextField, Pagination, Card, CardContent, CardActions, CardMedia, Typography, Button, Box,
  CircularProgress, Rating
} from '@mui/material';

export default function ApiDataGrid() {
  //const [items, setItems] = useState([]);
  const { data: items, loading, error, execute: fetchProducts } = useApi<Product[]>();
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // 1. Fetch Data on Component Mount
  /* useEffect(() => {
     const fetchData = async () => {
       try {
         setLoading(true);
         // Replace with your real API endpoint URL (e.g., your Amazon scraper backend)
         const response = await fetch('https://localhost:7200/api/products');
 
         if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
         }
 
         const data = await response.json();
         console.log('scraped data', data);
         setItems(data); // Save the array to state
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };
 
     fetchData();
   }, []); // Empty array ensures this runs exactly once when the component loads
 */
  /*useEffect(() => {
   // 3. Trigger the GET request securely using your generic service
   execute(() => api.get<Product[]>('/products'));
 }, [execute]);*/


  // 2. Handle Search Filtering
  const filteredItems = searchQuery == "" ? items : items == null ? null : items.filter((item) =>
    // Adjust 'title' to match the property names returned by your backend API
    item.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 3. Handle Pagination Calculation
  const totalPages = filteredItems == null ? 0 : Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredItems == null ? null : filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applySearch();
    }
  };

  const applySearch = () => {
    //useEffect(() => {
    // Pass the query parameters object directly into api.get
    fetchProducts(() =>
      api.get<Product[]>('/products/search?query=' + searchQuery + "&page=" + currentPage, {
        query: searchQuery,
        page: currentPage + 1,
        refresh: true
        //limit: 10       
      })
    );
    /*}, [fetchProducts, searchQuery, currentPage + 1]); // Re-runs when search or page changes
    };*/
  }
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" align="center">Error loading data: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '80%', p: 3 }}>
      <TextField
        fullWidth
        label="Search products..."
        variant="outlined"
        value={searchQuery}
        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
        onKeyDown={handleKeyDown}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={3}>
        {filteredItems != null && filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.asin}>
              <Card variant="outlined">
                <Card sx={{
                  minHeight: 400,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <CardMedia
                    sx={{ height: 250 }}
                    image={item.image}
                    title={item.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body2" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                      {item.originalPrice || item.price}  {item.currency}
                    </Typography>
                  </CardContent>

                  <Typography component="legend">
                    <Rating name="read-only" value={Number(item.rating)} readOnly />
                  </Typography>

                  <CardActions sx={{ marginTop: 'auto', marginLeft: 'auto' }}>
                    <Button size="small">Show More</Button>
                  </CardActions>
                </Card>

              </Card>
            </Grid>
          ))
        ) : (
          <Grid size={12}>
            <Typography variant="body1" color="text.secondary" align="center">
              No items match your search criteria.
            </Typography>
          </Grid>
        )}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
