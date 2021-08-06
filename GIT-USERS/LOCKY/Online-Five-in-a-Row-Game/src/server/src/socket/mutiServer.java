package socket;

import java.net.*;
import java.sql.Time;
import java.util.*;
import java.io.*;

public class mutiServer{
	
	private static Socket clientSocket;
	private static ServerSocket serverSocket;
	private static List<String> userList; //store ip only
	private static HashMap<Integer, gameRoom> roomList; //<rid, gameRoom>
	private static HashMap<String, user> uidToUserObjList; //<uid, userObj>
	private static HashMap<String, String> ipToUid; //<ip, uid>
	private static int ranFirstNum = 0;
	private static int roomIdCount = 5;
	
	//for testing 
	private static int testUserCnt = -1;
	private static gameRoom g;
	
	public static void main(String[] args) throws IOException {
		
		//---initialize a Userlist to store ip/availabe pairs.---		
		userList = new ArrayList<String>();
	    roomList = new HashMap<Integer, gameRoom>();
	    uidToUserObjList = new HashMap<String, user>();
	    ipToUid = new HashMap<String, String>();
	    
	    //---setting server socket---
		try {
			serverSocket = new ServerSocket();
			serverSocket.setReuseAddress(true);
			serverSocket.bind(new InetSocketAddress(12377));
			
			System.out.println("Server> server socket has been created ~" + System.currentTimeMillis());			
		} catch (IOException e) {
			System.err.println("Server> Could not listen on port: 12377.");
			System.exit(1);
		}
		//---setting server socket---
		
		//---waiting for the connection of clients.
		do{
			try{
				clientSocket = serverSocket.accept();
				String ownclientIP = clientSocket.getInetAddress().getHostAddress();
				System.out.println("Server> Good! A user has connected with ip "+ ownclientIP);
 				
				Thread thread = new Thread(new Runnable(){
					public void run(){
						handleClient(clientSocket);
					}
				});
				
//				Thread statusThread = new Thread(new Runnable(){
//					public void run(){
//						statusUpdater();
//					}
//				});
				
				thread.start();
//				statusThread.start();
				System.out.println("Server> Thread end.");
				
			}catch(IOException ioEx){
				ioEx.printStackTrace();
			}
		}while(true);
		
	}

	public static void handleClient(Socket client) {
		
		String clientIP = client.getInetAddress().getHostAddress();
		System.out.println("Server> New Communication Thread Started with IP " + clientIP);

		try{
			BufferedReader input = new BufferedReader(new InputStreamReader(client.getInputStream(), "UTF-8"));
			//Scanner input = new Scanner(client.getInputStream());
			PrintWriter output = new PrintWriter(client.getOutputStream(), true);

			
//			---convert the userList into String in order to show online list at client side---
//			String listString = "";
//			for (String s : userList){
//			    listString += s + ",";
//			}
//			output.println(listString);
//			---convert the userList into String in order to show online list at client side---
			
			do{
				String message = input.readLine();
				System.out.println("Client> " + message);
				
				// split the mess(command) from client into a token array; 
				String[] tokens = message.split(" ");
				
//				---for one vs one testing---
//				if(testUserCnt==-1){
//					System.out.println("A new Room has been opened!");
//					g = new gameRoom(1);
//					roomList.put(1, g);
//					testUserCnt++;
//				}
//				---for one vs one testing---
			
				if(tokens[0].equals("newUser")){
					
					if(!userList.contains(clientIP)){	
	 					String userId = tokens[1];
	 					//---create a user object with parameter user id---
	 					System.out.println("Server> Hello, "+ userId);
	 					
	 					user u = new user(userId, client, clientIP);
	
	 					userList.add(clientIP);
	 					uidToUserObjList.put(userId, u);
	 					ipToUid.put(clientIP, userId);
	 					
	 					System.out.println("Server> UserList: " + userList);
	 				}
					statusUpdater();
				}
				else if(tokens[0].equals("newChess")){
//					****for testing two users.****
					String sendline = "newChess "+(testUserCnt);
					System.out.println("Server> Send to client : " + sendline);
					output.println(sendline);
					
					if(testUserCnt==0){
						System.out.println("Server> User 1 is in with " + clientIP);
						g.setUsers_0(client, clientIP);
						uidToUserObjList.get(ipToUid.get(clientIP)).setInWhatRoom(1);
					}
					else if(testUserCnt==1){
						System.out.println("Server> User 2 is in with " + clientIP);
						g.setUsers_1(client, clientIP);
						uidToUserObjList.get(ipToUid.get(clientIP)).setInWhatRoom(1);
					}else if(testUserCnt==2){
						//more than three users.
					}					
					testUserCnt++;
					
				}else if(tokens[0].equals("selectUser")){
//					token[1] is opponents's uid.
					String sendline;
//					if oppo is null
					if(tokens[1].equals("null")){
						continue;
					}
					
//                  ---to decide the first user---
					ranFirstNum = (int)(Math.random()*2);
//					
//					---get opponent user---
					user oppUser = uidToUserObjList.get(tokens[1]);
					
					System.out.println("Server> "+tokens[1] +": "+oppUser.getInWhatRoom()+", "+ipToUid.get(clientIP)+": "+uidToUserObjList.get(ipToUid.get(clientIP)).getInWhatRoom());
					
					
					
					System.out.println("-a-");
					if(uidToUserObjList.get(ipToUid.get(clientIP)).getInWhatRoom()!=0){
						System.out.println("Continued..");
						continue;
					}else if(oppUser.getInWhatRoom()!=0){
//				 	---for multicast---
						System.out.println("muticast!");
						roomList.get(oppUser.getInWhatRoom()).setObservers(clientIP, client);
						uidToUserObjList.get(ipToUid.get(clientIP)).setIsObser(1);
						uidToUserObjList.get(ipToUid.get(clientIP)).setInWhatRoom(oppUser.getInWhatRoom());
						
						output = new PrintWriter(client.getOutputStream(), true);
						sendline = "newChess 2 " + oppUser.getInWhatRoom();
						System.out.println("Server> Send to client : " + sendline);
						output.println(sendline);
						continue;
					}
					System.out.println("-b-");
					
					
//					---set room information---
					gameRoom gr = new gameRoom(roomIdCount);
					roomList.put(roomIdCount, gr);
					
					System.out.println("Server> A new Room has been opened and your opponent is "+ tokens[1]);

					//---setting user 0---
					gr.setUsers_0(oppUser.getUserSocket(), oppUser.getIP());
					oppUser.setInWhatRoom(roomIdCount);
					
					output = new PrintWriter(oppUser.getUserSocket().getOutputStream(), true);
					sendline = "newChess "+(ranFirstNum) + " " + gr.getRid();
					System.out.println("Server> Send to client : " + sendline);
					output.println(sendline);
//					userList.remove(oppUser.getIP());
					//---setting user 0---
					
					if(ranFirstNum==1){
						ranFirstNum = 0;
					}else{
						ranFirstNum = 1;
					}
					
					//---setting user 1---
					gr.setUsers_1(client, clientIP);
					uidToUserObjList.get(ipToUid.get(clientIP)).setInWhatRoom(roomIdCount);
					
					output = new PrintWriter(client.getOutputStream(), true);
					sendline = "newChess "+(ranFirstNum) + " " + gr.getRid();
					System.out.println("Server> Send to client : " + sendline);
					output.println(sendline);
//					userList.remove(clientIP);
					//---setting user 1---
					
					//---adding room ID---
					roomIdCount++;
					statusUpdater();
					
				}else if(tokens[0].equals("putChess")){
					//---put chess and send the information of position of chess to opponent---
					
					user u = uidToUserObjList.get(ipToUid.get(clientIP));
					gameRoom gr= roomList.get(u.getInWhatRoom());
					
					if(gr.getOppo(clientIP)==1){
						System.out.println("Server> " + clientIP+" sends x y data to user 1");
						output = new PrintWriter(gr.getUsers_1().getOutputStream(), true);
						output.println(message + " " + gr.getRid());
					}else{
						System.out.println("Server> " + clientIP+" sends x y data to user 0");
						output = new PrintWriter(gr.getUsers_0().getOutputStream(), true);
						output.println(message + " " + gr.getRid());
					}

					//multicast					
					if(gr.getObserverCnt()!=0){
						for (Socket socket : gr.getObservers().values()) {
							output = new PrintWriter(socket.getOutputStream(), true);
							output.println(message + " " + gr.getRid());
						}
					}
					
				}else if(tokens[0].equals("sendMess")){
					
					user u = uidToUserObjList.get(ipToUid.get(clientIP));
					gameRoom gr= roomList.get(u.getInWhatRoom());
					
//					---for multicast---
					if(gr.getObserverCnt()!=0){
						for (Socket socket : gr.getObservers().values()) {
							output = new PrintWriter(socket.getOutputStream(), true);
							output.println("revMess "+ ipToUid.get(clientIP) + " " + gr.getRid() + " " + message.substring(9));
						}
						
						output = new PrintWriter(gr.getUsers_1().getOutputStream(), true);
						output.println("revMess "+ ipToUid.get(clientIP) + " " + gr.getRid() + " " + message.substring(9));
						System.out.println("Server> " + clientIP+" sends mess to user 0");
						output = new PrintWriter(gr.getUsers_0().getOutputStream(), true);
						output.println("revMess "+ ipToUid.get(clientIP) + " " + gr.getRid() + " " + message.substring(9));
						continue;
					}
//					---for multicast---
					
					if(gr.getOppo(clientIP)==1){
						System.out.println("Server> " + clientIP+" sends mess to user 1");
						output = new PrintWriter(gr.getUsers_1().getOutputStream(), true);
						output.println("revMess "+ ipToUid.get(clientIP) + " " + gr.getRid() + " " + message.substring(9));
						System.out.println("Server> " + clientIP+" sends mess to user 0");
						output = new PrintWriter(gr.getUsers_0().getOutputStream(), true);
						output.println("revMess "+ ipToUid.get(clientIP) + " " + gr.getRid() + " " + message.substring(9));
					}else{
						System.out.println("Server> " + clientIP+" sends mess to user 0");
						output = new PrintWriter(gr.getUsers_0().getOutputStream(), true);
						output.println("revMess "+ ipToUid.get(clientIP) + " " + gr.getRid() + " " + message.substring(9));
						System.out.println("Server> " + clientIP+" sends mess to user 1");
						output = new PrintWriter(gr.getUsers_1().getOutputStream(), true);
						output.println("revMess "+ ipToUid.get(clientIP) + " " + gr.getRid() + " " + message.substring(9));
					}
					
				}else if(tokens[0].equals("overGame")){
//					unused block
//					statusUpdater();
				}else if(tokens[0].equals("***CLOSE***")){
					
//					roomList.remove((roomList.get((uidToUserObjList.get(ipToUid.get(clientIP)).getInWhatRoom())).getRid()));
					uidToUserObjList.remove(ipToUid.get(clientIP));
					ipToUid.remove(clientIP);
					userList.remove(clientIP);
					statusUpdater();
					output.println("***CLOSE***");
					break;
					
				}else if(tokens[0].equals("leftGame")){
					
//					if a user unexpectedly left a game room, close both game room at the same time. 
					System.out.println("User "+ipToUid.get(clientIP)+" left a game!");
//					in Room id = 0 means the user is available to be invited.
					
					gameRoom gr = roomList.get((uidToUserObjList.get(ipToUid.get(clientIP)).getInWhatRoom()));
					
//					remove observer
					if(uidToUserObjList.get(ipToUid.get(clientIP)).getIsObser()==1){
						uidToUserObjList.get(ipToUid.get(clientIP)).setIsObser(0);
						uidToUserObjList.get(ipToUid.get(clientIP)).setInWhatRoom(0);
						gr.removeObservers(clientIP);
						try {
							output = new PrintWriter(uidToUserObjList.get(ipToUid.get(clientIP)).getUserSocket().getOutputStream(), true);
							output.println("leftGame " + gr.getRid());
						}catch(IOException e){
							e.printStackTrace();
						}
						continue;
					}
			
					if(gr.getOppo(clientIP)==1){
						System.out.println("Server> " + clientIP+" sends close mess to user 1");
						uidToUserObjList.get((ipToUid.get(gr.getIP_1()))).setInWhatRoom(0);
						try {
							output = new PrintWriter(gr.getUsers_1().getOutputStream(), true);
							output.println("leftGame " + gr.getRid());
						}catch(IOException e){
							e.printStackTrace();
						}
						try {
							output = new PrintWriter(gr.getUsers_0().getOutputStream(), true);
							output.println("leftGame " + gr.getRid());
						}catch(IOException e){
							e.printStackTrace();
						}
					}else{
						System.out.println("Server> " + clientIP+" sends close to user 0");
						uidToUserObjList.get((ipToUid.get(gr.getIP_0()))).setInWhatRoom(0);
						try {
							output = new PrintWriter(gr.getUsers_0().getOutputStream(), true);
							output.println("leftGame " + gr.getRid());
						}catch(IOException e){
							e.printStackTrace();
						}
						try {
							output = new PrintWriter(gr.getUsers_1().getOutputStream(), true);
							output.println("leftGame " + gr.getRid());
						}catch(IOException e){
							e.printStackTrace();
						}
					}
//					close all observers.
					if(gr.getObserverCnt()!=0){
						for (Socket socket : gr.getObservers().values()) {
							output = new PrintWriter(socket.getOutputStream(), true);
							output.println("leftGame " + gr.getRid());
						}	
						
						for (String IP : gr.getObservers().keySet()) {
							uidToUserObjList.get(ipToUid.get(IP)).setIsObser(0);
							uidToUserObjList.get(ipToUid.get(IP)).setInWhatRoom(0);
							gr.removeObservers(clientIP);
						}	
						
					}
					
					uidToUserObjList.get((ipToUid.get(clientIP))).setInWhatRoom(0);
					roomList.remove(gr.getRid());
					statusUpdater();
				}
					
			}while(true);
			
			
		}catch(IOException ioEx){
			ioEx.printStackTrace();
		}finally{
			try{
				System.out.println("Server> ****Closing Connection****");
				
				if(!userList.isEmpty())	
					System.out.println("Server> Online users: "+userList);
				
				client.close();

				//				!!!!!!!!!!!!!!!!!init testing User Counts!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				testUserCnt = -1;
			}catch(IOException ioEx){
				System.out.println("Server> Unable to disconnect!");
				System.exit(1);
			}
		}
	}
	
	public static void statusUpdater() {
		Socket u;
		PrintWriter output = null;

		String listString = "";	
		int status = 0;
		for (String s : userList) {
			
			if(uidToUserObjList.get(ipToUid.get(s)).getIsObser()==1){
				status = 2;
			}else if(uidToUserObjList.get(ipToUid.get(s)).getInWhatRoom()!=0){
				status = 1;
			}else{
				status = 0;
			}
			System.out.println(s+": "+ uidToUserObjList.get(ipToUid.get(s)).getInWhatRoom());
			listString += ipToUid.get(s) + " " + status+ ",";
			// listString += s + ",";
		}

		for (String s : userList) {
			u = uidToUserObjList.get(ipToUid.get(s)).getUserSocket();
			try {
				output = new PrintWriter(u.getOutputStream(), true);
				output.println("showList " + listString);
			} catch (IOException e) {
				e.printStackTrace();
			}

		}

		System.out.println("Server> Status update to all clients: " + listString);
		// try {
		// Thread.sleep(500);
		// } catch(InterruptedException ex) {
		// Thread.currentThread().interrupt();
		// }

	}
}


	