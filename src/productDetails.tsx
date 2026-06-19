import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    Button,
    Rating,
    Chip,
    Divider,
    Paper,
    Alert,
    CircularProgress,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Product } from "./models/product";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { productService } from "./services/productService.ts";

const ProductDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const { asin } = useParams();

    const [productDetails, setOffers] = useState<Product>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedImage, setSelectedImage] = useState(productDetails?.image);

    useEffect(() => {
        loadOffers();
    }, [asin]);

    const loadOffers = async () => {
        try {
            setLoading(true);

            const result = await productService.getProductDetails(asin!);

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
            <h1>Product Details</h1>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Grid container spacing={4}>
                    {/* Left Side - Images */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="500"
                                image={selectedImage}
                                alt={productDetails?.title}
                            />
                        </Card>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                mt: 2,
                                justifyContent: "center",
                            }}
                        >
                            {productDetails?.images.map((img, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        cursor: "pointer",
                                        border:
                                            selectedImage === img
                                                ? "2px solid #1976d2"
                                                : "1px solid #ddd",
                                    }}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <CardMedia
                                        component="img"
                                        image={img}
                                        sx={{ width: 80, height: 80 }}
                                    />
                                </Card>
                            ))}
                        </Box>
                    </Grid>

                    {/* Right Side - Product Info */}
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Typography variant="h4" gutterBottom>
                            {productDetails?.title}
                        </Typography>

                        <Typography variant="h6" color="text.secondary">
                            Brand: {productDetails?.brand}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mt: 1,
                            }}
                        >
                            <Rating
                                value={productDetails?.rating}
                                precision={0.1}
                                readOnly
                            />
                            <Typography>
                                {productDetails?.rating} ({productDetails?.totalReviews} reviews)
                            </Typography>
                        </Box>

                        <Typography
                            variant="h4"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            ${productDetails?.price}
                        </Typography>

                        <Chip
                            label={productDetails?.availability}
                            color="success"
                            sx={{ mt: 2 }}
                        />

                        <Typography sx={{ mt: 3 }}>
                            {productDetails?.description}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={() => navigate(`/productOffers/${productDetails?.asin}`)}
                        >
                            View Offers
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default ProductDetailsPage;