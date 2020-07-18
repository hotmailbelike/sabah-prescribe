import React, {Component} from 'react';
import {View, TouchableOpacity, Text, TextInput} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Form, Item, Label, Input} from 'native-base';

export default class AddTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mTime: '',
      mDay: '',
      mMeal: '',
      mQuantity: '',
      mInstruction: '',
    };
  }

  //am/pm
  state = {day: ''};
  updateDay = (day) => {
    this.setState({mDay: day});
    this.props.addTime(this.props.timeListIndex, 'mDay', day);
  };

  //Meal
  updateMeal = (meal) => {
    this.setState({mMeal: meal});
    this.props.addTime(this.props.timeListIndex, 'mMeal', meal);
  };

  showForm = () => {
    this.setState({
      viewForm: !this.state.viewForm,
    });
  };

  addForm() {
    if (this.state.viewForm) {
      return (
        <View>
          <Label
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 20,
              marginTop: 10,
              marginBottom: 10,
            }}>
            Medicine Taking Time
          </Label>

          <View>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  marginRight: 40,
                  marginLeft: 70,
                  width: 70,
                }}
                placeholder="Add Time"
                underlineColorAndroid="transparent"
                placeholderTextColor="#005582"
                value={this.props.mTime}
                onChangeText={(mTime) => {
                  this.props.addTime(this.props.timeListIndex, 'mTime', mTime);
                }}
              />

              <Picker
                style={{width: 140, color: '#005582'}}
                selectedValue={this.state.mDay}
                onValueChange={this.updateDay}>
                <Picker.Item label="time tools" value=" " />
                <Picker.Item label="am" value="am" />
                <Picker.Item label="pm" value="pm" />
              </Picker>
            </View>
            <Picker
              style={{color: '#005582'}}
              selectedValue={this.state.mMeal}
              onValueChange={this.updateMeal}>
              <Picker.Item label="Meal Time" value=" " />
              <Picker.Item label="Before Meal" value="Before Meal" />
              <Picker.Item label="After Meal" value="After Meal" />
            </Picker>
            <Item floatingLabel>
              <Label>Quantity</Label>

              <Input
                value={this.props.mQuantity}
                onChangeText={(mQuantity) => {
                  this.props.addTime(
                    this.props.timeListIndex,
                    'mQuantity',
                    mQuantity,
                  );
                }}
              />
            </Item>

            <Item floatingLabel>
              <Label>Instruction</Label>

              <Input
                value={this.props.mInstruction}
                onChangeText={(mInstruction) => {
                  this.props.addTime(
                    this.props.timeListIndex,
                    'mInstruction',
                    mInstruction,
                  );
                }}
              />
            </Item>
          </View>
        </View>
      );
    }
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#0086ad',
            width: 200,
            marginLeft: 100,
            height: 50,
            margin: 10,
          }}
          onPress={this.showForm}>
          <Text
            style={{
              marginLeft: 60,
              marginTop: 10,
              marginBottom: 20,
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Add Time
          </Text>
        </TouchableOpacity>
        {this.addForm()}
      </View>
    );
  }
}
