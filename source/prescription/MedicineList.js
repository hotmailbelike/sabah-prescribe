import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
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
import {FlatList} from 'react-native-gesture-handler';
export default class MedicineList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      medicines: [],
    };
  }

  componentDidMount() {
    // this.props.navigation.addListener('focus', () => {
    //   this.readFromAsyncStorage();
    // });
  }
  render() {
    return (
      <Container>
        <Content>
          <View style={styles.container}>
            <Text style={styles.text}>Medicine List</Text>
            <Button
              block
              onPress={() => {
                this.props.navigation.navigate('Medicine');
              }}>
              <Text>Add Medicine</Text>
            </Button>
            <View>
              <FlatList
                data={this.state.medicines}
                renderItem={({item, index}) => (
                  <View style={styles.screen}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        this.props.navigation.navigate('Medicine', {
                          medicine: item,
                          index: index,
                          onupdate: this.readFromAsyncStorage,
                        });
                      }}>
                      <Text>{item.medicine.mName}</Text>
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
