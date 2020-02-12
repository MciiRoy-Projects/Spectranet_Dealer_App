import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  HeaderBack,
  WrapperMain,
  PageTitle,
  Loading
} from '../partials/_components';
import Chart from '../main/ScoreboardViewComponents/_chart';
import {List} from '../main/ScoreboardViewComponents/_list';
import {RF, RW, RH} from '../lib/_sizes';
import { 
  availablestocks,
  updateState
 } from '../actions';
import {connect} from 'react-redux';

class ScoreboardView extends React.Component {

  constructor(props) {
    super(props);
    this.props.updateState("isLoadingBg",true)
  }
  
  init(){
    this.props.availablestocks();
  }

  componentDidMount() {
    this.init();
  }

  renderList(){
    let data = this.props.store.availableStockdata;
    if (data.length) {
      return data.map((el, i) => {
        return (
          <List key={i} title={el.devicetype} data={el.count}/>
        )
      })
    }
  }

  render() {
    const {navigation} = this.props;
    
    return (
      <WrapperMain style={{paddingHorizontal: RW(6)}}>
        <View>          
          <HeaderBack
              goBack={() => navigation.goBack()}
              openProfile={() => {
                navigation.navigate('Profile');               
              }}
            />
          <PageTitle title={"Available Stock"} />
        </View>

        <View style={styles.paneTwo}>
          <ScrollView showsVerticalScrollIndicator={false}>            
            <Chart />
            <View style={{marginVertical:RH(5)}}>
              {
                this.renderList()
              }
            </View>
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
  availablestocks,
  updateState
 })(ScoreboardView);

const styles = StyleSheet.create({
  paneOne: {
    padding: RW(6),
    height: RH(40),
  },
  paneTwo: {
    marginTop: RH(1),
    marginHorizontal: RW(3),
    paddingVertical: RH(2),
    borderRadius: RH(2),
    marginBottom: RH(15)
  }
});