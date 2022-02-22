import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';



export default class App extends React.Component  {

	constructor(props) {
		super(props);

		this.state ={

			imageUri: ''
		}


	};


	//Function to choose image from mobile device
	chooseImage = (type) => {

        let options = {
            mediaType: type,
			maxWidth: 300,
			maxHeight: 550,
			quality: 1,
        };


        launchImageLibrary(options, (response) => {

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }else{

				response.assets.map((asset) => {

					console.log('uri -> ', asset.uri);
	
					this.setState({
						imageUri: asset.uri,
					})
	
				});
			}

        });
    };
	

	render() {

		return (
			<View style={styles.container}>

				<View style={{ alignItems: 'center', justifyContent: 'center'}}>
					<TouchableOpacity onPress={() => this.chooseImage('photo')}>
						<Icon  name="images-outline" size={35} />
					</TouchableOpacity>
					<Text >Select Image </Text>
				</View>
			
				<View style={{marginTop: 50}}>
					{this.state.imageUri ? (
						<Image source={{ uri: this.state.imageUri }} style={{width: 80, height: 80}} />
						) : (
						<MaterialIcon name="note" size={40} />
					)}
				</View>
			
		  </View>
		);
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
