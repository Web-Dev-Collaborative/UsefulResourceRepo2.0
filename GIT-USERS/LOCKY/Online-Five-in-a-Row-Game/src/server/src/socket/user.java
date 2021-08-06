package socket;

import java.net.*;

public class user {
	
	String uid;
	Socket userSocket;
	String IP;
	int inWhatRoom = 0; // to identify whether a user is available for playing a game. 0 is not available.
	int isObser = 0;
	
	public user(String uid, Socket userScket, String IP) {
		// TODO Auto-generated constructor stub
		this.uid = uid;
		this.userSocket = userScket;
		this.IP = IP;
		
	}

	public int getInWhatRoom() {
		return inWhatRoom;
	}

	public void setInWhatRoom(int inWhatRoom) {
		this.inWhatRoom = inWhatRoom;
	}

	public Socket getUserSocket() {
		return userSocket;
	}

	public void setUserSocket(Socket userSocket) {
		this.userSocket = userSocket;
	}

	public String getIP() {
		return IP;
	}

	public void setIP(String iP) {
		IP = iP;
	}

	public int getIsObser() {
		return isObser;
	}

	public void setIsObser(int isObser) {
		this.isObser = isObser;
	}
	
	
	
	
}
