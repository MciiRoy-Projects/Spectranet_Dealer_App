import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const endPoint = 'https://scm.spectranet.com.ng/api';
const token =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYyMjJhOTI4OGNlMjA5OTgwODU1ZGU5ZDFiNTU2Y2VkZmM4NmU2MjdkODNmYTcwZGEyNGVhY2EzZDVkYzBkM2M2N2JmNGIyMDI1MmE3NmZmIn0.eyJhdWQiOiIxIiwianRpIjoiZjIyMmE5Mjg4Y2UyMDk5ODA4NTVkZTlkMWI1NTZjZWRmYzg2ZTYyN2Q4M2ZhNzBkYTI0ZWFjYTNkNWRjMGQzYzY3YmY0YjIwMjUyYTc2ZmYiLCJpYXQiOjE1NjgwMTkzNTQsIm5iZiI6MTU2ODAxOTM1NCwiZXhwIjoxNTk5NjQxNzU0LCJzdWIiOiIxNiIsInNjb3BlcyI6W119.SmmksnPrg46UKeWIRBIuJT9xVbNM__ZML2f8k4qo4yeXtiCrmtjt9EAcGIn_joJWvdWTg7ty6BmcqpUasx1KdkewG5Wf73OT1BW36VW-mrrFRN8TbVDDx3Uk7RAYofFQxupWdvKEZWBCOGzVogIBqnNMG4kdUNj2S_Y8ocYcUCyXgdR-Pea5ofMubqgjIGQMvNq1oDxEbbIVraffuTLEw1NI7kzyvwpchs-EKAdSxiJo3N9rbCpj6nOTfOXLElKx2yWXezRRbDSUY0p4RA-AjW6lfCV6KAQu2u-5TprzyxguZwnTLIGAPG_7_czhfpGwh-LUzw5mQ9MpeWw25H2nnCMKg0nNYEdgKBWcA15O0bHIlx9a6RhVLjFp_DGIhvD9SXyNkG_tuX-iaj1VbOMA-HmPJ0qIJ8vN7QKTBAeSq9A-jdw3Bphq9GJtftGUkSaXmN27Zo_MGbk-Bt3ylgavFJfgQ4hPv-kcNVN9vuWIxtiCZ398LiKqYD6jVfCDcQak7NiIvFiGZl4raU1IWJJ00_CFs9-IiY25OAYmy88bzUMjOjdWoU1n2SP85EKoIzA_1IagPMbrwc6XMWMbOfU_2eoZvYaWSxxvhHwJRoBln3Vo840wQm159Wz8-7KSbFEm2L8rvz1od_1UiqrmOvgFWnQcoYWUsdcmkEqFBfYgQ_k';

const userId = 'LGR1142-DYNAMIC';

export const userLogin = async (userId, password) => {
  password = encodeURIComponent(password);
  const res = await axios.get(
    `https://mobileapp1.spectranet.com.ng/api/fetch_userdetails?userid=${userId}&password=${password}`,
  );
  return res;
};

export const dealerStock = async () => {
  const res = await axios.get(`${endPoint}/dealerstock/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const dealerPerformance = async () => {
  const res = await axios.get(`${endPoint}/dealerperformance/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const dealerBalance = async () => {
  const res = await axios.get(`${endPoint}/dealerbalance/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const dealerStockPurchase = async () => {
  const res = await axios.get(`${endPoint}/dealerstockpurchase/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const keyContact = async () => {
  const res = await axios.get(`${endPoint}/fetchdealer/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const storeData = async data => {
  try {
    await AsyncStorage.setItem('userDetails', JSON.stringify(data));
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('userDetails');
    if (value == null) {
      return false;
    } else {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};
