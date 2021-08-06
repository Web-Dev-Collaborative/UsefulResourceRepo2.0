#include <stdio.h>
#include <string.h>//strlen
#include <sys/socket.h>
#include <arpa/inet.h>//inet_addr
#include <unistd.h>//write

int main (int argc , char **argv) {
	int sock;
	struct sockaddr_in server;
	char server_reply[3000];

	//Create socket
	sock = socket(AF_INET, SOCK_STREAM, 0);
	if (sock==-1) {
		printf("Could not create socket");
	}

	server.sin_addr.s_addr = inet_addr("127.0.0.1");
	server.sin_family = AF_INET;
	server.sin_port = htons(8888);

	//Connect to remote server
	if (connect(sock, (struct sockaddr *)&server, sizeof(server)) < 0) {
		perror("connect failed. Error");
		return 1;
	}

	puts("Connected");

	//Receive a reply from the server
	if (recv(sock, server_reply ,2000 ,0)<0) {
		puts("recv failed");
	}

	server_reply[26] = '\0';
	printf("Server datetimes: %s", server_reply);
	close(sock);
	return 0;
}
