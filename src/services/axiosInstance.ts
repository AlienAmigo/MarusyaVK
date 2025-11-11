// api/axiosInstance.ts
import axios from 'axios';

import { BASE_URL, DEFAULT_TIMEOUT } from '@config';


// Создаем инстанс axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  withCredentials: true,
});

// // Request Interceptor
// axiosInstance.interceptors.request.use(
//   async config => {
//     try {
//       // Получаем sessionId из нашего сервиса
//       const sessionId = await credentialService.getSessionId();
//
//       if (sessionId) {
//         config.headers.Authorization = `Bearer ${sessionId}`;
//       }
//
//       // Получаем Cookie заголовок из cookieService
//       const cookieHeader = await cookieService.getCookieHeader();
//
//       if (cookieHeader) {
//         config.headers.Cookie = cookieHeader;
//         console.log('🍪 Cookie header added to request:', cookieHeader);
//       }
//
//     } catch (error) {
//       console.log('Ошибка при настройке запроса:', error);
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );
//
// // Response Interceptor
// axiosInstance.interceptors.response.use(
//   async response => {
//     // Обрабатываем cookies из ответа
//     const setCookieHeader = response.headers['set-cookie'];
//
//     if (setCookieHeader) {
//       console.log('🍪 Set-Cookie header received:', setCookieHeader);
//
//       try {
//         // Парсим и сохраняем cookies
//         const newCookies = cookieService.parseSetCookieHeader(setCookieHeader);
//
//         if (Object.keys(newCookies).length > 0) {
//           // Получаем существующие cookies
//           const existingCookies = await cookieService.getCookies();
//
//           // Объединяем (новые перезаписывают старые)
//           const mergedCookies = { ...existingCookies, ...newCookies };
//
//           // Сохраняем
//           await cookieService.saveCookies(mergedCookies);
//
//           console.log('🍪 Cookies saved:', Object.keys(newCookies));
//         }
//
//         // Проверяем, есть ли SID в cookies и сохраняем в credentialService
//         if (newCookies.SID) {
//           await credentialService.saveSessionId(newCookies.SID.value);
//           console.log('🔑 SID saved to credential service');
//         }
//
//       } catch (error) {
//         console.log('Ошибка при сохранении cookies:', error);
//       }
//     }
//
//     return response;
//   },
//   async error => {
//     if (error.response) {
//       // Сервер ответил с статусом ошибки (4xx, 5xx)
//       const { status, data, headers } = error.response;
//
//       // Обрабатываем cookies даже в случае ошибки
//       const setCookieHeader = headers['set-cookie'];
//       if (setCookieHeader) {
//         try {
//           const newCookies = cookieService.parseSetCookieHeader(setCookieHeader);
//           if (Object.keys(newCookies).length > 0) {
//             const existingCookies = await cookieService.getCookies();
//             const mergedCookies = { ...existingCookies, ...newCookies };
//             await cookieService.saveCookies(mergedCookies);
//           }
//         } catch (cookieError) {
//           console.log('Ошибка при сохранении cookies из ошибки:', cookieError);
//         }
//       }
//
//       switch (status) {
//         case 401:
//           // Неавторизован - очищаем cookies и sessionId
//           console.log('Сессия истекла, требуется авторизация');
//           try {
//             await cookieService.clearAllCookies();
//             await credentialService.removeSessionId();
//             console.log('🧹 Все cookies и сессия очищены');
//           } catch (clearError) {
//             console.log('Ошибка при очистке:', clearError);
//           }
//           break;
//         case 403:
//           console.log('Доступ запрещен');
//           break;
//         case 404:
//           console.log('Ресурс не найден');
//           break;
//         case 500:
//           console.log('Внутренняя ошибка сервера');
//           break;
//         default:
//           console.log(
//             'Произошла ошибка:',
//             data?.message || 'Неизвестная ошибка'
//           );
//       }
//     } else if (error.request) {
//       console.log('Нет ответа от сервера');
//     } else {
//       console.log('Ошибка настройки запроса:', error.message);
//     }
//
//     return Promise.reject(error);
//   }
// );


export default axiosInstance;
