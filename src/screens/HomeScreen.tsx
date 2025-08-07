import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StockListItem from '../components/StockListItem';
import CryptoListItem from '../components/CryptoListItem';
import { fetchStocks } from '../services/finnHubService';
import { fetchCrypto } from '../services/coinGeckoService';
import { filterStocks } from '../services/filterStocks';
import { filterCrypto } from '../services/filterCrypto';

const Tab = createMaterialTopTabNavigator();

function StocksTab() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const load = async () => {
      try {
        const stocks = await fetchStocks();
        const filtered = filterStocks(stocks);
        setData(filtered);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.symbol}
      renderItem={({ item }) => <StockListItem item={item} />}
    />
  );
}

function CryptoTab() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const load = async () => {
      try {
        const coins = await fetchCrypto();
        const filtered = filterCrypto(coins);
        setData(filtered);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.symbol}
      renderItem={({ item }) => <CryptoListItem item={item} />}
    />
  );
}

export default function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Stocks" component={StocksTab} />
      <Tab.Screen name="Crypto" component={CryptoTab} />
    </Tab.Navigator>
  );
}
