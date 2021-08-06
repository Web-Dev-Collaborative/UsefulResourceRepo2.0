import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.HashMap;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JList;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextPane;
import javax.swing.ListSelectionModel;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

import java.io.*;

public class Menu extends JFrame {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public ChessBoard chessBoard;
	private JPanel toolbar;
	private JButton startButton, backButton, exitButton;
	private static HashMap<Integer, StartChessJFrame> frameList = new HashMap<Integer, StartChessJFrame>();
	private JMenuBar menuBar;
	private JMenu sysMenu;
	private JMenuItem startMenuItem, exitMenuItem, backMenuItem;
	private static JList userList;
	private static String[] users_id = new String[100];
	private static int num_user;
	private static int num_game = 0;
	static Socket echoSocket = null;
	static BufferedReader input;
	static PrintWriter output;
	static JTextPane IDpane;
	static String userID;

	// 重新開始，退出，和悔棋菜單項
	@SuppressWarnings("unchecked")
	public Menu(String userID) {
		setTitle("五子棋");// 設置標題
		IDpane = new JTextPane();
		IDpane.setText("Hello, " + userID);
		IDpane.setEditable(false);
		add(IDpane, BorderLayout.NORTH);
		
		/* 菜單 */
		// 建立和新增菜單
		menuBar = new JMenuBar();// 初始化菜單欄
		sysMenu = new JMenu("系统");// 初始化菜單
		// 初始化菜單項
		startMenuItem = new JMenuItem("開始遊戲");
		backMenuItem = new JMenuItem("離開遊戲");
		exitMenuItem = new JMenuItem("退出系統");
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
		startButton = new JButton("開始遊戲");
		backButton = new JButton("離開遊戲");
		exitButton = new JButton("退出系統");
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

		backButton.setEnabled(false);
		backMenuItem.setEnabled(false);

		// 將工具面板布局到介面"南方"也就是下方
		add(toolbar, BorderLayout.SOUTH);

		userList = new JList(users_id);
		userList.setVisibleRowCount(10);
		userList.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
		add(new JScrollPane(userList));
		/*
		 * userList.addListSelectionListener( new ListSelectionListener(){
		 * public void valueChanged(ListSelectionEvent event){
		 * if(userList.getSelectedValue()==null){ }else{
		 * System.out.println("You select " + userList.getSelectedValue());
		 * output.println("selectUser " + userList.getSelectedValue()); } } } );
		 */

		// add(chessBoard);//將面板對象添加到窗體上
		// 設置介面關閉事件
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setSize(300, 500);
		// pack();// 自適應大小

	}

	private class MyItemListener implements ActionListener {
		public void actionPerformed(ActionEvent e) {
			Object obj = e.getSource();// 獲得事件源
			if (obj == Menu.this.startMenuItem || obj == startButton) {
				// 開始遊戲
				// JFiveFrame.this內部類引用外部類

				/*
				 * System.out.println("準備開始遊戲"); output.println("newChess");
				 */
				if (userList.getSelectedValue() == null) {
					System.out.println("你沒有選擇玩家");
				} else {
					System.out.println("You select "
							+ userList.getSelectedValue());
					
					String[] tokens = userList.getSelectedValue().toString().split(" ");
					String sendline = "selectUser " + tokens[0];
					System.out.println("Client> " + sendline);
					output.println(sendline);
					
				}

				// chessBoard.restartGame();
			} else if (obj == exitMenuItem || obj == exitButton) {
				// 離開系統
				System.out.println("exitButton");
				JOptionPane.showMessageDialog(null, "你要離開我了嗎...QQ", "ERROR",
						JOptionPane.PLAIN_MESSAGE);
				output.println("***CLOSE***");
				System.out.println("\n* Send CLOSE to server*");
				System.exit(0);
			} else if (obj == backMenuItem || obj == backButton) {
				// 離開遊戲
				System.out.println("backButton");
				if (isInGame()) {
					output.println("leftGame");
				} else {
					JOptionPane.showMessageDialog(null, "你還未加入任何遊戲!", "ERROR",
							JOptionPane.ERROR_MESSAGE);
					System.out.println("你還未加入任何遊戲");
				}
			}
		}
	}

	private void setBackItems(boolean flag) {
		backButton.setEnabled(flag);
		backMenuItem.setEnabled(flag);
	}

	public static void setUserList(String str) {
		num_user = 0;
		users_id = new String[100];
		String[] tokens = str.split(",");
		for (String token : tokens) {
			// "[userID] [roomID]" =>	"[userID]"  (tokens2[0]) 
			//							"[roomID]"	(tokens2[1])
			String[] tokens2 = token.split(" ");
			if (tokens2[0].equals(userID))
				continue;
			
			int userStatus = Integer.parseInt(tokens2[1]);
			if(userStatus == 0)
				users_id[num_user] = tokens2[0] + " [Free]";
			else if(userStatus == 1)
				users_id[num_user] = tokens2[0] + " [Gaming]";
			else if(userStatus == 2)
				users_id[num_user] = tokens2[0] + " [Watching]";
			else
				System.out.println("Unknown status : " + tokens2[0] + userStatus);
			
			num_user++;
		}
		userList.setListData(users_id);
	}

	private static boolean isInGame() {
		if (num_game > 0)
			return true;
		else
			return false;
	}

	public static void main(String[] args) {
		String server_ip = JOptionPane.showInputDialog("請輸入Server IP");
		if(server_ip == null)
			return;
		userID = JOptionPane.showInputDialog("請輸入ID");
		if (userID == null)
			return;
		Menu m = new Menu(userID);
		m.setVisible(true);
		ChessBoard b = null;

		// 跟server建連線
		try {
			echoSocket = new Socket(server_ip, 12377);
			input = new BufferedReader(new InputStreamReader(
					echoSocket.getInputStream(), "UTF-8"));
			output = new PrintWriter(echoSocket.getOutputStream(), true);

			System.out.println("Success Connect!");
			output.println("newUser " + userID);
			output.println("client waits for messages");
			
			new AePlayWave("music/Dream - Get Over.wav").start();

			// 接受來自Server的訊息
			do {
				System.out.println("Wait message...");
				String message = input.readLine();
				System.out.println("SERVER> " + message);

				if (message == null)
					continue;

				String[] tokens = message.split(" ");

				System.out.print("tokens(" + tokens.length + ") = ");
				for (String token : tokens) {
					System.out.print(token + " ");
				}
				System.out.println("");

				if (tokens[0].equals("***CLOSE***")) {
					// 關閉
					System.out.println("* Server send CLOSE message *");
					break;
				} else if (tokens[0].equals("newChess")) {
					// 啟動新棋盤
					// newChess [user_index] [roomID]
					System.out.println("Start new chess!");

					int index = Integer.parseInt(tokens[1]);

					StartChessJFrame f = new StartChessJFrame(echoSocket, input, output, index, userID,
													Integer.parseInt(tokens[2]));// 建立主框架
					f.setVisible(true);// 顯示主框架

					b = f.getChessBoard();
					if (b == null) {
						// System.out.println("Can't get chess board");
					} else {
						// System.out.println("Get chess board");
						num_game++;
						m.setBackItems(true);

						// 將frame存到hash map
						frameList.put(Integer.parseInt(tokens[2]), f);
					}
				} else if (tokens[0].equals("putChess")) {
					// 下棋
					// putChess [x] [y] [roomID]
					StartChessJFrame f = frameList.get(Integer
							.parseInt(tokens[3]));
					if (f != null) {
						f.getChessBoard().putChess(Integer.parseInt(tokens[1]),
								Integer.parseInt(tokens[2]));
					} else {
						System.out.println("Can't put chess, no chessFrame");
					}
				} else if (tokens[0].equals("revMess")) {
					// Receive room message
					// revMess [userID] [roomID] [Message]
					StartChessJFrame f = frameList.get(Integer
							.parseInt(tokens[2]));
					if (f != null) {
						f.showMesg(
								tokens[1],
								message.substring(7 + 1 + tokens[1].length()
										+ 1 + tokens[2].length() + 1));
					}
				} else if (tokens[0].equals("showList")) {
					// showList [userID] [RoomID],[userID] [RoomID]...
					setUserList(message.substring(9));
				} else if (tokens[0].equals("leftGame")) {
					// leftGame [roomID]
					StartChessJFrame f = frameList.get(Integer
							.parseInt(tokens[1]));
					if (f != null) {
						f.setVisible(false);
						num_game--;
						if (num_game > 0) {
							m.setBackItems(true);
						} else {
							m.setBackItems(false);
						}
					}

				} else {
					// Other commands
				}

			} while (true);

		} catch (UnknownHostException e) {
			System.err.println("Don't know about host: taranis.");
			System.exit(1);
		} catch (IOException e) {
			System.err.println("Couldn't get I/O for "
					+ "the connection to: taranis.");
			System.exit(1);
		} catch (Exception e) {
			System.err.println("Exception in main");
			e.printStackTrace();
		} finally {
			try {
				System.out.println("--* Closing connection... *");
				echoSocket.close();
				System.exit(0);
			} catch (IOException ioEx) {
				System.out.println("Unable to disconnect!");
				System.exit(1);
			}

		}

	}// end main
}
