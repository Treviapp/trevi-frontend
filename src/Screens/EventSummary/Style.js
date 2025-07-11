import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4C2A85',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoBox: {
    marginBottom: 32,
    padding: 20,
    backgroundColor: '#F4F0FA',
    borderRadius: 12,
  },
  label: {
    fontWeight: '600',
    color: '#444',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    color: '#000',
  },
  code: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C2A85',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#4C2A85',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
