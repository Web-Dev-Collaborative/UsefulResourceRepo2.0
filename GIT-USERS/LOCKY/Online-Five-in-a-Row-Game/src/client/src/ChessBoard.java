
import java.awt.Color;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.RadialGradientPaint;
import java.awt.RenderingHints;
import java.awt.Toolkit;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.geom.Ellipse2D;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.io.Serializable;
import java.net.Socket;

import javax.swing.*;

/**
 * 五子棋--棋盤類
 */

public class ChessBoard extends JPanel implements MouseListener, Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public static final int MARGIN = 30;// 邊距
	public static final int GRID_SPAN = 35;// 網格間距
	public static final int ROWS = 15;// 棋盤行數
	public static final int COLS = 15;// 棋盤列數

	public Point[] chessList = new Point[(ROWS + 1) * (COLS + 1)];// 初始每個每個數組元素為null
	boolean isBlack = true;// 默認開始是黑棋先
	boolean gameOver = false;// 遊戲是否結束
	int chessCount;// 目前棋盤旗子的個數
	int xIndex, yIndex;// 目前剛下的棋子的索引
	int user_index;
	boolean yourTurn = false;
	Socket echoSocket;
	BufferedReader input;
	PrintWriter output;
	Image img;
	Image shadows;
	Color colortemp;

	public ChessBoard(Socket _echoSocket, BufferedReader _input, PrintWriter _output,
			int _user_index) {
		echoSocket = _echoSocket;
		input = _input;
		output = _output;
		user_index = _user_index;
		output.println("10");
		if (user_index == 0) {
			yourTurn = true;
		}
		/*
		 * try { out = new ObjectOutputStream(echoSocket.getOutputStream()); in
		 * = new ObjectInputStream(echoSocket.getInputStream()); } catch
		 * (Exception ex) {
		 * 
		 * }
		 */
		setBackground(Color.orange);// 設置背景色為橘黃色
		img = Toolkit.getDefaultToolkit().getImage("board.jpg");
		shadows = Toolkit.getDefaultToolkit().getImage("shadows.jpg");
		addMouseListener(this);
		addMouseMotionListener(new MouseMotionListener() {
			public void mouseDragged(MouseEvent e) {

			}

			public void mouseMoved(MouseEvent e) {
				int x1 = (e.getX() - MARGIN + GRID_SPAN / 2) / GRID_SPAN;
				// 將滑鼠點擊的座標位置轉乘網格索引
				int y1 = (e.getY() - MARGIN + GRID_SPAN / 2) / GRID_SPAN;
				// 遊戲已經結束不能下
				// 落在棋盤外不能下
				// x,y位置已經有棋子存在，不能下
				if (x1 < 0 || x1 > ROWS || y1 < 0 || y1 > COLS || gameOver
						|| findChess(x1, y1))
					setCursor(new Cursor(Cursor.DEFAULT_CURSOR));
				// 設置成默認狀態
				else
					setCursor(new Cursor(Cursor.HAND_CURSOR));

			}
		});

		System.out.println("Chess Board created!");
	}

	// 繪製
	public void paintComponent(Graphics g) {

		super.paintComponent(g);// 畫棋盤

		int imgWidth = img.getWidth(this);
		int imgHeight = img.getHeight(this);// 獲得圖片的寬度與高度
		int FWidth = getWidth();
		int FHeight = getHeight();// 獲得窗口的寬度與高度
		int x = (FWidth - imgWidth) / 2;
		int y = (FHeight - imgHeight) / 2;
		g.drawImage(img, x, y, null);

		for (int i = 0; i <= ROWS; i++) {// 畫橫線
			g.drawLine(MARGIN, MARGIN + i * GRID_SPAN, MARGIN + COLS
					* GRID_SPAN, MARGIN + i * GRID_SPAN);
		}
		for (int i = 0; i <= COLS; i++) {// 畫直線
			g.drawLine(MARGIN + i * GRID_SPAN, MARGIN, MARGIN + i * GRID_SPAN,
					MARGIN + ROWS * GRID_SPAN);

		}

		// 畫棋子
		for (int i = 0; i < chessCount; i++) {
			// 網格交叉點x,y座標
			int xPos = chessList[i].getX() * GRID_SPAN + MARGIN;
			int yPos = chessList[i].getY() * GRID_SPAN + MARGIN;
			g.setColor(chessList[i].getColor());// 設置顏色
			// g.fillOval(xPos-Point.DIAMETER/2, yPos-Point.DIAMETER/2,
			// Point.DIAMETER, Point.DIAMETER);
			// g.drawImage(shadows, xPos-Point.DIAMETER/2,
			// yPos-Point.DIAMETER/2, Point.DIAMETER, Point.DIAMETER, null);
			colortemp = chessList[i].getColor();
			if (colortemp == Color.black) {
				RadialGradientPaint paint = new RadialGradientPaint(xPos
						- Point.DIAMETER / 2 + 25, yPos - Point.DIAMETER / 2
						+ 10, 20, new float[] { 0f, 1f }, new Color[] {
						Color.WHITE, Color.BLACK });
				((Graphics2D) g).setPaint(paint);
				((Graphics2D) g).setRenderingHint(
						RenderingHints.KEY_ANTIALIASING,
						RenderingHints.VALUE_ANTIALIAS_ON);
				((Graphics2D) g).setRenderingHint(
						RenderingHints.KEY_ALPHA_INTERPOLATION,
						RenderingHints.VALUE_ALPHA_INTERPOLATION_DEFAULT);

			} else if (colortemp == Color.white) {
				RadialGradientPaint paint = new RadialGradientPaint(xPos
						- Point.DIAMETER / 2 + 25, yPos - Point.DIAMETER / 2
						+ 10, 70, new float[] { 0f, 1f }, new Color[] {
						Color.WHITE, Color.BLACK });
				((Graphics2D) g).setPaint(paint);
				((Graphics2D) g).setRenderingHint(
						RenderingHints.KEY_ANTIALIASING,
						RenderingHints.VALUE_ANTIALIAS_ON);
				((Graphics2D) g).setRenderingHint(
						RenderingHints.KEY_ALPHA_INTERPOLATION,
						RenderingHints.VALUE_ALPHA_INTERPOLATION_DEFAULT);

			}

			Ellipse2D e = new Ellipse2D.Float(xPos - Point.DIAMETER / 2, yPos
					- Point.DIAMETER / 2, 34, 35);
			((Graphics2D) g).fill(e);
			// 標記最後一個棋子的紅矩形框

			if (i == chessCount - 1) {// 如果是最後一個棋子
				g.setColor(Color.red);
				g.drawRect(xPos - Point.DIAMETER / 2,
						yPos - Point.DIAMETER / 2, 34, 35);
			}
		}
	}

	public void mousePressed(MouseEvent e) {// 滑鼠在畫面上按下時啟動

		// 遊戲結束時，不能再下
		if (gameOver)
			return;

		if (!yourTurn)
			return;
		
		// 將滑鼠點擊的座標位置轉換成網格索引
		xIndex = (e.getX() - MARGIN + GRID_SPAN / 2) / GRID_SPAN;
		yIndex = (e.getY() - MARGIN + GRID_SPAN / 2) / GRID_SPAN;

		// 落在棋盤外不能下
		if (xIndex < 0 || xIndex > ROWS || yIndex < 0 || yIndex > COLS)
			return;

		// 如果x,y位置已經有棋子存在，不能下
		if (findChess(xIndex, yIndex))
			return;
		
		// 送出下棋資訊給server
		output.println("putChess " + xIndex + " " + yIndex);
		
		// 下棋
		putChess(xIndex, yIndex);
	}

	public void putChess(int _xIndex, int _yIndex) {
		xIndex = _xIndex;
		yIndex = _yIndex;
		String colorName = isBlack ? "黑棋" : "白棋";

		// 可以進行時的處理
		Point ch = new Point(xIndex, yIndex, isBlack ? Color.black
				: Color.white);
		chessList[chessCount++] = ch;

		// System.out.print(chessCount);//print chess number
		repaint();// 通知系統重新繪製

		// 如果勝出則給出提示訊息，不能繼續下棋
		if (isWin()) {
			String msg = String.format("恭喜，%s贏了！", colorName);
			JOptionPane.showMessageDialog(this, msg);
			restartGame();
			//gameOver = true;
		}
		isBlack = !isBlack;
		if (user_index == 0 || user_index == 1)
			yourTurn = !yourTurn;
	}

	// 覆蓋mouseListner的方法
	public void mouseClicked(MouseEvent e) {
		// 滑鼠按鍵在畫面上點擊時啟動
	}

	public void mouseEntered(MouseEvent e) {
		// 滑鼠進入到畫面上時啟動
	}

	public void mouseExited(MouseEvent e) {
		// 滑鼠離開畫面時啟動
	}

	public void mouseReleased(MouseEvent e) {
		// 滑鼠按鍵在畫面上放開時啟動
	}

	// 在棋子陣列中尋找是否有索引為x,y的棋子存在
	private boolean findChess(int x, int y) {
		for (Point c : chessList) {
			if (c != null && c.getX() == x && c.getY() == y)
				return true;
		}
		return false;
	}

	private boolean isWin() {
		int continueCount = 1;// 連續棋子的個數

		// 橫向向西尋找
		for (int x = xIndex - 1; x >= 0; x--) {
			Color c = isBlack ? Color.black : Color.white;
			if (getChess(x, yIndex, c) != null) {
				continueCount++;
			} else
				break;
		}
		// 橫向向東尋找
		for (int x = xIndex + 1; x <= COLS; x++) {
			Color c = isBlack ? Color.black : Color.white;
			if (getChess(x, yIndex, c) != null) {
				continueCount++;
			} else
				break;
		}
		if (continueCount >= 5) {
			return true;
		} else
			continueCount = 1;

		// 繼續另一個搜索縱向
		// 向上搜索
		for (int y = yIndex - 1; y >= 0; y--) {
			Color c = isBlack ? Color.black : Color.white;
			if (getChess(xIndex, y, c) != null) {
				continueCount++;
			} else
				break;
		}
		// 縱向向下尋找
		for (int y = yIndex + 1; y <= ROWS; y++) {
			Color c = isBlack ? Color.black : Color.white;
			if (getChess(xIndex, y, c) != null)
				continueCount++;
			else
				break;

		}
		if (continueCount >= 5)
			return true;
		else
			continueCount = 1;

		// 繼續另一種情況的搜索:斜向
		// 東北尋找
		for (int x = xIndex + 1, y = yIndex - 1; y >= 0 && x <= COLS; x++, y--) {
			Color c = isBlack ? Color.black : Color.white;
			if (getChess(x, y, c) != null) {
				continueCount++;
			} else
				break;
		}
		// 西南尋找
		for (int x = xIndex - 1, y = yIndex + 1; x >= 0 && y <= ROWS; x--, y++) {
			Color c = isBlack ? Color.black : Color.white;
			if (getChess(x, y, c) != null) {
				continueCount++;
			} else
				break;
		}
		if (continueCount >= 5)
			return true;
		else
			continueCount = 1;

		// 斜向 繼續另一種期況的搜索:斜向
		// 西北尋找
		for (int x = xIndex - 1, y = yIndex - 1; x >= 0 && y >= 0; x--, y--) {
			Color c = isBlack ? Color.black : Color.white;
			if (getChess(x, y, c) != null)
				continueCount++;
			else
				break;
		}
		// 東南尋找
		for (int x = xIndex + 1, y = yIndex + 1; x <= COLS && y <= ROWS; x++, y++) {
			Color c = isBlack ? Color.black : Color.white;
			if (getChess(x, y, c) != null)
				continueCount++;
			else
				break;
		}
		if (continueCount >= 5)
			return true;
		else
			continueCount = 1;

		return false;
	}// isWin end

	private Point getChess(int xIndex, int yIndex, Color color) {
		for (Point p : chessList) {
			if (p != null && p.getX() == xIndex && p.getY() == yIndex
					&& p.getColor() == color)
				return p;
		}
		return null;
	}

	public void restartGame() {
		// 清除棋子
		for (int i = 0; i < chessList.length; i++) {
			chessList[i] = null;
		}
		// 恢復遊戲相關的變數值
		isBlack = true;
		gameOver = false; // 遊戲是否結束
		chessCount = 0; // 當前棋盤棋子個數
		repaint();
	}

	// 悔棋
	public void goback() {
		if (chessCount == 0)
			return;
		chessList[chessCount - 1] = null;
		chessCount--;
		if (chessCount > 0) {
			xIndex = chessList[chessCount - 1].getX();
			yIndex = chessList[chessCount - 1].getY();
		}
		isBlack = !isBlack;
		repaint();
	}

	/*
	 * public void closeme(){
	 * 
	 * }
	 */
	// 矩形Dimension

	public Dimension getPreferredSize() {
		return new Dimension(MARGIN * 2 + GRID_SPAN * COLS, MARGIN * 2
				+ GRID_SPAN * ROWS);
	}
}