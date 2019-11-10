/**
 * @ClassUtils.as
 *
 * @author sodaChen mail:asframe#163.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:ASFrame
 * <br>Date:2012-1-14
 */
namespace asf
{
  /**
   *
   * @author sodaChen
   * Date:2012-1-14
   */
  export class ClassUtils
  {
    private static CONSTRUCTOR_NAME: string = "constructor";

    /**
     * 获取到Class的名字（不包含包名）.这个方法要注意，因为打包成min.js的时候，会修改类名，所以到时无法获取真实的类名字了
     * @param clazz 构造函数实例
     * @param firstMin 名字的首字母是否小写。默认是不修改
     * @returns {string} 返回名字
     */
    static getClassName(clazz:Function,firstMin:boolean = false):string
    {
      var name:string = clazz.prototype.constructor.name;
      if(firstMin)
      {
        //首字母变小写
        return StringUtils.uncapitalize(name);
      }
      return name;
    }
    /**
     * 根据对象的实例返回<code>Class<code>对象
     * @param instance 需要返回class对象的实例
     * @return 实例的<code>构造函数</code>
     */
    static forInstance(instance: Object): any
    {
      if(!instance[this.CONSTRUCTOR_NAME])
        return instance[this.CONSTRUCTOR_NAME];
      return null;
    }

    /**
     * 根据名字获得对应的构造函数对象
     * @param name 构造函数名字
     * @return the 名字的<code>构造函数</code>
     */
    static forName(name: string): any {
      return eval(name);
    }

    /**
     * Creates an instance of the given class and passes the arguments to
     * the constructor.
     *
     * TODO find a generic solution for this. Currently we support constructors
     * with a maximum of 10 arguments.
     *
     * @param clazz the class from which an instance will be created
     * @param args the arguments that need to be passed to the constructor
     */
    static newInstance(clazz: any, args: any[] = null): any {
      var result:any;
      ;
      var a: any[] = (args == null) ? [] : args;

      switch (a.length) {
        case 1:
          result = new clazz(a[0]);
          break;
        case 2:
          result = new clazz(a[0], a[1]);
          break;
        case 3:
          result = new clazz(a[0], a[1], a[2]);
          break;
        case 4:
          result = new clazz(a[0], a[1], a[2], a[3]);
          break;
        case 5:
          result = new clazz(a[0], a[1], a[2], a[3], a[4]);
          break;
        case 6:
          result = new clazz(a[0], a[1], a[2], a[3], a[4], a[5]);
          break;
        case 7:
          result = new clazz(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
          break;
        case 8:
          result = new clazz(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
          break;
        case 9:
          result = new clazz(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
          break;
        case 10:
          result = new clazz(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9]);
          break;
        default:
          result = new clazz();
      }
      return result;
    }
  }
}
