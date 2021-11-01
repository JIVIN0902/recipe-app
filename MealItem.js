import React from "react";
import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import DefaultText from "./DefaultText";

const MealItem = (props) => {
	return (
		<View style={styles.mealItem}>
			<TouchableOpacity onPress={props.onSelectMeal}>
				<View>
					<View style={{ ...styles.mealRow, ...styles.mealHeader }}>
						<ImageBackground
							source={{ uri: props.image }}
							style={styles.bgImage}
						>
							<View style={styles.titleContainer}>
								<Text numberOfLines={1} style={styles.title}>
									{props.title}
								</Text>
							</View>
						</ImageBackground>
					</View>
					<View style={{ ...styles.mealRow, ...styles.mealDetail }}>
						<DefaultText>{props.duration}m</DefaultText>
						<DefaultText>{props.complexity.toUpperCase()}</DefaultText>
						<DefaultText>{props.affordability.toUpperCase()}</DefaultText>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default MealItem;

const styles = StyleSheet.create({
	mealItem: {
		height: 200,
		width: "100%",
		backgroundColor: "#ccc",
		borderRadius: 10,
		overflow: "hidden",
	},
	mealRow: {
		flexDirection: "row",
	},
	mealHeader: {
		height: "85%",
		textAlign: "center",
	},
	mealDetail: {
		paddingHorizontal: 10,
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
		height: "15%",
	},
	bgImage: {
		width: "100%",
		height: "100%",
		justifyContent: "flex-end",
	},
	titleContainer: {
		backgroundColor: "rgba(0,0,0,0.7)",
		paddingVertical: 5,
		paddingHorizontal: 12,
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 20,
		color: "white",
		textAlign: "center",
	},
});
