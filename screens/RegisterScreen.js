import React, {useLayoutEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Button, Input, Image, Text} from "react-native-elements";
import { auth } from '../firebase';

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [imageUrl, setImageUrl] = useState();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login"
        })
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',

            })
        }).catch(error => {
            alert(error.message)
        })
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light"/>
            <Text h3 style={{marginBottom: 50}}>Create a account</Text>

            <View style={styles.inputContainer}>
                <Input placeholder="Full name" autoFocus type="text" value={name} onChangeText={text => setName(text)}/>
                <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={text => setEmail(text)}/>
                <Input placeholder="Password" autoFocus secureTextEntry type="password" value={password}
                       onChangeText={text => setPassword(text)}/>
                <Input placeholder="Profile Picture URL (optional)" autoFocus type="text" value={imageUrl}
                       onChangeText={text => setImageUrl(text)} onSubmitEditing={register}/>
            </View>
            <Button conntainerStyle={styles.button} raised onPress={register} title="Register" />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'white'
    },
    button:{
        width: 200,
        marginTop: 10
    },
    inputContainer: {
        width: 300
    }
})
