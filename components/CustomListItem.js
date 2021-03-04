import React from 'react';
import { SafeAreaView } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';

const CustomListItem = ({id, chatName, enterChat}) => {
    return (
        <ListItem onPress={() => enterChat(id,chatName)} key={id} bottomDivider>
            <Avatar
            rounded
            source={{
                uri: 
                'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
            }}
             />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: "800"}}>{chatName}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                Hello there
            </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

const styles = StyleSheet.create({})

export default CustomListItem;