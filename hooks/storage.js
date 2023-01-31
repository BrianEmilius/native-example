import { useEffect, useState } from 'react'
import { AsyncStorage } from 'react-native'

export function getData(key) {
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(function() {
		AsyncStorage.getItem(key)
			.then(item => setData(item))
			.catch(error => setError(error))
			.finally(() => setLoading(false))
	}, [])

	return { data, error, loading }
}

export async function setData(key, value) {
	try {
		await AsyncStorage.setItem(key, value)
	} catch(error) {
		console.log(error)
	}
}
