import React, { useCallback, useEffect } from "react";
import {
	Button,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { MEALS } from "./data/dummy-data";
import DefaultText from "./DefaultText";
import CustomHeaderButton from "./HeaderButton";
import { toggleFavorite } from "./store/actions/meals";

const ListItem = (props) => {
	return (
		<View style={styles.listItem}>
			<DefaultText>{props.children}</DefaultText>
		</View>
	);
};

const MealDetailsScreen = (props) => {
	const mealId = props.navigation.getParam("mealId");
	const currentMealIsFavorite = useSelector((state) =>
		state.meals.favoriteMeals.some((meal) => meal.id === mealId)
	);
	const availableMeals = useSelector((state) => state.meals.meals);

	const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

	const dispatch = useDispatch();

	const toggleFavoriteHandler = useCallback(() => {
		dispatch(toggleFavorite(mealId));
	}, [mealId, dispatch]);

	useEffect(() => {
		props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
	}, [toggleFavoriteHandler]);

	useEffect(() => {
		props.navigation.setParams({ isFav: currentMealIsFavorite });
	}, [currentMealIsFavorite]);

	return (
		<ScrollView>
			<Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
			<View style={styles.details}>
				<DefaultText>{selectedMeal.duration}m</DefaultText>
				<DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
				<DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
			</View>
			<Text style={styles.title}>Ingredients</Text>
			{selectedMeal.ingredients.map((ingredient) => (
				<ListItem key={ingredient}>{ingredient}</ListItem>
			))}
			<Text style={styles.title}>Steps</Text>
			{selectedMeal.steps.map((step) => (
				<ListItem key={step}>{step}</ListItem>
			))}
		</ScrollView>
	);
};

MealDetailsScreen.navigationOptions = (navigationData) => {
	const mealTitle = navigationData.navigation.getParam("mealTitle");
	const toggleFavorite = navigationData.navigation.getParam("toggleFav");
	const isFavorite = navigationData.navigation.getParam("isFav");
	return {
		headerTitle: mealTitle,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="FAV!"
					iconName={`${isFavorite ? "ios-star" : "ios-star-outline"}`}
					onPress={toggleFavorite}
				/>
			</HeaderButtons>
		),
	};
};

export default MealDetailsScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: 200,
	},
	details: {
		flexDirection: "row",
		padding: 15,
		justifyContent: "space-around",
	},
	title: {
		fontFamily: "open-sans-bold",
		alignItems: "center",
		textAlign: "center",
		fontSize: 22,
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: "#ccc",
		padding: 10,
		borderWidth: 1,
	},
});
