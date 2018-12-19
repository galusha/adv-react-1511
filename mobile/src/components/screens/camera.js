import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import { Camera, Permissions } from 'expo'
import {observer} from 'mobx-react'
import {observable, action} from 'mobx'

@observer
class CameraScreen extends Component {
    static propTypes = {

    };

    @observable coordinates = null
    @observable permissionGranted = false
    @observable permissionAsked = false

    @action setPermission = granted => this.permissionGranted = granted
    @action setPermissionAsked = asked => this.permissionAsked = asked
    @action setCoodrinates = coords => this.coordinates = coords

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.LOCATION)
        this.setPermissionAsked(true)
        this.setPermission(status === 'granted')

        const { coords } = await Location.getCurrentPositionAsync()
        this.setCoodrinates(coords)
    }

    snap = async () => {
      if (this.camera) {
        let photo = await this.camera.takePictureAsync()

        console.log('photo', photo)
      }
    }

    render() {
      const { permissionGranted } = this.state;
      if (permissionGranted === null) {
        return <View />;
      } else if (permissionGranted === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <View style={{ flex: 1 }}>
            <Camera ref={ref => { this.camera = ref }} style={{ flex: 1 }} type={Camera.Constants.Type.front}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() =>this.snap()}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Photo{' '}
                </Text>
              </TouchableOpacity>
              </View>
            </Camera>
          </View>
        )
      }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default CameraScreen