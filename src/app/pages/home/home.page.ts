import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  datastorage: any;
  name: string;
  a: number;
  users: any = [];
  limit: number = 10;
  start: number = 0;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private accessPrvds: AccessProviders,
    private storage: Storage,
    public navCtrl: NavController,

    ){}

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
        console.log(res);
        this.datastorage = res;
        this.name = this.datastorage.your_name;
    });

    this.start = 0;
    this.users = [];
    this.loadUsers();
  }

async doRefresh(event){
  const loader = await this.loadingCtrl.create({
    message: 'Please Wait.....',
  });
  loader.present();
  
  this.ionViewDidEnter();
  event.target.complete();
  loader.dismiss();
}

loadData(){
  this.start == this.limit;
  setTimeout(() => {
    this.loadUsers().then(()=>{
      //event.target.complete();
    });
  },500);
}

async loadUsers(){
     return new Promise(resolve =>{
        let body ={
          aksi: 'load_users',
          start: this.start,
          limit: this.limit
    
        } 
        this.accessPrvds.postData(body, 'proces_api.php').subscribe((res: any)=>{
          
           for(let datas of res.result){
              this.users.push(datas);
           }
           resolve(true);
          
        });
  });
}
  
  
  async delData(a){
    return new Promise(resolve =>{
      let body ={
        aksi: 'del_users',
        id: a
  
      } 
      this.accessPrvds.postData(body, 'proces_api.php').subscribe((res: any)=>{
        
         if(res.success == true){
          this.presentToast('Delete Successfully..');
          this.ionViewDidEnter();
         }else{
          this.presentToast('Delete error..');
         }
        
      });
});
  }
  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message:a,
      duration: 1500,
      position:'top'

    });
    toast.present();
  }


  async prosesLogout(){
    this.storage.clear();
    this.navCtrl.navigateRoot(['/login']);
    const toast = await this.toastCtrl.create({
      message:'Logout Successfully..',
      duration: 1500,
      position:'top'
      
      });
      toast.present();
  }

  openCrud(a,b){
    this.router.navigate(['/crud/'+a+'/'+b])
  }



}
