    import { Pressable, StyleSheet, Text, View } from "react-native";
    import React, { useMemo } from "react";
    import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
    import { BlurView } from "expo-blur";
    import Animated, {
      Extrapolation,
      FadeInDown,
      interpolate,
      useAnimatedStyle,
    } from "react-native-reanimated";
    import { theme } from "../constants/theme";
    import { hp, wp } from "../helpers/common";
    import SectionView, { ColorFilter, CommonFilterRow } from "./sectionView";
    import { capitalize } from "lodash";
    import { data } from "../constants/data";

    const FilterModal = ({
      modalRef,
      filters,
      setFilters,
      onClose,
      onApply,
      onReset,
    }) => {
      const snapPoints = useMemo(() => ["75%"], []);
      return (
        <BottomSheetModal
          ref={modalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={CustomeBackrop}
          // onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.content}>
              <Text style={styles.filterText}>Filters</Text>

              {Object.keys(section).map((sectionName, index) => {
                let sectionView = section[sectionName];
                let sectionData = data.filter[sectionName];
                let title = capitalize(sectionName);

                return (
                  <Animated.View
                    entering={FadeInDown.delay(index * 100 + 100)
                      .springify()
                      .damping(11)}
                    key={sectionName}
                  >
                    <SectionView
                      title={title}
                      content={sectionView({
                        data: sectionData,
                        filters,
                        setFilters,
                        filterName: sectionName,
                      })}
                    />
                  </Animated.View>
                );
              })}

              {/* action */}
              <Animated.View
                entering={FadeInDown.delay(500).springify().damping(11)}
                style={styles.buttons}
              >
                <Pressable onPress={onReset} style={styles.resetButton}>
                  <Text style={[styles.buttonText, { color: theme.colors.gray }]}>
                    Reset
                  </Text>
                </Pressable>

                <Pressable onPress={onApply} style={styles.applyButton}>
                  <Text style={[styles.buttonText, { color: theme.colors.white }]}>
                    Apply
                  </Text>
                </Pressable>
              </Animated.View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      );
    };

    const section = {
      order: (props) => <CommonFilterRow {...props} />,
      orientation: (props) => <CommonFilterRow {...props} />,
      type: (props) => <CommonFilterRow {...props} />,
      colors: (props) => <ColorFilter {...props} />,
    };

    const CustomeBackrop = ({ animatedIndex, style }) => {
      const containerAnimatedStyles = useAnimatedStyle(() => {
        let opacity = interpolate(
          animatedIndex.value,
          [-1, 0],
          [0, 1],
          Extrapolation.CLAMP
        );
        return {
          opacity,
        };
      });

      const containerStyle = [
        StyleSheet.absoluteFill,
        style,
        styles.overlay,
        containerAnimatedStyles,
      ];

      return (
        <Animated.View style={containerStyle}>
          <BlurView
              style={styles.absoluteFill}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />
        </Animated.View>
      );
    };

    export default FilterModal;

    const styles = StyleSheet.create({
      contentContainer: {
        flex: 1,
        alignItems: "center",
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0)",
      },
      content: {
        // width: "100%",
        gap: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      filterText: {
        fontSize: hp(4),
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.black,
        marginBottom: 5,
      },
      buttons: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      },
      applyButton: {
        flex: 1,
        backgroundColor: theme.colors.gray,
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme.radius.md,
        borderCurve: "continuous",
      },
      resetButton: {
        flex: 1,
        backgroundColor: "rgba(248, 247, 247, 0.8)",
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme.radius.md,
        borderCurve: "continuous",
      },
      buttonText: {
        fontSize: hp(2.2),
      },
    });
