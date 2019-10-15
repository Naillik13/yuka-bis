import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    ProductDetails: ProductDetailsScreen

  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Scan',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-barcode`
          : 'md-barcode'
      }
    />
  ),
};

HomeStack.path = '';

const ProductListStack = createStackNavigator(
  {
    ProductList: ProductListScreen,
    ProductDetails: ProductDetailsScreen
  },
  config
);

ProductListStack.navigationOptions = {
  tabBarLabel: 'Products',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} />
  ),
};

ProductListStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ProductListStack,
});

tabNavigator.path = '';

export default tabNavigator;
