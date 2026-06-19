import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import Grid from '@mui/material/Grid2';

import { ProductOffer } from "./models/productOffer";
import { productService } from "./services/productService.ts";

const ProductOffersPage = () => {
  const { asin } = useParams();

  const [offers, setOffers] = useState<ProductOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOffers();
  }, [asin]);

  const loadOffers = async () => {
    try {
      setLoading(true);

      //const result = await productService.getProductOffers(asin !);
      const result: ProductOffer[] = [
        {
          "price": 278.00,
          "currency": "USD",
          "condition": "New",
          "seller": {
            "name": "Amazon.com",
            "rating": 4.8,
            "totalRatings": 1243567
          },
          "shipping": {
            "price": 0.00,
            "isFreeShipping": true,
            "isPrime": true,
            "estimatedDelivery": "Tomorrow"
          },
          "isBuyBoxWinner": true,
          "isFulfilledByAmazon": true
        },
        {
          "price": 265.00,
          "currency": "USD",
          "condition": "Used - Like New",
          "seller": {
            "name": "TechDeals Store",
            "rating": 4.5,
            "totalRatings": 8923
          },
          "shipping": {
            "price": 5.99,
            "isFreeShipping": false,
            "isPrime": false,
            "estimatedDelivery": "Mar 28 - Apr 2"
          },
          "isBuyBoxWinner": false,
          "isFulfilledByAmazon": false
        }
      ];
      setOffers(result);
    } catch {
      setError("Failed to load offers");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
      >
        Available Offers
      </Typography>

      <Grid container spacing={3}>
        {offers.map((offer, index) => (
          <Grid
            key={index}
            size={{ xs: 12, md: 6 }}
          >
            <Card elevation={3} 
            sx={{
                  minHeight: 400
                }}
            >
              <CardContent>

                <Typography variant="h6">
                  {offer.seller.name}
                </Typography>

                <Typography color="text.secondary">
                  Seller Rating: {offer.seller.rating}
                </Typography>

                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  ${offer.price}
                </Typography>

                <Typography>
                  Shipping: ${offer.shipping.price}
                </Typography>

                <Typography>
                  Delivery: {offer.shipping.estimatedDelivery}
                </Typography>

                <Typography>
                  Stock: {offer.condition}
                </Typography>

                {offer.shipping.isPrime && (
                  <Chip
                    label="Prime"
                    color="success"
                    sx={{ mt: 2 }}
                  />
                )}

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductOffersPage;