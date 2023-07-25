import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { json } from 'stream/consumers';
declare var window:any;
@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss']
})
export class ViewCalendarComponent implements OnInit{
  days:any[]=[];
  days_copy=[
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
     task:[]
    },
    {d:'',
    task:[]
   },
   {d:'',
    task:[]
   },
   {d:'',
    task:[]
   },
   {d:'',
   task:[]
  }]
  taskLists:any[]=[];
  selectedMonth='January';
  months=['January','February','March','April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  NoOfdays=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  FirstDaysOfEachMonth=[0,3,3,6,1,4,6,2,5,0,3,5]
  count=0;
  title:string='';
  date:any='';
  modalRef: BsModalRef;
  myDateValue: Date;
  bsValue = new Date('2023-01-01');
  bsRangeValue: Date[];
  editedDate='';
  editedTitle='';
  editedObj={};
  year=[];
  option='';
  formFields=['Edit','Delete'];
  maxDate = new Date('2023-12-31');
  minDate = new Date('2023-01-01');
  constructor(private modalService: BsModalService){
    this.minDate.setDate(this.minDate.getDate() - 0);
      this.maxDate.setDate(this.maxDate.getDate() - 0);
      this.bsRangeValue = [this.bsValue, this.maxDate];

  }
  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };

ngOnInit(): void {
  this.date = new Date('2023-01-01');
  this.year=[];
  this.loadMonth(this.selectedMonth);
  this.myDateValue = new Date();
}


loadMonth(selectedMonth){
  this.days=JSON.parse(JSON.stringify(this.days_copy))
  let monthIndex=this.months.indexOf(selectedMonth);
  let day=this.FirstDaysOfEachMonth[monthIndex];
  for(let i=1;i<=this.NoOfdays[monthIndex];i++){
  this.days[day]['d']=i<10? `0${i}` : `${i}`;
  day++;
      }
}
goBack(){
this.count--;
if(this.count<0){
  this.count=this.months.length-1;
}
this.selectedMonth=this.months[this.count];
this.loadMonth(this.selectedMonth);
if(this.taskLists.length && this.taskLists[this.months.indexOf(this.selectedMonth)]){
  this.days=this.taskLists[this.months.indexOf(this.selectedMonth)];
}

}
goFront(){
  this.count++;
  if(this.count>this.months.length-1){
    this.count=0;
  }
  this.selectedMonth=this.months[this.count];
  this.loadMonth(this.selectedMonth);
  if(this.taskLists.length && this.taskLists[this.months.indexOf(this.selectedMonth)]){
    this.days=this.taskLists[this.months.indexOf(this.selectedMonth)];
  }
}

openModal(temp: TemplateRef<any>){
  this.title='';
  let date=(this.months.indexOf(this.selectedMonth)+1)<10?'0'+(this.months.indexOf(this.selectedMonth)+1):(this.months.indexOf(this.selectedMonth)+1)
  this.date = new Date('2023-'+date+'-01');
  this.minDate = new Date('2023-'+date+'-01');
  let permissibleDay=this.NoOfdays[this.months.indexOf(this.selectedMonth)]
  this.maxDate = new Date('2023-'+date+'-'+permissibleDay);
  this.modalRef = this.modalService.show(temp, this.config);
};

onDateChange(newDate: Date) {
}
hideModal(){
  this.modalRef.hide();
}

saveData(){
  let day=new Date(this.date).getDate()
  let mon=new Date(this.date).getMonth()
  this.days.forEach(obj=>{
    if(Number(obj['d'])==day){
      obj['task'].push(this.title);
      obj['date']=this.date;
    }
  })
  let selectedMonthInArr= this.months.indexOf(this.selectedMonth)
  this.taskLists[selectedMonthInArr]=JSON.parse(JSON.stringify(this.days));
  this.hideModal();
  

}
cancelDate(){
  this.hideModal();
}

modify(date,taskid){
}

changeData(){
  if(this.editedTitle){
    this.days.forEach(obj=>{
      if(Number(obj['d'])==this.editedObj['d']){
        if(obj['task'].indexOf(this.editedObj['t'])>-1){
          let index=obj['task'].indexOf(this.editedObj['t']);
          obj['task'][index]=this.editedTitle;
        }
      }
    })
    let selectedMonthInArr= this.months.indexOf(this.selectedMonth)
    this.taskLists[selectedMonthInArr]=JSON.parse(JSON.stringify(this.days));
    // let index=this.days[this.editedObj['d']]['task'].indexOf(this.editedObj['t']);
    // this.days[this.editedObj['d']]['task'][index]=this.editedTitle
    this.hideModal();
  }
  this.option='';
}

editModal(temp: TemplateRef<any>,d,t){
    this.editedTitle = t;
    let date=new Date(d.date).getDate();
  this.modalRef = this.modalService.show(temp, this.config);
  this.editedObj={t,d:date};

}

deleteTask(){
  this.days.forEach(obj=>{
    if(Number(obj['d'])==this.editedObj['d']){
      if(obj['task'].indexOf(this.editedObj['t'])>-1){
        let index=obj['task'].indexOf(this.editedObj['t']);
        obj['task'].splice(index,1);
      }
    }
  })
  let selectedMonthInArr= this.months.indexOf(this.selectedMonth)
  this.taskLists[selectedMonthInArr]=JSON.parse(JSON.stringify(this.days));
  this.hideModal();
  this.option='';
}
selectOption(sel){
  console.log('selected:', sel)
  this.option=sel;
}
}
