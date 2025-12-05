import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import tw from './src/utils/tw';

const App = () => {
  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>
      <Text style={tw`text-slate-800 text-lg`}>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
