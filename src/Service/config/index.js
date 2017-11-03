/**
 * Created by lenovo on 2017/11/3.
 */
import axios from 'axios'

const {apiPrefix="/map/api",timeout=2000}=window.config;

export const request=axios.create({baseURL:apiPrefix,timeout});

export const api={
    getFeatureList:"/feature/list",
    getFeatureById:"/feature/"
}