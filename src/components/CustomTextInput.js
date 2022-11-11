import {View, TextInput, Image} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {COLORS} from '../utils/theme';

export default function CustomTextInput({
  placeholder,
  value,
  onChange,
  autoCapitalize = '',
  keyboardType,
  icon,
  maxLength = 15,
  ...rest
}) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <View>
      <View style={{position: 'absolute', left: 18, top: 18}}>
        <Image
          source={icon}
          style={{width: 20, height: 20, tintColor: COLORS.blue}}
        />
      </View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        onFocus={() => {
          setIsSelected(true);
        }}
        onBlur={() => {
          setIsSelected(false);
        }}
        onChangeText={onChange}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        defaultValue={value}
        style={{
          width: '100%',
          height: 55,
          borderWidth: 1,
          borderRadius: 50,
          borderColor: COLORS.blue,
          paddingHorizontal: 50,
          color: '#000',
          zIndex: 1,
        }}
        {...rest}
      />
      {/* <View style={{ position: "absolute", right: 18, top: 17 }}>
                <Image
                    source={require("../assets/img/cross.png")}
                    style={{ width: isSelected ? 22 : 0, height: isSelected ? 22 : 0, tintColor: "#fff" }}
                />
            </View> */}
    </View>
  );
}
