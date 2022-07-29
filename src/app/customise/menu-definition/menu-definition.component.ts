import { Component, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import {TreeDragDropService, TreeNode} from 'primeng/api';
import { MenuService } from 'src/app/services/menu.service';
import { threadId } from 'worker_threads';
import { CustomdataService } from '../customdata.service';


@Component({
  selector: 'app-menu-definition',
  templateUrl: './menu-definition.component.html',
  styleUrls: ['./menu-definition.component.scss'],
  providers:[TreeDragDropService]
})
export class MenuDefinitionComponent implements OnInit {

  public menu_definition:TreeNode[]=[]
  public selectedMenu:any;
  public editedItem:any;
  public pages:any[]=[];

  constructor(private dataService:CustomdataService,private event:NgEventBus) { }

  ngOnInit(): void {
    this.loadtree();
    this.getPages();
  }

  cancelEdit()
  {
    this.editedItem=null;
    this.selectedMenu=null;
  }

  deleteItem(node:any)
  {
      this.dataService.delete_menu(node.data.id).subscribe({next:(result)=>{
        this.loadtree();
        this.editedItem=null;
        this.selectedMenu=null;
      }})
  }

  updateEdit()
  {
    if (this.editedItem.page_id==null){this.editedItem.page_id=0;}
    this.dataService.update({action:'update',data:this.editedItem}).subscribe({next:(result)=>
      {
        this.loadtree();
        this.editedItem=null;
        this.selectedMenu=null;
    }});
  }

  newitem()
  {
    this.selectedMenu=null;
    this.editedItem={parent_id:0,id:0,type:'parent',page_id:null};
  }

  getPages()
  {
    this.dataService.get_page().subscribe({next:(result:any)=>{
      this.pages=[...result];
    }})
  }

  nodeSelect(event:any)
  {
    if (event.node!=undefined&&event.node!=null)
    {
      this.editedItem=event.node.data;
    }
  }

  refreshmenu()
  {
      this.event.cast("menu",{"type":"redraw"});
  }

  onDrop(event:any)
  {
    var dropparent=event.dropNode.parent;
    event.dragNode.data.parent_id=dropparent.data.id;
    event.dragNode.data.sort_order=event.index;
    this.dataService.update({action:'move',data:event.dragNode.data}).subscribe({next:(result)=>
      {
    }});
  }

  loadtree()
  {
    this.dataService.get_menu().subscribe({next:(result:any)=>{
      this.menu_definition=result.menu;
    }})
  }

}
