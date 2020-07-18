import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Button, DatePicker} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export default class PatientInfo extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.setDate = this.setDate.bind(this);

    this.state = {
      pName: '',
      pAge: '',
      pGender: '',
    };
    console.log('patient', props.patientinfo);
  }
  componentWillReceiveProps(props) {
    this.setState({
      pName: props.patientinfo.pName || '',
      pAge: props.patientinfo.pAge || '',
      pGender: props.patientinfo.pGender || '',
    });
  }
  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  savePatientInfo = async () => {
    const {pName, pAge, pGender} = this.state;

    let patientinfo = {
      pName: pName,
      pAge: pAge,
      pGender: pGender,
    };
    try {
      let prescriptions = await AsyncStorage.getItem('prescriptions');
      if (prescriptions !== null) {
        prescriptions = JSON.parse(prescriptions);
      } else {
        prescriptions = [];
      }
      console.log('props', this.props.index);
      if (this.props.index) {
        prescriptions[this.props.index].patientinfo = patientinfo;
        // this.props.update(prescriptions[this.props.index])
      } else {
        let prescription = {};

        prescription = {patientinfo};
        prescription.medicines = [];
        prescriptions.push(prescription);
        //this.props.update(prescription)
      }
      await AsyncStorage.setItem(
        'prescriptions',
        JSON.stringify(prescriptions),
      );
      alert(JSON.stringify('prescriptions', prescriptions));
      console.log(
        'Prescription -> savePrescription ->   this.state',
        JSON.stringify(this.state),
      );

      this.setState({
        pName: '',
        pAge: '',
        pGender: '',
      });
      alert(
        'Patient Info: ' +
          'Name: ' +
          pName +
          '  ' +
          'Age:' +
          pAge +
          '  ' +
          ' ' +
          'Gender: ' +
          pGender +
          ' ' +
          'Information Saved Successfully!!',
      );
    } catch (error) {
      console.log('Prescription -> savePrescription -> error', error);
    }
  };

  //Gender
  state = {user: ''};
  updateUser = (user) => {
    this.setState({pGender: user});
  };

  ShowForm = () => {
    this.setState({
      viewForm: !this.state.viewForm,
    });
  };

  //Patient form
  addForm() {
    if (this.state.viewForm) {
      return (
        <View>
          <TextInput
            placeholder="Patient Name"
            placeholderTextColor="#005582"
            value={this.state.pName}
            onChangeText={(pName) => {
              this.setState({pName});
            }}
          />
          <TextInput
            placeholder="Age"
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            placeholderTextColor="#005582"
            value={this.state.pAge}
            onChangeText={(pAge) => {
              this.setState({pAge});
            }}
          />

          <Picker
            style={{color: '#005582'}}
            selectedValue={this.state.pGender}
            onValueChange={this.updateUser}>
            <Picker.Item label="Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>

          <View style={{flexDirection: 'row', margin: 15}}>
            <Button
              style={{
                backgroundColor: '#1F4D8D',
                width: 140,
                marginLeft: 8,
                marginTop: 20,
              }}
              onPress={() => {
                this.savePatientInfo();
              }}>
              <Text
                style={{
                  color: 'white',
                  position: 'absolute',
                  marginLeft: 45,
                  fontSize: 18,
                }}>
                {' '}
                Save
              </Text>
            </Button>
          </View>
        </View>
      );
    }
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={this.ShowForm}
          style={{
            backgroundColor: '#0086ad',
            width: 200,
            marginLeft: 100,
            height: 50,
            margin: 10,
          }}>
          <Text
            style={{
              marginLeft: 50,
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            }}>
            PatientInfo
          </Text>
        </TouchableOpacity>
        {this.addForm()}
      </View>
    );
  }
}
