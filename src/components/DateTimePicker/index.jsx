import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import {
  View,
  Text,
  PickerView,
  PickerViewColumn,
  Image,
} from '@tarojs/components';
import {
  getPickerViewList,
  getDate,
  getArrWithTime,
  formatDate,
  getDayList,
} from './utils';
import './index.less';

class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    yearList: [], // 年 -下拉
    monthList: [], // 月 -下拉
    dayList: [], // 日 -下拉
    hourList: [], // 时 -下拉
    minuteList: [], // 分 -下拉
    selectIndexList: [1, 1, 1, 1, 1], // PickerViewColumn选择的索引
    fmtInitValue: '', // 初始值
    current: '', // 当前选择的数据
    year: '', // 时间值
    month: '',
    day: '',
    hour: '',
    minute: '',
  };

  // 打开时间选择的模态框 - 根据当前时间初始化picker-view的数据
  openModal = () => {
    const { current, fmtInitValue } = this.state;
    const selectIndexList = [];
    const arr = getArrWithTime(current || fmtInitValue || getDate()); // 优先当前选择的值，其次默认值，其次当前值
    const { yearList, monthList, dayList, hourList, minuteList } =
      getPickerViewList();
    const [year, month, day, hour, minute] = arr;
    // 根据arr  数据索引
    selectIndexList[0] = yearList.indexOf(`${arr[0]}年`);
    selectIndexList[1] = monthList.indexOf(`${arr[1]}月`);
    selectIndexList[2] = dayList.indexOf(`${arr[2]}日`);
    selectIndexList[3] = hourList.indexOf(`${arr[3]}点`);
    selectIndexList[4] = minuteList.indexOf(`${arr[4]}分`);

    this.setState({
      selectIndexList,
      yearList,
      monthList,
      dayList,
      hourList,
      minuteList,
      year,
      month,
      day,
      hour,
      minute,
    });
  };

  componentWillMount() {
    this.openModal();
  }

  componentDidMount() {
    const { initValue } = this.props;
    const fmtInitValue = getDate(initValue);
    this.setState({ fmtInitValue }, () => {
      this.openModal();
    });
  }

  // 取消
  cancelHandel = () => {
    this.props.onCancel && this.props.onCancel();
  };

  // 确定
  okHandel = () => {
    const { year, month, day, hour, minute } = this.state;
    const current = formatDate(year, month, day, hour, minute);
    this.setState({
      current,
    });
    this.props.onOk && this.props.onOk({ current });
  };

  // 切换
  changeHandel = (e) => {
    const selectIndexLists = e.detail.value;
    const [yearIndex, monthIndex, dayIndex, hourIndex, minuteIndex] =
      selectIndexLists;
    const {
      yearList,
      monthList,
      dayList,
      hourList,
      minuteList,
      selectIndexList,
    } = this.state;
    const yearStr = yearList[yearIndex];
    const monthStr = monthList[monthIndex];
    const dayStr = dayList[dayIndex];
    const hourStr = hourList[hourIndex];
    const minuteStr = minuteList[minuteIndex];
    const year = Number(yearStr.substr(0, yearStr.length - 1));
    const month = Number(monthStr.substr(0, monthStr.length - 1));
    const day = Number(dayStr.substr(0, dayStr.length - 1));
    const hour = Number(hourStr.substr(0, hourStr.length - 1));
    const minute = Number(minuteStr.substr(0, minuteStr.length - 1));
    const current = formatDate(year, month, day, hour, minute);
    const arr = getArrWithTime(current);
    selectIndexList[0] = yearList.indexOf(`${arr[0]}年`);
    selectIndexList[1] = monthList.indexOf(`${arr[1]}月`);
    selectIndexList[2] = dayList.indexOf(`${arr[2]}日`);
    selectIndexList[3] = hourList.indexOf(`${arr[3]}点`);
    selectIndexList[4] = minuteList.indexOf(`${arr[4]}分`);
    this.setState({
      selectIndexList,
      year,
      month,
      day,
      hour,
      minute,
    });
  };

  render() {
    const {
      current,
      yearList,
      monthList,
      dayList,
      hourList,
      minuteList,
      selectIndexList,
    } = this.state;
    const { visible } = this.props;
    return (
      <View className="datetime-picker-wrap wrap-class">
        {visible ? (
          <View className="wrapper">
            {/* 日期模态框 */}
            <View className="model-box-bg" />
            <View className="model-box">
              <View className="model-picker">
                <View className="button-model">
                  <View className="btn-txt" onClick={this.cancelHandel}>
                    取消
                  </View>
                  <View className="btn-txt submit-btn" onClick={this.okHandel}>
                    确定
                  </View>
                </View>
                <View className="cont_model">
                  <PickerView
                    className="pick-view"
                    indicatorStyle="height: 50px"
                    value={selectIndexList}
                    onChange={this.changeHandel}
                    indicatorClass="select-pick"
                  >
                    {/* 年 */}
                    <PickerViewColumn className="picker-view-column">
                      {yearList.length &&
                        yearList.map((item, index) => (
                          <View
                            key={String(index)}
                            className="pick-view-column-item"
                          >
                            {item}
                          </View>
                        ))}
                    </PickerViewColumn>
                    {/* 月 */}
                    <PickerViewColumn className="picker-view-column">
                      {monthList.length &&
                        monthList.map((item, index) => (
                          <View
                            key={String(index)}
                            className="pick-view-column-item"
                          >
                            {item}
                          </View>
                        ))}
                    </PickerViewColumn>
                    {/* 日 */}
                    <PickerViewColumn className="picker-view-column">
                      {dayList.length &&
                        dayList.map((item, index) => (
                          <View
                            key={String(index)}
                            className="pick-view-column-item"
                          >
                            {item}
                          </View>
                        ))}
                    </PickerViewColumn>
                    {/* 时 */}
                    <PickerViewColumn className="picker-view-column">
                      {hourList.length &&
                        hourList.map((item, index) => (
                          <View
                            key={String(index)}
                            className="pick-view-column-item"
                          >
                            {item}
                          </View>
                        ))}
                    </PickerViewColumn>
                    {/* 分 */}
                    <PickerViewColumn className="picker-view-column">
                      {minuteList.length &&
                        minuteList.map((item, index) => (
                          <View
                            key={String(index)}
                            className="pick-view-column-item"
                          >
                            {item}
                          </View>
                        ))}
                    </PickerViewColumn>
                  </PickerView>
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

export default DateTimePicker;
