import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

interface Link {
    title: string;
    icon: string;
    url: string;
}

const ProfileScreen = () => {
    const links = [
      { title: 'Privacy Policy', icon: 'lock', url: 'https://publish.mvphome.pro/site/2wrye4aq903z2csvmqpvnh429sc7tw0/privacy' },
      { title: 'Terms of Service', icon: 'file-text', url: 'https://publish.mvphome.pro/site/2wrye4aq903z2csvmqpvnh429sc7tw0/terms' },
      { title: 'Support', icon: 'envelope', url: 'mailto:macromatch.dev@gmail.com' },
    ];
  
    const openLink = (url: string) => {
      Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.linkContainer}>
          {links.map((link: Link, index: number) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => openLink(link.url)}>
              <FontAwesome name={link.icon} size={24} color="#007AFF" />
              <Text style={styles.linkText}>{link.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    linkContainer: {
      flexDirection: 'column',
      gap: 15,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    linkText: {
      fontSize: 18,
      marginLeft: 10,
      color: '#007AFF',
      fontWeight: '500',
    },
  });
  
  export default ProfileScreen;
  