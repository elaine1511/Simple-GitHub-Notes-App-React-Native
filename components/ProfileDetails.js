import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import Badge from './Badge';
import GlobalContext from './Context';
import Separator from './Separator'

const ProfileDetails = () => {
    const context = React.useContext(GlobalContext)
    const user = context.user;
    const detailsArr = ['company', 'location', 'followers', 'following', 'email', 'bio'];

    return (
        <View style={styles.container}>
            <Badge
                userInfo={user}
            />
            <ScrollView >
                {
                    detailsArr.map((item, index) => {
                        if (user[item]) {
                            return (
                                <View style={styles.rowContainer} key={index}>
                                    <Text style={styles.rowTitle}>{item.toUpperCase()}</Text>
                                    <Text style={styles.rowContent}>{user[item]}</Text>
                                    <View><Separator /></View>
                                </View>
                            )
                        }

                    })
                }

            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    rowContainer: {
        padding: 10
    },
    rowTitle: {
        color: '#48BBEC',
        fontSize: 16
    },
    rowContent: {
        fontSize: 19
    }
});
export default ProfileDetails;