import EntitiesStore, {loadAllHelper}  from './entities-store'
import {computed, action} from 'mobx'

class CameraStore extends EntitiesStore {
    @observable pictures = []

    @action addPicture = (picture) =>  this.pictures.concat(picture)
}

export default CameraStore