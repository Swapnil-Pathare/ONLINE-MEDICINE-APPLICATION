import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,Picker } from 'react-native';

export default class EditMedi extends Component {

    constructor() {
        super();
        this.state = {
            id:'',
            medicineName: '',
            strength: '',
            unit: 'mg',
            genericName: '',
            manufacturer: '',
            price: '',
            successText: '',
        }
    }


    Update = () => {


        fetch("http://localhost:4000/admin/update-medicine", {
            method: 'POST',
            headers: {
                'Authorization':'Bearer '+global.adminToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id:this.state.id,
                medicineName: this.state.medicineName,
                strength: this.state.strength,
                unit: this.state.unit,
                genericName: this.state.genericName,
                manufacturer: this.state.manufacturer,
                price: this.state.price,
            })
        })

            .then((response) => response.json())
            .then((responseJson) => {

                //setLoading(false);
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.status == 'success') {
                    console.log('Medicine Updated Successfully');
                    this.setState({ successText: "Medicine updated successfully" })

                }else if(responseJson.status == 'error'){
                    alert("Update Error")
                }
            })

            .catch();
    }


    cancel = () => {

		this.props.navigation.navigate('NavToSeller');
		//alert("Hi")
		
	}


    render() {

       const name =  this.props.navigation.getParam('name', 'name retriving error')
       const id =  this.props.navigation.getParam('id', 'id retriving error')
       this.state.id=id;
       console.log(name)


        return (
            <KeyboardAvoidingView enabled>
                <View style={styles.container}>
                <View>
                <Text style={{fontSize:30,marginTop:20,fontWeight:'bold',textDecorationLine: 'underline',marginBottom:25}}>Edit {name}</Text>
                </View>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Medicine Name </Text>
                    <TextInput style={styles.inputBox}
                        onChangeText={(medicineName) => this.setState({ medicineName: medicineName })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholderTextColor="#002f6c"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        onSubmitEditing={() => this.password.focus()} />

                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Medicine Strength (mg, ml) </Text> 
                    <TextInput style={styles.inputBox}
                        onChangeText={(strength) => this.setState({ strength: strength })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholderTextColor="#002f6c"
                        ref={(input) => this.password = input}
                    />
                    <View style={styles.inputBox}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Select Strength Type</Text> 
                        <Picker
                            selectedValue={this.state.unit}
                            style={{ height: 50, width: 280, color: '#002f6c' }}
                            onValueChange={(unit) => this.setState({ unit: unit })}
                        >
                            <Picker.Item label="mg" value="mg" />
                            <Picker.Item label="ml" value="ml" />
                        </Picker>
                    </View>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Generic Name</Text> 
                    <TextInput style={styles.inputBox}
                        onChangeText={(genericName) => this.setState({ genericName: genericName })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholderTextColor="#002f6c"
                        ref={(input) => this.password = input}
                    />
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Manufacturer Name</Text> 
                    <TextInput style={styles.inputBox}
                        onChangeText={(manufacturer) => this.setState({ manufacturer: manufacturer })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholderTextColor="#002f6c"
                        ref={(input) => this.password = input}
                    />
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Price</Text> 
                    <TextInput style={styles.inputBox}
                        onChangeText={(price) => this.setState({ price: price })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholderTextColor="#002f6c"
                        ref={(input) => this.password = input}
                    />

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.Update()} >Update</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.cancel()} >Go to List</Text>
                    </TouchableOpacity>

                    {this.state.successText != '' ? (
                        <Text style={styles.successTextStyle}> {this.state.successText} </Text>
                    ) : null}
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'left',
        backgroundColor:'#9555ed',
        height:'100%'
    },
    successTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 16,
        fontSize: 26,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: "40%",
        backgroundColor: '#2B2D2F',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});