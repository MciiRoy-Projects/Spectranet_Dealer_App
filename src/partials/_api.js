import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';

//console.disableYellowBox = true;

export const endPoint = 'https://scm.spectranet.com.ng/api';

export const playerIdEndpoint = 'http://dealer.spectranet.com.ng:9000';

export const token =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYyMjJhOTI4OGNlMjA5OTgwODU1ZGU5ZDFiNTU2Y2VkZmM4NmU2MjdkODNmYTcwZGEyNGVhY2EzZDVkYzBkM2M2N2JmNGIyMDI1MmE3NmZmIn0.eyJhdWQiOiIxIiwianRpIjoiZjIyMmE5Mjg4Y2UyMDk5ODA4NTVkZTlkMWI1NTZjZWRmYzg2ZTYyN2Q4M2ZhNzBkYTI0ZWFjYTNkNWRjMGQzYzY3YmY0YjIwMjUyYTc2ZmYiLCJpYXQiOjE1NjgwMTkzNTQsIm5iZiI6MTU2ODAxOTM1NCwiZXhwIjoxNTk5NjQxNzU0LCJzdWIiOiIxNiIsInNjb3BlcyI6W119.SmmksnPrg46UKeWIRBIuJT9xVbNM__ZML2f8k4qo4yeXtiCrmtjt9EAcGIn_joJWvdWTg7ty6BmcqpUasx1KdkewG5Wf73OT1BW36VW-mrrFRN8TbVDDx3Uk7RAYofFQxupWdvKEZWBCOGzVogIBqnNMG4kdUNj2S_Y8ocYcUCyXgdR-Pea5ofMubqgjIGQMvNq1oDxEbbIVraffuTLEw1NI7kzyvwpchs-EKAdSxiJo3N9rbCpj6nOTfOXLElKx2yWXezRRbDSUY0p4RA-AjW6lfCV6KAQu2u-5TprzyxguZwnTLIGAPG_7_czhfpGwh-LUzw5mQ9MpeWw25H2nnCMKg0nNYEdgKBWcA15O0bHIlx9a6RhVLjFp_DGIhvD9SXyNkG_tuX-iaj1VbOMA-HmPJ0qIJ8vN7QKTBAeSq9A-jdw3Bphq9GJtftGUkSaXmN27Zo_MGbk-Bt3ylgavFJfgQ4hPv-kcNVN9vuWIxtiCZ398LiKqYD6jVfCDcQak7NiIvFiGZl4raU1IWJJ00_CFs9-IiY25OAYmy88bzUMjOjdWoU1n2SP85EKoIzA_1IagPMbrwc6XMWMbOfU_2eoZvYaWSxxvhHwJRoBln3Vo840wQm159Wz8-7KSbFEm2L8rvz1od_1UiqrmOvgFWnQcoYWUsdcmkEqFBfYgQ_k';

export const userLogin = async (userId, password) => {
  password = encodeURIComponent(password);
  const res = await axios.get(
    `https://mobileapp1.spectranet.com.ng/api/fetch_userdetails?userid=${userId}&password=${password}`,
  );
  return res;
};

/** Dealer MTD API */
export const monthlyPerformance = async userId => {
  const res = await axios.get(
    `${endPoint}/dealermonthwiseperformance/${userId}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return res;
};

/** Available Stock API */
export const dealerAvailableStock = async userId => {
  const res = await axios.get(`${endPoint}/availablestock/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

/** MTD Device purchased API */
export const dealerPurchasedStock = async userId => {
  const res = await axios.get(`${endPoint}/dealerspurchasedstock/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

/** Dealer ETOPUP PURChased API */
export const dealerEtopupPurchased = async userId => {
  const res = await axios.get(`${endPoint}/mtdetopuppurchased/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const dealerStock = async userId => {
  const res = await axios.get(`${endPoint}/dealerstock/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

/** MTD Activation API */
export const dealerPerformance = async userId => {
  const res = await axios.get(`${endPoint}/dealerperformance/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const dealerBalance = async userId => {
  const res = await axios.get(`${endPoint}/dealerbalance/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const dealerStockPurchase = async userId => {
  const res = await axios.get(`${endPoint}/dealerstockpurchase/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const mtddealertransactions = async (userId, from, to) => {
  let data = {
    dealername: userId,
    startdate: `${from} 00:00:00`,
    enddate: `${to} 00:00:00`,
  };
  const res = await axios.post(`${endPoint}/mtddealertransactions`, data, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const dealermonthwiseperformance = async userId => {
  const res = await axios.get(
    `${endPoint}/dealermonthwiseperformance/${userId}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return res;
};

export const mtdsolddevice = async userId => {
  const res = await axios.get(`${endPoint}/mtdsolddevice/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const keyContact = async userId => {
  const res = await axios.get(`${endPoint}/fetchdealer/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const mtdetopupsold = async userId => {
  const res = await axios.get(`${endPoint}/mtdetopupsold/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const requestForm = async fd => {
  const result = await axios.post(
    `https://mobileapp1.spectranet.com.ng/api/sendMailDealerApp`,
    fd,
  );
  return result;
};

export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value == null) {
      return false;
    } else {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

export const setAvatar = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    console.log(JSON.stringify(data));
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

export const getAvatar = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    // error reading value
  }
};

export const getPromos = async () => {
  const result = axios.get(
    'http://dealer.spectranet.com.ng:9000/api/getPromos',
  );
  return result;
};

export const clearAll = async () => {
  try {
    await AsyncStorage.removeItem('userDetails');
  } catch (e) {
    // clear error
  }
};

export const idCheck = (theArray, theValue) => {
  var res = false;
  for (var i = 0; i < theArray.length; i++) {
    if (theArray[i].key == theValue) {
      res = theArray[i].value;
    }
  }
  return res;
};

export const Snack = async msg => {
  Snackbar.show({
    title: msg,
    duration: Snackbar.LENGTH_SHORT,
    color: '#ffffff',
  });
};

// export const notificationHistory = async userId => {
//   const res = await axios.get(
//     `https://onesignal.com/api/v1/notifications?app_id=72ed7f65-ab57-45df-98bd-175ab2abd461`,
//     {
//       headers: {
//         Authorization: 'Basic MTMzY2ZiZmItMTgyMS00N2U3LTlkMTMtOWVjMDIwZGZhZGI2',
//       },
//     },
//   );
//   return res;
// };

export const notificationHistory = async userId => {
  const res = await axios.get(
    `https://mobileapp1.spectranet.com.ng/api/dealerappnotifications/${userId}`,
  );
  return res;
};

export const storePlayerID = async fd => {
  const result = await axios.post(
    `https://mobileapp1.spectranet.com.ng/api/playerId`,
    fd,
  );
  return result;
};
