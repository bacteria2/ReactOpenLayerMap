/**
 * Created by lenovo on 2017/11/3.
 */
import {request,api} from './config'


export async function getFeatureList(){
   return  request.get( api.getFeatureList+api.suffix);
}

export async function getFeatureById(id){
    return  request.get( api.getFeatureById+id+api.suffix);
}