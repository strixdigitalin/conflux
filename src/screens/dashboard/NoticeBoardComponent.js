import {View, Text} from 'react-native';
import React from 'react';
import {commonStyles} from '../../utils/styles';
import {COLORS} from '../../utils/theme';
import {ScrollView} from 'react-native-gesture-handler';

export default function NoticeBoardComponent({notice}) {
  console.log(notice, '<<<this is notice in notice board screen \n\n\n\n');

  const renderNoticeList = item => {
    return (
      <View
        style={{
          ...commonStyles.rowStart,
          alignItems: 'center',
          marginBottom: 8,
        }}>
        <View
          style={{
            width: 1,
            backgroundColor: COLORS.blue,
            height: 35,
            marginRight: 6,
          }}
        />
        <Text style={{...commonStyles.fs14_400, fontWeight: 'bold'}}>
          {item?.subject} :
        </Text>
        <Text style={{...commonStyles.fs14_400}}>{item?.description}</Text>
      </View>
    );
  };
  const Heading = text => {
    return (
      <View
        style={{
          ...commonStyles.rowStart,
          alignItems: 'center',
          // marginBottom: 2,
        }}>
        <View
          style={{
            width: 1,
            backgroundColor: COLORS.blue,
            height: 35,
            marginRight: 6,
            fontSize: 18,
          }}
        />
        <Text style={{...commonStyles.fs14_400}}>{text}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS.blue,
        borderRadius: 6,
      }}>
      <Text
        style={{
          ...commonStyles.fs14_400,
          paddingHorizontal: 8,
          paddingVertical: 2,
        }}>
        Notice Board
      </Text>

      <View style={{width: '100%', height: 1, backgroundColor: COLORS.blue}} />
      <View style={{padding: 10, paddingBottom: 4}}>
        <ScrollView
          style={{
            maxHeight: 200,
          }}>
          {notice.map(item => {
            return renderNoticeList(item);
          })}
          {notice.length==0 && <Text>No Data</Text>}
          {/* 
          {renderNoticeList(
            'The Jeeva Organic sales team achieved a sales value of INR 14,26,158.',
          )}

          {renderNoticeList('The Jeeva Organic sales team.')}

          {renderNoticeList(
            'The Jeeva Organic sales team achieved a sales value of INR 14,26,158.',
          )}
          {renderNoticeList(
            'The Jeeva Organic sales team achieved a sales value of INR 14,26,158.',
          )}
          {renderNoticeList(
            'The Jeeva Organic sales team achieved a sales value of INR 14,26,158.',
          )}
          {renderNoticeList(
            'The Jeeva Organic sales team achieved a sales value of INR 14,26,158.',
          )} */}
        </ScrollView>
      </View>
    </View>
  );
}
