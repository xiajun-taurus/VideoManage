import fetch from '@/config/fetch'

/**
 * 登陆
 */

export const login = data => fetch('/users/login', data, 'POST');

/**
 * 退出
 */

export const signout = () => fetch('/users/logout');

export const getCount = () => fetch('/users/count');

export const getToday = () => fetch('/users/todayActive');

export const getBgmList = data => fetch('/bgm/queryBgmList',data,'POST');

export const addBgm = data => fetch('/bgm/addBgm',data,'POST');

export const delBgm = data => fetch('/bgm/delBgm',data);

export const getUserList = data => fetch('/users/list',data,'POST');

export const getVideoList = data => fetch('/videos/list',data,'POST');

export const forbidVideo = data => fetch('/videos/forbidVideo',data,'POST');

export const getReportsList = data => fetch('/users-report/list',data,'POST');
