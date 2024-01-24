import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { DataTable } from '../data-table'
import { supabase } from '../services/fetch'
import { Button, Text } from 'react-native-paper'
export default function HomeScreen() {
  const [data, setData] = useState()

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.rpc('get_sales')
      console.log({ data })
      setData(data)
    }
    fetch()
  }, [])

  return (
    <View style={styles.container}>
      {data && <DataTable data={data} />}
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}
      >
        <Text>Press me</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
