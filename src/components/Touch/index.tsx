import { Component, createRef } from 'react';
import { View } from '@tarojs/components';
import './index.less';

export interface PropsType {
  renderItem: any;
  renderLeft?: any;
  onClickLeftTouch: Function;
  isTouch: boolean;
}
interface StateType {
  scroll: boolean;
  touches: Array<any>;
  disable: boolean;
}
export default class ScrollTouch extends Component<PropsType, StateType> {
  touchNum: number;

  touchCount: number; // 记录上一次的活滑动位置

  myRef: any;

  constructor(props) {
    super(props);
    this.state = {
      touches: [],
      scroll: false,
      disable: true,
    };
    this.touchCount = 0;
    this.touchNum = 0;
    this.myRef = createRef();
  }

  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  handleAngle = (start, end) => {
    const _X = end.clientX - start.clientX;
    const _Y = end.clientY - start.clientY;
    // 返回角度 /Math.atan()返回数字的反正切值
    return (360 * Math.atan(_Y / _X)) / (2 * Math.PI);
  };

  // 触摸开始
  handleTouchStart = (e) => {
    const { touches } = e;
    // @touches typeof  Array
    // touches.length  手指触摸屏幕的个数
    this.setState({
      touches: touches.length === 1 ? touches : [],
      scroll: touches.length === 1,
    });
  };

  handleTouchMove = (e) => {
    const { scroll, touches } = this.state;
    const { isTouch } = this.props;
    const touchNum = this.touchNum;
    if (scroll && isTouch) {
      // 滑滑动的角度
      const angle = this.handleAngle(touches[0], e.touches[0]);
      // 滑滑动的角度 如果 > 30 不做操作
      if (Math.abs(angle) > 30) return;
      // PosX 手指在X轴的坐标差   判断滑动方向
      const PosX = e.touches[0].pageX - touches[0].pageX;
      if (PosX > 0 && this.touchCount === 0) {
        return;
      }
      if (Math.abs(PosX + touchNum) <= 60) {
        const node = this.myRef.current;
        node.style.marginLeft = `${PosX + touchNum}px`;
        this.touchCount = PosX;
      }
    }
  };

  // 触摸结束
  handleTouchEnd = () => {
    const touchCount = this.touchCount;
    const node = this.myRef.current;
    if (touchCount < -40) {
      node.style.marginLeft = `-60px`;
      this.touchNum = -60;
    } else {
      node.style.marginLeft = '0px';
      this.touchNum = 0;
      this.touchCount = 0;
    }
  };

  // 删除操作
  handleDelete = () => {
    this.props.onClickLeftTouch();
  };

  render() {
    const { renderItem, renderLeft } = this.props;
    return (
      <View
        className="scroll-touch"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        <View ref={this.myRef} className="scroll-touch-content">
          {renderItem()}
        </View>
        <View className="scroll-touch-delete" onClick={this.handleDelete}>
          {renderLeft() ?? null}
        </View>
      </View>
    );
  }
}
