import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
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
  ScrollView,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PatientInfo from './PatientInfo';
export default class PrescriptionList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      prescriptions: [],
    };
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.readFromAsyncStorage();
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
      alert(JSON.stringify(prescriptions));
      this.setState({prescriptions});
    } catch (error) {
      console.log('Prescription -> savePrescription -> error', error);
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.container}>
            <Text style={styles.text}>Prescription List</Text>
            <Button
              block
              onPress={() => {
                this.props.navigation.navigate('Prescription', {
                  prescription: {
                    patientinfo: {},
                    // onupdate: this.readFromAsyncStorage,
                  },
                });
              }}>
              <Text>Add Prescription</Text>
            </Button>
            {/* //Add flatlist to show patient name  */}
            <View>
              <FlatList
                data={this.state.prescriptions}
                renderItem={({item, index}) => (
                  <View style={styles.screen}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        this.props.navigation.navigate('Prescription', {
                          prescription: item,
                          index: index,
                          onupdate: this.readFromAsyncStorage,
                        });
                      }}>
                      <Text>{item.patientinfo.pName}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '300',
  },
  screen: {
    padding: 10,
    borderWidth: 1,
    width: 500,
    flexDirection: 'column',
  },
});
