import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { RootStackParamList } from '../navigation';
import { fetchStockHistory } from '../services/finnHubService';
import { fetchCryptoHistory } from '../services/coinGeckoService';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export default function DetailScreen() {
  const { params } = useRoute<DetailRouteProp>();
  const [data, setData] = useState<{ x: number; y: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (params.type === 'stock') {
          const history = await fetchStockHistory(params.symbol);
          setData(history);
        } else {
          const history = await fetchCryptoHistory(params.symbol);
          setData(history);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <LineChart
        data={{
          labels: data.map((_, i) => i.toString()),
          datasets: [
            {
              data: data.map((d) => d.y),
            },
          ],
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: {
            r: '2',
            strokeWidth: '1',
            stroke: '#1E90FF',
          },
        }}
        bezier
      />
    </View>
  );
}
