
import java.awt.event.*;
import java.awt.*;
import java.io.BufferedReader;
import java.io.File;
import java.io.PrintWriter;
import java.net.Socket;

import javax.swing.*;

/*
 五子棋主框架類，程序啟動類
 */
public class StartChessJFrame extends JFrame {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int roomID;
	private ChessBoard chessBoard;
	private JPanel toolbar,chatpanel;
	private JButton startButton, backButton, exitButton;

	private JMenuBar menuBar;
	private JMenu sysMenu;
	private JMenuItem startMenuItem, backMenuItem, exitMenuItem;
	Socket echoSocket;
	BufferedReader input;
	PrintWriter output;
	JTextPane text1;
	JTextField text;
	File file;
	File handsome,hurry,icon1,icon2,zzz,letsplay,soccer,bedboy,clap,goal,messi,suprise;
	Icon img,img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12;
	String ID;
	// 重新開始，退出，和悔棋菜單項
	public StartChessJFrame(Socket _echoSocket, BufferedReader _input,
			PrintWriter _output, int index,String userID, int _roomID) {
		ID = userID;
		setTitle("五子棋");// 設置標題
		echoSocket = _echoSocket;
		input = _input;
		output = _output;
		roomID = _roomID;
		file = new File("pic/icon.jpg");
		handsome = new File("pic/handsome.jpg");
		hurry = new File("pic/hurry.jpg");
		icon1 = new File("pic/icon1.jpg");
		icon2 = new File("pic/icon2.jpg");
		zzz = new File("pic/zzz.jpg");
		letsplay = new File("pic/letsplay.gif");
		bedboy = new File("pic/bedboy.jpg");
		clap = new File("pic/clap.jpg");
		soccer = new File("pic/soccer.jpg");
		goal = new File("pic/goal.gif");
		messi = new File("pic/messi.gif");
		suprise = new File("pic/suprise.gif");
		
	    img12 = new ImageIcon(suprise.getAbsoluteFile().toString());
	    img = new ImageIcon(file.getAbsoluteFile().toString());
	    img1 = new ImageIcon(handsome.getAbsoluteFile().toString());
	    img2 = new ImageIcon(hurry.getAbsoluteFile().toString());
	    img3 = new ImageIcon(icon1.getAbsoluteFile().toString());
	    img4 = new ImageIcon(icon2.getAbsoluteFile().toString());
	    img5 = new ImageIcon(zzz.getAbsoluteFile().toString());
	    img6 = new ImageIcon(letsplay.getAbsoluteFile().toString());
	    img7 = new ImageIcon(bedboy.getAbsoluteFile().toString());
	    img8 = new ImageIcon(clap.getAbsoluteFile().toString());
	    img9 = new ImageIcon(soccer.getAbsoluteFile().toString());
	    img10 = new ImageIcon(goal.getAbsoluteFile().toString());
	    img11 = new ImageIcon(messi.getAbsoluteFile().toString());
		output.println("789");
		chessBoard = new ChessBoard(echoSocket, input, output, index);

		Container contentPane = getContentPane();
		contentPane.add(chessBoard);
		chessBoard.setOpaque(true);
		Box box = Box.createHorizontalBox();
		// chatroom
		chatpanel = new JPanel();
		chatpanel.setLayout(new GridLayout(2,1));
		text = new JTextField(40);
		//handler
		TextFieldHandler handler=new TextFieldHandler();
		text.addActionListener(handler);
		text1 = new JTextPane();
		text1.setEditable(false);
		box.add(new JScrollPane(text1));
		chatpanel.add(box);
		chatpanel.add(text);
		add(chatpanel, BorderLayout.WEST);
		
		/* 菜單 */
		// 建立和新增菜單
		menuBar = new JMenuBar();// 初始化菜單
		sysMenu = new JMenu("聊天室");// 初始化菜單
		// 初始化菜單項
		startMenuItem = new JMenuItem("字型");
		backMenuItem = new JMenuItem("字體");
		exitMenuItem =new JMenuItem("離開遊戲");
		// 將三個菜單項添加到菜單上
		sysMenu.add(startMenuItem);
		sysMenu.add(backMenuItem);
		sysMenu.add(exitMenuItem);
		// 初始化按鈕事件監聽器內部類
		MyItemListener lis = new MyItemListener();
		// 將三個菜單註冊到事件監聽器上
		this.startMenuItem.addActionListener(lis);
		backMenuItem.addActionListener(lis);
		exitMenuItem.addActionListener(lis);
		menuBar.add(sysMenu);// 將系統菜單添加到菜單欄上
		setJMenuBar(menuBar);// 將menuBar設為菜單欄
		
		/* 按鈕 */
		toolbar = new JPanel();// 工具面板實例化
		// 三個按鈕初始化
		startButton = new JButton("重新開始");
		backButton = new JButton("悔棋");
		exitButton=new JButton("離開遊戲");
		// 將工具面板按鈕用FlowLayout布局
		toolbar.setLayout(new FlowLayout(FlowLayout.LEFT));
		// 將三個按鈕添加到工具面板
		toolbar.add(startButton);
		toolbar.add(backButton);
		toolbar.add(exitButton);
		// 將三個按鈕註冊監聽事件
		startButton.addActionListener(lis);
		exitButton.addActionListener(lis);
		backButton.addActionListener(lis);
		// 將工具面板布局到介面"南方"也就是下方
		add(toolbar, BorderLayout.SOUTH);
		add(chessBoard);// 將面板對象添加到窗體上
		// 設置介面關閉事件
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		// setSize(800,800);
		pack();// 自適應大小

	}
	private class TextFieldHandler implements ActionListener{

		@Override
		public void actionPerformed(ActionEvent event) {
			if( event.getSource() == text){
				String sendline = "sendMess " + event.getActionCommand();
				output.println(sendline);
				System.out.println(sendline);
				//ShowMesg("\n"+"ken: " + event.getActionCommand());
				/*text1.setEditable(true);
				text1.replaceSelection("\n"+"ken: "+event.getActionCommand());
				text1.setEditable(false);*/
				text.setText("");
			}
		}
		
	}
	
	public void showImg(Icon simg){
		text1.insertIcon(simg);
	}
	
	public void showMesg(String ip, String mesg){
		text1.setEditable(true);
		if(mesg.equals("<3")){
			showImg(img);
			text1.replaceSelection("\n" + ip + " : ");
		}else if(mesg.equals("soccer")){
			showImg(img9);
			text1.replaceSelection("\n" + ip + " : ");
		}else if(mesg.equals("handsome")){
			showImg(img1);
			text1.replaceSelection("\n" + ip + " : ");
		}else if(mesg.equals("clap")){
			showImg(img8);
			text1.replaceSelection("\n" + ip + " : ");
		}else if(mesg.equals("fuck")){
			showImg(img7);
			text1.replaceSelection("\n" + ip + " : ");
		}else if(mesg.equals("hurry")){
			showImg(img2);
			text1.replaceSelection("\n" + ip + " : ");
		}else if(mesg.equals("smile")){//i1
			showImg(img3);
			text1.replaceSelection("\n" + ip + " : ");
		}else if(mesg.equals("cry")){//i2
			showImg(img4);
			text1.replaceSelection("\n" + ip + " : ");
		}else if(mesg.equals("letsplay")){
			showImg(img6);
			text1.replaceSelection("\n" + ip + " : ");
		}else if(mesg.equals("zzz")){
			showImg(img5);
			text1.replaceSelection("\n" + ip + " : ");
		}else if(mesg.equals("goal")){
			showImg(img10);
			text1.replaceSelection("\n" + ip + " : ");
		}else if(mesg.equals("messi")){
			showImg(img11);
			text1.replaceSelection("\n" + ip + " : ");
		}else if(mesg.equals("suprise")){
			showImg(img12);
			text1.replaceSelection("\n" + ip + " : ");
		}
		else{
			text1.replaceSelection("\n" + ip + " : " + mesg);
		}
		text1.setEditable(false);
	}
	private class MyItemListener implements ActionListener {
		public void actionPerformed(ActionEvent e) {
			Object obj = e.getSource();// 獲得事件源
			if (obj == StartChessJFrame.this.startMenuItem
					|| obj == startButton) {
				// 重新開始
				// JFiveFrame.this內部類引用外部類
				System.out.println("重新開始");
				//chessBoard.restartGame();
				JOptionPane.showMessageDialog(null, "五子棋就像人生，不能夠重來", "ERROR",
						JOptionPane.ERROR_MESSAGE);
			}
			/*
			 * else if (obj==exitMenuItem||obj==exitButton){ System.exit(0); }
			 */
			else if (obj == backMenuItem || obj == backButton) {
				System.out.println("悔棋...");
				//chessBoard.goback();
				JOptionPane.showMessageDialog(null, "起手無回大丈夫", "ERROR",
						JOptionPane.ERROR_MESSAGE);
			}else if(obj == exitMenuItem || obj == exitButton){
				System.out.println("離開遊戲");
				output.println("leftGame " + roomID);
			}
		}
	}

	public ChessBoard getChessBoard() {

		return chessBoard;
	}

	/*
	 * public static void main(String[] args){ StartChessJFrame f=new
	 * StartChessJFrame();//建立主框架 f.setVisible(true);//顯示主框架
	 * 
	 * }
	 */
}