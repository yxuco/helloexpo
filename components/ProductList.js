import { FlatList, Box, Heading } from 'native-base';
import React from 'react';
import ProductCard from "./ProductCard";

export default function ProductList() {
    const getProducts = () => {
        return [
            {
                imageUrl: "http://loremflickr.com/150/150?random=1",
                productName: "Product 1",
                releasedDate: "May 31, 2016",
                description: "Sample product 1 from the book 'Beginning React Native with Hooks' at https://github.com/greglim81/react-native-chp4",
                rating: 4,
                numOfReviews: 2
            },
            {
                imageUrl: "http://loremflickr.com/150/150?random=2",
                productName: "Product 2",
                releasedDate: "October 31, 2016",
                description: "Sample product 2 from the book 'Beginning React Native with Hooks' at https://github.com/greglim81/react-native-chp4",
                rating: 2,
                numOfReviews: 12
            },
            {
                imageUrl: "http://loremflickr.com/150/150?random=3",
                productName: "Product 3",
                releasedDate: "July 30, 2016",
                description: "Sample product 3 from the book 'Beginning React Native with Hooks' at https://github.com/greglim81/react-native-chp4",
                rating: 5,
                numOfReviews: 2
            }];
    };
    const products = getProducts();
    return (
        <Box>
            <Heading size="lg" fontWeight="600" textAlign="center">
                Products
            </Heading>
            {products.length > 0 ? (
                <FlatList data={products}
                    renderItem={({ item }) => <ProductCard data={item} />}
                    keyExtractor={item => item.productName} />
            ) : (
                <Text fontSize="sm">No products to display</Text>
            )}
        </Box>);
}