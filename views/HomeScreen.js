import { useState, useEffect } from "react"
import { View, ScrollView, Pressable, Image } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { ButtonText } from "../components/Typography"
import axios from "axios"

export default function HomeScreen({ navigation }) {
	const [image, setImage] = useState("")
	const [media, setMedia] = useState([])

	useEffect(function() {
		axios.get("http://10.160.220.40:1337/api/v1/media")
			.then(response => setMedia(response.data))
	}, [image])

	async function pickImage() {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			})
			console.log(result)
			if (!result.canceled) {
				setImage(result.assets[0].uri)
			}

			console.log(image)
			const splitArray = image.split("/")

			const name = splitArray[splitArray.length - 1]
			const mimeType = name.split(".")[1]

			const imageData = {
				uri: image,
				type: `image/${mimeType}`,
				name: name
			}

			console.log(imageData)

			const data = new FormData()
			data.append("file", imageData)

			axios.post("http://10.160.220.40:1337/api/v1/media", data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
				.then(response => console.log(response.status))
				.catch(error => console.log(error))
		} catch (error) {
			console.log(error)
		}

	}

	return (
		<View style={{ flex: 1, padding: 16 }}>
			<View>
				<Pressable
					style={{ padding: 16, backgroundColor: "lightgrey" }}
					onPress={pickImage}>
					<ButtonText>Upload</ButtonText>
				</Pressable>
			</View>
			<ScrollView>
				{media.map((item, i) => <Image key={i} resizeMode="cover" style={{width: 400, height: 300}} source={{uri: "http://10.160.220.40:1337/" + item.filename}} />)}
			</ScrollView>
		</View>
	)
}
