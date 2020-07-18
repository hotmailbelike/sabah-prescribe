import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import {Form, Item, Label, Input, Button, DatePicker} from 'native-base';
import AddTime from './AddTime';

export default class Medicine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mName: '',
      mNote: '',
      mDuration: '',
      mInterval: '',
      chosenDate: new Date(Date.now()),

      timeList: [],
      //viewForm: false,
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    //alert(JSON.stringify(newDate));
    this.setState({chosenDate: newDate});
    // this.props.getMedicine('chosenDate', newDate.toString());
  }
  addTime = (index, key, value) => {
    console.log('Medicine -> addTime -> value', value);
    console.log('Medicine -> addTime -> index', index);
    console.log('Medicine -> addTime -> key', key);
    let timeList = [...this.state.timeList];
    let time = timeList[index];
    time = {...time, [key]: value};
    timeList[index] = time;
    this.setState({timeList}, () => {
      console.log(this.state);
    });
  };
  addMedicineTime = () => {
    //alert("add time")
    let time = {
      mTime: '',
      mDay: '',
      mMeal: '',
      mQuantity: '',
      mInstruction: '',
    };
    this.setState({
      timeList: [...this.state.timeList, time],
    });
  };

  saveMedicineInfo = async () => {
    try {
      let state = {...this.state};
      //delete state.viewForm;
      await AsyncStorage.setItem('prescription', JSON.stringify(state));
      alert(JSON.stringify(state));
      console.log(
        'Prescription -> savePrescription ->   this.state',
        JSON.stringify(this.state),
      );

      this.setState({
        timeList: [],
        mName: '',
        mNote: '',
        mDuration: '',
        mInterval: '',
        chosenDate: new Date(Date.now()),
      });
    } catch (error) {
      console.log('Prescription -> savePrescription -> error', error);
    }
  };
  showMedicineInfo = async () => {
    let MedicineInfo = await AsyncStorage.getItem('MedicineInfo');
    let d = JSON.parse(MedicineInfo);

    alert(
      'Medicine Info: ' +
        ' Medcine Name: ' +
        d.mName +
        ' Satrting Date: ' +
        new Date(d.chosenDate).toString() +
        ' Duration: ' +
        d.mDuration +
        ' Note: ' +
        d.mNote +
        ' Interval: ' +
        d.mInterval +
        ' Time: ' +
        d.mTime +
        '' +
        d.mDay +
        ' Meal:' +
        d.mMeal +
        ' Quantity: ' +
        d.mQuantity +
        ' Instruction: ' +
        d.mInstruction,
    );
  };
  showForm = () => {
    this.setState({
      viewForm: !this.state.viewForm,
    });
  };

  render() {
    return (
      <ScrollView>
        <View>
          <Form>
            <Item floatingLabel>
              <Label>Add Medcine Name</Label>
              <Input
                value={this.state.mName}
                onChangeText={(mName) => {
                  this.setState({mName});
                  //this.props.getMedicine('mName', mName);
                }}
              />
            </Item>
            <DatePicker
              defaultDate={this.state.chosenDate}
              minimumDate={new Date(2019, 0, 1)}
              maximumDate={new Date(2030, 12, 31)}
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText="Starting Date"
              textStyle={{color: 'black'}}
              placeHolderTextStyle={{color: '#005582'}}
              //value={this.props.chosenDate}
              onDateChange={this.setDate}
              disabled={false}
            />
            <Item floatingLabel>
              <Label>Duration(How many days?)</Label>
              <Input
                value={this.state.mDuration}
                keyboardType="numeric"
                onChangeText={(mDuration) => {
                  this.setState({mDuration});
                  //this.props.getMedicine('mDuration', mDuration);
                }}
              />
            </Item>
            <Item floatingLabel>
              <Label>Note (Instruction for Medicine) </Label>

              <Input
                value={this.state.mNote}
                onChangeText={(mNote) => {
                  this.setState({mNote});
                  //this.props.getMedicine('mNote', mNote);
                }}
              />
            </Item>
            <Item floatingLabel>
              <Label>Interval(After How many days? ) </Label>
              <Input
                //default value 1
                value={this.state.mInterval}
                keyboardType="numeric"
                onChangeText={(mInterval) => {
                  this.setState({mInterval});
                  //this.props.getMedicine('mInterval', mInterval);
                }}
              />
            </Item>
            <Button
              onPress={
                //this.addMedicineTime();
                this.addMedicineTime
              }
              style={{marginTop: 15, width: 180, marginLeft: 120}}>
              <Text style={{marginLeft: 5, fontSize: 15, color: 'white'}}>
                Add Medicine Time
              </Text>
            </Button>

            {this.state.timeList.map((item, i) => {
              return (
                <View key={item}>
                  <AddTime addTime={this.addTime} timeListIndex={i} />
                </View>
              );
            })}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button
                style={{
                  backgroundColor: '#1F4D8D',
                  width: 140,
                  marginLeft: 8,
                  marginTop: 20,
                }}
                onPress={() => {
                  this.saveMedicineInfo();
                }}>
                <Text
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginLeft: 45,
                    fontSize: 18,
                  }}>
                  Save
                </Text>
              </Button>
              <Button
                style={{
                  backgroundColor: '#07A568',
                  width: 140,
                  marginLeft: 8,
                  marginTop: 20,
                }}
                onPress={() => {
                  this.showMedicineInfo();
                }}>
                <Text
                  style={{
                    color: 'white',
                    position: 'absolute',
                    marginLeft: 45,
                    fontSize: 18,
                  }}>
                  Show
                </Text>
              </Button>
            </View>
          </Form>
        </View>
      </ScrollView>
    );
  }
}

//
