import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { View, ScrollView , StyleSheet, Text, TouchableOpacity } from 'react-native';
import CustomListItem from '../components/CustomListItem';
import {auth, db} from '../firebase';
import {Avatar} from 'react-native-elements';
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons';


const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([])

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        }) 
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

        return unsubscribe;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff"},
            headerTitleStyle: {color: 'black', alignSelf: 'center'},
            headerLeft: () => (
                <View style={{marginLeft:20}}>
                    <TouchableOpacity onPress={signOutUser}>
                        <Avatar rounded source={{uri: auth?.currentUser?.photoURL}} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity>
                        <AntDesign name='camerao'  size={24} color='black'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')}>
                        <SimpleLineIcons name='pencil'  size={24} color='black'/>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])

    const enterChat = (id, chatName) => {
        navigation.navigate('ChatScreen', {
            id,
            chatName
        })
    }
 
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id, data: {chatName}}) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                ))}
            </ScrollView> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})

export default HomeScreen