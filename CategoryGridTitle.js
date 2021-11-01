import React from "react";
import {
	Platform,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	TouchableOpacity,
	View,
} from "react-native";

const CategoryGridTitle = (props) => {
	let TC = TouchableOpacity;

	if (Platform.OS === "android" && Platform.Version >= 21) {
		TC = TouchableNativeFeedback;
	}
	return (
		<View style={styles.gridItem}>
			<TC style={{ flex: 1 }} onPress={props.onSelect}>
				<View
					style={{ ...styles.container, ...{ backgroundColor: props.color } }}
				>
					<Text style={styles.title}>{props.title}</Text>
				</View>
			</TC>
		</View>
	);
};

export default CategoryGridTitle;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		shadowColor: "black",
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 10,
		borderRadius: 10,
		padding: 10,
		justifyContent: "flex-end",
		alignItems: "flex-end",
	},
	gridItem: {
		flex: 1,
		borderRadius: 10,
		elevation: 5,
		margin: 15,
		textAlign: "center",
		height: 150,
		overflow:
			Platform.OS === "android" && Platform.Version >= 21
				? "hidden"
				: "visible",
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 20,
		textAlign: "right",
	},
});
