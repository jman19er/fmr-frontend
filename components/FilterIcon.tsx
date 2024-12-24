import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FilterIcon = ({size}: {size: number}) => {
  return (
    <View style={styles.iconTextWrapper}>
        <Icon name="filter-outline" size={size} color="#000" />
        <Text style={styles.filterText}>Filters</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    iconTextWrapper: {
        flexDirection: 'column', // Icon and text aligned horizontally
        alignItems: 'center', // Center them vertically
      },
      filterText: {
        marginLeft: 4, // Space between icon and text
        fontSize: 12, // Modern, small font size
        color: '#555', // Subtle, neutral color
        fontWeight: '300', // Light font for a sleek look
        letterSpacing: 0.5, // Slight spacing for a modern touch
        textTransform: 'capitalize', // Text looks polished and clean
      },
});

export default FilterIcon;