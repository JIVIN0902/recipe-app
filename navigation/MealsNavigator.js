import { Platform, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CategoriesScreen from "../CategoriesScreen";
import CategoryMealsScreen from "../CategoryMealsScreen";
import MealDetailsScreen from "../MealDetailsScreen";
import Colors from "../constants/Colors";
import { createBottomTabNavigator } from "react-navigation-tabs";
import FavoritesScreen from "../FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import FiltersScreen from "../FiltersScreen";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? Colors.primary : "",
	},
	headerTitleStyle: {
		fontFamily: "open-sans-bold",
	},
	headerBackTitleStyle: {
		fontFamily: "open-sans",
	},
	headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const MealsNavigator = createStackNavigator(
	{
		Categories: {
			screen: CategoriesScreen,
		},
		CategoryMeals: {
			screen: CategoryMealsScreen,
		},
		MealDetail: MealDetailsScreen,
	},
	{
		mode: "modal",
		defaultNavigationOptions: defaultNavOptions,
	}
);

const FavNavigator = createStackNavigator(
	{
		Favorites: FavoritesScreen,
		MealDetail: MealDetailsScreen,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
	}
);

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => (
				<Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
			),
			tabBarColor: Colors.primary,
			tabBarLabel:
				Platform.OS === "android" ? (
					<Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
				) : (
					"Meals"
				),
		},
	},
	Favorites: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarLabel: "Favorites!",
			tabBarIcon: (tabInfo) => (
				<Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
			),
			tabBarColor: Colors.accentColor,
			tabBarLabel:
				Platform.OS === "android" ? (
					<Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
				) : (
					"Favorites"
				),
		},
	},
};

const MealsFavTabNavigator =
	Platform.OS === "android"
		? createMaterialBottomTabNavigator(tabScreenConfig, {
				activeTintColor: "white",
				shifting: true,
		  })
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					activeTintColor: Colors.accentColor,
					labelStyle: {
						fontFamily: "open-sans-bold",
					},
				},
		  });

const FiltersNavigator = createStackNavigator(
	{
		Filters: FiltersScreen,
	},
	{
		navigationOptions: {
			drawerLabel: "Filters!",
		},
		defaultNavigationOptions: defaultNavOptions,
	}
);

const MainNavigator = createDrawerNavigator(
	{
		MealsFavs: {
			screen: MealsFavTabNavigator,
			navigationOptions: {
				drawerLabel: "Meals",
			},
		},
		Filters: FiltersNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.accentColor,
			inactiveTintColor: "#e91e63",
			labelStyle: {
				fontFamily: "open-sans-bold",
			},
			itemsContainerStyle: {
				marginVertical: 17,
			},
			itemStyle: {},
		},
	}
);

export default createAppContainer(MainNavigator);
