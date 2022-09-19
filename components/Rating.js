import React, { useState } from 'react';
import { HStack, Pressable } from "native-base";
import { AntDesign } from '@expo/vector-icons';

export default function Rating(props) {

    const [rating, setRating] = useState(props.rating)

    return (
        <HStack alignItems="center">
            {rating >= 1 ? (
                <Pressable onPress={() => setRating(1)}>
                    <AntDesign name="star" style={styles.starStyle} />
                </Pressable>
            ) : (
                <Pressable onPress={() => setRating(1)}>
                    <AntDesign name="staro" style={styles.starStyle} />
                </Pressable>
            )}
            {rating >= 2 ? (
                <Pressable onPress={() => setRating(2)}>
                    <AntDesign name="star" style={styles.starStyle} />
                </Pressable>
            ) : (
                <Pressable onPress={() => setRating(2)}>
                    <AntDesign name="staro" style={styles.starStyle} />
                </Pressable>
            )}
            {rating >= 3 ? (
                <Pressable onPress={() => setRating(3)}>
                    <AntDesign name="star" style={styles.starStyle} />
                </Pressable>
            ) : (
                <Pressable onPress={() => setRating(3)}>
                    <AntDesign name="staro" style={styles.starStyle} />
                </Pressable>
            )}
            {rating >= 4 ? (
                <Pressable onPress={() => setRating(4)}>
                    <AntDesign name="star" style={styles.starStyle} />
                </Pressable>
            ) : (
                <Pressable onPress={() => setRating(4)}>
                    <AntDesign name="staro" style={styles.starStyle} />
                </Pressable>
            )}
            {rating >= 5 ? (
                <Pressable onPress={() => setRating(5)}>
                    <AntDesign name="star" style={styles.starStyle} />
                </Pressable>
            ) : (
                <Pressable onPress={() => setRating(5)}>
                    <AntDesign name="staro" style={styles.starStyle} />
                </Pressable>
            )}
        </HStack>
    );
}

const styles = {
    starStyle: {
        color: "orange",
        fontSize: 16
    }
}