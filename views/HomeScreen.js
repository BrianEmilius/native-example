import { useEffect, useState } from "react"
import { View, ScrollView, Text, Pressable, TextInput, Alert } from "react-native"
import { ButtonText } from "../components/Typography"
import { setData } from "../hooks/storage"

export default function HomeScreen({ navigation }) {
	const [data, setData] = useState([])
	const [name, setName] = useState("")

	useEffect(() => {
		fetch("https://pokeapi.co/api/v2/pokemon")
			.then(response => response.json())
			.then(json => setData(json))
	}, [])

	function saveDataHandler() {
		setData("@MyAppStore:name", name)
		Alert.alert("Saved", name)
	}

	return (
		<View style={{flex:1, padding:16 }}>
			<View>
				<TextInput
					placeholder="Din far"
					
					onChange={event => setName(event.nativeEvent.text)} />
				<Pressable onPress={saveDataHandler}>
					<Text>Save</Text>
				</Pressable>
				<Pressable onPress={()=>navigation.navigate("Details", { title: "ditto" })}>
					<Text>Details</Text>
				</Pressable>
			</View>
			<ScrollView>
				{data.results && data.results.map((item, index) => (
					<Pressable key={index} onPress={()=> navigation.navigate("Details", { title: item.name })}>
						<ButtonText>{item.name}</ButtonText>
					</Pressable>
				))}
			</ScrollView>
		</View>
	)
}
