import { StyleSheet, Text } from "react-native"

export function Heading({ children }) {
	return (
		<Text style={styles.heading}>{children}</Text>
	)
}

export function ButtonText({ children }) {
	return (
		<Text style={styles.buttonText}>{children}</Text>
	)
}

const styles = StyleSheet.create({
	heading: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
		textTransform: "capitalize"
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
		textTransform: "capitalize"
	}
})
