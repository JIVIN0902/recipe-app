import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MealItem from "./MealItem";

const MealList = (props) => {
	const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);
	const renderMealItem = (itemData) => {
		const isFavorite = favoriteMeals.find(
			(meal) => meal.id === itemData.item.id
		);
		return (
			<MealItem
				title={itemData.item.title}
				duration={itemData.item.duration}
				complexity={itemData.item.complexity}
				affordability={itemData.item.affordability}
				image={itemData.item.imageUrl}
				onSelectMeal={() => {
					props.navigation.navigate({
						routeName: "MealDetail",
						params: {
							mealId: itemData.item.id,
							mealTitle: itemData.item.title,
							isFav: isFavorite,
						},
					});
				}}
			/>
		);
	};
	return (
		<View style={styles.list}>
			<FlatList
				style={{ width: "100%" }}
				data={props.listData}
				keyExtractor={(item, index) => item.id}
				renderItem={renderMealItem}
			/>
		</View>
	);
};

export default MealList;

const styles = StyleSheet.create({
	list: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
