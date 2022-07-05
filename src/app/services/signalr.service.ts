import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService implements OnInit {

  constructor(private message: MessageService) { }


  private connectionId?:any;

  ngOnInit(): void {


  }

  getConnectionId()
  {
    return this.connectionId;
  }


  connect()
  {

    var local = this;
    const connection = new signalR.HubConnectionBuilder()
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.forms_api + 'feedback')
      .build();
    connection.serverTimeoutInMilliseconds = 360000;
    connection.start().then(function (info) {
      local.connectionId=connection.connectionId;
      console.log(connection.connectionId);
    }).catch(function (err) {
      return console.error(err.toString());
    });
     
  
    connection.on("task_cache", (content) => {  
      this.message.add({
        key:"custom",
        severity:content.severity==undefined?"info":content.severity,
        summary:content.title,
        detail:content.message,
        data:content
      });
    });  
  }
}
