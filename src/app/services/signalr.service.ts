import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { NgEventBus } from 'ng-event-bus';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService implements OnInit {

  constructor(private message: MessageService,private event:NgEventBus) { }


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
      .withUrl(environment.data_api + 'feedback')
      .build();
    connection.serverTimeoutInMilliseconds = 360000;
    connection.start().then(function (info) {
      local.connectionId=connection.connectionId;
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
    connection.on('progress',(input:any[])=>{
      console.log(input);
      this.event.cast('top',{action:'update_progress',message:{message:input[0],index:input[1],max:input[2]}})
    })  
  }
}
