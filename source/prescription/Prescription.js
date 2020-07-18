import React, {Component} from 'react';
import {View, ScrollView, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Text,
  Item,
} from 'native-base';
import PatientInfo from './PatientInfo';

export default class Prescription extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      patientinfo: {},
      prescription: {},
    };
  }
  componentDidMount() {
    let prescription = this.props.route.params.prescription;
    console.log('hf', JSON.stringify(prescription));
    //this.setState({ patientinfo: prescription.patientinfo, });
    this.setState({
      patientinfo: prescription.patientinfo,
      prescription: prescription,
    });
  }
  readFromAsyncStorage = async () => {
    try {
      let prescriptions = await AsyncStorage.getItem('prescriptions');
      if (prescriptions !== null) {
        prescriptions = JSON.parse(prescriptions);
      } else {
        prescriptions = [];
      }
      // alert(JSON.stringify(prescriptions));
      this.setState({prescriptions});
    } catch (error) {
      console.log('Prescription -> savePrescription -> error', error);
    }
  };
  updatePrescription(prescription) {
    this.setState({prescription: prescription});
  }

  render() {
    return (
      <Container>
        <ScrollView>
          <Content>
            <Text>Prescription</Text>

            <PatientInfo
              patientinfo={this.state.patientinfo}
              index={this.props.route.params.index}
              update={this.updatePrescription}
            />

            {this.state.prescription.medicines && (
              <Button
                style={{
                  backgroundColor: '#0086ad',
                  width: 200,
                  marginLeft: 100,
                  height: 50,
                  margin: 10,
                }}
                block
                onPress={() => {
                  this.props.navigation.navigate('Medicine List');
                }}>
                <Text
                  style={{
                    marginLeft: 2,
                    marginTop: 10,
                    marginBottom: 10,
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Medicine List
                </Text>
              </Button>
            )}
            <Button
              onPress={() => {
                alert('saved');
              }}
              style={{width: 100, marginTop: 5, marginLeft: 150}}>
              <Text style={{marginLeft: 15, fontSize: 15}}>Save</Text>
            </Button>
          </Content>
        </ScrollView>
      </Container>
    );
  }
}
