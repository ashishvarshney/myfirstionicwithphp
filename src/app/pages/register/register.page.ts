import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController,NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  your_name : string ="";
  email_address : string ="";
  password: string ="";
  confirm_password: string ="";
  gender: string = "";
  date_of_birth: string = "";
  disabledButton;


  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private accessPrvds: AccessProviders,
    public navCtrl: NavController,

    ){}

  ngOnInit() {
  }
  OpenLogIn(){
    this.router.navigate(['/login'])
  }
  ionViewDidEnter(){
    this.disabledButton = false;
  }
                async tryRegister(){
                    if(this.your_name == ""){
                    this.presentToast('Your Name is required');
                    }
                    else if(this.gender == ""){
                    this.presentToast('Gender is required');
                    }
                    else if(this.date_of_birth == ""){
                    this.presentToast('Date of Birth is required');
                    }
                    else if(this.email_address == ""){
                    this.presentToast('Email ID is required');
                    }
                    else if(this.password == ""){
                    this.presentToast('Password is required');
                    }
                    else if(this.confirm_password != this.password){
                    this.presentToast('Password Does Not Match');
                    }
                  else{
                    this.disabledButton = true;
                    const loader = await this.loadingCtrl.create({
                      message: 'Please Wait.....',
                    })
                    loader.present();
                    return new Promise(resolve =>{
                      let body ={
                        aksi: 'proses_register',
                        your_name: this.your_name,
                        gender: this.gender,
                        date_of_birth: this.date_of_birth,
                        email_address: this.email_address,
                        password: this.password
                  
                      }
                      this.accessPrvds.postData(body, 'proces_api.php').subscribe((res: any)=>{
                          if(res.success==true){
                            loader.dismiss();
                            this.disabledButton = false;
                            this.presentToast(res.msg);
                            this.navCtrl.navigateRoot(['/login']);
                           
                          }
                          else{
                            loader.dismiss();
                            this.disabledButton = false;
                            this.presentToast(res.msg);
                            
                          }
                      }, (err)=>{
                          loader.dismiss();
                          this.disabledButton = false;
                          this.presentAlert('Timeout');
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

  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss:false,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Close: blah');
            //action
          }
        }, {
          text: 'Try Again',
          handler: () => {
            this.tryRegister();
          }
        }
      ]
    });

    await alert.present();
  }
}
