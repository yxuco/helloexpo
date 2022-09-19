import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VStack, Text, HStack, Spinner, Heading, FlatList, Spacer, Box, Avatar, Link, Input, Icon, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default function GitHub() {
    const [data, setData] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState("yxu");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const res = await axios.get(`https://api.github.com/search/users?q=${searchTerm}`);
        setData(res.data.items);
        setUserCount(res.data.total_count);
        setIsLoading(false);
    }

    const handleSearch = () => {
        setIsLoading(true);
        getData();
    }

    const result = `Fetched ${userCount} users`;
    return (
        <Box>
            <HStack space={2} justifyContent="space-between">
                <Input placeholder="Searh User"
                    onChangeText={text => setSearchTerm(text)}
                    variant="filled" width="70%" borderRadius="10" py="1" px="2"
                    InputLeftElement={<Icon ml="2" size="4" color="gray.400"
                        as={<Ionicons name="ios-search" />} />} />
                <Button onPress={handleSearch} isLoading={isLoading} isLoadingText="">
                    Search
                </Button>
            </HStack>
            <Heading size="lg" fontWeight="600" textAlign="center">
              GitHub Users
            </Heading>
            {isLoading && <HStack space={2} justifyContent="center">
                <Spinner accessibilityLabel="Loading users" />
                <Heading color="primary.500" fontSize="md">
                    Loading
                </Heading>
            </HStack>
            }
            <FlatList data={data} renderItem={({
                item
            }) => <Box borderBottomWidth="1" _dark={{
                borderColor: "muted.50"
            }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
                    <HStack w="100%" space={[2, 3]} justifyContent="space-between">
                        <Avatar size="48px" source={{
                            uri: item.avatar_url
                        }} />
                        <VStack>
                            <Text _dark={{
                                color: "warmGray.50"
                            }} color="coolGray.800" bold>
                                {item.login}
                            </Text>
                            <Text color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
                                Id: {item.id}
                            </Text>
                        </VStack>
                        <Spacer />
                        <Link _text={{
                            fontSize: "sm",
                            _light: {
                                color: "cyan.500"
                            },
                            color: "cyan.300"
                        }} alignSelf="flex-start" href={item.html_url} isUnderlined={false} _hover={{
                            _text: {
                                _light: {
                                    color: "cyan.600"
                                },
                                color: "cyan.400"
                            }
                        }}>
                            view
                        </Link>
                    </HStack>
                </Box>} keyExtractor={item => item.id} />
        </Box>
    );
}