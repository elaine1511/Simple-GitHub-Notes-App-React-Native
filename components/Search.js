import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GlobalContext from './Context';
import STORAGE, { storeData } from './storage';

const Search = ({ navigation }) => {
    const [search, setSearch] = useState({ userName: '', loading: false, error: false })
    const context = React.useContext(GlobalContext)

    const fetchSearchUser = async () => {
        setSearch({ ...search, loading: true, error: false })
        if (context.user && context.user.login === search.userName) {
            console.log(context.user)
            navigation.navigate('Dashboard')
        } else {
            // console.log(2)
            try {
                const rawResponse = await fetch(`https://api.github.com/users/${search.userName}`)
                const jsonResponse = await rawResponse.json()
                if (jsonResponse?.id) {
                    context.setUser(jsonResponse);
                    storeData(STORAGE.KEY, { createdAt: new Date().getTime(), user: jsonResponse, repos: context.repos })
                    navigation.navigate('Dashboard')
                    setSearch({ ...search, loading: false })
                } else {
                    throw new Error('Profile Not Found')
                }
            }
            catch (e) {
                setSearch({ loading: false, error: true })
            }
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView >
                <Text style={styles.title}>Search for a GitHub User</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder='GitHub username'
                    autoFocus={true}
                    autoCapitalize='none'
                    onChangeText={(text) => setSearch({ ...search, userName: text })}
                    value={search.userName}
                ></TextInput>
                <TouchableOpacity style={styles.button} onPress={fetchSearchUser}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
                {search.error && <Text>Something went wrong</Text>}
                {search.loading && <ActivityIndicator size='large' color='#00dd00'></ActivityIndicator>}
            </KeyboardAwareScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#48BBEC',
        justifyContent: 'center',
        padding: 30,
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: 'white'
    },
    searchInput: {
        height: 50,
        padding: 5,
        marginRight: 5,
        fontSize: 22,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'white',
        color: 'white'
    },
    buttonText: {
        fontSize: 20,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    error: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
});
export default Search;