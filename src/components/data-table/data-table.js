import { format } from 'date-fns'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { DataTable } from 'react-native-paper'

const DataTableComponent = ({ data }) => {
  const [page, setPage] = React.useState(0)
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4])
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  )

  const [items] = React.useState(data)

  const from = page * itemsPerPage
  const to = Math.min((page + 1) * itemsPerPage, items.length)

  React.useEffect(() => {
    setPage(0)
  }, [itemsPerPage])

  const renderItem = ({ item }) => (
    <DataTable.Row key={item.SaleID}>
      <DataTable.Cell style={styles.flex1}>{item.ServiceName}</DataTable.Cell>
      <DataTable.Cell numeric style={styles.flex1}>
        {item.SaleAmount}
      </DataTable.Cell>
      <DataTable.Cell numeric style={styles.flex1}>
        {item.FirstName}
      </DataTable.Cell>
      <DataTable.Cell style={styles.flex1}>{item.MethodName}</DataTable.Cell>
      <DataTable.Cell style={styles.flex2}>
        {format(new Date(item.created_at), 'MM-dd HH')}
      </DataTable.Cell>
    </DataTable.Row>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={items.slice(from, to)}
        renderItem={renderItem}
        keyExtractor={(item) => item.SaleID.toString()}
        ListHeaderComponent={() => (
          <DataTable.Header>
            <DataTable.Title style={styles.flex2}>
              <Text>Servicio</Text>
            </DataTable.Title>
            <DataTable.Title numeric style={styles.flex1}>
              <Text>Costo</Text>
            </DataTable.Title>
            <DataTable.Title numeric style={styles.flex1}>
              <Text>Barbero</Text>
            </DataTable.Title>
            <DataTable.Title numeric style={styles.flex1}>
              <Text>Metodo</Text>
            </DataTable.Title>
            <DataTable.Title numeric style={styles.flex2}>
              <Text>Fecha</Text>
            </DataTable.Title>
          </DataTable.Header>
        )}
        ListFooterComponent={() => (
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${items.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
})

export default DataTableComponent
