import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MealList from "./MealList";
import HeaderButton from "./HeaderButton";
import { useSelector } from "react-redux";
import DefaultText from "./DefaultText";

const FavoritesScreen = (props) => {
	const favMeals = useSelector((state) => state.meals.favoriteMeals);
	if (favMeals.length === 0 || !favMeals) {
		return (
			<View style={styles.content}>
				<DefaultText>Start Adding Meals to your favorites</DefaultText>
			</View>
		);
	}
	return <MealList listData={favMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (navData) => {
	return {
		headerTitle: "Favorites!",
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName="ios-menu"
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
	};
};

export default FavoritesScreen;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
