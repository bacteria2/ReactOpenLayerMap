/**
 * Created by lenovo on 2017/11/7.
 */

let devConfig = {
    apiPrefix: "/map/api/",
    timeout: 2000,
    mapType:"Tian",
    mapWinDomain:"map.html",
    mapWinHeight:800,
    mapWinWidth:800,
}

let prodConfig = {
    apiPrefix: "/map/api/",
    timeout: 2000,
    mapType:"Tian",
    mapWinDomain:"map.html",
    mapWinHeight:800,
    mapWinWidth:800,
}

let config =process.env.NODE_ENV==='production'?prodConfig:devConfig;

export default Object.assign({},config,window.config||{});