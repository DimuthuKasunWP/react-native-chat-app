import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 12,
        paddingVertical: 8
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'left',
        paddingLeft: 8,
    },
    wave: {
        width: 28,
        height: 28,
        resizeMode: 'contain'
    }
});

export default styles;
