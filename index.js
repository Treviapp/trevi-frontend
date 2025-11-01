import 'react-native-reanimated'; // 👈 must stay first
import 'text-encoding-polyfill'; // 👈 polyfill for TextEncoder/TextDecoder

import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
