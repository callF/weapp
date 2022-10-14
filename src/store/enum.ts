import { action, observable } from 'mobx';
import Taro from '@tarojs/taro';
import { INFINITE_PAGE_SIZE } from '@/constants';

class EnumStore {
  // 志愿者活动类型
  @observable vsTypes: IEnum[] = [];

  @action
  getVsTypes() {
    this.vsTypes = [];
  }
}

export default new EnumStore();
