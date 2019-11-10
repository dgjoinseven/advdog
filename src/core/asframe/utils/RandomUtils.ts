/**
 * @RandomUtils.as
 * 
 * @author sodaChen mail:asframe#163.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:ASFrame
 * <br>Date:2012-1-19
 */
namespace asf
{
	/**
	 * 随机数工具类
	 * @author sodaChen
	 * Date:2012-1-19
	 */
	export class RandomUtils
	{
		/**
		 * 返回一个
		 * @param minNum
		 * @param maxNum
		 * @returns {number}
		 */
		static random(minNum: number, maxNum: number): number
		{
			// return Math.random() * (maxNum - minNum);
			return this.randomInt(minNum,maxNum,1);
		}
		/**
		 * 随机获得int整数 
		 * @param minNum:最小范围(0开始)
		 * @param maxNum:最大范围
		 * @param stepLen:增加范围（整数，默认为1）
		 * @return 
		 * 
		 */
		static randomInt(minNum: number, maxNum: number = 0, stepLen: number = 1): number
		{
			if (minNum > maxNum) 
			{
				var nTemp: number = minNum;
				minNum = maxNum;
				maxNum = nTemp;
			}
			var nDeltaRange: number = (maxNum - minNum) + (1 * stepLen);
			var nRandomNumber: number = Math.random() * nDeltaRange;
			nRandomNumber += minNum;
			return Math.floor(nRandomNumber / stepLen) * stepLen;
		}
		/**
		 * 随机布尔值 
		 * @return 
		 * 
		 */
		static randomBoolean(): Boolean
		{
			return this.randomInt(1, 2) == 1;
		}
		/**
		 * 取得随机正负波动值(1 / -1) 
		 * @return 
		 * 
		 */
		static randomWave(): number
		{
			return this.randomBoolean() ? 1 : -1;
		}
		/**
		 * 概率是否成功(100%  1- 100)
		 * @param rate:最大值
		 * @return 随机生成数是否小于或者等于rate
		 */
		static isRateSucced(rate: number): Boolean
		{
			if (rate <= 0)
			{
				return false;
			}
			if (rate >= 100)
			{
				return true;
			}
			rate = rate / 100.0;
			var values: number[] = [];
			values[0] = Math.random();
			values[1] = Math.random();
			values[2] = Math.random();
			//随机选取0-2的下标
			if (rate >= values[this.randomInt(0, 2)])
			{
				//随机数小于或者等于概率，证明出现在概率范围内
				return true;
			}
			return false;
		}
		static isRateSuccedInt(rate: number): Boolean
		{
			if (rate <= 0)
			{
				return false;
			}
			var values: number[] = [];
			values[0] = this.randomInt(1, 100);
			values[1] = this.randomInt(1, 100);
			values[2] = this.randomInt(1, 100);
			//随机选取0-2的下标
			if (rate >= values[this.randomInt(0, 2)])
			{
				//随机数小于或者等于概率，证明出现在概率范围内
				return true;
			}
			return false;
		}

		/**
		 * 判断值是否小于0-10000
		 */
		static isRandTrue(rate: number): boolean
		{
			var rand: number = this.randomInt(0, 10000);
			return rand < rate;
		}
	}
}
