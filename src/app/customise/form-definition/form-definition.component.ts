import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { CustomdataService } from '../customdata.service';
import { LookupOutlineComponent } from '../lookup-outline/lookup-outline.component';
import { NewobjectpoupComponent } from '../newobjectpoup/newobjectpoup.component';

@Component({
  selector: 'app-form-definition',
  templateUrl: './form-definition.component.html',
  styleUrls: ['./form-definition.component.scss'],
  providers:[DialogService]
})
export class FormDefinitionComponent implements OnInit {

  constructor(private dataService:CustomdataService,private dialog:DialogService) { }

  ngOnInit(): void {
    this.getPages();
    this.getButtons();
    this.getColumns();
    this.getFields();
    this.getLookups();
    this.getActions();
    this.getLists();
    this.getCaches();
    this.getSundryFields();
  }

  public objectType:string="form";
  public selectedObject:any;
  public pages:any[]=[];
  public fields:any[]=[];
  public columns:any[]=[];
  public buttons:any[]=[];
  public lookups:any[]=[];
  public actions:any[]=[];
  public lists:any[]=[];
  public caches:string[]=[];
  public sundryfields:any[]=[];
  public fullObject:any;

  closeTab(event:any)
  {
    this.fullObject=null;
    this.objectType="";
  }

  applyFilter(table:Table,event:any)
  {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  tabChanged(event:any)
{
  switch(event.index)
  {
    case 0:
      this.objectType="form";
      this.getPages();
      break;
    case 1:
      this.objectType="column";
      this.getColumns();
      break;
    case 2:
      this.objectType="field";
      this.getFields();
      break;
    case 3:
      this.objectType="button";
      this.getButtons();
      break;
    case 4:
      this.objectType="lookup";
      this.getLookups();
      break;
    case 5:
      this.objectType="action";
      this.getActions();
      break;
    case 6:
      this.objectType="list";
      this.getLists();
      break;
    case 7:
      this.objectType="sundryfield";
      this.getSundryFields();
      break;
    case 8:
      this.objectType="cache";
      this.getCaches();
      break;

  }
  this.selectedObject=null;
  this.fullObject=null;
}

  rowSelected(type:string)
  {
    switch(type)
    {
      case 'form':
        if (this.selectedObject==null){this.fullObject=null;}else{
          this.dataService.get_page_by_id(this.selectedObject.id).subscribe({next:(result)=>{
            this.fullObject=result;
          }})
        }
        break;
      case 'button':
        if (this.selectedObject==null){this.fullObject=null;}else{
          this.dataService.get_button_by_id(this.selectedObject.id).subscribe({next:(result)=>{
            this.fullObject=result;
          }})
        }
        break; 
      case 'column':
        if (this.selectedObject==null){this.fullObject=null;}else{
          this.dataService.get_column_by_id(this.selectedObject.id).subscribe({next:(result)=>{
            this.fullObject=result;
          }})
        }
        break; 
      case 'field':
        if (this.selectedObject==null){this.fullObject=null;}else{
          this.dataService.get_field_by_id(this.selectedObject.id).subscribe({next:(result)=>{
            this.fullObject=result;
          }})
        }
        break; 
      case 'lookup':
          if (this.selectedObject==null){this.fullObject=null;}else{
            this.dataService.get_lookup_by_id(this.selectedObject.id).subscribe({next:(result)=>{
              this.fullObject=result;
            }})
          }
          break; 
      case 'action':
          if (this.selectedObject==null){this.fullObject=null;}else{
            this.dataService.get_action_by_id(this.selectedObject.id).subscribe({next:(result)=>{
              this.fullObject=result;
            }})
          }
          break; 
      case 'list':
          if (this.selectedObject==null){this.fullObject=null;}else{
            this.dataService.get_list_by_id(this.selectedObject.id).subscribe({next:(result)=>{
              this.fullObject=result;
            }})
          }
          break; 
      case 'sundryfield':
        if (this.selectedObject==null){this.fullObject=null;}else{
          this.dataService.get_sundryfield_by_id(this.selectedObject.id).subscribe({next:(result)=>{
            this.fullObject=result;
          }})
        }
          break; 
    }

  }


  clearCache()
  {
    this.dataService.clear_cache().subscribe({next:(result)=>{
        localStorage.setItem("recent_pages",JSON.stringify([]));
    }})
  }

  createCache()
  {
    this.dataService.cache_all_pages().subscribe({next:(result)=>{

    }})
  }

  newObject()
  {
    var payload={fullPage:{},type:'',lookups:this.lookups,lists:this.lists,buttons:this.buttons,fields:this.fields,actions:this.actions,columns:this.columns};
    var size="50%";
    var title="";

    if (this.objectType=="lookup")
    {
      title="Lookup";
      payload.fullPage={id:0,description:'',content:''};
      payload.type='lookup';
    }
    if (this.objectType=="button")
    {
      title="Button Set";
      payload.fullPage={id:0,description:'',buttons:[]};
      payload.type='button';
    }
    if (this.objectType=="action")
    {
      title="Action Set";
      payload.fullPage={id:0,description:'',actions:[]};
      payload.type='action';
    }
    if (this.objectType=="field")
    {
      title="Field Set";
      payload.fullPage={id:0,description:'',fields:[],column_count:0};
      payload.type='field';
    }
    if (this.objectType=="column")
    {
      title="Column Set";
      payload.fullPage={id:0,description:'',list_columns:[]};
      payload.type='column';
    }
    if (this.objectType=="form")
    {
      title="Form";
      payload.fullPage={id:0,description:'',action_customisations:[],closeable:false,columns:[],panels:[],type:'display',dialog_width:0,format_type:'columns'};
      payload.type='form';
      size:'100%';
    }
    if (this.objectType=="list")
    {
      title="List";
      payload.fullPage={id:0,description:'',action_customisations:[],filters:[],page_size:0,colour:'none'};
      payload.type='list';
      size:'90%'
    }
    if (this.objectType=="sundryfield")
    {
      title="Sundry Field";
      payload.fullPage={id:0,description:'',action_customisations:[],type:'tex_entry',width:2};
      payload.type='sundryfield';
      size:'90%'
    }
    if (title!="")
    {
      const ref=this.dialog.open(NewobjectpoupComponent,{
        data:payload,
        header:title,
        width:size
      });
      ref.onClose.subscribe((i)=>{
        this.refresh(i);
      })
    }

  }

  refresh(source:any)
  {
      if (this.objectType=="form")
      {
        this.tabChanged({index:0});
      }
      if (this.objectType=="column")
      {
        this.tabChanged({index:1});
      }
      if (this.objectType=="field")
      {
        this.tabChanged({index:2});
      }
      if (this.objectType=="button")
      {
        this.tabChanged({index:3});
      }
      if (this.objectType=="lookup")
      {
        this.tabChanged({index:4});
      }
      if (this.objectType=="action")
      {
        this.tabChanged({index:5});
      }
      if (this.objectType=="list")
      {
        this.tabChanged({index:6});
      }
      if (this.objectType=="sundryfield")
      {
        this.tabChanged({index:7});
      }
      if (this.objectType=="cache")
      {
        this.tabChanged({index:8});
      }
  }

  delete(type:string,item:any)
  {
      
  }

  getPages()
  {
    this.dataService.get_page().subscribe({next:(result:any)=>{
      this.pages=[...result];
    }})
  }

  getButtons()
  {
    this.dataService.get_button().subscribe({next:(result:any)=>{
      this.buttons=[...result];
    }})
  }

  getColumns()
  {
    this.dataService.get_column().subscribe({next:(result:any)=>{
      this.columns=[...result];
    }})
  }

  getFields()
  {
    this.dataService.get_field().subscribe({next:(result:any)=>{
      this.fields=[...result];
    }})
  }

  getSundryFields()
  {
    this.dataService.get_sundryfield().subscribe({next:(result:any)=>{
      this.sundryfields=[...result];
    }})
  }

  getCaches()
  {
    this.dataService.get_cache().subscribe({next:(result:any)=>{
      this.caches=[...result];
    }})
  }

  deleteCache(key:string)
  {
    this.dataService.delete_cache(key).subscribe({next:(result:any)=>{
      localStorage.setItem("recent_pages",JSON.stringify([]));
      this.getCaches();
    }})
  }


  getLookups()
  {
    this.dataService.get_lookup().subscribe({next:(result:any)=>{
      this.lookups=[...result];
    }})
  }
  getActions()
  {
    this.dataService.get_action().subscribe({next:(result:any)=>{
      this.actions=[...result];
    }})
  }

  getLists()
  {
    this.dataService.get_list().subscribe({next:(result:any)=>{
      this.lists=[...result];
    }})
  }
}
