/**
 * Created by lenovo on 2017/11/3.
 */
import axios from 'axios'
import config from  '@/config'

let {apiPrefix,timeout,suffix=""}=config;
export const request=axios.create({baseURL:apiPrefix,timeout});

export const api={
    suffix,
    getFeatureList:"/feature/list",
    getFeatureById:"/feature/"
}