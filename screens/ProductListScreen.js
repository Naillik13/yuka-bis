import React from 'react';
import { Platform } from 'react-native';
import { StackActions } from 'react-navigation';
import { StyleSheet, FlatList, ActivityIndicator, Text, Image, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class ProductListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  _onPress = (code) => {
    const pushAction = StackActions.push({
      routeName: 'ProductDetails',
      params: {
        productCode: code,
      },
    });
    this.props.navigation.navigate(pushAction);
  }

  componentDidMount() {
    return fetch('https://fr-en.openfoodfacts.org/category/pizzas.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.products,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }



  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) =>
            <TouchableOpacity style={styles.button} onPress={() => this._onPress(item.code)}>
              <Image style={{ width: 60, height: 60, borderRadius: 60/2 }} source={{ uri: item.image_url }} />
              <View style={styles.informations}>
                <Text style={{fontWeight: "bold"}}>{item.product_name}</Text>
                <Text>{item.brands}</Text>
              </View>
              <Ionicons
                name={
                  Platform.OS === 'ios'
                    ? `ios-arrow-dropright-circle`
                    : 'md-arrow-dropright-circle'
                }
                size={26}
                style={{ marginRight: 10 }}
                color={"grey"}
              />
            </TouchableOpacity>}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * 5 },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * 5,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 100
  },
  informations: {
    margin: 10,
    flex: 2
  }
})

ProductListScreen.navigationOptions = {
  title: 'Products',
};
