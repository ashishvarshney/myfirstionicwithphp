import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  email_address : string ="";
  password: string ="";
 
  disabledButton;
  

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
    this.disabledButton = false;
  }

  async tryLogin(){
    
    if(this.email_address == ""){
    this.presentToast('Email ID is required');
    }
    else if(this.password == ""){
    this.presentToast('Password is required');
    }
  else{
    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message: 'Please Wait.....',
    })
    loader.present();
    return new Promise(resolve =>{
      let body ={
        aksi: 'proses_login',
        email_address: this.email_address,
        password: this.password
  
      }
      this.accessPrvds.postData(body, 'proces_api.php').subscribe((res: any)=>{
          if(res.success==true){
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Login Successfully');
            this.storage.set('storage_xxx',res.result);
            this.navCtrl.navigateRoot(['/home']);
          }
          else{
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast("Email or password is wrong");
            
          }
      }, (err)=>{
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast('Timeout');
      })
    });
  }
}

async presentToast(a){
const toast = await this.toastCtrl.create({
message:a,
duration: 1500,
position:'top'

});
toast.present();
}
  openRegister(){
    this.router.navigate(['/register'])
  }
}
