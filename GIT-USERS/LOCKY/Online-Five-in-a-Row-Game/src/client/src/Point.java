

import java.awt.Color;
/**
 * 棋子類別
 */
public class Point {
  private int x;// 棋盤中的x索引
  private int y;// 棋盤中的y索引
  private Color color;// 顏色
  public static final int DIAMETER=30;// 直徑
  
  public Point(int x,int y,Color color){
	  this.x=x;
	  this.y=y;
	  this.color=color;
  } 
  
  public int getX(){// 拿到棋盤中的x索引
	  return x;
  }
  public int getY(){
	  return y;
  }
  public Color getColor(){// 獲得棋子的顏色
	  return color;
  }
}
