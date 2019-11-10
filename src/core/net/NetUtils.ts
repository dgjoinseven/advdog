/**
 * Created by sodaChen on 2017/3/10.
 */
namespace game
{
    /**
     * 网络工具类，封装了可变数值的读写
     * @author sodaChen
     */
    export class NetUtils
    {
        /**
         * 写可变的number数值
         * @param bytearr
         * @param val
         */
        static writeVaryNum(bytearr: egret.ByteArray, val: number): void
        {
            try
            {
                if (val < 122 && val > -128)
                {//byte
                    bytearr.writeByte(val);
                }
                else if (val < 128 && val > 122)
                {//byte，主要是处理 122~127的byte
                    bytearr.writeByte(122);
                    bytearr.writeByte(val);
                }
                else if (val < 32767 && val > -32768)
                {//short
                    bytearr.writeByte(123);
                    bytearr.writeShort(val);
                }
                else if (val < 2147483647 && val > -2147483648)
                {//int
                    bytearr.writeByte(124);
                    bytearr.writeInt(val);
                }
                else
                {//long
                    bytearr.writeByte(125);
                    bytearr.writeDouble(val);
                }
            }
            catch (Error)
            {
                alert(Error.stack);
            }
        }

        /**
         * 读可变的number数值
         * @param buf
         * @returns {number}
         */
        static readVaryNum(buf: egret.ByteArray)
        {
            var type = buf.readByte();
            if (type < 122 && type > -128) return type;
            else if (type == 122) return buf.readByte();
            else if (type == 123) return buf.readShort();
            else if (type == 124) return buf.readInt();
            else if (type == 125) return buf.readDouble();
            else if (type == 126) return buf.readFloat();
            else if (type == 127) return buf.readDouble();
            return 0;
        }

    }
}