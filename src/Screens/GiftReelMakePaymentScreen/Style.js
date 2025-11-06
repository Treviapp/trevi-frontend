import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    color: '#444',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#81bfb7',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 15,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});
