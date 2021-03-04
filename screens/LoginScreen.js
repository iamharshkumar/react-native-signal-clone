import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View} from "react-native";
import {Button, Input, Image} from "react-native-elements";
import {StatusBar} from "expo-status-bar";
import {auth} from  '../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                navigation.replace("Home")
            }
        })
        return unsubscribe;
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch(error => alert(error))
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar/>
            <Image source={{
                uri: "https://play-lh.googleusercontent.com/jCln_XT8Ruzp7loH1S6yM-ZzzpLP1kZ3CCdXVEo0tP2w5HNtWQds6lo6aLxLIjiW_X8"
            }}
                   style={{width: 200, height: 200}}
            />
            <View style={styles.inputContainer}>
                <Input placeholder='Email' autoFocus type='Email' value={email} onChangeText={text => setEmail(text)}/>
                <Input onSubmitEditing={signIn} placeholder='Password' secureTextEntry autoFocus onChangeText={text => setPassword(text)}
                       type='password'/>
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login"/>
            <Button onPress={() => navigation.navigate('Register')} containerStyle={styles.button} type="outline" title="Register"/>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent:"center",
        padding:0
    },
    inputContainer: {
        width: 300
    },
    button: {
        width:200,
        marginTop: 10
    }
})
