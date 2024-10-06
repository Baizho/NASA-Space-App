import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons'; // For the profile icon

const players = ['BEN', 'ALICE', 'RAMAZAN'];

export default function TabOneScreen() {
  return (
    <LinearGradient colors={['#CED9E7', '#44566C']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          {/* <Icon name="person-circle-outline" size={40} color="black" /> */}
          <Text style={styles.headerText}>My Account</Text>
        </View>

        <View style={styles.buttonContainer}>
          {players.map((player, index) => (
            <TouchableOpacity key={index} style={styles.playerButton}>
              <Text style={styles.playerText}>{player}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>START THE GAME</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
  },
  buttonContainer: {
    marginBottom: 30,
    width: '80%',
  },
  playerButton: {
    backgroundColor: '#E4E9F2',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  playerText: {
    fontSize: 16,
    color: '#22456D',
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#00FF00',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
