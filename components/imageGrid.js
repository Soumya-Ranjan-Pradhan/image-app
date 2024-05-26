import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./ImageCard";
import { getColoCount, hp, wp } from "../helpers/common";

const ImageGrid = ({ image, router }) => {
  const column = getColoCount();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={image}
        numColumns={column}
        initialNumToRender={1000}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <ImageCard
            router={router}
            item={item}
            index={index}
            column={column}
          />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
  },
  listContainer: {
    paddingHorizontal: wp(4),
  },
});
