import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

export interface StockItem {
  symbol: string;
  lastPrice: number;
  changePercent: number;
  relativeVolume: number;
  publicFloat?: number;
  newsCount?: number;
}

export default function StockListItem({ item }: { item: StockItem }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const colorClass = item.changePercent >= 0 ? 'text-green-500' : 'text-red-500';
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', { symbol: item.symbol, type: 'stock' })}
    >
      <View style={tw`flex-row justify-between p-4 border-b border-gray-200`}>
        <Text style={tw`font-bold`}>{item.symbol}</Text>
        <View style={tw`flex-row space-x-4`}>
          <Text>{item.lastPrice.toFixed(2)}</Text>
          <Text style={tw`${colorClass}`}>{item.changePercent.toFixed(2)}%</Text>
          <Text>{item.relativeVolume.toFixed(2)}x</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
