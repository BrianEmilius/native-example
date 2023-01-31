import { View, Image, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { DataTable } from 'react-native-paper'
import { Heading } from '../components/Typography'
import { getData } from '../hooks/storage'

export default function DetailsScreen({ route }) {
	const { title } = route.params
	const [data, setData] = useState({})
	const { data: name, error } = getData("@MyAppStore:name")

	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${title}`)
			.then(response => response.json())
			.then(json => setData(json))
			.catch(error => console.log(error))
	}, [])

	return (
		<View style={{flex:1, padding:16}}>
			<Image style={{width:300,height:200}} resizeMode="contain" source={{uri: data.sprites?.other["official-artwork"].front_default}} />
			<View>
				<Text>{name}</Text>
			</View>
			<DataTable>
				<DataTable.Header>
					<DataTable.Title>Stat</DataTable.Title>
					<DataTable.Title numeric>Value</DataTable.Title>
				</DataTable.Header>
					<DataTable.Row>
						<DataTable.Cell>Height</DataTable.Cell>
						<DataTable.Cell numeric>{data.height} in</DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell>Weight</DataTable.Cell>
						<DataTable.Cell numeric>{data.weight} lbs</DataTable.Cell>
					</DataTable.Row>
			</DataTable>
			<Heading>Abilities</Heading>
			{data.abilities && data.abilities.map((item, index) => (
				<Text key={index}>{item.ability.name}</Text>
			))}
		</View>
	)
}
