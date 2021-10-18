import React from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet, View, TouchableOpacity, Text
} from 'react-native';

import Separator from './Separator';
import Badge from './Badge';
import GlobalContext from './Context';
import STORAGE, { storeData } from './storage';

function Repositories({ navigation: { navigate } }) {
    const context = React.useContext(GlobalContext)
    const user = context.user;

    const fetchRepos = async () => {
        if (context.repos.length === 0) {
            console.log(3)
            const rawResponse = await fetch(user.repos_url)
            const jsonResponse = await rawResponse.json();
            context.setRepos(jsonResponse)
            storeData(STORAGE.KEY, { user: context.user, repos: jsonResponse })
        } else {
            console.log(context.repos)
        }
    }
    React.useEffect(() => {
        fetchRepos()
    }, [])
    const goToRepos = (url) => {
        navigate('WebWiew', { url })
    }

    return (
        <View style={styles.container}>
            <Badge
                userInfo={user}
            />
            <ScrollView style={styles.Container}>
                {
                    context.repos.map(repo => {
                        return (
                            <TouchableOpacity
                                style={styles.rowContainer}
                                onPress={() => goToRepos(repo.html_url)}
                            >
                                <Text style={styles.name}>{repo.name}</Text>
                                {repo.description && <Text style={styles.description}>{repo.description}</Text>}
                                <Separator
                                />
                            </TouchableOpacity>

                        );
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    name: {
        color: '#48BBEC',
        fontSize: 18,
        paddingBottom: 5
    },
    stars: {
        color: '#48BBEC',
        fontSize: 14,
        paddingBottom: 5
    },
    description: {
        fontSize: 14,
        paddingBottom: 5
    }
});

export default Repositories;