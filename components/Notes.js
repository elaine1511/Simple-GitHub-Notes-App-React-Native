import React, { useState } from 'react';
import {
    StyleSheet, TextInput, ScrollView, TouchableOpacity, View, Text, KeyboardAvoidingView
} from 'react-native';
import Badge from './Badge';
import Separator from './Separator';
import GlobalContext from './Context';

function Notes() {
    const context = React.useContext(GlobalContext)
    const user = context.user;
    const [noteState, setNoteState] = useState({ notes: [], note: '' })

    const submmitNoteHandler = () => {
        setNoteState({ ...noteState, notes: noteState.notes.concat(noteState.note), note: '' })
    }
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <Badge
                    userInfo={user}
                />

                <ScrollView>
                    {
                        noteState.notes.map((item, index) => {
                            return (
                                <View style={styles.rowContainer} key={index}>
                                    <Text>{item}</Text>
                                    <View><Separator /></View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <View style={styles.footerContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder='New Note'
                        value={noteState.note}
                        onChangeText={(text) => setNoteState({ ...noteState, note: text })}
                    ></TextInput>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={submmitNoteHandler}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    button: {
        height: 60,
        backgroundColor: '#48BBEC',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        height: 60,
        padding: 10,
        fontSize: 18,
        color: '#111',
        flex: 10
    },
    rowContainer: {
        padding: 10
    },
    footerContainer: {
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20
    }
});

export default Notes;