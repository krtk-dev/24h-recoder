import React, { useRef, useEffect, useState } from 'react'
import { View, Animated, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, ScrollView, Easing } from 'react-native'
import TimeSelector from './TimeSelector'
import { WIDTH, CLOCK_COLORS } from '../../components/style'
import Clock from './Clock'
import { useSaveTime, index2Time } from '../../redux/SaveTime'
import { CLOCK_ANIMATION_DURATION } from '../../components/value'


const Body = () => {

    const { saveTime } = useSaveTime()

    const [clockAnimation] = useState(new Animated.Value(0))
    const [ChangeClockAnimation] = useState(new Animated.Value(0))
    const [lastSaveTimeIndex, setLastSaveTimeIndex] = useState(0)

    useEffect(() => {
        Animated.timing(clockAnimation, {
            toValue: 1,
            duration: CLOCK_ANIMATION_DURATION,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    }, [])


    useEffect(() => {
        ChangeClockAnimation.setValue(0)
        Animated.sequence([
            Animated.timing(ChangeClockAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease)
            })
        ]).start(() => setLastSaveTimeIndex(saveTime.index))
    }, [saveTime.index])

    return (
        <View style={styles.container} >
            <View style={{ width: WIDTH }} >
                <Animated.View style={{
                    flexDirection: 'row',
                    translateX: ChangeClockAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-lastSaveTimeIndex * WIDTH, -saveTime.index * WIDTH]
                    })
                }} >
                    {CLOCK_COLORS.map((color, index) =>
                        <View key={index} style={{ width: WIDTH, alignItems: 'center', marginVertical: 20 }} >
                            <Clock
                                color={color}
                                time={index2Time(index)}
                                animation={clockAnimation}
                            />
                        </View>
                    )}
                </Animated.View>
            </View>
            <Animated.View
                style={{
                    position: 'absolute', translateY: ChangeClockAnimation.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [120, 220, 120]
                    })
                }}
            >
                <TimeSelector />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ translateY: -50 }],
        height: '100%'
    }
})


export default Body
