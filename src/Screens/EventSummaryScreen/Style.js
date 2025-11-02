import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  handwritingTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginHorizontal: 24,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#8e94f2',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 200,
    marginTop: 12,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 18,
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden',
  },
  imagePlaceholder: {
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});
