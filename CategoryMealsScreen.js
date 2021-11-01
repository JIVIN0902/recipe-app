import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { CATEGORIES } from "./data/dummy-data";
import DefaultText from "./DefaultText";
import MealItem from "./MealItem";
import MealList from "./MealList";

const CategoryMealsScreen = (props) => {
	const catId = props.navigation.getParam("categoryId");

	const availableMeals = useSelector((state) => state.meals.filteredMeals);

	const displayedMeals = availableMeals.filter(
		(meal) => meal.categoryIds.indexOf(catId) >= 0
	);
	if (displayedMeals.length === 0) {
		return (
			<View style={styles.content}>
				<DefaultText>No Meals found.Check your filters</DefaultText>
			</View>
		);
	}
	return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
	const catId = navigationData.navigation.getParam("categoryId");

	const selectedCategory = CATEGORIES.find((c) => c.id === catId);

	return {
		headerTitle: selectedCategory.title,
	};
};

export default CategoryMealsScreen;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
