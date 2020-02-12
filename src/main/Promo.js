import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  Header,
  WrapperMain,
  H1,
  H2,
  PageTitle,
  Touch,
  Loading
} from '../partials/_components';

import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';
import moment from 'moment';
import {promoData} from '../actions';
import {connect} from 'react-redux';

class Promo extends React.Component {
  
  loadData = () => {
    this.props.promoData();
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain>
        <View>
          <Header
            openDrawer={() => navigation.openDrawer()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <PageTitle title={"Current Promos"}/>
        </View>

        <View style={styles.paneTwo}>
          
            <ScrollView showsVerticalScrollIndicator={false}>
              {this.props.store.list.map((el, key) => (
                <Touch
                  style={styles.grid}
                  key={key}
                  onPress={() => navigation.navigate('PromoView', el)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: RW(50),
                    }}>
                    <View style={styles.imageHolder}>
                      <Image
                        source={{uri: el.img}}
                        style={styles.image}
                        resizeMode="contain"
                      />
                    </View>
                    <View>
                      <H2 style={styles.textOne}>{el.title}</H2>
                      <H1 style={styles.textTwo}>
                        {moment(el.startdate).format('MMMM DD, YYYY')}
                      </H1>
                    </View>
                  </View>
                  <Image
                    source={AppIcons.li}
                    style={{width: RF(15), height: RF(15)}}
                    resizeMode="contain"
                  />
                </Touch>
              ))}
            </ScrollView>
        </View>

        {this.props.store.isLoadingBg ? (
          <Loading />
        ) : null}
      </WrapperMain>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      store: state.store
  }
};

export default connect(mapStateToProps, { 
  promoData
 })(Promo);

const styles = StyleSheet.create({
  imageHolder: {
    backgroundColor: AppColors.white,
    width: RW(25),
    height: RH(10),
    marginRight: RW(5),
    borderRadius: RH(1),
    alignItems:'center',
    justifyContent:'center'
  },
  image: {
    flex: 1,
    width: '100%',
  },
  paneOne: {
    padding: RW(6),
    height: RH(40),
  },
  paneTwo: {
    marginTop: RH(1),
    flex: 1,
    marginTop: RH(1),
    marginHorizontal: RW(3),
    paddingVertical: RH(2)
  },
  textOne: {
    fontSize: RF(18),
    color: AppColors.white,
  },
  textTwo: {
    fontSize: RF(13),
    color: AppColors.white,
    opacity: 0.6,
    marginTop: RH(2),
  },
  grid: {
    //paddingVertical: RH(3),
    //flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'space-between',
    //borderBottomColor: '#dfdfdf',
    //borderBottomWidth: 0.5,

    alignItems:"center", 
    borderLeftColor:"#F15F79",
    borderLeftWidth:2,
    paddingHorizontal:15,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical: RH(3),
    marginVertical:RH(2),
    shadowColor:'rgba(0, 0, 0, 0.1)',
    shadowOffset:{width:0,height:0},
    shadowOpacity:0.8,
    shadowRadius:2,
    elevation:1,
    backgroundColor:'#1B5AAC',
    borderTopWidth:1,
    borderTopColor:'rgba(255,255,255,0.3)',
    borderBottomWidth:1,
    borderBottomColor:'rgba(255,255,255,0.3)'
  },
});
