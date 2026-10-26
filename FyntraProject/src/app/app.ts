import { Component, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface Expense { id:number; name:string; category:string; amount:number; date:string; paid:boolean; }
@Component({selector:'app-root',imports:[CurrencyPipe,FormsModule],templateUrl:'./app.html',styleUrl:'./app.css'})
export class App {
 readonly categories=['Hogar','Servicios','Alimentación','Transporte','Personal'];
 readonly section=signal('Resumen'); readonly filter=signal('Todos'); readonly month=signal('2026-10'); readonly showForm=signal(false);
 readonly expenses=signal<Expense[]>([
 {id:1,name:'Renta del departamento',category:'Hogar',amount:8500,date:'2026-10-01',paid:true},
 {id:2,name:'Supermercado',category:'Alimentación',amount:1800,date:'2026-10-26',paid:false},
 {id:3,name:'Internet en casa',category:'Servicios',amount:599,date:'2026-10-27',paid:false},
 {id:4,name:'Gasolina',category:'Transporte',amount:1000,date:'2026-10-28',paid:false},
 {id:5,name:'Suscripción de música',category:'Personal',amount:129,date:'2026-10-29',paid:false},
 {id:6,name:'Electricidad',category:'Servicios',amount:420,date:'2026-10-30',paid:false}]);
 draft={name:'',category:'Hogar',amount:null as number|null,date:'2026-10-25'};
 readonly monthly=computed(()=>this.expenses().filter(e=>e.date.startsWith(this.month())));
 readonly total=computed(()=>this.monthly().reduce((s,e)=>s+e.amount,0));
 readonly paid=computed(()=>this.monthly().filter(e=>e.paid).reduce((s,e)=>s+e.amount,0));
 readonly pending=computed(()=>this.monthly().filter(e=>!e.paid));
 readonly visible=computed(()=>this.monthly().filter(e=>this.filter()==='Todos'||(this.filter()==='Pendientes'?!e.paid:e.paid)).sort((a,b)=>a.date.localeCompare(b.date)));
 readonly monthLabel=computed(()=>new Date(this.month()+'-02T12:00:00').toLocaleDateString('es-MX',{month:'long',year:'numeric'}));
 categoryTotal(c:string){return this.monthly().filter(e=>e.category===c).reduce((s,e)=>s+e.amount,0);}
 readonly gradient=computed(()=>{let n=0;return 'conic-gradient('+this.categories.map((c,i)=>{const start=n;n+=this.total()?this.categoryTotal(c)/this.total()*100:0;return ['#477967','#a0b89b','#d7bd8c','#a7b8cf','#cdb9d6'][i]+' '+start+'% '+n+'%';}).join(',')+')';});
 toggle(id:number){this.expenses.update(items=>items.map(e=>e.id===id?{...e,paid:!e.paid}:e));}
 shiftMonth(step:number){const d=new Date(this.month()+'-02T12:00:00');d.setMonth(d.getMonth()+step);this.month.set(d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'));}
 openForm(){this.draft={name:'',category:'Hogar',amount:null,date:this.month()+'-25'};this.showForm.set(true);}
 save(){if(!this.draft.name.trim()||!this.draft.amount||this.draft.amount<=0||!this.draft.date)return;this.expenses.update(items=>[...items,{...this.draft,name:this.draft.name.trim(),amount:Number(this.draft.amount),id:Date.now(),paid:false}]);this.month.set(this.draft.date.slice(0,7));this.showForm.set(false);}
}
