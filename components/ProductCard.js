import React from 'react';
import { Box, AspectRatio, Image, Stack, HStack, Text, Heading } from 'native-base';
import Rating from './Rating';

export default function ProductCard(props) {
    return <Box maxW="400" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
    }} _web={{
        shadow: 2,
        borderWidth: 0
    }} _light={{
        backgroundColor: "gray.50"
    }}>
        <Stack p="4" space={3}>
            <HStack alignItems="baseline" space={4} justifyContent="space-between">
                <Stack space={2}>
                    <Heading size="sm" ml="-1">{props.data.productName}</Heading>
                    <Text fontSize="xs" _light={{
                        color: "violet.500"
                    }} _dark={{
                        color: "violet.400"
                    }} fontWeight="500" ml="-0.5" mt="-1">
                        {props.data.releasedDate}
                    </Text>
                </Stack>
                <Rating rating={props.data.rating} />
            </HStack>
            <HStack alignItems="stretch" space={4}>
                <AspectRatio w="30%" ratio={1 / 1}>
                    <Image source={{
                        uri: props.data.imageUrl
                    }} alt="image" />
                </AspectRatio>
                <Text fontSize="xs" fontWeight="400" w="65%">
                    {props.data.description}
                </Text>
            </HStack>
        </Stack>
    </Box>;
};