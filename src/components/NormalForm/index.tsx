import { Input, Picker, View, Switch } from '@tarojs/components';
import { AtIcon, AtTextarea as Textarea } from 'taro-ui';
import './index.less';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { InputProps } from '@tarojs/components/types/Input';
import { AtTextareaProps } from 'taro-ui/types/textarea';
import {
  PickerDateProps,
  PickerMultiSelectorProps,
  PickerRegionProps,
  PickerSelectorProps,
  PickerTimeProps,
} from '@tarojs/components/types/Picker';
import { SwitchProps } from '@tarojs/components/types/Switch';
import ImageSelect from '@/components/ImgSelect/index';

type INFormType =
  | 'text'
  | 'input'
  | 'number'
  | 'textarea'
  | 'switchBtn'
  | 'upload'
  | 'picker'
  | 'datePicker';

type INFormItemBase = IPickerBase & IUploadBase;

interface IPickerBase {
  options?: ICommon[];
}

interface IUploadBase {
  limit?: number;
}

type IBaseProps =
  | InputProps
  | AtTextareaProps
  | PickerMultiSelectorProps
  | PickerTimeProps
  | PickerDateProps
  | PickerRegionProps
  | PickerSelectorProps
  | SwitchProps;

export interface INFormItem extends INFormItemBase {
  type?: INFormType;
  label: string;
  key: string;
  // selector可选类型
  selectType?: 'person' | 'category' | 'location';
  selectValueKey?: string; // selector store的值key
  placeholder?: string;
  required?: boolean;
  className?: string;
  props?: IBaseProps;
  render?: any;
  [key: string]: any;
}

interface Props {
  formItems: INFormItem[];
  setData: any;
  data: any;
  className?: string;
}

const NormalForm = (props: Props) => {
  const { formItems = [], data, setData, className } = props;
  const onInput = (key: string, v: any) => {
    const _newD = {
      ...data,
      [key]: v,
    };
    // 不知道为什么就会卡住了
    // objUtils.removeNull(_newD);
    setData(_newD);
  };

  const onPickerSelected = (key: string, idx: number, _options: ICommon[]) => {
    if (
      key === 'faultClassificationId' &&
      _options[idx].id !== (data.faultClassificationId || 0)
    ) {
      const _newD = {
        [key]: _options[idx].id,
        faultTypeId: 0,
        faultRemarks: data.faultRemarks,
      };
      setData(_newD);
    } else {
      const _newD = {
        ...data,
        [key]: _options[idx].id,
      };
      setData(_newD);
    }

    // objUtils.removeNull(_newD);
  };
  const getInputItem = (type: INFormType, item: INFormItem) => {
    const {
      placeholder,
      key,
      label,
      options = [],
      limit,
      props: itemProps = {},
    } = item;

    const value = data[key];

    const text = () => {
      return <View className={`u-text ${className}`}>{value}</View>;
    };

    const upload = () => {
      return (
        <ImageSelect
          imgList={value}
          {...itemProps}
          limit={limit || 1}
          onChangeImage={(e) => onInput(key, e)}
        />
      );
    };

    const input = () => {
      return (
        <Input
          className="u-input"
          {...itemProps}
          value={value}
          onInput={(e) => onInput(key, e.detail.value)}
          placeholder={placeholder || `请填写${label}`}
        />
      );
    };

    const number = () => {
      return (
        <Input
          className="u-number"
          type="number"
          {...itemProps}
          value={value}
          onInput={(e) => onInput(key, e.detail.value)}
          placeholder={placeholder || `请填写${label}`}
        />
      );
    };

    const textarea = () => {
      return (
        <>
          <Textarea
            className="u-textarea"
            {...itemProps}
            value={value}
            placeholder={placeholder || `请填写${label}`}
            onChange={(e) => onInput(key, e)}
          />
        </>
      );
    };

    const picker = () => {
      const getIdx = (_id: string) => {
        let idx = 0;
        options.forEach((_item, _idx: number) => {
          const { id } = _item;
          if (_id === id) {
            idx = _idx;
          }
        });
        return idx;
      };
      return (
        <View className="m-select">
          <Picker
            mode="selector"
            range={options}
            className="u-picker"
            rangeKey="name"
            value={getIdx(value)}
            {...itemProps}
            onChange={(e) => onPickerSelected(key, e.detail.value, options)}
          >
            <View className={`u-value ${value ? '' : 'f-placeholder'}`}>
              {options.filter((_item) => _item.id === value)[0]?.name ||
                placeholder ||
                `请选择`}
            </View>
            <AtIcon
              className="u-arrow-icon"
              color="#B3B5B9"
              value="chevron-right"
            />
          </Picker>
        </View>
      );
    };

    const switchBtn = () => {
      return (
        <Switch
          className="u-switch"
          checked={value}
          color="#3296FA"
          {...itemProps}
          onChange={(e) => onInput(key, e.detail.value)}
        />
      );
    };

    const datePicker = () => {
      return (
        <View className="m-select">
          <Picker
            mode="date"
            {...itemProps}
            onChange={(e) => onInput(key, e.detail.value)}
            value={value}
          >
            <View className={`u-value ${value ? '' : 'f-placeholder'}`}>
              {value || placeholder || `请选择`}
            </View>
            <AtIcon
              className="u-arrow-icon"
              color="#B3B5B9"
              value="chevron-right"
            />
          </Picker>
        </View>
      );
    };
    return {
      text,
      input,
      textarea,
      number,
      picker,
      datePicker,
      upload,
      switchBtn,
    }[type];
  };
  return (
    <View className={`g-normalForm ${className || ''}`}>
      {formItems.map((item) => {
        const { label, key, type, required, render } = item;
        return (
          <View key={key} className={`m-item f-${type}`}>
            <View className={`u-label ${required ? 'f-required' : ''}`}>
              {label}
            </View>
            <View className="m-content">
              {render ? render({ data, setData }) : getInputItem(type, item)()}
            </View>
          </View>
        );
      })}
    </View>
  );
};
export default React.memo(inject('store')(observer(NormalForm)));
