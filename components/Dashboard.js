import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import GlobalContext from './Context';

const Dashboard = ({ navigation }) => {
    const context = React.useContext(GlobalContext)
    const user = context.user;
    return (
        <View style={styles.container}>
            <View style={styles.profilePicBox}>
                <Image
                    style={styles.image}
                    source={{ uri: user.avatar_url, }}
                ></Image>
            </View>
            <TouchableOpacity
                style={[styles.box, styles.blue]} onPress={() => navigation.navigate('Profile Details')}
            ><Text style={styles.buttonText}>Profile Details</Text></TouchableOpacity>
            <TouchableOpacity
                style={[styles.box, styles.purple]} onPress={() => navigation.navigate('Repositories')}
            ><Text style={styles.buttonText}>Repositories</Text></TouchableOpacity>
            <TouchableOpacity
                style={[styles.box, styles.pink]} onPress={() => navigation.navigate('Notes')}
            ><Text style={styles.buttonText}>Notes</Text></TouchableOpacity>


        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 0,
    },
    profilePicBox: {
        flex: 2,
    },
    image: {
        height: 350,
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 26,
    },
    blue: {
        backgroundColor: 'powderblue',
    },
    purple: {
        backgroundColor: 'violet'
    },
    pink: {
        backgroundColor: 'pink'
    }
});
export default Dashboard;