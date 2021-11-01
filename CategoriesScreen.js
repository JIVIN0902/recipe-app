import React from "react";
import {
	Button,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CategoryGridTitle from "./CategoryGridTitle";
import { CATEGORIES } from "./data/dummy-data";
import HeaderButton from "./HeaderButton";

const CategoriesScreen = (props) => {
	const renderGridItem = (itemData) => {
		return (
			<CategoryGridTitle
				title={itemData.item.title}
				color={itemData.item.color}
				onSelect={() =>
					props.navigation.navigate({
						routeName: "CategoryMeals",
						params: { categoryId: itemData.item.id },
					})
				}
			/>
		);
	};

	return (
		<FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
	);
};

CategoriesScreen.navigationOptions = (navData) => {
	return {
		headerTitle: "Meal Categories",
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
export default CategoriesScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	gridItem: {
		flex: 1,
		margin: 15,
		textAlign: "center",
		height: 150,
	},
});
