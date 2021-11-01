import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Platform, StyleSheet, Switch, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import Colors from "./constants/Colors";
import HeaderButton from "./HeaderButton";
import { setFilters } from "./store/actions/meals";

const FiltersSwitch = (props) => {
	return (
		<View style={styles.filterContainer}>
			<Text>{props.label}</Text>
			<Switch
				trackColor={{ true: Colors.primary }}
				thumbColor={Platform.OS === "android" ? Colors.primary : "white"}
				value={props.state}
				onValueChange={props.onChange}
			/>
		</View>
	);
};

const FiltersScreen = (props) => {
	const dispatch = useDispatch();

	const { navigation } = props;
	const [isGlutenFree, setIsGlutenFree] = useState(false);
	const [isVegan, setIsVegan] = useState(false);
	const [isLactoseFree, setIsLactoseFree] = useState(false);
	const [isVegetarian, setIsVegetarian] = useState(false);

	const saveFilters = useCallback(() => {
		const appliedFilters = {
			glutenFree: isGlutenFree,
			lactoseFree: isLactoseFree,
			vegan: isVegan,
			vegetarian: isVegetarian,
		};
		dispatch(setFilters(appliedFilters));
	}, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

	useEffect(() => {
		navigation.setParams({ save: saveFilters });
	}, [saveFilters]);

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Available Filters</Text>
			<FiltersSwitch
				label={"Gluten Free"}
				state={isGlutenFree}
				onChange={(newValue) => setIsGlutenFree(newValue)}
			/>
			<FiltersSwitch
				label={"Lactose Free"}
				state={isLactoseFree}
				onChange={(newValue) => setIsLactoseFree(newValue)}
			/>
			<FiltersSwitch
				label={"Vegan"}
				state={isVegan}
				onChange={(newValue) => setIsVegan(newValue)}
			/>
			<FiltersSwitch
				label={"Vegetarian"}
				state={isVegetarian}
				onChange={(newValue) => setIsVegetarian(newValue)}
			/>
		</View>
	);
};

FiltersScreen.navigationOptions = (navData) => {
	return {
		headerTitle: "Filter Meals",
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
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Save"
					iconName="ios-save"
					onPress={navData.navigation.getParam("save")}
				/>
			</HeaderButtons>
		),
	};
};
export default FiltersScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
	},
	filterContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "80%",
		marginVertical: 50,
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 22,
		margin: 20,
		textAlign: "center",
	},
});
