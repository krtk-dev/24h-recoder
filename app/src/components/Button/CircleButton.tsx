import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, ViewStyle } from 'react-native'
import { Neomorph } from 'react-native-neomorph-shadows';
import { COLOR1 } from '../../components/style';

interface CircleButtonProps {
    onPress?: () => void;
    style?: ViewStyle
}

const CircleButton: React.FC<CircleButtonProps> = ({ onPress, children, style }) => {
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <View
                style={{ width: 50, height: 50, ...style }}
            >
                <Neomorph
                    swapShadowLevel
                    style={{ ...styles.container }}
                >
                    {children}
                </Neomorph>
            </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container: {
        shadowRadius: 4,
        borderRadius: 25,
        backgroundColor: COLOR1,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CircleButton