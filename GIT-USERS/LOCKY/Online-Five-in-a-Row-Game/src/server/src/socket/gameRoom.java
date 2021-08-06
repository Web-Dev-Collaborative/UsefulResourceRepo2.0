package socket;

import java.net.*;
import java.util.*;


public class gameRoom {
	protected Integer rid;
	protected Socket[] users;
	protected String[] IP;
	protected HashMap<String, Socket> observers;
	protected int observerCnt = 0;
	
	public gameRoom(int rid) {
		super();
		this.rid = rid;
		this.users = new Socket[20000];
		this.IP = new String[20000];
		this.observers = new HashMap<String, Socket>();
	}

	public int getRid() {
		return rid;
	}

	public void setRid(int rid) {
		this.rid = rid;
	}

	public Socket getUsers_0() {
		return this.users[0];
	}
	
	public Socket getUsers_1() {
		return this.users[1];
	}

	public void setUsers_0(Socket Socket_B, String IP_B) {
		this.users[0] = Socket_B;
		this.IP[0] = IP_B;
	}
	
	public void setUsers_1(Socket Socket_W, String IP_W) {
		this.users[1] = Socket_W;
		this.IP[1] = IP_W;
	}
	
	public int getOppo(String IP){
		if(this.IP[0].equals(IP)){
			return 1;
		}else{
			return 0;
		}
	}

	public String getIP_0() {
		return this.IP[0];
	}

	public String getIP_1() {
		return this.IP[1];
	}

	public HashMap<String, Socket> getObservers() {
		return observers;
	}

	public void setObservers(String IP, Socket observers) {
		this.observers.put(IP, observers);
		this.observerCnt++;
	}
	
	public void removeObservers(String IP) {
		this.observers.remove(IP);
		this.observerCnt--;
	}

	public int getObserverCnt() {
		return observerCnt;
	}

	
	
	
}
