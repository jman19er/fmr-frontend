import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';

interface SegmentedSingleSelectProps {
    header: string;
    selectedValue: string;
    options: string[];
    onChange: (value: string) => void;
}

const RadioButtonGroup = ({ header, selectedValue, options, onChange }: SegmentedSingleSelectProps) => {
    return (
        <View>
            <Text style={styles.header}>{header}</Text>
            <RadioButton.Group onValueChange={newValue => onChange(newValue)} value={selectedValue}>
                {options.map((option, i) => (
                    <View key={`${option}_${i}}`}>
                        { i > 0 && <Divider /> }
                        <RadioButton.Item label={option} value={option} />
                    </View>
                ))}
            </RadioButton.Group>
        </View>


    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    }
});

export default RadioButtonGroup;