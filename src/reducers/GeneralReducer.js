import {UPDATESTATE, LOGOUT} from '../actions/types';
import moment from 'moment';
import AppIcons from '../partials/_icons';

var today = new Date();
var backDays = new Date(today.getFullYear(), today.getMonth(), 1);

const INITIAL_STATE = {
  show: true,

  /**Avatar */
  avatar: AppIcons.placeholder,
  filePath: '',
  fileData: '',
  fileUri: '',

  /* Available Stocks*/
  availableStockdata: [],
  availableStock: 0,
  mtd: 0,
  etopuppurchased: 0,
  devicepurchased: 0,
  etopupavaiable: 0,
  availableAce: {devicetype: 'ACE', count: 0},
  availableBlaze: {devicetype: 'BLAZE', count: 0},
  availableEvo: {devicetype: 'EVO', count: 0},
  availableFreedom: {devicetype: 'FREEDOM', count: 0},
  availablePebble: {devicetype: 'PEBBLE', count: 0},

  /**Last 5 months */
  month5: {title: GetMonthName(new Date().getMonth() - 4), count: 0},
  month4: {title: GetMonthName(new Date().getMonth() - 3), count: 0},
  month3: {title: GetMonthName(new Date().getMonth() - 2), count: 0},
  month2: {title: GetMonthName(new Date().getMonth() - 1), count: 0},
  month1: {title: GetMonthName(new Date().getMonth()), count: 0},

  /**refresh */
  refreshing: false,

  /**Informations */
  showInfo: true,

  /**mtd sold device */
  device1: {title: 'N/A', count: 0},
  device2: {title: 'N/A', count: 0},
  device3: {title: 'N/A', count: 0},
  device4: {title: 'N/A', count: 0},
  device5: {title: 'N/A', count: 0},
  device: [],
  mtddevicesold: 0,

  /**Forms */
  name: '',
  userId: '',
  email: '',
  type: '',
  customerId: '',
  customerName: '',
  phonenumber: '',
  address: '',
  subject: '* Choose Subject',
  skulabel: '* Choose SKU',
  skuqty: '',
  message: '',
  isLoading: false,
  isPopup: false,
  isSubject: false,
  isLoadingBg: true,
  product: '',
  quantity: '',
  tsm: '',
  tsmemail: '',
  rsmemail: '',
  cpeemail: '',
  rseemail: '',
  superdealeremail: '',
  superdealername: '',
  plainSubject: '',
  stockPurchaseFormSub: 'Stock Purchase',
  isPopupFormSent: false,
  dealerContact: [
    {
      dealercode: null,
      dealername: null,
      category: null,
      dealertarget: null,
      dealermtd: null,
      tsmname: null,
      tsmphone: null,
      tsmemail: null,
      rsmname: null,
      rsmphone: null,
      rsmemail: null,
      cpename: null,
      cpephone: null,
      cpeemail: null,
      rsename: null,
      rsephone: null,
      rseemail: null,
      sdname: null,
      sdemail: null,
    },
  ],

  /** Promo*/
  list: [],

  /** News*/
  News: [],

  /**Webview*/
  link: '',

  /**Transaction History*/
  trxHst: [],
  isVisibleFrom: false,
  isVisibleTo: false,
  chosenDateFrom: moment(backDays).format('YYYY-MM-DD'),
  chosenDateTo: moment(today).format('YYYY-MM-DD'),
  activetab: true,
  inactivetab: false,
  dealertarget: 0,
  mtdetopupsold: 0,

  /**popups */
  etopuppopup: false,
  etopup_popup_text: '',
  activation_popup_text: '',
  infopopup: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATESTATE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

function GetMonthName(monthNumber) {
  if (monthNumber === -1) {
    monthNumber = 11;
  } else if (monthNumber === -2) {
    monthNumber = 10;
  } else if (monthNumber === -3) {
    monthNumber = 9;
  } else if (monthNumber === -4) {
    monthNumber = 8;
  } else {
    monthNumber = monthNumber;
  }

  //monthNumber = monthNumber < 0 ? 11 : monthNumber;
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  //const d = new Date();
  //const monthIndex = month;
  const monthName = months[monthNumber];
  return monthName;
}
