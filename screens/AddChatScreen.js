import React, { useLayoutEffect, useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';

const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new chat',
        })
    }, [])

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack()
        }).catch(error => {
            alert('error')
        })
    }

    return (
        <View style={styles.container}>
            <Input placeholder='Enter a chat name'
            onChangeText={text => setInput(text)}
            leftIcon= {
                <Icon name='wechat' type='antdesign' size={24} color='black' />
            }
             value={input}/>
             <Button onPress={createChat} title='Create new Chat' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor:"white",
        padding: 30,
        height: "100%"
    }
})

export default AddChatScreen;